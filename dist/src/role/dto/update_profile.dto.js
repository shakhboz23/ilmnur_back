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
exports.UpdateProfileDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const role_models_1 = require("../../role/models/role.models");
class UpdateProfileDto {
}
exports.UpdateProfileDto = UpdateProfileDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://example.com',
        description: 'The image of the user',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'John Doe',
        description: 'full name of the user',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'John Doe',
        description: 'full name of the user',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "surname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['Maths', 'Biology'],
        description: 'Subjects of the user',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateProfileDto.prototype, "subjects", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [
            ['1', 'A'],
            ['2', 'B'],
            ['3', 'C'],
            ['4', 'D'],
            ['5', 'E'],
        ],
        description: 'Classes of the user',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateProfileDto.prototype, "class", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Samarkand',
        description: 'Region name of user',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "region", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Kattakhurgan',
        description: 'District name of user',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "district", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '25',
        description: 'School number of user',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateProfileDto.prototype, "school_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: role_models_1.GenderType.MALE,
        description: 'gender of the user',
        enum: role_models_1.GenderType,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(role_models_1.GenderType),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: false,
        description: 'get answered notification for the user',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateProfileDto.prototype, "get_answered", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'new task notification for the user',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateProfileDto.prototype, "new_task", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'chat messages notification for the user',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateProfileDto.prototype, "chat_messages", void 0);
//# sourceMappingURL=update_profile.dto.js.map