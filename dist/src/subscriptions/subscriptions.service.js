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
exports.SubscriptionsService = void 0;
const common_1 = require("@nestjs/common");
const subscriptions_models_1 = require("./models/subscriptions.models");
const sequelize_1 = require("@nestjs/sequelize");
const user_service_1 = require("../user/user.service");
const course_models_1 = require("../course/models/course.models");
const uploaded_service_1 = require("../uploaded/uploaded.service");
let SubscriptionsService = class SubscriptionsService {
    constructor(subscriptionsRepository, userService, uploadedService) {
        this.subscriptionsRepository = subscriptionsRepository;
        this.userService = userService;
        this.uploadedService = uploadedService;
    }
    async create(subscriptionsDto, user_id) {
        try {
            const { course_id } = subscriptionsDto;
            const exist = await this.subscriptionsRepository.findOne({
                where: { user_id, course_id },
            });
            if (exist) {
                return this.delete(user_id, subscriptionsDto.course_id);
            }
            return this.subscriptionsRepository.create({ course_id, user_id, is_active: subscriptions_models_1.SubscribeActive.requested });
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async createSubscription(creaetSubscriptionsDto, user_id) {
        var _a;
        try {
            const user = await this.userService.register(Object.assign(Object.assign({}, creaetSubscriptionsDto), { role: 'student' }));
            console.log(user);
            const { course_ids, role } = creaetSubscriptionsDto;
            user_id = (_a = user.data) === null || _a === void 0 ? void 0 : _a.user.id;
            let subcription;
            let i;
            for (i of course_ids) {
                subcription = await this.subscriptionsRepository.create({ course_id: i, user_id, role, is_active: subscriptions_models_1.SubscribeActive.pending });
            }
            return subcription;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getAll() {
        try {
            const subscriptionss = await this.subscriptionsRepository.findAll({
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
            const subscriptions = await this.subscriptionsRepository.findOne({
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
            const subscriptionss = await this.subscriptionsRepository.findAll({
                offset,
                limit,
            });
            const total_count = await this.subscriptionsRepository.count();
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
    async update(id, subscriptionsDto) {
        try {
            const subscriptions = await this.subscriptionsRepository.findByPk(id);
            if (!subscriptions) {
                throw new common_1.NotFoundException('Subscriptions not found');
            }
            const update = await this.subscriptionsRepository.update(subscriptionsDto, {
                where: { id },
                returning: true,
            });
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Updated successfully',
                data: {
                    subscriptions: update[1][0],
                },
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async delete(user_id, course_id) {
        try {
            const subscriptions = await this.subscriptionsRepository.findOne({
                where: { user_id, course_id }
            });
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
exports.SubscriptionsService = SubscriptionsService;
exports.SubscriptionsService = SubscriptionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(subscriptions_models_1.Subscriptions)),
    __metadata("design:paramtypes", [Object, user_service_1.UserService,
        uploaded_service_1.UploadedService])
], SubscriptionsService);
//# sourceMappingURL=subscriptions.service.js.map