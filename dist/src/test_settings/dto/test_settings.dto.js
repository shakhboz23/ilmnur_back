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
exports.Test_settingsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class Test_settingsDto {
}
exports.Test_settingsDto = Test_settingsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Atomlar haqida',
        description: 'Test_settings Title',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], Test_settingsDto.prototype, "start_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'You learn about Web development',
        description: 'Test_settings description',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], Test_settingsDto.prototype, "end_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 3,
        description: 'Test sort level',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], Test_settingsDto.prototype, "sort_level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Test id',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], Test_settingsDto.prototype, "lesson_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Test id',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], Test_settingsDto.prototype, "period", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Test mix',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], Test_settingsDto.prototype, "mix", void 0);
//# sourceMappingURL=test_settings.dto.js.map