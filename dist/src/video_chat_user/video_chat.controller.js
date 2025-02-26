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
exports.VideoChatController = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../guard/auth.guard");
const video_chat_dto_1 = require("./dto/video_chat.dto");
const video_chat_service_1 = require("./video_chat.service");
const user_service_1 = require("../user/user.service");
const role_service_1 = require("../role/role.service");
let VideoChatController = class VideoChatController {
    constructor(videoChatService, roleService, userService) {
        this.videoChatService = videoChatService;
        this.roleService = roleService;
        this.userService = userService;
    }
    async handleConnection(client) {
        try {
            this.server.on('connection', async (socket) => {
                const id = +socket.handshake.query.id;
                console.log(id, 'connection');
                const user = await this.userService.getById(id);
                console.log(user);
                if (user) {
                    const data = await this.roleService.userAvailable(id, true, user.data.current_role);
                    this.server.emit('connected', data);
                }
            });
        }
        catch (_) { }
    }
    async handleDisconnect(client) {
        try {
            const id = +client.handshake.query.id;
            console.log(id, 'id================================');
            const user = await this.userService.getById(id);
            const data = await this.roleService.userAvailable(id, false, user.data.current_role);
            console.log(id, new Date(), '👎🛵👎👎disconnected');
            this.server.emit('disconnected', data);
        }
        catch (_) { }
    }
    getById(room) {
        return this.videoChatService.joinRoom(room);
    }
    create(VideoChatDto, client, req) {
        const chat = this.videoChatService.create(VideoChatDto, req.headers);
        client.emit('getAll/created');
        return chat;
    }
    async created({ page }) {
        const chats = await this.videoChatService.findAll(page);
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
        const chats = await this.videoChatService.getGroupChats(chatgroup_id, page);
        client.emit('chats', chats);
    }
    async findById(id, client) {
        const chat = await this.videoChatService.findById(id);
        client.emit('getById', chat);
    }
    async handleJoinRoom({ roomId, userId }, client) {
        console.log(roomId, userId);
        client.join(roomId);
        client.broadcast.to(roomId).emit('user-connected', userId);
    }
    update(id, VideoChatDto, client) {
        const chat = this.videoChatService.update(id, VideoChatDto);
        client.emit('created');
        return chat;
    }
    async deleteUser(id, client) {
        const chat = await this.videoChatService.delete(id);
        client.emit('created');
        return chat;
    }
};
exports.VideoChatController = VideoChatController;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], VideoChatController.prototype, "server", void 0);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Join to video chat' }),
    (0, common_1.Get)('/join/:room'),
    __param(0, (0, common_1.Param)('room')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VideoChatController.prototype, "getById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new chat' }),
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [video_chat_dto_1.VideoChatDto,
        socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], VideoChatController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all chats' }),
    (0, websockets_1.SubscribeMessage)('getAll/created'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VideoChatController.prototype, "created", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all chats' }),
    (0, websockets_1.SubscribeMessage)('getAll/join-room'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], VideoChatController.prototype, "handleMessage", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all chats' }),
    (0, websockets_1.SubscribeMessage)('getAll/message'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], VideoChatController.prototype, "sendMessage", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all chats' }),
    (0, websockets_1.SubscribeMessage)('getAll/chats'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], VideoChatController.prototype, "getGroupChats", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get chat by ID' }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, websockets_1.SubscribeMessage)('getById/chats'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], VideoChatController.prototype, "findById", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('join-room'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], VideoChatController.prototype, "handleJoinRoom", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update lesson profile by ID' }),
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, video_chat_dto_1.VideoChatDto,
        socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], VideoChatController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete user by ID' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], VideoChatController.prototype, "deleteUser", null);
exports.VideoChatController = VideoChatController = __decorate([
    (0, swagger_1.ApiTags)('VideoChat'),
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*', credentials: true } }),
    (0, common_1.Controller)('videochat'),
    __metadata("design:paramtypes", [video_chat_service_1.VideoChatService,
        role_service_1.RoleService,
        user_service_1.UserService])
], VideoChatController);
//# sourceMappingURL=video_chat.controller.js.map