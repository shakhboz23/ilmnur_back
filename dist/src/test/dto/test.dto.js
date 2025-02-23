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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestsDto = exports.QuestionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const test_settings_dto_1 = require("../../test_settings/dto/test_settings.dto");
const test_models_1 = require("../models/test.models");
class QuestionDto {
}
exports.QuestionDto = QuestionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'id of the test',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], QuestionDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Quyidagi izotopda nechta proton, elektron va neytron bor? 18^F-',
        description: 'The question text',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuestionDto.prototype, "question", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [
            '5 proton, 4 elektron, 2 neytron',
            '4 proton, 8 elektron, 1 neytron',
            '6 proton, 1 elektron, 8 neytron'
        ],
        description: 'Answer options for the question',
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNotEmpty)({ each: true }),
    __metadata("design:type", Array)
], QuestionDto.prototype, "variants", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [1],
        description: 'True answer',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], QuestionDto.prototype, "true_answer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Test type',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(test_models_1.TestType),
    __metadata("design:type", String)
], QuestionDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Test type',
        default: test_models_1.ActionType.new,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(test_models_1.ActionType),
    (0, class_transformer_1.Transform)(({ value }) => (value === undefined ? test_models_1.ActionType.new : value)),
    __metadata("design:type", String)
], QuestionDto.prototype, "is_action", void 0);
class TestsDto extends test_settings_dto_1.Test_settingsDto {
}
exports.TestsDto = TestsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Test id of the tests',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TestsDto.prototype, "lesson_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [QuestionDto],
        description: 'Array of test questions',
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => QuestionDto),
    __metadata("design:type", Array)
], TestsDto.prototype, "test", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Test id of the tests',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], TestsDto.prototype, "files", void 0);
//# sourceMappingURL=test.dto.js.map