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
exports.Lesson = exports.lessonType = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const course_models_1 = require("../../course/models/course.models");
var lessonType;
(function (lessonType) {
    lessonType["lesson"] = "lesson";
    lessonType["module"] = "module";
})(lessonType || (exports.lessonType = lessonType = {}));
let Lesson = class Lesson extends sequelize_typescript_1.Model {
};
exports.Lesson = Lesson;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], Lesson.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], Lesson.prototype, "position", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: true,
    }),
    __metadata("design:type", String)
], Lesson.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], Lesson.prototype, "video", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        defaultValue: '',
    }),
    __metadata("design:type", String)
], Lesson.prototype, "content", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], Lesson.prototype, "published", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM({
            values: Object.keys(lessonType),
        }),
        defaultValue: lessonType.lesson,
    }),
    __metadata("design:type", String)
], Lesson.prototype, "type", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => course_models_1.Course),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], Lesson.prototype, "course_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Lesson),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
    }),
    __metadata("design:type", Number)
], Lesson.prototype, "lesson_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => course_models_1.Course),
    __metadata("design:type", Array)
], Lesson.prototype, "course", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Lesson, {
        onDelete: 'CASCADE',
        hooks: true,
    }),
    __metadata("design:type", Array)
], Lesson.prototype, "lessons", void 0);
exports.Lesson = Lesson = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'lesson' })
], Lesson);
//# sourceMappingURL=lesson.models.js.map