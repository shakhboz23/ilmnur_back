"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStepModule = void 0;
const common_1 = require("@nestjs/common");
const class_service_1 = require("./class.service");
const class_controller_1 = require("./class.controller");
const sequelize_1 = require("@nestjs/sequelize");
const class_models_1 = require("./models/class.models");
const gateway_1 = require("../gateway/gateway");
let UserStepModule = class UserStepModule {
};
exports.UserStepModule = UserStepModule;
exports.UserStepModule = UserStepModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([class_models_1.UserStep])],
        controllers: [class_controller_1.UserStepController],
        providers: [class_service_1.UserStepService, gateway_1.ChatGateway],
        exports: [class_service_1.UserStepService]
    })
], UserStepModule);
//# sourceMappingURL=class.module.js.map