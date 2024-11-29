"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleModule = void 0;
const common_1 = require("@nestjs/common");
const role_service_1 = require("./role.service");
const role_controller_1 = require("./role.controller");
const sequelize_1 = require("@nestjs/sequelize");
const role_models_1 = require("./models/role.models");
const files_module_1 = require("../files/files.module");
const user_module_1 = require("../user/user.module");
const activity_module_1 = require("../activity/activity.module");
let RoleModule = class RoleModule {
};
exports.RoleModule = RoleModule;
exports.RoleModule = RoleModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([role_models_1.Role]),
            files_module_1.FilesModule,
            activity_module_1.ActivityModule,
            (0, common_1.forwardRef)(() => user_module_1.UserModule)
        ],
        controllers: [role_controller_1.RoleController],
        providers: [role_service_1.RoleService],
        exports: [role_service_1.RoleService],
    })
], RoleModule);
//# sourceMappingURL=role.module.js.map