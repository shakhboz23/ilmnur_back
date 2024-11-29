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
exports.UserStepService = void 0;
const common_1 = require("@nestjs/common");
const class_models_1 = require("./models/class.models");
const sequelize_1 = require("@nestjs/sequelize");
const jwt_1 = require("@nestjs/jwt");
const role_models_1 = require("../role/models/role.models");
const lesson_models_1 = require("../lesson/models/lesson.models");
let UserStepService = class UserStepService {
    constructor(classRepository, jwtService) {
        this.classRepository = classRepository;
        this.jwtService = jwtService;
    }
    async create(UserStepDto) {
        try {
            const { lesson_id, role_id } = UserStepDto;
            const exist = await this.classRepository.findOne({
                where: { role_id },
            });
            if (exist) {
                return {
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    message: 'Already created',
                };
            }
            const id = await this.classRepository.create(UserStepDto);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Created successfully',
                data: id,
            };
        }
        catch (error) {
            return error.message;
        }
    }
    async getAll() {
        try {
            const classs = await this.classRepository.findAll({
                order: [],
                include: [{ model: role_models_1.Role }],
            });
            return {
                statusCode: common_1.HttpStatus.OK,
                data: classs,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getById(id) {
        try {
            const classs = await this.classRepository.findByPk(id, {
                include: [{ model: lesson_models_1.Lesson }],
            });
            return {
                statusCode: common_1.HttpStatus.OK,
                data: classs,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getByClass(subject_id, class_number, role_id) {
        try {
            const user_step = await this.classRepository.findAll({
                include: {
                    model: lesson_models_1.Lesson,
                    where: {
                        class: class_number,
                        subject_id,
                    },
                    attributes: [],
                },
                order: [['lesson_id', 'ASC']],
            });
            return {
                statusCode: common_1.HttpStatus.OK,
                data: user_step,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async pagination(page) {
        try {
            const offset = (page - 1) * 10;
            const limit = 10;
            const classs = await this.classRepository.findAll({ offset, limit });
            const total_count = await this.classRepository.count();
            const total_pages = Math.ceil(total_count / 10);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                data: {
                    records: classs,
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
    async update(id, UserStepDto) {
        try {
            const classes = await this.classRepository.findByPk(id);
            if (!classes) {
                throw new common_1.NotFoundException('Class not found');
            }
            const update = await this.classRepository.update(UserStepDto, {
                where: { id },
                returning: true,
            });
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Updated successfully',
                data: {
                    class: update[1][0],
                },
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async delete(id) {
        try {
            const classes = await this.classRepository.findByPk(id);
            if (!classes) {
                throw new common_1.NotFoundException('Class not found');
            }
            classes.destroy();
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
exports.UserStepService = UserStepService;
exports.UserStepService = UserStepService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(class_models_1.UserStep)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], UserStepService);
//# sourceMappingURL=class.service.js.map