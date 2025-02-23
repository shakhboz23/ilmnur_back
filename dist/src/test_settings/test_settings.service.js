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
exports.Test_settingsService = void 0;
const common_1 = require("@nestjs/common");
const test_settings_models_1 = require("./models/test_settings.models");
const sequelize_1 = require("@nestjs/sequelize");
let Test_settingsService = class Test_settingsService {
    constructor(test_settingsRepository) {
        this.test_settingsRepository = test_settingsRepository;
    }
    async create(test_settingsDto) {
        try {
            const { lesson_id } = test_settingsDto;
            let test_settings = await this.test_settingsRepository.findOne({
                where: { lesson_id }
            });
            if (test_settings) {
                return this.update(test_settings.id, test_settingsDto);
            }
            if (!lesson_id) {
                return {
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    message: 'Lesson id not found',
                };
            }
            test_settings =
                await this.test_settingsRepository.create(test_settingsDto);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Created successfully',
                data: test_settings,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getAll() {
        try {
            const test_settingss = await this.test_settingsRepository.findAll();
            return {
                statusCode: common_1.HttpStatus.OK,
                data: test_settingss,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getById(id) {
        try {
            const test_settings = await this.test_settingsRepository.findByPk(id);
            if (!test_settings) {
                throw new common_1.NotFoundException('Test_settings not found');
            }
            return {
                statusCode: common_1.HttpStatus.OK,
                data: test_settings,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getByLessonId(id) {
        try {
            const test_settings = await this.test_settingsRepository.findOne({
                where: { lesson_id: id },
            });
            return test_settings;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async pagination(page) {
        try {
            const offset = (page - 1) * 10;
            const limit = 10;
            const test_settingss = await this.test_settingsRepository.findAll({
                offset,
                limit,
            });
            const total_count = await this.test_settingsRepository.count();
            const total_pages = Math.ceil(total_count / 10);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                data: {
                    records: test_settingss,
                    pagination: {
                        currentPage: page,
                        total_pages,
                        total_count,
                    },
                },
            };
            return response;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async update(id, test_settingsDto) {
        try {
            const test_settings = await this.test_settingsRepository.findByPk(id);
            if (!test_settings) {
                throw new common_1.BadRequestException('Test_settings not found');
            }
            const update = await this.test_settingsRepository.update(test_settingsDto, {
                where: { id },
                returning: true,
            });
            return update[1][0];
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async delete(id) {
        try {
            const test_settings = await this.test_settingsRepository.findByPk(id);
            if (!test_settings) {
                throw new common_1.NotFoundException('Test_settings not found');
            }
            test_settings.destroy();
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
exports.Test_settingsService = Test_settingsService;
exports.Test_settingsService = Test_settingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(test_settings_models_1.Test_settings)),
    __metadata("design:paramtypes", [Object])
], Test_settingsService);
//# sourceMappingURL=test_settings.service.js.map