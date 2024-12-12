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
exports.Bot = void 0;
const swagger_1 = require("@nestjs/swagger");
const sequelize_typescript_1 = require("sequelize-typescript");
const user_models_1 = require("../../user/models/user.models");
let Bot = class Bot extends sequelize_typescript_1.Model {
};
exports.Bot = Bot;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_models_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], Bot.prototype, "user_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_models_1.User),
    __metadata("design:type", Array)
], Bot.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 123456789, description: 'user_id' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BIGINT, primaryKey: true, allowNull: false }),
    __metadata("design:type", Number)
], Bot.prototype, "bot_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "johndoe", description: 'username' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Bot.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "John", description: 'first name' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Bot.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Doe", description: 'last name' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Bot.prototype, "surname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "+998901234567", description: 'phone number' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Bot.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "user active", description: 'status' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, defaultValue: false }),
    __metadata("design:type", Boolean)
], Bot.prototype, "status", void 0);
exports.Bot = Bot = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'bot' })
], Bot);
//# sourceMappingURL=bot.model.js.map