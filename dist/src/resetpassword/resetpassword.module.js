"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetpasswordModule = void 0;
const common_1 = require("@nestjs/common");
const resetpassword_service_1 = require("./resetpassword.service");
const resetpassword_controller_1 = require("./resetpassword.controller");
const sequelize_1 = require("@nestjs/sequelize");
const resetpassword_models_1 = require("./models/resetpassword.models");
const mail_module_1 = require("../mail/mail.module");
let ResetpasswordModule = class ResetpasswordModule {
};
exports.ResetpasswordModule = ResetpasswordModule;
exports.ResetpasswordModule = ResetpasswordModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([resetpassword_models_1.Resetpassword]), mail_module_1.MailModule],
        controllers: [resetpassword_controller_1.ResetpasswordController],
        providers: [resetpassword_service_1.ResetpasswordService],
        exports: [resetpassword_service_1.ResetpasswordService],
    })
], ResetpasswordModule);
//# sourceMappingURL=resetpassword.module.js.map