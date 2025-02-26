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
exports.VideoChatService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const video_chat_model_1 = require("./models/video_chat.model");
const files_service_1 = require("../files/files.service");
const user_models_1 = require("../user/models/user.models");
let VideoChatService = class VideoChatService {
    constructor(VideoChatRepository, fileService) {
        this.VideoChatRepository = VideoChatRepository;
        this.fileService = fileService;
    }
    async create(videoChatDto, headers) {
        try {
            console.log(videoChatDto.room, '++++++++++++++++');
            const userAgent = headers['user-agent'];
            let result;
            let filePath;
            const chat = await this.VideoChatRepository.create({ ...videoChatDto });
            return { status: common_1.HttpStatus.OK, data: chat };
        }
        catch (error) {
            return { status: common_1.HttpStatus.BAD_REQUEST, error: error.message };
        }
    }
    async joinRoom(room) {
        console.log(room);
        try {
            const chats = await this.VideoChatRepository.findOne({
                where: { room },
            });
            if (!chats) {
                new common_1.NotFoundException('Not found');
            }
            return chats.room;
        }
        catch (error) {
            return { status: common_1.HttpStatus.NOT_FOUND, error: error.message };
        }
    }
    async findAll(page) {
        const limit = 10;
        const offset = (page - 1) * limit;
        console.log(offset);
        try {
            const chats = await this.VideoChatRepository.findAll({
                order: [['updatedAt', 'DESC']],
                include: [
                    {
                        model: user_models_1.User,
                    },
                ],
                offset,
                limit,
            });
            const total_count = await this.VideoChatRepository.count();
            const total_pages = Math.ceil(total_count / limit);
            const res = {
                status: common_1.HttpStatus.OK,
                data: {
                    records: chats.reverse(),
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
    async getGroupChats(chatgroup_id, page) {
        const limit = 10;
        const offset = (page - 1) * limit;
        console.log(offset);
        try {
            const chats = await this.VideoChatRepository.findAll({
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
            const total_count = await this.VideoChatRepository.count();
            const total_pages = Math.ceil(total_count / limit);
            const res = {
                status: common_1.HttpStatus.OK,
                data: {
                    records: chats.reverse(),
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
            const chatId = await this.VideoChatRepository.findAll({
                attributes: ['id'],
            });
            return chatId;
        }
        catch (error) {
            return { status: common_1.HttpStatus.BAD_REQUEST, error: error.message };
        }
    }
    async findById(id) {
        try {
            const chats = await this.VideoChatRepository.findOne({
                where: { id },
            });
            if (!chats) {
                return { status: common_1.HttpStatus.NOT_FOUND, error: 'Not found' };
            }
            return { status: common_1.HttpStatus.OK, data: chats };
        }
        catch (error) {
            return { status: common_1.HttpStatus.NOT_FOUND, error: error.message };
        }
    }
    async update(id, videoChatDto) {
        try {
            const chat = await this.findById(id);
            if (chat.status === 400) {
                return { status: common_1.HttpStatus.NOT_FOUND, error: 'Not found' };
            }
            const updated_info = await this.VideoChatRepository.update(videoChatDto, {
                where: { id: chat.data.id },
                returning: true,
            });
            return {
                status: common_1.HttpStatus.OK,
                data: updated_info[1][0],
            };
        }
        catch (error) {
            return { status: common_1.HttpStatus.NOT_FOUND, error: error.message };
        }
    }
    async delete(id) {
        try {
            const chat = await this.findById(id);
            if (chat.status === 400) {
                return { status: common_1.HttpStatus.NOT_FOUND, error: 'Not found' };
            }
            await chat.data.destroy();
            return { status: common_1.HttpStatus.OK, data: 'deleted' };
        }
        catch (error) {
            return { status: common_1.HttpStatus.NOT_FOUND, error: error.message };
        }
    }
};
exports.VideoChatService = VideoChatService;
exports.VideoChatService = VideoChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(video_chat_model_1.VideoChat)),
    __metadata("design:paramtypes", [Object, files_service_1.FilesService])
], VideoChatService);
//# sourceMappingURL=video_chat.service.js.map