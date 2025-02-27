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
exports.SearchChildDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class SearchChildDto {
}
exports.SearchChildDto = SearchChildDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'John Smith',
        description: 'Full name of user',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SearchChildDto.prototype, "parent_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'John Smith',
        description: 'Full name of user',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SearchChildDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '+998901234567',
        description: 'Phone number of user',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsPhoneNumber)(),
    __metadata("design:type", String)
], SearchChildDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [['1', 'A']],
        description: 'Classes of the user',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], SearchChildDto.prototype, "class", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Samarkand',
        description: 'Region name of user',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchChildDto.prototype, "region", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Kattakhurgan',
        description: 'District name of user',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchChildDto.prototype, "district", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '25',
        description: 'School number of user',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SearchChildDto.prototype, "school_number", void 0);
//# sourceMappingURL=searchChild.js.map