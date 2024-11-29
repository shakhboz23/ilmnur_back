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
exports.ReytingController = void 0;
const common_1 = require("@nestjs/common");
const reyting_service_1 = require("./reyting.service");
const swagger_1 = require("@nestjs/swagger");
const reyting_dto_1 = require("./dto/reyting.dto");
const token_1 = require("../utils/token");
const jwt_1 = require("@nestjs/jwt");
let ReytingController = class ReytingController {
    constructor(reytingService, jwtService) {
        this.reytingService = reytingService;
        this.jwtService = jwtService;
    }
    async create(reytingDto, headers) {
        const user_id = (0, token_1.extractUserIdFromToken)(headers, this.jwtService, true);
        return this.reytingService.create(reytingDto, user_id);
    }
    getAll(subject_id, group_id, headers) {
        const user_id = (0, token_1.extractUserIdFromToken)(headers, this.jwtService, true);
        return this.reytingService.getAll(subject_id, group_id, user_id);
    }
    pagination(page, limit) {
        return this.reytingService.pagination(page, limit);
    }
    delete(id) {
        return this.reytingService.delete(id);
    }
};
exports.ReytingController = ReytingController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Registration a new reyting' }),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reyting_dto_1.ReytingDto, Object]),
    __metadata("design:returntype", Promise)
], ReytingController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all reytings' }),
    (0, common_1.Get)('/getall/:subject_id/:group_id'),
    __param(0, (0, common_1.Param)('subject_id')),
    __param(1, (0, common_1.Param)('group_id')),
    __param(2, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", void 0)
], ReytingController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get reytings with pagination' }),
    (0, common_1.Get)('pagination/:page/:limit'),
    __param(0, (0, common_1.Param)('page')),
    __param(1, (0, common_1.Param)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ReytingController.prototype, "pagination", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete reyting by ID' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReytingController.prototype, "delete", null);
exports.ReytingController = ReytingController = __decorate([
    (0, swagger_1.ApiTags)('Reyting'),
    (0, common_1.Controller)('reyting'),
    __metadata("design:paramtypes", [reyting_service_1.ReytingService,
        jwt_1.JwtService])
], ReytingController);
//# sourceMappingURL=reyting.controller.js.map