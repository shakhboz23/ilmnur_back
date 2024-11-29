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
exports.LessonDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const lesson_models_1 = require("../models/lesson.models");
class LessonDto {
}
exports.LessonDto = LessonDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Title',
        description: 'Lesson title',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LessonDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Course id',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", Number)
], LessonDto.prototype, "course_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Course id',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], LessonDto.prototype, "lesson_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: false,
        description: 'Lesson type',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBooleanString)(),
    __metadata("design:type", Boolean)
], LessonDto.prototype, "published", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '<p>Content</p>',
        description: 'Video content',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LessonDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Title',
        description: 'Lesson title',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(lesson_models_1.lessonType),
    __metadata("design:type", String)
], LessonDto.prototype, "type", void 0);
//# sourceMappingURL=lesson.dto.js.map