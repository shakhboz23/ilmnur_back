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
exports.UserStepController = void 0;
const gateway_1 = require("./../gateway/gateway");
const common_1 = require("@nestjs/common");
const class_service_1 = require("./class.service");
const swagger_1 = require("@nestjs/swagger");
const class_dto_1 = require("./dto/class.dto");
const websockets_1 = require("@nestjs/websockets");
let UserStepController = class UserStepController {
    constructor(classService, chatGateway) {
        this.classService = classService;
        this.chatGateway = chatGateway;
    }
    async create(userStepDto) {
        const data = await this.classService.create(userStepDto);
        this.chatGateway.server.emit('request', {
            type: 'request',
            data,
        });
        return data;
    }
    getAll() {
        return this.classService.getAll();
    }
    getById(id) {
        return this.classService.getById(id);
    }
    pagination(page) {
        return this.classService.pagination(page);
    }
    update(id, userStepDto) {
        return this.classService.update(id, userStepDto);
    }
    deleteClass(id) {
        return this.classService.delete(id);
    }
};
exports.UserStepController = UserStepController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new class' }),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [class_dto_1.UserStepDto]),
    __metadata("design:returntype", Promise)
], UserStepController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all classs' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserStepController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'get step by ID' }),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserStepController.prototype, "getById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get classs with pagination' }),
    (0, common_1.Get)('pagination/:page'),
    __param(0, (0, common_1.Param)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserStepController.prototype, "pagination", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update class profile by ID' }),
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, class_dto_1.UserStepDto]),
    __metadata("design:returntype", void 0)
], UserStepController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete user step' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserStepController.prototype, "deleteClass", null);
exports.UserStepController = UserStepController = __decorate([
    (0, swagger_1.ApiTags)('User step'),
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*', credentials: true } }),
    (0, common_1.Controller)('user_step'),
    __metadata("design:paramtypes", [class_service_1.UserStepService,
        gateway_1.ChatGateway])
], UserStepController);
//# sourceMappingURL=class.controller.js.map