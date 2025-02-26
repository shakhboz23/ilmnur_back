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
exports.Activity = exports.RoleName = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_models_1 = require("../../user/models/user.models");
var RoleName;
(function (RoleName) {
    RoleName["student"] = "student";
    RoleName["teacher"] = "teacher";
    RoleName["admin"] = "admin";
    RoleName["super_admin"] = "super_admin";
})(RoleName || (exports.RoleName = RoleName = {}));
let Activity = class Activity extends sequelize_typescript_1.Model {
};
exports.Activity = Activity;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], Activity.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        defaultValue: '0',
    }),
    __metadata("design:type", String)
], Activity.prototype, "activity", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], Activity.prototype, "role", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_models_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], Activity.prototype, "user_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_models_1.User),
    __metadata("design:type", Array)
], Activity.prototype, "user", void 0);
exports.Activity = Activity = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'activity' })
], Activity);
//# sourceMappingURL=activity.models.js.map