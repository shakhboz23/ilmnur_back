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
exports.GroupService = void 0;
const common_1 = require("@nestjs/common");
const group_models_1 = require("./models/group.models");
const sequelize_1 = require("@nestjs/sequelize");
const uploaded_service_1 = require("../uploaded/uploaded.service");
const sequelize_typescript_1 = require("sequelize-typescript");
const user_models_1 = require("../user/models/user.models");
const course_models_1 = require("../course/models/course.models");
let GroupService = class GroupService {
    constructor(groupRepository, uploadedService) {
        this.groupRepository = groupRepository;
        this.uploadedService = uploadedService;
    }
    async create(groupDto, user_id, cover) {
        console.log(cover);
        try {
            console.log('Hi');
            const { title } = groupDto;
            const exist = await this.groupRepository.findOne({
                where: { title },
            });
            if (exist) {
                throw new common_1.BadRequestException('Already created');
            }
            const file_type = 'image';
            let image_url;
            if (cover) {
                image_url = await this.uploadedService.create(cover, file_type);
            }
            const group = await this.groupRepository.create({
                ...groupDto,
                user_id,
                cover: image_url,
            });
            return group;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getAll(category_id, user_id, type) {
        try {
            let category = {};
            if (category_id != 0) {
                category = { where: { category_id } };
            }
            const filters = {
                order: [['title', 'ASC']],
                include: [{ model: user_models_1.User }, {
                        model: course_models_1.Course, attributes: [], ...category,
                    }],
                attributes: {
                    include: [
                        [
                            sequelize_typescript_1.Sequelize.literal(`(SELECT COUNT(*) FROM "course" WHERE "course"."group_id" = "Group"."id")::int`),
                            'courses_count',
                        ],
                        [
                            sequelize_typescript_1.Sequelize.literal(`(SELECT COUNT(*) FROM "subscriptions" WHERE "course"."group_id" = "Group"."id" AND "course"."id" = "subscriptions"."course_id")::int`),
                            'users_count',
                        ],
                        [
                            sequelize_typescript_1.Sequelize.literal(`COALESCE((SELECT MIN("course"."price") FROM "course" WHERE "course"."group_id" = "Group"."id")::int, 0)`),
                            'low_price',
                        ],
                        [
                            sequelize_typescript_1.Sequelize.literal(`COALESCE((SELECT MAX("course"."price") FROM "course" WHERE "course"."group_id" = "Group"."id")::int, 0)`),
                            'high_price',
                        ],
                    ],
                },
                replacements: { category_id },
            };
            const groups = await this.groupRepository.findAll({
                ...filters,
            });
            let my_groups = [];
            if (user_id) {
                my_groups = await this.groupRepository.findAll({
                    where: { user_id },
                    ...filters,
                });
            }
            return {
                groups,
                my_groups,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getById(id) {
        try {
            const groups = await this.groupRepository.findOne({
                where: { id },
            });
            console.log(groups);
            if (!groups) {
                throw new common_1.NotFoundException('Group not found');
            }
            return {
                statusCode: common_1.HttpStatus.OK,
                data: groups,
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
            const groups = await this.groupRepository.findAll({ offset, limit });
            const total_count = await this.groupRepository.count();
            const total_pages = Math.ceil(total_count / 10);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                data: {
                    records: groups,
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
    async update(id, groupDto, cover, user_id) {
        try {
            const groupes = await this.groupRepository.findByPk(id);
            if (!groupes) {
                throw new common_1.NotFoundException('Group not found');
            }
            if (groupes.user_id != user_id) {
                throw new common_1.ForbiddenException("You don't have an access");
            }
            const file_type = 'image';
            let file_data;
            let image_url;
            if (cover) {
                file_data = await this.uploadedService.create({ file_type }, cover);
                cover = file_data.data.url;
            }
            const update = await this.groupRepository.update({ ...groupDto, cover: cover || groupes.cover }, {
                where: { id },
                returning: true,
            });
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Updated successfully',
                data: {
                    group: update[1][0],
                },
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async delete(id) {
        try {
            const groupes = await this.groupRepository.findByPk(id);
            if (!groupes) {
                throw new common_1.NotFoundException('Group not found');
            }
            groupes.destroy();
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
exports.GroupService = GroupService;
exports.GroupService = GroupService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(group_models_1.Group)),
    __metadata("design:paramtypes", [Object, uploaded_service_1.UploadedService])
], GroupService);
//# sourceMappingURL=group.service.js.map