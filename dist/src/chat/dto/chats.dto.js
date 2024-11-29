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
exports.ChatsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ChatsDto {
}
exports.ChatsDto = ChatsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'A1',
        description: 'Name of the chat',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChatsDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '8-class',
        description: 'Description of the chat',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChatsDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Monday, Wednesday, Friday',
        description: 'Weeks of the chat',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChatsDto.prototype, "weeks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '1',
        description: 'Subject id of the chat',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ChatsDto.prototype, "subject_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '11/10/2023',
        description: 'Start date of the chat',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], ChatsDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '09:00',
        description: 'Start time of the chat',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChatsDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'abdds-sdsdsd46sdsd-s54s5ds',
        description: 'Teacher id of the chat',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChatsDto.prototype, "teacher_id", void 0);
//# sourceMappingURL=chats.dto.js.map