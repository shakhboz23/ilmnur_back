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
exports.SubscriptionsController = void 0;
const common_1 = require("@nestjs/common");
const subscriptions_service_1 = require("./subscriptions.service");
const swagger_1 = require("@nestjs/swagger");
const subscriptions_dto_1 = require("./dto/subscriptions.dto");
const jwt_1 = require("@nestjs/jwt");
const token_1 = require("../utils/token");
const create_subscriptions_dto_1 = require("./dto/create_subscriptions.dto");
let SubscriptionsController = class SubscriptionsController {
    constructor(subscriptionsService, jwtService) {
        this.subscriptionsService = subscriptionsService;
        this.jwtService = jwtService;
    }
    async create(subscriptionsDto, headers) {
        console.log(headers);
        const user_id = (0, token_1.extractUserIdFromToken)(headers, this.jwtService, true);
        return this.subscriptionsService.create(subscriptionsDto, user_id);
    }
    async CreateSubscription(createSubscriptionDto, headers) {
        console.log(headers);
        const user_id = (0, token_1.extractUserIdFromToken)(headers, this.jwtService, true);
        return this.subscriptionsService.createSubscription(createSubscriptionDto, user_id);
    }
    getById(id) {
        return this.subscriptionsService.getById(id);
    }
    getAll(headers) {
        const auth_header = headers['authorization'];
        const token = auth_header === null || auth_header === void 0 ? void 0 : auth_header.split(' ')[1];
        console.log(token, 'token2303');
        const user = token
            ? this.jwtService.verify(token, { secret: process.env.ACCESS_TOKEN_KEY })
            : null;
        const user_id = user === null || user === void 0 ? void 0 : user.id;
        console.log(user_id, '565456');
        return this.subscriptionsService.getAll();
    }
    pagination(page) {
        return this.subscriptionsService.pagination(page);
    }
    update(id, subscriptionsDto) {
        return this.subscriptionsService.update(id, subscriptionsDto);
    }
    deleteSubscriptions(id) {
    }
};
exports.SubscriptionsController = SubscriptionsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new subscriptions' }),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [subscriptions_dto_1.SubscriptionsDto, String]),
    __metadata("design:returntype", Promise)
], SubscriptionsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new subscriptions' }),
    (0, common_1.Post)('/createSubscription'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_subscriptions_dto_1.CreateSubscriptionsDto, String]),
    __metadata("design:returntype", Promise)
], SubscriptionsController.prototype, "CreateSubscription", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get subscriptions by ID' }),
    (0, common_1.Get)('/getById/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SubscriptionsController.prototype, "getById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all subscriptionss' }),
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubscriptionsController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get subscriptionss with pagination' }),
    (0, common_1.Get)('pagination/:page'),
    __param(0, (0, common_1.Param)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SubscriptionsController.prototype, "pagination", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update subscriptions profile by ID' }),
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, subscriptions_dto_1.SubscriptionsDto]),
    __metadata("design:returntype", void 0)
], SubscriptionsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete subscriptions' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SubscriptionsController.prototype, "deleteSubscriptions", null);
exports.SubscriptionsController = SubscriptionsController = __decorate([
    (0, swagger_1.ApiTags)('Subscriptions'),
    (0, common_1.Controller)('subscriptions'),
    __metadata("design:paramtypes", [subscriptions_service_1.SubscriptionsService,
        jwt_1.JwtService])
], SubscriptionsController);
//# sourceMappingURL=subscriptions.controller.js.map