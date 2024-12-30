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
exports.ChatGroupService = void 0;
const common_1 = require("@nestjs/common");
const chat_group_models_1 = require("./models/chat_group.models");
const sequelize_1 = require("@nestjs/sequelize");
const jwt_1 = require("@nestjs/jwt");
const course_models_1 = require("../course/models/course.models");
const chat_model_1 = require("../chat/models/chat.model");
let ChatGroupService = class ChatGroupService {
    constructor(chatGroupRepository, jwtService) {
        this.chatGroupRepository = chatGroupRepository;
        this.jwtService = jwtService;
    }
    async create(chatGroupDto) {
        try {
            const { title, group_id, chat_type } = chatGroupDto;
            const exist = await this.chatGroupRepository.findOne({
                where: { title, chat_type, group_id },
            });
            if (exist) {
                throw new common_1.BadRequestException('Already created');
            }
            const data = await this.chatGroupRepository.create(chatGroupDto);
            return data;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getAll() {
        try {
            const chatGroup = await this.chatGroupRepository.findAll({});
            return {
                statusCode: common_1.HttpStatus.OK,
                data: chatGroup,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getByGroupId(group_id) {
        try {
            const chatGroup = await this.chatGroupRepository.findOne({
                where: { group_id },
            });
            if (!chatGroup) {
                throw new common_1.NotFoundException('Group chat not found');
            }
            return chatGroup;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getMessages(id) {
        try {
            const chatGroup = await this.chatGroupRepository.findOne({
                where: { id },
                include: [{ model: chat_model_1.Chat },]
            });
            if (!chatGroup) {
                throw new common_1.NotFoundException('Group chat not found');
            }
            return chatGroup;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getById(group_id) {
        try {
            const chatGroup = await this.chatGroupRepository.findAll({
                where: { group_id },
                include: [
                    { model: course_models_1.Course }, {
                        model: chat_model_1.Chat,
                        limit: 1,
                        required: false,
                        order: [['createdAt', 'DESC']],
                    },
                ],
            });
            if (!chatGroup) {
                throw new common_1.NotFoundException('Chat group not found');
            }
            return chatGroup;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async pagination(page) {
        try {
            const offset = (page - 1) * 10;
            const limit = 10;
            const chatGroup = await this.chatGroupRepository.findAll({ offset, limit });
            const total_count = await this.chatGroupRepository.count();
            const total_pages = Math.ceil(total_count / 10);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                data: {
                    records: chatGroup,
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
    async update(id, chatGroupDto) {
        try {
            const chatGroup = await this.chatGroupRepository.findByPk(id);
            if (!chatGroup) {
                throw new common_1.NotFoundException('Class not found');
            }
            const update = await this.chatGroupRepository.update(chatGroupDto, {
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
            const chatGroup = await this.chatGroupRepository.findByPk(id);
            if (!chatGroup) {
                throw new common_1.NotFoundException('Class not found');
            }
            chatGroup.destroy();
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
exports.ChatGroupService = ChatGroupService;
exports.ChatGroupService = ChatGroupService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(chat_group_models_1.ChatGroup)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], ChatGroupService);
//# sourceMappingURL=chat_group.service.js.map