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
exports.ReytingService = void 0;
const common_1 = require("@nestjs/common");
const reyting_models_1 = require("./models/reyting.models");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_2 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const user_models_1 = require("../user/models/user.models");
let ReytingService = class ReytingService {
    constructor(reytingRepository) {
        this.reytingRepository = reytingRepository;
    }
    async create(reytingDto, user_id) {
        try {
            const is_reyting = await this.reytingRepository.findOne({
                where: {
                    user_id,
                    lesson_id: reytingDto.lesson_id,
                },
            });
            console.log(!is_reyting);
            if (!is_reyting) {
                console.log(is_reyting);
                const reyting = await this.reytingRepository.create({
                    ...reytingDto,
                    user_id,
                });
                console.log(reyting);
                return {
                    statusCode: common_1.HttpStatus.OK,
                    message: 'Successfully added!',
                    data: reyting,
                };
            }
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Already added!',
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getAll(subject_id, group_id, user_id) {
        try {
            const filter = [];
            if (subject_id != 0) {
                filter.push(sequelize_typescript_1.Sequelize.literal(`
            "test_id" IN (
              SELECT "id" FROM "tests"
              WHERE "id" = "Reyting"."test_id"
              AND "lesson_id" IN (
                SELECT "id" FROM "lesson"
                WHERE "id" = "tests"."lesson_id"
                AND "subject_id" = ${subject_id}
              )
            )
          `));
            }
            const reytings = await this.reytingRepository.findAll({
                where: {
                    [sequelize_2.Op.and]: [
                        ...filter,
                        {
                            id: {
                                [sequelize_2.Op.in]: sequelize_typescript_1.Sequelize.literal(`(
                  SELECT "Reyting"."id"
                  FROM "group" 
                  INNER JOIN "course" ON "course"."group_id" = :group_id 
                  INNER JOIN "lesson" ON "lesson"."course_id" = "course"."id"
                  WHERE "lesson"."id" = "Reyting"."lesson_id"
                )`),
                            },
                        },
                    ],
                },
                order: [['ball', 'ASC']],
                replacements: { group_id },
                include: [{ model: user_models_1.User }],
            });
            return reytings;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async pagination(page, limit) {
        try {
            const offset = (page - 1) * limit;
            const reytings = await this.reytingRepository.findAll({ offset, limit });
            const total_count = await this.reytingRepository.count();
            const total_pages = Math.ceil(total_count / limit);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                data: {
                    records: reytings,
                    pagination: {
                        currentPage: Number(page),
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
    async delete(id) {
        try {
            const reyting = await this.reytingRepository.findByPk(id);
            if (!reyting) {
                throw new common_1.NotFoundException('Reyting not found');
            }
            reyting.destroy();
            return {
                statusCode: common_1.HttpStatus.ACCEPTED,
                message: 'Deleted successfully',
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.ReytingService = ReytingService;
exports.ReytingService = ReytingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(reyting_models_1.Reyting)),
    __metadata("design:paramtypes", [Object])
], ReytingService);
//# sourceMappingURL=reyting.service.js.map