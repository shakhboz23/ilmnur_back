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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseController = void 0;
const common_1 = require("@nestjs/common");
const course_service_1 = require("./course.service");
const swagger_1 = require("@nestjs/swagger");
const course_dto_1 = require("./dto/course.dto");
const jwt_1 = require("@nestjs/jwt");
const image_validation_pipe_1 = require("../pipes/image-validation.pipe");
const platform_express_1 = require("@nestjs/platform-express");
const token_1 = require("../utils/token");
let CourseController = class CourseController {
    constructor(courseService, jwtService) {
        this.courseService = courseService;
        this.jwtService = jwtService;
    }
    async create(courseDto, image, headers) {
        console.log(image);
        const user_id = (0, token_1.extractUserIdFromToken)(headers, this.jwtService, true);
        console.log(user_id);
        return this.courseService.create(courseDto, image, user_id);
    }
    getById(id, headers) {
        const user_id = (0, token_1.extractUserIdFromToken)(headers, this.jwtService, true);
        console.log(user_id);
        return this.courseService.getById(id, user_id);
    }
    getUsersByGroupId(group_id, { date, course_id }, headers) {
        const user_id = (0, token_1.extractUserIdFromToken)(headers, this.jwtService, true);
        return this.courseService.getUsersByGroupId(group_id, date, user_id, course_id);
    }
    getAll(category_id) {
        return this.courseService.getAll(category_id);
    }
    getByCourse({ id, category_id }) {
        return this.courseService.getByCourse(id, category_id);
    }
    pagination(page) {
        return this.courseService.pagination(page);
    }
    update(id, courseDto) {
        return this.courseService.update(id, courseDto);
    }
    deleteCourse(id) {
        return this.courseService.delete(id);
    }
};
exports.CourseController = CourseController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new course' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                title: {
                    type: 'string',
                },
                description: {
                    type: 'string',
                },
                price: {
                    type: 'integer',
                },
                discount: {
                    type: 'integer',
                },
                group_id: {
                    type: 'integer',
                },
                category_id: {
                    type: 'integer',
                },
                image: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, common_1.Post)('/create'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)(new image_validation_pipe_1.ImageValidationPipe())),
    __param(2, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [course_dto_1.CourseDto, Object, String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get course by ID' }),
    (0, common_1.Get)('/getById/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "getById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get group by ID' }),
    (0, common_1.Get)('/getUsersByGroupId/:group_id'),
    __param(0, (0, common_1.Param)('group_id')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, String]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "getUsersByGroupId", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all lessons' }),
    (0, common_1.Get)('/:category_id'),
    __param(0, (0, common_1.Param)('category_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all courses' }),
    (0, common_1.Get)('/getByCourse/:id/:category_id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "getByCourse", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get courses with pagination' }),
    (0, common_1.Get)('pagination/:page'),
    __param(0, (0, common_1.Param)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "pagination", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update course profile by ID' }),
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, course_dto_1.CourseDto]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete course' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "deleteCourse", null);
exports.CourseController = CourseController = __decorate([
    (0, swagger_1.ApiTags)('Course'),
    (0, common_1.Controller)('course'),
    __metadata("design:paramtypes", [course_service_1.CourseService,
        jwt_1.JwtService])
], CourseController);
//# sourceMappingURL=course.controller.js.map