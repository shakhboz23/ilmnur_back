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
exports.ChatGroupController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const chat_group_dto_1 = require("./dto/chat_group.dto");
const chat_group_service_1 = require("./chat_group.service");
let ChatGroupController = class ChatGroupController {
    constructor(chatGroupService) {
        this.chatGroupService = chatGroupService;
    }
    create(chatGroupDto) {
        return this.chatGroupService.create(chatGroupDto);
    }
    getById(id, class_name) {
        return this.chatGroupService.getById(id, class_name);
    }
    getAll() {
        return this.chatGroupService.getAll();
    }
    pagination(page) {
        return this.chatGroupService.pagination(page);
    }
    update(id, chatGroupDto) {
        return this.chatGroupService.update(id, chatGroupDto);
    }
    delete(id) {
        return this.chatGroupService.delete(id);
    }
};
exports.ChatGroupController = ChatGroupController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new chat group' }),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chat_group_dto_1.ChatGroupDto]),
    __metadata("design:returntype", void 0)
], ChatGroupController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get chat group by ID' }),
    (0, common_1.Get)('/getById/:id/:class_name'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('class_name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ChatGroupController.prototype, "getById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all chat group' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ChatGroupController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get chat group with pagination' }),
    (0, common_1.Get)('pagination/:page'),
    __param(0, (0, common_1.Param)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ChatGroupController.prototype, "pagination", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update chat group profile by ID' }),
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, chat_group_dto_1.ChatGroupDto]),
    __metadata("design:returntype", void 0)
], ChatGroupController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete chat group' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ChatGroupController.prototype, "delete", null);
exports.ChatGroupController = ChatGroupController = __decorate([
    (0, swagger_1.ApiTags)('ChatGroup'),
    (0, common_1.Controller)('chatgroup'),
    __metadata("design:paramtypes", [chat_group_service_1.ChatGroupService])
], ChatGroupController);
//# sourceMappingURL=chat_group.controller.js.map