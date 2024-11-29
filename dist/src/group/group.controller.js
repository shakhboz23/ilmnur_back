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
exports.GroupController = void 0;
const gateway_1 = require("../gateway/gateway");
const common_1 = require("@nestjs/common");
const group_service_1 = require("./group.service");
const swagger_1 = require("@nestjs/swagger");
const group_dto_1 = require("./dto/group.dto");
const websockets_1 = require("@nestjs/websockets");
const image_validation_pipe_1 = require("../pipes/image-validation.pipe");
const platform_express_1 = require("@nestjs/platform-express");
const token_1 = require("../utils/token");
const jwt_1 = require("@nestjs/jwt");
let GroupController = class GroupController {
    constructor(groupService, jwtService, chatGateway) {
        this.groupService = groupService;
        this.jwtService = jwtService;
        this.chatGateway = chatGateway;
    }
    async create(groupDto, file, headers) {
        const user_id = (0, token_1.extractUserIdFromToken)(headers, this.jwtService, true);
        console.log(file);
        console.log(file, 'djskd');
        return this.groupService.create(groupDto, user_id, file);
    }
    getById(id) {
        return this.groupService.getById(id);
    }
    getAll(category_id, headers) {
        console.log(headers);
        const user_id = (0, token_1.extractUserIdFromToken)(headers, this.jwtService, true);
        return this.groupService.getAll(category_id, user_id);
    }
    getMyGroup(headers) {
        const user_id = (0, token_1.extractUserIdFromToken)(headers, this.jwtService, true);
        return this.groupService.getAll(0, user_id, 'my_groups');
    }
    pagination(page) {
        return this.groupService.pagination(page);
    }
    update(id, groupDto, file, headers) {
        const user_id = (0, token_1.extractUserIdFromToken)(headers, this.jwtService, true);
        return this.groupService.update(id, groupDto, file, user_id);
    }
    deleteGroup(id) {
        return this.groupService.delete(id);
    }
};
exports.GroupController = GroupController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new group' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                title: {
                    type: 'string',
                },
                description: {
                    type: 'string',
                },
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, common_1.Post)('/create'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)(new image_validation_pipe_1.ImageValidationPipe())),
    __param(2, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [group_dto_1.GroupDto, Object, Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get group by ID' }),
    (0, common_1.Get)('/getById/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "getById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all groups' }),
    (0, common_1.Get)('/:category_id'),
    __param(0, (0, common_1.Param)('category_id')),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all groups' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "getMyGroup", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get groups with pagination' }),
    (0, common_1.Get)('pagination/:page'),
    __param(0, (0, common_1.Param)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "pagination", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update group profile by ID' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                title: {
                    type: 'string',
                },
                description: {
                    type: 'string',
                },
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, common_1.Put)('/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)(new image_validation_pipe_1.ImageValidationPipe())),
    __param(3, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, group_dto_1.GroupDto, Object, Object]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete group' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "deleteGroup", null);
exports.GroupController = GroupController = __decorate([
    (0, swagger_1.ApiTags)('Group'),
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*', credentials: true } }),
    (0, common_1.Controller)('group'),
    __metadata("design:paramtypes", [group_service_1.GroupService,
        jwt_1.JwtService,
        gateway_1.ChatGateway])
], GroupController);
//# sourceMappingURL=group.controller.js.map