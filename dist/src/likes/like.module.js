"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeModule = void 0;
const common_1 = require("@nestjs/common");
const like_service_1 = require("./like.service");
const like_controller_1 = require("./like.controller");
const sequelize_1 = require("@nestjs/sequelize");
const like_models_1 = require("./models/like.models");
const user_module_1 = require("../user/user.module");
const uploaded_module_1 = require("../uploaded/uploaded.module");
let LikeModule = class LikeModule {
};
exports.LikeModule = LikeModule;
exports.LikeModule = LikeModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([like_models_1.Like]), user_module_1.UserModule, uploaded_module_1.UploadedModule],
        controllers: [like_controller_1.LikeController],
        providers: [like_service_1.LikeService],
    })
], LikeModule);
//# sourceMappingURL=like.module.js.map