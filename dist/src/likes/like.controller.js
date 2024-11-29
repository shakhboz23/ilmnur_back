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
exports.LikeController = void 0;
const common_1 = require("@nestjs/common");
const like_service_1 = require("./like.service");
const swagger_1 = require("@nestjs/swagger");
const like_dto_1 = require("./dto/like.dto");
const jwt_1 = require("@nestjs/jwt");
const image_validation_pipe_1 = require("../pipes/image-validation.pipe");
const platform_express_1 = require("@nestjs/platform-express");
let LikeController = class LikeController {
    constructor(likeService, jwtService) {
        this.likeService = likeService;
        this.jwtService = jwtService;
    }
    async create(likeDto, file) {
        return this.likeService.create(likeDto);
    }
    getById(id) {
        return this.likeService.getById(id);
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
        return this.likeService.getAll();
    }
    pagination(page) {
        return this.likeService.pagination(page);
    }
    update(id, likeDto) {
        return this.likeService.update(id, likeDto);
    }
    deleteLike(id) {
        return this.likeService.delete(id);
    }
};
exports.LikeController = LikeController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new like' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                course_id: {
                    type: 'number',
                },
                like_id: {
                    type: 'number',
                },
                title: {
                    type: 'string',
                },
                content: {
                    type: 'string',
                },
                type: {
                    type: 'string',
                },
                published: {
                    type: 'boolean',
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
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [like_dto_1.LikeDto, Object]),
    __metadata("design:returntype", Promise)
], LikeController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get like by ID' }),
    (0, common_1.Get)('/getById/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LikeController.prototype, "getById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all likes' }),
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LikeController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get likes with pagination' }),
    (0, common_1.Get)('pagination/:page'),
    __param(0, (0, common_1.Param)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LikeController.prototype, "pagination", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update like profile by ID' }),
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, like_dto_1.LikeDto]),
    __metadata("design:returntype", void 0)
], LikeController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete like' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LikeController.prototype, "deleteLike", null);
exports.LikeController = LikeController = __decorate([
    (0, swagger_1.ApiTags)('Like'),
    (0, common_1.Controller)('like'),
    __metadata("design:paramtypes", [like_service_1.LikeService,
        jwt_1.JwtService])
], LikeController);
//# sourceMappingURL=like.controller.js.map