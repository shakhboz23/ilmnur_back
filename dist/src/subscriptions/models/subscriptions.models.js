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
exports.Subscriptions = exports.SubscribeActive = void 0;
const user_models_1 = require("../../user/models/user.models");
const sequelize_typescript_1 = require("sequelize-typescript");
const course_models_1 = require("../../course/models/course.models");
const subscription_activity_models_1 = require("../../subscription_activity/models/subscription_activity.models");
const activity_models_1 = require("../../activity/models/activity.models");
var SubscribeActive;
(function (SubscribeActive) {
    SubscribeActive["requested"] = "requested";
    SubscribeActive["active"] = "active";
    SubscribeActive["pending"] = "pending";
})(SubscribeActive || (exports.SubscribeActive = SubscribeActive = {}));
let Subscriptions = class Subscriptions extends sequelize_typescript_1.Model {
};
exports.Subscriptions = Subscriptions;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], Subscriptions.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM({
            values: Object.keys(activity_models_1.RoleName),
        }),
        defaultValue: activity_models_1.RoleName.student
    }),
    __metadata("design:type", String)
], Subscriptions.prototype, "role", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => course_models_1.Course),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Subscriptions.prototype, "course_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_models_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Subscriptions.prototype, "user_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => course_models_1.Course),
    __metadata("design:type", Array)
], Subscriptions.prototype, "course", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_models_1.User),
    __metadata("design:type", Array)
], Subscriptions.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ENUM({
        values: Object.keys(SubscribeActive),
    })),
    __metadata("design:type", String)
], Subscriptions.prototype, "is_active", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => subscription_activity_models_1.SubscriptionActivity, {
        onDelete: 'CASCADE',
        hooks: true,
    }),
    __metadata("design:type", subscription_activity_models_1.SubscriptionActivity)
], Subscriptions.prototype, "subscriptionActivity", void 0);
exports.Subscriptions = Subscriptions = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'subscriptions' })
], Subscriptions);
//# sourceMappingURL=subscriptions.models.js.map