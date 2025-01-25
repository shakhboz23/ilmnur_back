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
exports.ChatGroup = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const chat_group_dto_1 = require("../dto/chat_group.dto");
const chat_model_1 = require("../../chat/models/chat.model");
const group_models_1 = require("../../group/models/group.models");
const course_models_1 = require("../../course/models/course.models");
let ChatGroup = class ChatGroup extends sequelize_typescript_1.Model {
};
exports.ChatGroup = ChatGroup;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], ChatGroup.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => course_models_1.Course),
    __metadata("design:type", Number)
], ChatGroup.prototype, "course_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => course_models_1.Course),
    __metadata("design:type", course_models_1.Course)
], ChatGroup.prototype, "course", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ENUM({
        values: Object.keys(chat_group_dto_1.ChatGroupType),
    })),
    __metadata("design:type", String)
], ChatGroup.prototype, "chat_type", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => group_models_1.Group),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], ChatGroup.prototype, "group_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => group_models_1.Group),
    __metadata("design:type", Array)
], ChatGroup.prototype, "group", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => chat_model_1.Chat, {
        onDelete: 'CASCADE',
        hooks: true,
    }),
    __metadata("design:type", Array)
], ChatGroup.prototype, "chats", void 0);
exports.ChatGroup = ChatGroup = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'chatgroup' })
], ChatGroup);
//# sourceMappingURL=chat_group.models.js.map