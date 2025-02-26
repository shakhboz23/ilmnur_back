"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: 'dqq3cnpxv',
    api_key: '381131244113522',
    api_secret: 'pawVl12tBDUpJEkVyScyqCzG8r4',
});
let CloudinaryService = class CloudinaryService {
    async uploadPrivateVideo(filePath) {
        return await cloudinary_1.v2.uploader.upload(filePath, {
            resource_type: 'video',
            type: 'authenticated',
        });
    }
    generateVideoSignature(publicId) {
        const timestamp = Math.floor(new Date().getTime() / 1000);
        const signature = cloudinary_1.v2.utils.api_sign_request({ public_id: publicId, timestamp }, cloudinary_1.v2.config().api_secret);
        return { signature, timestamp };
    }
};
exports.CloudinaryService = CloudinaryService;
exports.CloudinaryService = CloudinaryService = __decorate([
    (0, common_1.Injectable)()
], CloudinaryService);
//# sourceMappingURL=cloudinary.service.js.map