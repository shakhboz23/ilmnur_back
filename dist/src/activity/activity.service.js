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
exports.ActivityService = void 0;
const common_1 = require("@nestjs/common");
const activity_models_1 = require("./models/activity.models");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_2 = require("sequelize");
const role_models_1 = require("../role/models/role.models");
let ActivityService = class ActivityService {
    constructor(activityRepository) {
        this.activityRepository = activityRepository;
    }
    async create(activityDto) {
        try {
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Successfully created!',
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getAll() {
        try {
            const users = await this.activityRepository.findAll();
            return {
                statusCode: common_1.HttpStatus.OK,
                data: users,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getActivity(getActivityDto) {
        try {
            const { role, user_id, start_time, end_time } = getActivityDto;
            const users = await this.activityRepository.findAll({
                where: {
                    role,
                    user_id,
                    createdAt: {
                        [sequelize_2.Op.lte]: start_time,
                        [sequelize_2.Op.gte]: end_time,
                    },
                },
            });
            return {
                statusCode: common_1.HttpStatus.OK,
                data: users,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getById(id) {
        try {
            const user = await this.activityRepository.findByPk(id, {
                include: { model: role_models_1.Role },
            });
            if (!user) {
                throw new common_1.NotFoundException('User topilmadi!');
            }
            return {
                statusCode: common_1.HttpStatus.OK,
                data: user,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async pagination(page, limit) {
        try {
            const offset = (page - 1) * limit;
            const users = await this.activityRepository.findAll({ offset, limit });
            const total_count = await this.activityRepository.count();
            const total_pages = Math.ceil(total_count / limit);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                data: {
                    records: users,
                    pagination: {
                        currentPage: Number(page),
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
    async deleteUser(id) {
        try {
            const user = await this.activityRepository.findByPk(id);
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            user.destroy();
            return {
                statusCode: common_1.HttpStatus.ACCEPTED,
                message: 'Deleted successfully',
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.ActivityService = ActivityService;
exports.ActivityService = ActivityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(activity_models_1.Activity)),
    __metadata("design:paramtypes", [Object])
], ActivityService);
//# sourceMappingURL=activity.service.js.map