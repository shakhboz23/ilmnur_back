"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscription_activityModule = void 0;
const common_1 = require("@nestjs/common");
const subscription_activity_service_1 = require("./subscription_activity.service");
const subscription_activity_controller_1 = require("./subscription_activity.controller");
const sequelize_1 = require("@nestjs/sequelize");
const role_module_1 = require("../role/role.module");
const mail_module_1 = require("../mail/mail.module");
const resetpassword_module_1 = require("../resetpassword/resetpassword.module");
const subscription_activity_models_1 = require("./models/subscription_activity.models");
let Subscription_activityModule = class Subscription_activityModule {
};
exports.Subscription_activityModule = Subscription_activityModule;
exports.Subscription_activityModule = Subscription_activityModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([subscription_activity_models_1.SubscriptionActivity]),
            (0, common_1.forwardRef)(() => role_module_1.RoleModule),
            mail_module_1.MailModule,
            resetpassword_module_1.ResetpasswordModule,
        ],
        controllers: [subscription_activity_controller_1.Subscription_activityController],
        providers: [subscription_activity_service_1.Subscription_activityService],
        exports: [subscription_activity_service_1.Subscription_activityService],
    })
], Subscription_activityModule);
//# sourceMappingURL=subscription_activity.module.js.map