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
exports.LessonController = void 0;
const common_1 = require("@nestjs/common");
const lesson_service_1 = require("./lesson.service");
const swagger_1 = require("@nestjs/swagger");
const lesson_dto_1 = require("./dto/lesson.dto");
const jwt_1 = require("@nestjs/jwt");
const image_validation_pipe_1 = require("../pipes/image-validation.pipe");
const platform_express_1 = require("@nestjs/platform-express");
const token_1 = require("../utils/token");
let LessonController = class LessonController {
    constructor(lessonService, jwtService) {
        this.lessonService = lessonService;
        this.jwtService = jwtService;
    }
    async create(lessonDto, video) {
        return this.lessonService.create(lessonDto, video);
    }
    getById(id, headers) {
        const user_id = (0, token_1.extractUserIdFromToken)(headers, this.jwtService, true);
        return this.lessonService.getById(id, user_id);
    }
    getAll(category_id) {
        return this.lessonService.getAll(category_id);
    }
    getByCourse(id, headers) {
        const user_id = (0, token_1.extractUserIdFromToken)(headers, this.jwtService, true);
        return this.lessonService.getByCourse(+id, user_id);
    }
    pagination(page) {
        return this.lessonService.pagination(page);
    }
    update(id, lessonDto, video) {
        return this.lessonService.update(id, lessonDto, video);
    }
    deleteLesson(id) {
        return this.lessonService.delete(id);
    }
};
exports.LessonController = LessonController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new lesson' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                course_id: {
                    type: 'number',
                },
                lesson_id: {
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
                video: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, common_1.Post)('/create'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('video')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)(new image_validation_pipe_1.ImageValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [lesson_dto_1.LessonDto, Object]),
    __metadata("design:returntype", Promise)
], LessonController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get lesson by ID' }),
    (0, common_1.Get)('/getById/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], LessonController.prototype, "getById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all lessons' }),
    (0, common_1.Get)('/:category_id'),
    __param(0, (0, common_1.Param)('category_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LessonController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all lessons' }),
    (0, common_1.Get)('/getByCourse/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], LessonController.prototype, "getByCourse", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get lessons with pagination' }),
    (0, common_1.Get)('pagination/:page'),
    __param(0, (0, common_1.Param)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LessonController.prototype, "pagination", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update lesson profile by ID' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                course_id: {
                    type: 'number',
                },
                lesson_id: {
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
                video: {
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
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, lesson_dto_1.LessonDto, Object]),
    __metadata("design:returntype", void 0)
], LessonController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete lesson' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LessonController.prototype, "deleteLesson", null);
exports.LessonController = LessonController = __decorate([
    (0, swagger_1.ApiTags)('Lesson'),
    (0, common_1.Controller)('lesson'),
    __metadata("design:paramtypes", [lesson_service_1.LessonService,
        jwt_1.JwtService])
], LessonController);
//# sourceMappingURL=lesson.controller.js.map