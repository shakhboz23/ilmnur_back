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
exports.TestsService = void 0;
const lesson_service_1 = require("./../lesson/lesson.service");
const test_settings_service_1 = require("./../test_settings/test_settings.service");
const common_1 = require("@nestjs/common");
const test_models_1 = require("./models/test.models");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const reyting_service_1 = require("../reyting/reyting.service");
const lesson_models_1 = require("../lesson/models/lesson.models");
const course_models_1 = require("../course/models/course.models");
const category_models_1 = require("../category/models/category.models");
const files_service_1 = require("../files/files.service");
let TestsService = class TestsService {
    constructor(testsRepository, reytingService, lessonService, test_settingsService, fileService) {
        this.testsRepository = testsRepository;
        this.reytingService = reytingService;
        this.lessonService = lessonService;
        this.test_settingsService = test_settingsService;
        this.fileService = fileService;
    }
    async create(testsDto, user_id) {
        try {
            const { test, lesson_id, start_date, end_date, sort_level, period, mix, } = testsDto;
            const lesson = await this.lessonService.getById(lesson_id);
            if (lesson.course?.user_id != user_id) {
                throw new common_1.BadRequestException("You have not access");
            }
            let variants;
            if (start_date || end_date || sort_level || period) {
                await this.test_settingsService.create({
                    lesson_id,
                    start_date,
                    end_date,
                    sort_level,
                    period,
                    mix,
                });
            }
            for (let i = 0; i < test.length; i++) {
                variants = Object.values(test[i].variants);
                console.log(test[i].is_action, '2303');
                if (test[i].is_action == test_models_1.ActionType.edited && test[i].id) {
                    await this.update(test[i].id, test[i]);
                }
                else if (test[i].is_action != test_models_1.ActionType.old) {
                    await this.testsRepository.create({
                        lesson_id,
                        question: test[i].question,
                        variants,
                        type: test[i].type,
                        true_answer: test[i].true_answer,
                    });
                }
            }
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Created successfully',
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async create_url(file) {
        try {
            console.log('object');
            if (file) {
                file = await this.fileService.createFile(file, 'image');
                console.log(file);
                if (file != 'error') {
                    return { statusCode: common_1.HttpStatus.OK, data: file };
                }
                else {
                    return {
                        statusCode: common_1.HttpStatus.BAD_REQUEST,
                        error: 'Error while uploading a file',
                    };
                }
            }
        }
        catch (error) {
            return { statusCode: common_1.HttpStatus.BAD_REQUEST, error: error.message };
        }
    }
    async getAll(class_name) {
        try {
            const tests = await this.testsRepository.findAll({
                attributes: {
                    include: [
                        [
                            sequelize_typescript_1.Sequelize.literal(`(SELECT COUNT(*) FROM "lesson" WHERE "lesson"."id" = "Tests"."lesson_id" and "lesson"."class" = ${class_name})`),
                            'lessonsCount',
                        ],
                        [
                            sequelize_typescript_1.Sequelize.literal(`(
                SELECT SUM("uploaded"."duration")
                FROM "lesson"
                INNER JOIN "video_lesson" ON "lesson"."id" = "video_lesson"."lesson_id"
                INNER JOIN "uploaded" ON "video_lesson"."video_id" = "uploaded"."id"  
                WHERE "lesson"."id" = "Tests"."lesson_id"
                AND "lesson"."class" = '${class_name}'
              )`),
                            'totalDuration',
                        ],
                    ],
                },
            });
            return {
                statusCode: common_1.HttpStatus.OK,
                data: tests,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getTests() {
        try {
            const testss = await this.testsRepository.findAll();
            return {
                statusCode: common_1.HttpStatus.OK,
                data: testss,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getById(lesson_id, user_id) {
        console.log(user_id);
        const lesson = this.lessonService.getById(lesson_id);
        try {
            if (false) {
                throw new common_1.BadRequestException('start date is invalid');
            }
            else if (false) {
                throw new common_1.BadRequestException('end date is invalid');
            }
            const tests = await this.testsRepository.findAll({
                where: {
                    lesson_id,
                },
                include: [{ model: lesson_models_1.Lesson, include: [{ model: course_models_1.Course, include: [{ model: category_models_1.Category }] }] }]
            });
            if (!tests) {
                throw new common_1.NotFoundException('Tests not found');
            }
            const lesson = await this.lessonService.getById(lesson_id);
            const category = await this.testsRepository.findOne({
                where: {
                    lesson_id,
                },
                include: [{ model: lesson_models_1.Lesson, attributes: ['course_id', 'id'], include: [{ model: course_models_1.Course, attributes: ['category_id'], include: [{ model: category_models_1.Category, attributes: ['id'] }] }] }]
            });
            const test_settings = await this.test_settingsService.getByLessonId(lesson_id);
            let randomizedVariants;
            console.log(lesson.course?.user_id, user_id);
            if (lesson.course.user_id != user_id) {
                randomizedVariants = this.shuffle(tests).map((variant) => {
                    const randomizedOptions = this.shuffle(variant.get('variants'));
                    return {
                        ...variant.toJSON(),
                        variants: randomizedOptions,
                    };
                });
            }
            return {
                user_id: lesson?.course.get('user_id'),
                category_id: category?.lesson?.course?.category?.id,
                lesson_id: category?.lesson?.id,
                test: randomizedVariants || tests,
                test_settings,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async checkById(id, answer) {
        try {
            const test = await this.testsRepository.findByPk(id);
            if (!test) {
                throw new common_1.NotFoundException('Tests not found');
            }
            console.log(answer);
            console.log(test.variants[test.true_answer[0]]);
            if (test.variants[test.true_answer[0]] == answer) {
                return [id, true];
            }
            return [id, false];
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async checkAnswers(user_id, lesson_id, checkDto) {
        const { answers } = checkDto;
        let message;
        try {
            const results = {};
            let student;
            let res, id, answer;
            for (let i of answers) {
                id = +i[0];
                answer = i[1];
                res = await this.checkById(id, answer);
                results[res[0]] = res[1];
            }
            let ball = 0;
            for (let i in results) {
                if (results[i]) {
                    ball += 1;
                }
            }
            const percentage = (ball / Object.keys(results)?.length) * 100;
            console.log(percentage);
            const data = {
                ball,
                lesson_id,
            };
            const reyting_data = await this.reytingService.create(data, user_id);
            message = 'Your reyting has been created!';
            if (reyting_data.message == 'Already added!') {
                message = 'Already added!';
            }
            return {
                results,
                ball: [percentage, ball],
                student,
                message,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async pagination(page) {
        try {
            const offset = (page - 1) * 10;
            const limit = 10;
            const testss = await this.testsRepository.findAll({ offset, limit });
            const total_count = await this.testsRepository.count();
            const total_pages = Math.ceil(total_count / 10);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                data: {
                    records: testss,
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
    async update(id, questionDto) {
        try {
            const tests = await this.testsRepository.findByPk(id);
            if (!tests) {
                throw new common_1.NotFoundException('Tests not found');
            }
            const update = await this.testsRepository.update(questionDto, {
                where: { id },
                returning: true,
            });
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Updated successfully',
                data: {
                    tests: update[1][0],
                },
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async delete(id) {
        try {
            const tests = await this.testsRepository.findByPk(id);
            if (!tests) {
                throw new common_1.NotFoundException('Tests not found');
            }
            tests.destroy();
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Deleted successfully',
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    shuffle(array) {
        const shuffledArray = [...array];
        const data = [];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [
                shuffledArray[j],
                shuffledArray[i],
            ];
        }
        return shuffledArray;
    }
};
exports.TestsService = TestsService;
exports.TestsService = TestsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(test_models_1.Tests)),
    __metadata("design:paramtypes", [Object, reyting_service_1.ReytingService,
        lesson_service_1.LessonService,
        test_settings_service_1.Test_settingsService,
        files_service_1.FilesService])
], TestsService);
//# sourceMappingURL=test.service.js.map