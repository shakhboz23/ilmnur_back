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
exports.NewsController = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../guard/auth.guard");
const news_dto_1 = require("./dto/news.dto");
const news_service_1 = require("./news.service");
const user_service_1 = require("../user/user.service");
const role_service_1 = require("../role/role.service");
let NewsController = class NewsController {
    constructor(newsService, roleService, userService) {
        this.newsService = newsService;
        this.roleService = roleService;
        this.userService = userService;
    }
    async handleConnection(client) {
        this.server.on('connection', async (socket) => {
            const id = +socket.handshake.query.id;
            const user = await this.userService.getById(id);
            if (user) {
                const data = await this.roleService.userAvailable(id, true, user.data.current_role);
                this.server.emit('connected', data);
            }
        });
    }
    async handleDisconnect(client) {
        const id = +client.handshake.query.id;
        console.log(id, 'id================================');
        const user = await this.userService.getById(id);
        const data = await this.roleService.userAvailable(id, false, user.data.current_role);
        console.log(id, new Date(), '👎🛵👎👎disconnected');
        this.server.emit('disconnected', data);
    }
    create(newsDto, req) {
        const news = this.newsService.create(newsDto);
        return news;
    }
    async getGroupNews({ newsgroup_id, page }, client) {
        const news = await this.newsService.getGroupNews(newsgroup_id, page);
        client.emit('news', news);
    }
    async findById(id, client) {
        const news = await this.newsService.findById(id);
        client.emit('getById', news);
    }
    async findAll() {
        const news = await this.newsService.findAll(1);
        return news;
    }
    async deleteUser(id, client) {
        const news = await this.newsService.delete(id);
        client.emit('created');
        return news;
    }
};
exports.NewsController = NewsController;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], NewsController.prototype, "server", void 0);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new news' }),
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [news_dto_1.NewsDto, Object]),
    __metadata("design:returntype", void 0)
], NewsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all news' }),
    (0, websockets_1.SubscribeMessage)('getAll/news'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "getGroupNews", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get news by ID' }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, websockets_1.SubscribeMessage)('getById/news'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "findById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update lesson profile by ID' }),
    (0, common_1.Get)('/findall'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete user by ID' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "deleteUser", null);
exports.NewsController = NewsController = __decorate([
    (0, swagger_1.ApiTags)('News'),
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*', credentials: true } }),
    (0, common_1.Controller)('news'),
    __metadata("design:paramtypes", [news_service_1.NewsService,
        role_service_1.RoleService,
        user_service_1.UserService])
], NewsController);
//# sourceMappingURL=news.controller.js.map