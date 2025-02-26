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
exports.NewsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class NewsDto {
}
exports.NewsDto = NewsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'A1',
        description: 'Name of the news',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NewsDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '8-class',
        description: 'Description of the news',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NewsDto.prototype, "source", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Monday, Wednesday, Friday',
        description: 'Weeks of the news',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NewsDto.prototype, "description", void 0);
//# sourceMappingURL=news.dto.js.map