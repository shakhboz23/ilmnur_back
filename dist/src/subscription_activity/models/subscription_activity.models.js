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
exports.SubscriptionActivity = exports.SubscriptionActivityStatus = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const subscriptions_models_1 = require("../../subscriptions/models/subscriptions.models");
const course_models_1 = require("../../course/models/course.models");
var SubscriptionActivityStatus;
(function (SubscriptionActivityStatus) {
    SubscriptionActivityStatus["none"] = "none";
    SubscriptionActivityStatus["bad"] = "bad";
    SubscriptionActivityStatus["good"] = "good";
    SubscriptionActivityStatus["average"] = "average";
    SubscriptionActivityStatus["excellent"] = "excellent";
})(SubscriptionActivityStatus || (exports.SubscriptionActivityStatus = SubscriptionActivityStatus = {}));
let SubscriptionActivity = class SubscriptionActivity extends sequelize_typescript_1.Model {
};
exports.SubscriptionActivity = SubscriptionActivity;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], SubscriptionActivity.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM({
            values: Object.keys(SubscriptionActivityStatus),
        }),
        defaultValue: SubscriptionActivityStatus.none,
    }),
    __metadata("design:type", String)
], SubscriptionActivity.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
    }),
    __metadata("design:type", Date)
], SubscriptionActivity.prototype, "createdAt", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => subscriptions_models_1.Subscriptions),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], SubscriptionActivity.prototype, "subscription_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => subscriptions_models_1.Subscriptions),
    __metadata("design:type", Array)
], SubscriptionActivity.prototype, "subcription", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => course_models_1.Course),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], SubscriptionActivity.prototype, "course_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => course_models_1.Course),
    __metadata("design:type", Array)
], SubscriptionActivity.prototype, "course", void 0);
exports.SubscriptionActivity = SubscriptionActivity = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'subscription_activity' })
], SubscriptionActivity);
//# sourceMappingURL=subscription_activity.models.js.map