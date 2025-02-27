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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const notification_model_1 = require("./models/notification.model");
const user_models_1 = require("../user/models/user.models");
let NotificationService = class NotificationService {
    constructor(notificationRepository) {
        this.notificationRepository = notificationRepository;
    }
    async create(notificationDto) {
        try {
            const notification = await this.notificationRepository.create(notificationDto);
            return { status: common_1.HttpStatus.OK, data: notification };
        }
        catch (error) {
            return { status: common_1.HttpStatus.BAD_REQUEST, error: error.message };
        }
    }
    async findAll(page) {
        const limit = 10;
        const offset = (page - 1) * limit;
        console.log(offset);
        try {
            const notifications = await this.notificationRepository.findAll({
                order: [['updatedAt', 'DESC']],
                include: [
                    {
                        model: user_models_1.User,
                    },
                ],
                offset,
                limit,
            });
            const total_count = await this.notificationRepository.count();
            const total_pages = Math.ceil(total_count / limit);
            const res = {
                status: common_1.HttpStatus.OK,
                data: {
                    records: notifications.reverse(),
                    pagination: {
                        currentPage: page,
                        total_pages,
                        total_count,
                    },
                },
            };
            return res;
        }
        catch (error) {
            console.log(error);
            return { status: common_1.HttpStatus.NOT_FOUND, error: error.message };
        }
    }
    async findAllId() {
        try {
            const notificationId = await this.notificationRepository.findAll({
                attributes: ['id'],
            });
            return notificationId;
        }
        catch (error) {
            return { status: common_1.HttpStatus.BAD_REQUEST, error: error.message };
        }
    }
    async findById(id) {
        try {
            const notifications = await this.notificationRepository.findOne({
                where: { id },
            });
            if (!notifications) {
                return { status: common_1.HttpStatus.NOT_FOUND, error: 'Not found' };
            }
            return { status: common_1.HttpStatus.OK, data: notifications };
        }
        catch (error) {
            return { status: common_1.HttpStatus.NOT_FOUND, error: error.message };
        }
    }
    async update(id, notificationDto) {
        try {
            const notification = await this.findById(id);
            if (notification.status === 400) {
                return { status: common_1.HttpStatus.NOT_FOUND, error: 'Not found' };
            }
            const updated_info = await this.notificationRepository.update(notificationDto, {
                where: { id: notification.data.id },
                returning: true,
            });
            return {
                status: common_1.HttpStatus.OK,
                data: updated_info[1][0],
            };
        }
        catch (error) {
            return { status: common_1.HttpStatus.NOT_FOUND, error: error.message };
        }
    }
    async delete(id) {
        try {
            const notification = await this.findById(id);
            if (notification.status === 400) {
                return { status: common_1.HttpStatus.NOT_FOUND, error: 'Not found' };
            }
            await notification.data.destroy();
            return { status: common_1.HttpStatus.OK, data: 'deleted' };
        }
        catch (error) {
            return { status: common_1.HttpStatus.NOT_FOUND, error: error.message };
        }
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(notification_model_1.Notification)),
    __metadata("design:paramtypes", [Object])
], NotificationService);
//# sourceMappingURL=notification.service.js.map