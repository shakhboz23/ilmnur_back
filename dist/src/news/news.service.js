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
exports.NewsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const news_model_1 = require("./models/news.model");
const user_models_1 = require("../user/models/user.models");
let NewsService = class NewsService {
    constructor(NewsRepository) {
        this.NewsRepository = NewsRepository;
    }
    async create(newsDto) {
        try {
            const news = await this.NewsRepository.create(Object.assign({}, newsDto));
            return { status: common_1.HttpStatus.OK, data: news };
        }
        catch (error) {
            return { status: common_1.HttpStatus.BAD_REQUEST, error: error.message };
        }
    }
    async findAll(page) {
        const limit = 10;
        const offset = (page - 1) * limit;
        console.log(offset);
        try {
            const news = await this.NewsRepository.findAll({
                order: [['createdAt', 'DESC']],
            });
            const res = {
                status: common_1.HttpStatus.OK,
                data: news,
            };
            return res;
        }
        catch (error) {
            console.log(error);
            return { status: common_1.HttpStatus.NOT_FOUND, error: error.message };
        }
    }
    async getGroupNews(newsgroup_id, page) {
        const limit = 10;
        const offset = (page - 1) * limit;
        console.log(offset);
        try {
            const news = await this.NewsRepository.findAll({
                where: {},
                order: [['updatedAt', 'DESC']],
                include: [
                    {
                        model: user_models_1.User,
                    },
                ],
                offset,
                limit,
            });
            const total_count = await this.NewsRepository.count();
            const total_pages = Math.ceil(total_count / limit);
            const res = {
                status: common_1.HttpStatus.OK,
                data: {
                    records: news.reverse(),
                    pagination: {
                        currentPage: page,
                        total_pages,
                        total_count,
                    },
                },
            };
            return res;
        }
        catch (error) {
            console.log(error);
            return { status: common_1.HttpStatus.NOT_FOUND, error: error.message };
        }
    }
    async findAllId() {
        try {
            const newsId = await this.NewsRepository.findAll({
                attributes: ['id'],
            });
            return newsId;
        }
        catch (error) {
            return { status: common_1.HttpStatus.BAD_REQUEST, error: error.message };
        }
    }
    async findById(id) {
        try {
            const news = await this.NewsRepository.findOne({
                where: { id },
            });
            if (!news) {
                return { status: common_1.HttpStatus.NOT_FOUND, error: 'Not found' };
            }
            return { status: common_1.HttpStatus.OK, data: news };
        }
        catch (error) {
            return { status: common_1.HttpStatus.NOT_FOUND, error: error.message };
        }
    }
    async delete(id) {
        try {
            const news = await this.findById(id);
            if (news.status === 400) {
                return { status: common_1.HttpStatus.NOT_FOUND, error: 'Not found' };
            }
            await news.data.destroy();
            return { status: common_1.HttpStatus.OK, data: 'deleted' };
        }
        catch (error) {
            return { status: common_1.HttpStatus.NOT_FOUND, error: error.message };
        }
    }
};
exports.NewsService = NewsService;
exports.NewsService = NewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(news_model_1.News)),
    __metadata("design:paramtypes", [Object])
], NewsService);
//# sourceMappingURL=news.service.js.map