"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonService = void 0;
const common_1 = require("@nestjs/common");
const lesson_models_1 = require("./models/lesson.models");
const sequelize_1 = require("@nestjs/sequelize");
const lesson_dto_1 = require("./dto/lesson.dto");
const course_models_1 = require("../course/models/course.models");
const uploaded_service_1 = require("../uploaded/uploaded.service");
const sequelize_typescript_1 = require("sequelize-typescript");
const course_service_1 = require("../course/course.service");
let LessonService = class LessonService {
    constructor(lessonRepository, courseService, uploadedService) {
        this.lessonRepository = lessonRepository;
        this.courseService = courseService;
        this.uploadedService = uploadedService;
    }
    async create(lessonDto, video) {
        try {
            console.log(lessonDto);
            console.log(video);
            const { title, content } = lessonDto;
            if (lessonDto.type == 'lesson') {
                let file_type;
                let file_data;
                if (!content) {
                    throw new common_1.BadRequestException('Please enter a content');
                }
                if (video) {
                    file_type = 'video';
                    file_data = await this.uploadedService.create({ file_type }, video);
                    console.log(file_data);
                    video = file_data.data.url;
                }
                lessonDto.lesson_id = +lessonDto.lesson_id || null;
                let video_lesson = await this.lessonRepository.create(Object.assign(Object.assign({}, lessonDto), { video }));
                video_lesson = await this.lessonRepository.update({
                    position: video_lesson.id,
                }, {
                    where: { id: video_lesson.id },
                    returning: true,
                });
                return video_lesson[1][0];
            }
            else {
                const exist = await this.lessonRepository.findOne({
                    where: { title },
                });
                if (exist) {
                    throw new common_1.BadRequestException('Already created');
                }
                const lesson = await this.lessonRepository.create({
                    title: lessonDto.title,
                    published: lessonDto.published,
                    course_id: lessonDto.course_id,
                    type: lessonDto.type,
                });
                return lesson;
            }
        }
        catch (error) {
            console.error(error);
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getAll(category_id) {
        try {
            let category = {};
            if (+category_id) {
                category = { where: { category_id } };
            }
            const lessons = await this.lessonRepository.findAll({
                where: { type: 'lesson' },
                include: [{ model: lesson_models_1.Lesson }, Object.assign({ model: course_models_1.Course, attributes: [] }, category)],
                order: [['id', 'ASC']],
            });
            return lessons;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getByCourse(course_id, user_id) {
        try {
            console.log(user_id);
            user_id = user_id || null;
            const lessons = await this.lessonRepository.findAll({
                where: {
                    course_id,
                    lesson_id: null,
                },
                include: [
                    {
                        model: lesson_models_1.Lesson,
                        attributes: {
                            include: [
                                [
                                    sequelize_typescript_1.Sequelize.literal(`(CASE WHEN EXISTS (SELECT 1 FROM "reyting" WHERE "reyting"."lesson_id" = "Lesson"."id" AND "reyting"."user_id" = :user_id AND "reyting"."ball" > 70) THEN true ELSE false END)`),
                                    'is_finished',
                                ],
                            ],
                        },
                    },
                ],
                order: [['position', 'ASC']],
                attributes: {
                    include: [
                        [
                            sequelize_typescript_1.Sequelize.literal(`(CASE WHEN EXISTS (SELECT 1 FROM "reyting" WHERE "reyting"."lesson_id" = "Lesson"."id" AND "reyting"."user_id" = :user_id AND "reyting"."ball" > 70) THEN true ELSE false END)`),
                            'is_finished',
                        ],
                    ],
                },
                replacements: { user_id },
            });
            if (!lessons.length) {
            }
            console.log(user_id);
            const course = await this.courseService.getById(course_id, user_id);
            return { lessons, course: course };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getById(id, user_id) {
        try {
            user_id = user_id || null;
            const lesson = await this.lessonRepository.findOne({
                where: { id },
                include: [
                    {
                        model: course_models_1.Course,
                        attributes: {
                            include: [
                                [
                                    sequelize_typescript_1.Sequelize.literal(`(SELECT "user"."id" FROM "user" JOIN "group" ON "group"."id" = "course"."group_id" WHERE "course"."id" = "Lesson"."course_id" AND "course"."user_id" = "user"."id" LIMIT 1)::int`),
                                    'user_id',
                                ],
                                [
                                    sequelize_typescript_1.Sequelize.literal(`(SELECT COUNT(*) FROM "lesson" WHERE "lesson"."course_id" = "Lesson"."course_id" 
                     AND "lesson"."type" = 'lesson')::int`),
                                    'lesson_count',
                                ],
                                [
                                    sequelize_typescript_1.Sequelize.literal(`(SELECT COUNT(*) FROM "lesson" WHERE "lesson"."course_id" = "Lesson"."course_id" 
                     AND LENGTH("lesson"."content") > 0)::int`),
                                    'lecture_count',
                                ],
                                [
                                    sequelize_typescript_1.Sequelize.literal(`(CASE WHEN EXISTS (SELECT 1 FROM "subscriptions" WHERE "subscriptions"."course_id" = "Lesson"."course_id" AND "subscriptions"."user_id" = :user_id) THEN true ELSE false END)`),
                                    'is_subscribed',
                                ],
                            ],
                        },
                    },
                ],
                replacements: { user_id },
            });
            if (!lesson) {
                throw new common_1.NotFoundException('Lesson not found');
            }
            return lesson;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async pagination(page) {
        try {
            const offset = (page - 1) * 10;
            const limit = 10;
            const lessons = await this.lessonRepository.findAll({ offset, limit });
            const total_count = await this.lessonRepository.count();
            const total_pages = Math.ceil(total_count / 10);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                data: {
                    records: lessons,
                    pagination: {
                        currentPage: page,
                        total_pages,
                        total_count,
                    },
                },
            };
            return response;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async update(id, lessonDto, video) {
        try {
            console.log(lesson_dto_1.LessonDto);
            const { title, content } = lessonDto;
            const lesson = await this.lessonRepository.findByPk(id);
            if (!lesson) {
                throw new common_1.NotFoundException('Lesson not found');
            }
            let update;
            if (lesson.type == 'lesson') {
                let file_type;
                let file_data;
                if (!content || !video) {
                    throw new common_1.BadRequestException('Please enter a video, content and lesson_id');
                }
                if (video) {
                    file_type = 'video';
                    file_data = await this.uploadedService.create({ file_type }, video);
                    console.log(file_data);
                    video = file_data.data.url;
                }
                lessonDto.lesson_id = +lessonDto.lesson_id || null;
                update = await this.lessonRepository.update(Object.assign(Object.assign({}, lessonDto), { video }), {
                    where: { id },
                    returning: true,
                });
            }
            else {
                const exist = await this.lessonRepository.findOne({
                    where: { title },
                });
                if (exist) {
                    throw new common_1.BadRequestException('Already created');
                }
                update = await this.lessonRepository.update({
                    title: lessonDto.title,
                    published: lessonDto.published,
                    course_id: lessonDto.course_id,
                    type: lessonDto.type,
                }, {
                    where: { id },
                    returning: true,
                });
            }
            return update[1][0];
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async delete(id) {
        try {
            const lesson = await this.lessonRepository.findByPk(id);
            if (!lesson) {
                throw new common_1.NotFoundException('Lesson not found');
            }
            lesson.destroy();
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Deleted successfully',
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.LessonService = LessonService;
exports.LessonService = LessonService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(lesson_models_1.Lesson)),
    __metadata("design:paramtypes", [Object, course_service_1.CourseService,
        uploaded_service_1.UploadedService])
], LessonService);
//# sourceMappingURL=lesson.service.js.map