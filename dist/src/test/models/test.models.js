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
exports.Tests = exports.TestType = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const lesson_models_1 = require("../../lesson/models/lesson.models");
var TestType;
(function (TestType) {
    TestType["variant"] = "variant";
    TestType["multiple"] = "multiple";
    TestType["fill"] = "fill";
    TestType["customizable"] = "customizable";
})(TestType || (exports.TestType = TestType = {}));
let Tests = class Tests extends sequelize_typescript_1.Model {
};
exports.Tests = Tests;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], Tests.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => lesson_models_1.Lesson),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], Tests.prototype, "lesson_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => lesson_models_1.Lesson),
    __metadata("design:type", Array)
], Tests.prototype, "lesson", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Tests.prototype, "question", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ARRAY(sequelize_typescript_1.DataType.STRING),
        allowNull: false,
    }),
    __metadata("design:type", Array)
], Tests.prototype, "variants", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM({
            values: Object.keys(TestType),
        }),
        defaultValue: TestType.variant,
    }),
    __metadata("design:type", String)
], Tests.prototype, "type", void 0);
exports.Tests = Tests = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'tests' })
], Tests);
//# sourceMappingURL=test.models.js.map