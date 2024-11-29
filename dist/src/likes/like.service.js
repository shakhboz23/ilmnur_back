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
exports.LikeService = void 0;
const common_1 = require("@nestjs/common");
const like_models_1 = require("./models/like.models");
const sequelize_1 = require("@nestjs/sequelize");
const user_service_1 = require("../user/user.service");
const course_models_1 = require("../course/models/course.models");
const uploaded_service_1 = require("../uploaded/uploaded.service");
let LikeService = class LikeService {
    constructor(likeRepository, userService, uploadedService) {
        this.likeRepository = likeRepository;
        this.userService = userService;
        this.uploadedService = uploadedService;
    }
    async create(likeDto) {
        try {
            const { user_id, course_id } = likeDto;
            const exist = await this.likeRepository.findOne({
                where: { user_id, course_id },
            });
            if (exist) {
                throw new common_1.BadRequestException('Already created');
            }
            return this.likeRepository.create(likeDto);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getAll() {
        try {
            const likes = await this.likeRepository.findAll({
                order: [['id', 'ASC']],
            });
            if (!likes.length) {
                throw new common_1.NotFoundException('Likes not found');
            }
            return likes;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getById(id) {
        try {
            const like = await this.likeRepository.findOne({
                where: { id },
                include: [{ model: course_models_1.Course }],
            });
            if (!like) {
                throw new common_1.NotFoundException('Like not found');
            }
            return like;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async pagination(page) {
        try {
            const offset = (page - 1) * 10;
            const limit = 10;
            const likes = await this.likeRepository.findAll({ offset, limit });
            const total_count = await this.likeRepository.count();
            const total_pages = Math.ceil(total_count / 10);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                data: {
                    records: likes,
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
    async update(id, likeDto) {
        try {
            const like = await this.likeRepository.findByPk(id);
            if (!like) {
                throw new common_1.NotFoundException('Like not found');
            }
            const update = await this.likeRepository.update(likeDto, {
                where: { id },
                returning: true,
            });
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Updated successfully',
                data: {
                    like: update[1][0],
                },
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async delete(id) {
        try {
            const like = await this.likeRepository.findByPk(id);
            if (!like) {
                throw new common_1.NotFoundException('Like not found');
            }
            like.destroy();
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
exports.LikeService = LikeService;
exports.LikeService = LikeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(like_models_1.Like)),
    __metadata("design:paramtypes", [Object, user_service_1.UserService,
        uploaded_service_1.UploadedService])
], LikeService);
//# sourceMappingURL=like.service.js.map