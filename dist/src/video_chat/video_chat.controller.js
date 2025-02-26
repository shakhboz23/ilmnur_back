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
const video_chat_dto_1 = require("./dto/video_chat.dto");
const video_chat_service_1 = require("./video_chat.service");
const user_service_1 = require("../user/user.service");
const role_service_1 = require("../role/role.service");
let VideoChatController = class VideoChatController {
    constructor(videoChatService, roleService, userService) {
        this.videoChatService = videoChatService;
        this.roleService = roleService;
        this.userService = userService;
        this.users = {};
    }
    afterInit(server) {
        console.log('WebSocket Gateway Initialized');
    }
    handleConnection(socket) {
        console.log('User connected:', socket.id);
        socket.on('join-room', (roomId, userId) => {
            socket.join(roomId);
            socket.to(roomId).emit('user-connected', userId);
            socket.on('disconnect', () => {
                socket.to(roomId).emit('user-disconnected', userId);
            });
        });
    }
    handleDisconnect(socket) {
        console.log('User disconnected:', socket.id);
        for (let room in this.users) {
            this.users[room] = this.users[room].filter(id => id !== socket.id);
            if (this.users[room].length === 0) {
                delete this.users[room];
            }
        }
    }
    handleJoinRoom(roomId, client) {
        client.join(roomId);
        if (!this.users[roomId]) {
            this.users[roomId] = [];
        }
        this.users[roomId].push(client.id);
        console.log(`User ${client.id} joined room ${roomId}`);
        client.broadcast.to(roomId).emit('user-connected', client.id);
    }
    handleJoinPeer(data, client) {
        client.broadcast.to(data.roomId).emit('user-connected', data.peerId);
    }
    handleDisconnectPeer(roomId, client) {
        this.users[roomId] = this.users[roomId].filter(id => id !== client.id);
        if (this.users[roomId].length === 0) {
            delete this.users[roomId];
        }
        client.broadcast.to(roomId).emit('user-disconnected', client.id);
    }
    getById(room) {
        return this.videoChatService.joinRoom(room);
    }
    create(VideoChatDto, client, req) {
        const chat = this.videoChatService.create(VideoChatDto, req.headers);
        return chat;
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
    (0, websockets_1.SubscribeMessage)('join-room'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], VideoChatController.prototype, "handleJoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('join-peer'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], VideoChatController.prototype, "handleJoinPeer", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('disconnect-peer'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], VideoChatController.prototype, "handleDisconnectPeer", null);
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