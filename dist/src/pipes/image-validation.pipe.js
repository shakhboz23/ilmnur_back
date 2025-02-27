"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
let ImageValidationPipe = class ImageValidationPipe {
    transform(value) {
        try {
            if (value) {
                const file = value?.originalname;
                const fileExtension = (0, path_1.extname)(file).toLowerCase();
                return value;
            }
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.ImageValidationPipe = ImageValidationPipe;
exports.ImageValidationPipe = ImageValidationPipe = __decorate([
    (0, common_1.Injectable)()
], ImageValidationPipe);
//# sourceMappingURL=image-validation.pipe.js.map