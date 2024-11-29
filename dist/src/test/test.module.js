"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestsModule = void 0;
const common_1 = require("@nestjs/common");
const test_service_1 = require("./test.service");
const test_controller_1 = require("./test.controller");
const sequelize_1 = require("@nestjs/sequelize");
const test_models_1 = require("./models/test.models");
const reyting_module_1 = require("../reyting/reyting.module");
const class_module_1 = require("../user_step/class.module");
const test_settings_module_1 = require("../test_settings/test_settings.module");
const jwt_1 = require("@nestjs/jwt");
const lesson_module_1 = require("../lesson/lesson.module");
const files_module_1 = require("../files/files.module");
let TestsModule = class TestsModule {
};
exports.TestsModule = TestsModule;
exports.TestsModule = TestsModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([test_models_1.Tests]), reyting_module_1.ReytingModule, class_module_1.UserStepModule, test_settings_module_1.Test_settingsModule, jwt_1.JwtModule, lesson_module_1.LessonModule, files_module_1.FilesModule],
        controllers: [test_controller_1.TestsController],
        providers: [test_service_1.TestsService],
        exports: [test_service_1.TestsService],
    })
], TestsModule);
//# sourceMappingURL=test.module.js.map