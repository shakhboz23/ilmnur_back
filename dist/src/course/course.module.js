"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModule = void 0;
const common_1 = require("@nestjs/common");
const course_service_1 = require("./course.service");
const course_controller_1 = require("./course.controller");
const sequelize_1 = require("@nestjs/sequelize");
const course_models_1 = require("./models/course.models");
const user_module_1 = require("../user/user.module");
const uploaded_module_1 = require("../uploaded/uploaded.module");
const chat_group_module_1 = require("../chat_group/chat_group.module");
let CourseModule = class CourseModule {
};
exports.CourseModule = CourseModule;
exports.CourseModule = CourseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([course_models_1.Course]),
            user_module_1.UserModule, uploaded_module_1.UploadedModule, chat_group_module_1.ChatGroupModule,
        ],
        controllers: [course_controller_1.CourseController],
        providers: [course_service_1.CourseService],
        exports: [course_service_1.CourseService],
    })
], CourseModule);
//# sourceMappingURL=course.module.js.map