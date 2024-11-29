"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetpasswordService = void 0;
const common_1 = require("@nestjs/common");
const resetpassword_models_1 = require("./models/resetpassword.models");
const sequelize_1 = require("@nestjs/sequelize");
const jwt_1 = require("@nestjs/jwt");
const uuid = require("uuid");
const mail_service_1 = require("../mail/mail.service");
let ResetpasswordService = class ResetpasswordService {
    constructor(resetpasswordRepository, mailService, jwtService) {
        this.resetpasswordRepository = resetpasswordRepository;
        this.mailService = mailService;
        this.jwtService = jwtService;
    }
    async create(resetpasswordDto) {
        try {
            const { email } = resetpasswordDto;
            const is_user = await this.resetpasswordRepository.findOne({
                where: { email },
            });
            if (is_user) {
                throw new common_1.BadRequestException('Already sent a activate link');
            }
            const activate_link = uuid.v4();
            const resetpassword = await this.resetpasswordRepository.create({
                email,
                activate_link,
            });
            await this.mailService.sendUserActivationLink(activate_link, email);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Created successfully',
                data: resetpassword,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getAll() {
        try {
            const resetpasswords = await this.resetpasswordRepository.findAll();
            return {
                statusCode: common_1.HttpStatus.OK,
                data: resetpasswords,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getById(id) {
        try {
            const resetpassword = await this.resetpasswordRepository.findByPk(id);
            if (!resetpassword) {
                throw new common_1.NotFoundException('Resetpassword not found');
            }
            return {
                statusCode: common_1.HttpStatus.OK,
                data: resetpassword,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async checkActivationLink(activate_link) {
        try {
            const is_aviable = await this.resetpasswordRepository.findOne({
                where: {
                    activate_link,
                },
            });
            if (is_aviable) {
                return is_aviable.email;
            }
            throw new common_1.NotFoundException('Activation link not found');
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async delete(id) {
        try {
            const resetpassword = await this.resetpasswordRepository.findByPk(id);
            if (!resetpassword) {
                throw new common_1.NotFoundException('Resetpassword not found');
            }
            resetpassword.destroy();
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Deleted successfully',
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.ResetpasswordService = ResetpasswordService;
exports.ResetpasswordService = ResetpasswordService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(resetpassword_models_1.Resetpassword)),
    __metadata("design:paramtypes", [Object, mail_service_1.MailService,
        jwt_1.JwtService])
], ResetpasswordService);
//# sourceMappingURL=resetpassword.service.js.map