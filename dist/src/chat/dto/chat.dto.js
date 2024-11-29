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
exports.ChatDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ChatDto {
}
exports.ChatDto = ChatDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://example.com',
        description: 'Image url',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ChatDto.prototype, "file", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            name: "File name",
            type: "word",
            size: "1234",
        },
        description: 'file info',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], ChatDto.prototype, "file_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Icon id',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ChatDto.prototype, "icon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Assalamu alaikum',
        description: 'User message',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ChatDto.prototype, "text", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'User_id',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], ChatDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'chatgroup_id',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], ChatDto.prototype, "chatgroup_id", void 0);
//# sourceMappingURL=chat.dto.js.map