"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoChatModule = void 0;
const common_1 = require("@nestjs/common");
const video_chat_service_1 = require("./video_chat.service");
const video_chat_controller_1 = require("./video_chat.controller");
const sequelize_1 = require("@nestjs/sequelize");
const files_module_1 = require("../files/files.module");
const role_module_1 = require("../role/role.module");
const user_module_1 = require("../user/user.module");
const video_chat_model_1 = require("./models/video_chat.model");
let VideoChatModule = class VideoChatModule {
};
exports.VideoChatModule = VideoChatModule;
exports.VideoChatModule = VideoChatModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([video_chat_model_1.VideoChat]),
            role_module_1.RoleModule,
            user_module_1.UserModule,
            files_module_1.FilesModule,
        ],
        controllers: [video_chat_controller_1.VideoChatController],
        providers: [video_chat_service_1.VideoChatService, video_chat_controller_1.VideoChatController],
        exports: [video_chat_service_1.VideoChatService],
    })
], VideoChatModule);
//# sourceMappingURL=video_chat.module.js.map