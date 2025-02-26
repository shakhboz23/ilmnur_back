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
exports.Test_settings = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const lesson_models_1 = require("../../lesson/models/lesson.models");
let Test_settings = class Test_settings extends sequelize_typescript_1.Model {
};
exports.Test_settings = Test_settings;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], Test_settings.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
    }),
    __metadata("design:type", Date)
], Test_settings.prototype, "start_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
    }),
    __metadata("design:type", Date)
], Test_settings.prototype, "end_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.JSONB,
    }),
    __metadata("design:type", Array)
], Test_settings.prototype, "sort_level", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], Test_settings.prototype, "period", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: true,
    }),
    __metadata("design:type", Boolean)
], Test_settings.prototype, "mix", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => lesson_models_1.Lesson),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: true,
    }),
    __metadata("design:type", Number)
], Test_settings.prototype, "lesson_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => lesson_models_1.Lesson),
    __metadata("design:type", lesson_models_1.Lesson)
], Test_settings.prototype, "lesson", void 0);
exports.Test_settings = Test_settings = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'test_settings' })
], Test_settings);
//# sourceMappingURL=test_settings.models.js.map