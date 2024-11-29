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
exports.UploadedController = void 0;
const common_1 = require("@nestjs/common");
const uploaded_service_1 = require("./uploaded.service");
const swagger_1 = require("@nestjs/swagger");
const uploaded_dto_1 = require("./dto/uploaded.dto");
const platform_express_1 = require("@nestjs/platform-express");
const image_validation_pipe_1 = require("../pipes/image-validation.pipe");
const update_1 = require("./dto/update");
let UploadedController = class UploadedController {
    constructor(uploadedService) {
        this.uploadedService = uploadedService;
    }
    create(uploadedDto, file) {
        return this.uploadedService.create(uploadedDto, file);
    }
    getById(id) {
        return this.uploadedService.getById(id);
    }
    getAll() {
        return this.uploadedService.getAll();
    }
    pagination(page) {
        return this.uploadedService.pagination(page);
    }
    update(id, updateDto) {
        return this.uploadedService.update(id, updateDto);
    }
    deleteUploaded(id) {
        return this.uploadedService.delete(id);
    }
};
exports.UploadedController = UploadedController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new video_lesson' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                is_active: {
                    type: 'boolean',
                },
                file_type: {
                    type: 'string',
                },
                duration: {
                    type: 'number',
                },
                file1: {
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
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [uploaded_dto_1.UploadedDto, Object]),
    __metadata("design:returntype", void 0)
], UploadedController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get class by ID' }),
    (0, common_1.Get)('/getById/:id/:class_name'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UploadedController.prototype, "getById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all classs' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UploadedController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get classs with pagination' }),
    (0, common_1.Get)('pagination/:page'),
    __param(0, (0, common_1.Param)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UploadedController.prototype, "pagination", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update class profile by ID' }),
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_1.UpdateDto]),
    __metadata("design:returntype", void 0)
], UploadedController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete class' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UploadedController.prototype, "deleteUploaded", null);
exports.UploadedController = UploadedController = __decorate([
    (0, swagger_1.ApiTags)('Uploaded'),
    (0, common_1.Controller)('uploaded'),
    __metadata("design:paramtypes", [uploaded_service_1.UploadedService])
], UploadedController);
//# sourceMappingURL=uploaded.controller.js.map