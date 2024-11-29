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
exports.NotificationController = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../guard/auth.guard");
const notification_dto_1 = require("./dto/notification.dto");
const notification_service_1 = require("./notification.service");
let NotificationController = class NotificationController {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    async handleConnection(client) {
        this.server.on('connection', async (socket) => {
        });
    }
    async handleDisconnect(client) {
    }
    create(notificationDto) {
        const notification = this.notificationService.create(notificationDto);
        this.server.emit('getAll/created');
        return notification;
    }
    async created({ page }) {
        const notifications = await this.notificationService.findAll(page);
        this.server.emit('notifications', notifications);
    }
    async findById(id, client) {
        const notification = await this.notificationService.findById(id);
        client.emit('getById', notification);
    }
    update(id, notificationDto, client) {
        const notification = this.notificationService.update(id, notificationDto);
        client.emit('created');
        return notification;
    }
    async deleteUser(id, client) {
        const notification = await this.notificationService.delete(id);
        client.emit('created');
        return notification;
    }
};
exports.NotificationController = NotificationController;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], NotificationController.prototype, "server", void 0);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new notification' }),
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notification_dto_1.NotificationDto]),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all notifications' }),
    (0, websockets_1.SubscribeMessage)('getAll/created'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "created", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get notification by ID' }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, websockets_1.SubscribeMessage)('getById/notifications'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "findById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update lesson profile by ID' }),
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, notification_dto_1.NotificationDto,
        socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete user by ID' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "deleteUser", null);
exports.NotificationController = NotificationController = __decorate([
    (0, swagger_1.ApiTags)('notification'),
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*', credentials: true } }),
    (0, common_1.Controller)('notification'),
    __metadata("design:paramtypes", [notification_service_1.NotificationService])
], NotificationController);
//# sourceMappingURL=notification.controller.js.map