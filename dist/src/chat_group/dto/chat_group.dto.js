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
exports.ChatGroupDto = exports.ChatGroupType = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var ChatGroupType;
(function (ChatGroupType) {
    ChatGroupType["private"] = "private";
    ChatGroupType["group"] = "group";
    ChatGroupType["channel"] = "channel";
})(ChatGroupType || (exports.ChatGroupType = ChatGroupType = {}));
class ChatGroupDto {
}
exports.ChatGroupDto = ChatGroupDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'chat group title',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChatGroupDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'A',
        description: 'chat group type',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(ChatGroupType),
    __metadata("design:type", String)
], ChatGroupDto.prototype, "chat_type", void 0);
//# sourceMappingURL=chat_group.dto.js.map