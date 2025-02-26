"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const path_1 = require("path");
const fs_1 = require("fs");
const cloudinary_config_1 = require("../../cloudinary.config");
let FilesService = class FilesService {
    async createFile(file, file_type) {
        try {
            console.log(file);
            console.log(file.mimetype.split('/')[0]);
            const fileTypeIndex = file?.originalname.lastIndexOf('.');
            const fileType = file?.originalname.slice(fileTypeIndex);
            const file_name = (0, uuid_1.v4)() + fileType;
            const file_path = (0, path_1.resolve)(__dirname, '..', '..', 'static');
            if (!(0, fs_1.existsSync)(file_path)) {
                (0, fs_1.mkdirSync)(file_path, { recursive: true });
            }
            (0, fs_1.writeFileSync)((0, path_1.join)(file_path, file_name), file.buffer);
            const filePath = 'dist/static/' + file_name;
            let result;
            try {
                result = await cloudinary_config_1.default.uploader.upload(filePath, {
                    resource_type: 'auto',
                });
                console.log(result);
            }
            catch (error) {
                console.log(error);
                return 'error';
            }
            return result;
        }
        catch (error) {
            throw new common_1.HttpException('Error creating file: ' + error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteFile(file_name) {
        try {
            (0, fs_1.unlinkSync)((0, path_1.resolve)(__dirname, '..', '..', 'static', file_name));
        }
        catch (error) {
            throw new common_1.HttpException('Error deleting file: ' + error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.FilesService = FilesService;
exports.FilesService = FilesService = __decorate([
    (0, common_1.Injectable)()
], FilesService);
//# sourceMappingURL=files.service.js.map