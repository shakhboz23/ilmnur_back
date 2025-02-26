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
exports.VideoController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const cloudinary_service_1 = require("./cloudinary.service");
const swagger_1 = require("@nestjs/swagger");
const cloudinary_config_1 = require("../../cloudinary.config");
let VideoController = class VideoController {
    constructor(cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
    }
    async uploadVideo(file) {
        const result = await this.cloudinaryService.uploadPrivateVideo(file.path);
        return { publicId: result.public_id, url: result.secure_url };
    }
    async getVideoSignature(publicId) {
        const signatureData = this.cloudinaryService.generateVideoSignature(publicId);
        return signatureData;
    }
    async getSignedUrl(body) {
        const url = cloudinary_config_1.default.url(body.public_id, {
            resource_type: body.resource_type,
            type: 'authenticated',
            sign_url: true,
            format: body.format,
        });
        return { url };
    }
};
exports.VideoController = VideoController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'upload' }),
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "uploadVideo", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'upload' }),
    (0, common_1.Get)('signature'),
    __param(0, (0, common_1.Query)('publicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "getVideoSignature", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'upload' }),
    (0, common_1.Post)('get-signed-url'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "getSignedUrl", null);
exports.VideoController = VideoController = __decorate([
    (0, swagger_1.ApiTags)('Cloudinary'),
    (0, common_1.Controller)('videos'),
    __metadata("design:paramtypes", [cloudinary_service_1.CloudinaryService])
], VideoController);
//# sourceMappingURL=cloudinary.controller.js.map