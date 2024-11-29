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
exports.Test_settingsController = void 0;
const common_1 = require("@nestjs/common");
const test_settings_service_1 = require("./test_settings.service");
const swagger_1 = require("@nestjs/swagger");
const test_settings_dto_1 = require("./dto/test_settings.dto");
let Test_settingsController = class Test_settingsController {
    constructor(test_settingsService) {
        this.test_settingsService = test_settingsService;
    }
    create(test_settingsDto) {
        return this.test_settingsService.create(test_settingsDto);
    }
    getById(id, class_name) {
        return this.test_settingsService.getById(id);
    }
    getAll() {
        return this.test_settingsService.getAll();
    }
    pagination(page) {
        return this.test_settingsService.pagination(page);
    }
    update(id, test_settingsDto, authHeader) {
        const token = authHeader ? authHeader.split(' ')[1] : null;
        console.log(token, 'token2303');
        let user = null;
        const user_id = user === null || user === void 0 ? void 0 : user.id;
        console.log(user_id, 'user_id');
        return this.test_settingsService.update(id, test_settingsDto, user_id);
    }
    deleteTest_settings(id) {
        return this.test_settingsService.delete(id);
    }
};
exports.Test_settingsController = Test_settingsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new test_settings' }),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [test_settings_dto_1.Test_settingsDto]),
    __metadata("design:returntype", void 0)
], Test_settingsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get test_settings by ID' }),
    (0, common_1.Get)('/getById/:id/:class_name'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('class_name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], Test_settingsController.prototype, "getById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all test_settingss' }),
    (0, common_1.Get)('/getAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Test_settingsController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get test_settingss with pagination' }),
    (0, common_1.Get)('pagination/:page'),
    __param(0, (0, common_1.Param)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], Test_settingsController.prototype, "pagination", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update test_settings profile by ID' }),
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, test_settings_dto_1.Test_settingsDto, String]),
    __metadata("design:returntype", void 0)
], Test_settingsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete test_settings' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], Test_settingsController.prototype, "deleteTest_settings", null);
exports.Test_settingsController = Test_settingsController = __decorate([
    (0, swagger_1.ApiTags)('Test_settings'),
    (0, common_1.Controller)('test_settings'),
    __metadata("design:paramtypes", [test_settings_service_1.Test_settingsService])
], Test_settingsController);
//# sourceMappingURL=test_settings.controller.js.map