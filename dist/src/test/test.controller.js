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
exports.TestsController = void 0;
const common_1 = require("@nestjs/common");
const test_service_1 = require("./test.service");
const swagger_1 = require("@nestjs/swagger");
const test_dto_1 = require("./dto/test.dto");
const check_dto_1 = require("./dto/check.dto");
const token_1 = require("../utils/token");
const jwt_1 = require("@nestjs/jwt");
const platform_express_1 = require("@nestjs/platform-express");
const image_validation_pipe_1 = require("../pipes/image-validation.pipe");
let TestsController = class TestsController {
    constructor(testsService, jwtService) {
        this.testsService = testsService;
        this.jwtService = jwtService;
    }
    create(testsDto, headers) {
        const user_id = (0, token_1.extractUserIdFromToken)(headers, this.jwtService, true);
        return this.testsService.create(testsDto, user_id);
    }
    getTests() {
        return this.testsService.getTests();
    }
    getAll(class_number) {
        return this.testsService.getAll(class_number);
    }
    checkById(id, { answer }) {
        return this.testsService.checkById(id, answer);
    }
    checkAllAnswers(lesson_id, answers, headers) {
        const user_id = (0, token_1.extractUserIdFromToken)(headers, this.jwtService, true);
        return this.testsService.checkAnswers(user_id, lesson_id, answers);
    }
    getById(id, headers) {
        const user_id = (0, token_1.extractUserIdFromToken)(headers, this.jwtService, true);
        return this.testsService.getById(id, user_id);
    }
    pagination(page) {
        return this.testsService.pagination(page);
    }
    create_url(file) {
        console.log('object');
        return this.testsService.create_url(file);
    }
    update(id, questionDto) {
        return this.testsService.update(id, questionDto);
    }
    deleteTests(id) {
        return this.testsService.delete(id);
    }
};
exports.TestsController = TestsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new tests' }),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [test_dto_1.TestsDto, Object]),
    __metadata("design:returntype", void 0)
], TestsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all testss' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TestsController.prototype, "getTests", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all testss' }),
    (0, common_1.Get)('/class/:class_number'),
    __param(0, (0, common_1.Param)('class_number')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TestsController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'checkById all tests' }),
    (0, common_1.Post)('/check/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], TestsController.prototype, "checkById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'checkById all tests' }),
    (0, common_1.Post)('/check_answers/:lesson_id'),
    __param(0, (0, common_1.Param)('lesson_id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, check_dto_1.CheckDto, Object]),
    __metadata("design:returntype", void 0)
], TestsController.prototype, "checkAllAnswers", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get tests by ID' }),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], TestsController.prototype, "getById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get testss with pagination' }),
    (0, common_1.Get)('pagination/:page'),
    __param(0, (0, common_1.Param)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TestsController.prototype, "pagination", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a url' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, common_1.Post)('/create_url'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)(new image_validation_pipe_1.ImageValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TestsController.prototype, "create_url", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update tests profile by ID' }),
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, test_dto_1.QuestionDto]),
    __metadata("design:returntype", void 0)
], TestsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete tests' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TestsController.prototype, "deleteTests", null);
exports.TestsController = TestsController = __decorate([
    (0, swagger_1.ApiTags)('Tests'),
    (0, common_1.Controller)('tests'),
    __metadata("design:paramtypes", [test_service_1.TestsService,
        jwt_1.JwtService])
], TestsController);
//# sourceMappingURL=test.controller.js.map