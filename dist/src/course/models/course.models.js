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
exports.Course = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const group_models_1 = require("../../group/models/group.models");
const lesson_models_1 = require("../../lesson/models/lesson.models");
const subscriptions_models_1 = require("../../subscriptions/models/subscriptions.models");
const category_models_1 = require("../../category/models/category.models");
const user_models_1 = require("../../user/models/user.models");
const subscription_activity_models_1 = require("../../subscription_activity/models/subscription_activity.models");
const chat_group_models_1 = require("../../chat_group/models/chat_group.models");
let Course = class Course extends sequelize_typescript_1.Model {
};
exports.Course = Course;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], Course.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: true,
    }),
    __metadata("design:type", String)
], Course.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Course.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        defaultValue: 0,
    }),
    __metadata("design:type", Number)
], Course.prototype, "price", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        defaultValue: 0,
    }),
    __metadata("design:type", Number)
], Course.prototype, "discount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], Course.prototype, "cover", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => group_models_1.Group),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], Course.prototype, "group_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => group_models_1.Group),
    __metadata("design:type", Array)
], Course.prototype, "group", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_models_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], Course.prototype, "user_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_models_1.User),
    __metadata("design:type", Array)
], Course.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => category_models_1.Category),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], Course.prototype, "category_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => category_models_1.Category),
    __metadata("design:type", Array)
], Course.prototype, "category", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => lesson_models_1.Lesson),
    __metadata("design:type", Array)
], Course.prototype, "lessons", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => subscriptions_models_1.Subscriptions, {
        onDelete: 'CASCADE',
        hooks: true,
    }),
    __metadata("design:type", Array)
], Course.prototype, "subscriptions", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => subscription_activity_models_1.SubscriptionActivity, {
        onDelete: 'CASCADE',
        hooks: true,
    }),
    __metadata("design:type", subscription_activity_models_1.SubscriptionActivity)
], Course.prototype, "subscriptionActivity", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => chat_group_models_1.ChatGroup, {
        onDelete: 'CASCADE',
        hooks: true,
    }),
    __metadata("design:type", chat_group_models_1.ChatGroup)
], Course.prototype, "chatGroup", void 0);
exports.Course = Course = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'course' })
], Course);
//# sourceMappingURL=course.models.js.map