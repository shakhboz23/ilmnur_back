"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadedModule = void 0;
const common_1 = require("@nestjs/common");
const uploaded_service_1 = require("./uploaded.service");
const uploaded_controller_1 = require("./uploaded.controller");
const sequelize_1 = require("@nestjs/sequelize");
const uploaded_models_1 = require("./models/uploaded.models");
const files_module_1 = require("../files/files.module");
let UploadedModule = class UploadedModule {
};
exports.UploadedModule = UploadedModule;
exports.UploadedModule = UploadedModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([uploaded_models_1.Uploaded]), files_module_1.FilesModule],
        controllers: [uploaded_controller_1.UploadedController],
        providers: [uploaded_service_1.UploadedService],
        exports: [uploaded_service_1.UploadedService],
    })
], UploadedModule);
//# sourceMappingURL=uploaded.module.js.map