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
exports.Subscription_activityService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const jwt_1 = require("@nestjs/jwt");
const sequelize_2 = require("sequelize");
const course_models_1 = require("../course/models/course.models");
const subscription_activity_models_1 = require("./models/subscription_activity.models");
let Subscription_activityService = class Subscription_activityService {
    constructor(subscription_activityRepository, jwtService) {
        this.subscription_activityRepository = subscription_activityRepository;
        this.jwtService = jwtService;
    }
    async create(subscriptionActivityDto) {
        try {
            const { subscription_id, course_id, status, date } = subscriptionActivityDto;
            const targetDate = new Date(date);
            const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
            const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));
            const exist = await this.subscription_activityRepository.findOne({
                where: {
                    course_id,
                    subscription_id, createdAt: {
                        [sequelize_2.Op.between]: [startOfDay, endOfDay],
                    },
                },
            });
            if (exist && status !== 'none') {
                return this.update(exist.id, status);
            }
            else if (status !== 'none') {
                return await this.subscription_activityRepository.create({ ...subscriptionActivityDto, createdAt: date || new Date() });
            }
            else {
                return this.delete(exist.id);
            }
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async update(id, status) {
        try {
            const updatedUser = await this.subscription_activityRepository.update({ status }, {
                where: { id },
                returning: true,
            });
            return updatedUser[1][0];
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getAll() {
        try {
            const subscriptionss = await this.subscription_activityRepository.findAll({
                order: [['id', 'ASC']],
            });
            if (!subscriptionss.length) {
                throw new common_1.NotFoundException('Subscriptionss not found');
            }
            return subscriptionss;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getById(id) {
        try {
            const subscriptions = await this.subscription_activityRepository.findOne({
                where: { id },
                include: [{ model: course_models_1.Course }],
            });
            if (!subscriptions) {
                throw new common_1.NotFoundException('Subscriptions not found');
            }
            return subscriptions;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async pagination(page) {
        try {
            const offset = (page - 1) * 10;
            const limit = 10;
            const subscriptionss = await this.subscription_activityRepository.findAll({
                offset,
                limit,
            });
            const total_count = await this.subscription_activityRepository.count();
            const total_pages = Math.ceil(total_count / 10);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                data: {
                    records: subscriptionss,
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
    async delete(id) {
        try {
            const subscriptions = await this.subscription_activityRepository.findByPk(id);
            if (!subscriptions) {
                throw new common_1.NotFoundException('Subscriptions not found');
            }
            subscriptions.destroy();
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
exports.Subscription_activityService = Subscription_activityService;
exports.Subscription_activityService = Subscription_activityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(subscription_activity_models_1.SubscriptionActivity)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], Subscription_activityService);
//# sourceMappingURL=subscription_activity.service.js.map