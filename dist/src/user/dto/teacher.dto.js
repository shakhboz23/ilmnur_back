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
exports.TeacherDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class TeacherDto {
}
exports.TeacherDto = TeacherDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'John Smith',
        description: 'Full name of user',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TeacherDto.prototype, "full_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '+998901234567',
        description: 'Phone number of user',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TeacherDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['student'],
        description: 'Role of the user',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], TeacherDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['Maths', 'Biology'],
        description: 'Subjects of the user',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], TeacherDto.prototype, "subjects", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [["1", "A"], ["2", "B"], ["3", "C"], ["4", "D"], ["5", "E"]],
        description: 'Classes of the user',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], TeacherDto.prototype, "class", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Samarkand',
        description: 'Region name of user',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TeacherDto.prototype, "region", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Kattakhurgan',
        description: 'District name of user',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TeacherDto.prototype, "district", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '25',
        description: 'School number of user',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TeacherDto.prototype, "school_number", void 0);
//# sourceMappingURL=teacher.dto.js.map