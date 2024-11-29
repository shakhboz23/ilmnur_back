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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const category_models_1 = require("./models/category.models");
const sequelize_1 = require("@nestjs/sequelize");
let CategoryService = class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async create(categoryDto) {
        try {
            const category = await this.categoryRepository.create(categoryDto);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Created successfully',
                data: category,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getAll() {
        try {
            const category = await this.categoryRepository.findAll({
                order: [['category', 'ASC']],
            });
            if (category.IsNotEmpty) {
                throw new common_1.NotFoundException('Category not found');
            }
            return category;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getById(id) {
        try {
            const category = await this.categoryRepository.findOne({
                where: { id },
            });
            if (category.IsNotEmpty) {
                throw new common_1.NotFoundException('Category not found');
            }
            return {
                statusCode: common_1.HttpStatus.OK,
                data: category,
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
            const category = await this.categoryRepository.findAll({ offset, limit });
            const total_count = await this.categoryRepository.count();
            const total_pages = Math.ceil(total_count / 10);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                data: {
                    records: category,
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
    async update(id, categoryDto) {
        try {
            const category = await this.categoryRepository.findByPk(id);
            if (category.IsNotEmpty) {
                throw new common_1.NotFoundException('Category not found');
            }
            const update = await this.categoryRepository.update(categoryDto, {
                where: { id },
                returning: true,
            });
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Updated successfully',
                data: {
                    category: update[1][0],
                },
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async delete(id) {
        try {
            const category = await this.categoryRepository.findByPk(id);
            if (!category) {
                throw new common_1.NotFoundException('Category not found');
            }
            category.destroy();
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
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(category_models_1.Category)),
    __metadata("design:paramtypes", [Object])
], CategoryService);
//# sourceMappingURL=category.service.js.map