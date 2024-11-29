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
exports.ResetpasswordController = void 0;
const jwt_1 = require("@nestjs/jwt");
const common_1 = require("@nestjs/common");
const resetpassword_service_1 = require("./resetpassword.service");
const swagger_1 = require("@nestjs/swagger");
const resetpassword_dto_1 = require("./dto/resetpassword.dto");
let ResetpasswordController = class ResetpasswordController {
    constructor(resetpasswordService, jwtService) {
        this.resetpasswordService = resetpasswordService;
        this.jwtService = jwtService;
    }
    create(resetpasswordDto) {
        return this.resetpasswordService.create(resetpasswordDto);
    }
    getById(id) {
        return this.resetpasswordService.getById(id);
    }
    getAll() {
        return this.resetpasswordService.getAll();
    }
    deleteResetpassword(id) {
        return this.resetpasswordService.delete(id);
    }
};
exports.ResetpasswordController = ResetpasswordController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create an activate link' }),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resetpassword_dto_1.ResetpasswordDto]),
    __metadata("design:returntype", void 0)
], ResetpasswordController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get resetpassword by ID' }),
    (0, common_1.Get)('/getById/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ResetpasswordController.prototype, "getById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all resetpasswords' }),
    (0, common_1.Get)('/getAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ResetpasswordController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete resetpassword' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ResetpasswordController.prototype, "deleteResetpassword", null);
exports.ResetpasswordController = ResetpasswordController = __decorate([
    (0, swagger_1.ApiTags)('Resetpassword'),
    (0, common_1.Controller)('resetpassword'),
    __metadata("design:paramtypes", [resetpassword_service_1.ResetpasswordService,
        jwt_1.JwtService])
], ResetpasswordController);
//# sourceMappingURL=resetpassword.controller.js.map