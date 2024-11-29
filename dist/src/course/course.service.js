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
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const course_models_1 = require("./models/course.models");
const sequelize_1 = require("@nestjs/sequelize");
const user_service_1 = require("../user/user.service");
const uploaded_service_1 = require("../uploaded/uploaded.service");
const subscriptions_models_1 = require("../subscriptions/models/subscriptions.models");
const user_models_1 = require("../user/models/user.models");
const role_models_1 = require("../role/models/role.models");
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_2 = require("sequelize");
const subscription_activity_models_1 = require("../subscription_activity/models/subscription_activity.models");
let CourseService = class CourseService {
    constructor(courseRepository, userService, uploadedService) {
        this.courseRepository = courseRepository;
        this.userService = userService;
        this.uploadedService = uploadedService;
    }
    async create(courseDto, cover, user_id) {
        try {
            const { title } = courseDto;
            const exist = await this.courseRepository.findOne({
                where: { title },
            });
            if (exist) {
                throw new common_1.BadRequestException('Already created');
            }
            const file_type = 'image';
            let file_data;
            let image_url;
            if (cover) {
                file_data = await this.uploadedService.create({ file_type }, cover);
                cover = file_data.data.url;
            }
            const course = await this.courseRepository.create(Object.assign(Object.assign({}, courseDto), { group_id: +courseDto.group_id, user_id,
                cover }));
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Created successfully',
                data: course,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getAll(category_id) {
        try {
            let category = {};
            if (+category_id) {
                category = { where: { category_id } };
            }
            const courses = await this.courseRepository.findAll(Object.assign(Object.assign({}, category), { order: [['id', 'ASC']] }));
            if (!courses.length) {
                throw new common_1.NotFoundException('Courses not found');
            }
            return courses;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getByCourse(group_id, category_id) {
        try {
            let category = {
                where: {
                    group_id,
                }
            };
            if (+category_id) {
                category = {
                    where: {
                        category_id, group_id
                    }
                };
            }
            const courses = await this.courseRepository.findAll(Object.assign(Object.assign({}, category), { order: [['id', 'ASC']], include: [
                    {
                        model: subscriptions_models_1.Subscriptions,
                        attributes: ['user_id'],
                        include: [{ model: user_models_1.User, include: [{ model: role_models_1.Role }] }],
                    },
                ] }));
            return courses;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getUsersByGroupId(group_id, date, user_id, course_id) {
        try {
            course_id = +course_id || null;
            let id;
            course_id ? id = { id: course_id } : {};
            console.log(id);
            const targetDate = new Date(date);
            const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
            const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));
            console.log(startOfDay, endOfDay);
            let users = await this.courseRepository.findAll({
                where: { group_id },
                include: [{
                        model: subscriptions_models_1.Subscriptions, include: [{ model: user_models_1.User }, {
                                model: subscription_activity_models_1.SubscriptionActivity, where: {
                                    course_id,
                                    createdAt: {
                                        [sequelize_2.Op.between]: [startOfDay, endOfDay],
                                    },
                                },
                                required: false
                            }, { model: course_models_1.Course, where: Object.assign({}, id) }]
                    }],
                order: [[{ model: subscriptions_models_1.Subscriptions, as: 'subscriptions' }, { model: user_models_1.User, as: 'user' }, 'name', 'ASC']],
            });
            console.log(users, '23033');
            let user = await this.courseRepository.findOne({
                where: { group_id },
                include: [{
                        model: subscriptions_models_1.Subscriptions, where: { user_id }
                    },
                ],
            });
            console.log(user, '2222');
            if (!users) {
                throw new common_1.NotFoundException('Users not found');
            }
            users = users.reduce((acc, item) => acc.concat(item.subscriptions), []);
            return { users, user: user === null || user === void 0 ? void 0 : user.subscriptions[0] };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getById(id, user_id) {
        try {
            const course = await this.courseRepository.findOne({
                where: { id },
                attributes: {
                    include: [
                        [
                            sequelize_typescript_1.Sequelize.literal(`(SELECT "user"."id" FROM "user" JOIN "group" ON "group"."id" = "Course"."group_id" LIMIT 1)::int`),
                            'user_id',
                        ],
                        [
                            sequelize_typescript_1.Sequelize.literal(`(SELECT COUNT(*) FROM "lesson" WHERE "lesson"."course_id" = :id AND "lesson"."type" = 'lesson')::int`),
                            'lessons_count',
                        ],
                        [
                            sequelize_typescript_1.Sequelize.literal(`(SELECT COUNT(*) FROM "reyting" WHERE "reyting"."lesson_id" IN (SELECT "id" FROM "lesson" WHERE "lesson"."course_id" = :id) AND "reyting"."user_id" = :user_id AND "reyting"."ball" > 70)::int`),
                            'finished_count',
                        ],
                        [
                            sequelize_typescript_1.Sequelize.literal(`(CASE WHEN EXISTS (SELECT 1 FROM "subscriptions" WHERE "subscriptions"."course_id" = "Course"."id" AND "subscriptions"."user_id" = :user_id) THEN true ELSE false END)`),
                            'is_subscribed',
                        ],
                    ],
                },
                replacements: {
                    id,
                    user_id,
                },
            });
            return course;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async pagination(page) {
        try {
            const offset = (page - 1) * 10;
            const limit = 10;
            const courses = await this.courseRepository.findAll({ offset, limit });
            const total_count = await this.courseRepository.count();
            const total_pages = Math.ceil(total_count / 10);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                data: {
                    records: courses,
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
    async update(id, courseDto) {
        try {
            const course = await this.courseRepository.findByPk(id);
            if (!course) {
                throw new common_1.NotFoundException('Course not found');
            }
            const update = await this.courseRepository.update(courseDto, {
                where: { id },
                returning: true,
            });
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Updated successfully',
                data: {
                    course: update[1][0],
                },
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async delete(id) {
        try {
            const course = await this.courseRepository.findByPk(id);
            if (!course) {
                throw new common_1.NotFoundException('Course not found');
            }
            course.destroy();
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
exports.CourseService = CourseService;
exports.CourseService = CourseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(course_models_1.Course)),
    __metadata("design:paramtypes", [Object, user_service_1.UserService,
        uploaded_service_1.UploadedService])
], CourseService);
//# sourceMappingURL=course.service.js.map