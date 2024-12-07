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
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../guard/auth.guard");
const chat_dto_1 = require("./dto/chat.dto");
const chat_service_1 = require("./chat.service");
const platform_express_1 = require("@nestjs/platform-express");
const image_validation_pipe_1 = require("../pipes/image-validation.pipe");
const user_service_1 = require("../user/user.service");
const role_service_1 = require("../role/role.service");
let ChatController = class ChatController {
    constructor(chatService, roleService, userService) {
        this.chatService = chatService;
        this.roleService = roleService;
        this.userService = userService;
    }
    async handleConnection(client) {
        try {
            this.server.on('connection', async (socket) => {
                const id = +socket.handshake.query.id;
                console.log(id, 'connection');
            });
        }
        catch (_) { }
    }
    async handleDisconnect(client) {
        try {
            const id = +client.handshake.query.id;
            console.log(id, 'id================================');
        }
        catch (_) { }
    }
    create(chatDto, file, client, req) {
        const chat = this.chatService.create(chatDto, file, req.headers);
        client.emit('getAll/created');
        return chat;
    }
    async created({ page }) {
        const chats = await this.chatService.findAll(page);
        this.server.emit('chats', chats);
    }
    async handleMessage({ roomId, userId }, client) {
        console.log(roomId, userId);
        client.join(roomId);
        this.server.emit('user-connected', userId);
    }
    async sendMessage({ message }, client) {
        console.log(message);
        this.server.emit('createMessage', message);
    }
    async getGroupChats({ chatgroup_id, page }, client) {
        const chats = await this.chatService.getGroupChats(chatgroup_id, page);
        client.emit('chats', chats);
    }
    async findById(id, client) {
        const chat = await this.chatService.findById(id);
        client.emit('getById', chat);
    }
    async handleJoinRoom({ roomId, userId }, client) {
        console.log(roomId, userId);
        client.join(roomId);
        client.broadcast.to(roomId).emit('user-connected', userId);
    }
    update(id, chatDto, client) {
        const chat = this.chatService.update(id, chatDto);
        client.emit('created');
        return chat;
    }
    async deleteUser(id, client) {
        const chat = await this.chatService.delete(id);
        client.emit('created');
        return chat;
    }
};
exports.ChatController = ChatController;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatController.prototype, "server", void 0);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new chat' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                text: {
                    type: 'string',
                },
                icon: {
                    type: 'number',
                },
                user_id: {
                    type: 'number',
                },
                chatgroup_id: {
                    type: 'number',
                },
                file: {
                    type: 'string',
                    format: 'binary',
                },
                file_type: {
                    type: 'object',
                    properties: {
                        size: {
                            type: 'number',
                        },
                        type: {
                            type: 'string',
                        },
                        name: {
                            type: 'string',
                        },
                    },
                },
            },
        },
    }),
    (0, common_1.Post)(''),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)(new image_validation_pipe_1.ImageValidationPipe())),
    __param(2, (0, websockets_1.ConnectedSocket)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chat_dto_1.ChatDto, Object, socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all chats' }),
    (0, websockets_1.SubscribeMessage)('getAll/created'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "created", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all chats' }),
    (0, websockets_1.SubscribeMessage)('getAll/join-room'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "handleMessage", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all chats' }),
    (0, websockets_1.SubscribeMessage)('getAll/message'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "sendMessage", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all chats' }),
    (0, websockets_1.SubscribeMessage)('getAll/chats'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getGroupChats", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get chat by ID' }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, websockets_1.SubscribeMessage)('getById/chats'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "findById", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinchat-room'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "handleJoinRoom", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update lesson profile by ID' }),
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, chat_dto_1.ChatDto,
        socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete user by ID' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "deleteUser", null);
exports.ChatController = ChatController = __decorate([
    (0, swagger_1.ApiTags)('chat'),
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*', credentials: true } }),
    (0, common_1.Controller)('chat'),
    __metadata("design:paramtypes", [chat_service_1.ChatService,
        role_service_1.RoleService,
        user_service_1.UserService])
], ChatController);
//# sourceMappingURL=chat.controller.js.map