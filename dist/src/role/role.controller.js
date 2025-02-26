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
exports.RoleController = void 0;
const jwt_1 = require("@nestjs/jwt");
const common_1 = require("@nestjs/common");
const role_service_1 = require("./role.service");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const image_validation_pipe_1 = require("../pipes/image-validation.pipe");
const role_dto_1 = require("./dto/role.dto");
const update_profile_dto_1 = require("./dto/update_profile.dto");
const update_dto_1 = require("./dto/update.dto");
const filter_reyting_1 = require("./dto/filter_reyting");
let RoleController = class RoleController {
    constructor(roleService, jwtService) {
        this.roleService = roleService;
        this.jwtService = jwtService;
    }
    async create(roleDto) {
        return this.roleService.create(roleDto);
    }
    async getAll(role, current_role) {
        return this.roleService.getAll(role);
    }
    pagination(page, limit) {
        return this.roleService.pagination(page, limit);
    }
    getReyting(role, roleReytingDto) {
        return this.roleService.getReyting(role, roleReytingDto);
    }
    getTeacherReyting(subject_id, roleReytingDto) {
        return this.roleService.getTeacherReyting(subject_id, roleReytingDto);
    }
    getAllStudent(class_id, request) {
        console.log(request?.user?.id, '-------------------------red');
        return this.roleService.getAllStudent(class_id);
    }
    countUsers(users) {
        return this.roleService.countUsers(users);
    }
    getByUserId(user_id, role) {
        return this.roleService.getByUserId(user_id, role);
    }
    updateProfile(id, updateDto) {
        return this.roleService.updateProfile(id, updateDto);
    }
    update(id, updateDto) {
        return this.roleService.update(id, updateDto);
    }
    async updateStatus(id, role) {
        const data = await this.roleService.updateStatus(id, role);
        return data;
    }
    updateProfileImage(user_id, role, image) {
        return this.roleService.updateProfileImage(user_id, role, image);
    }
    deleteRole(id) {
        return this.roleService.delete(id);
    }
    handleUserId(headers) {
        const auth_header = headers['authorization'];
        const token = auth_header?.split(' ')[1];
        const user = token
            ? this.jwtService.verify(token, { secret: process.env.ACCESS_TOKEN_KEY })
            : null;
        if (!user?.id) {
            throw new common_1.UnauthorizedException({
                message: 'Token topilmadi!',
            });
        }
        const user_id = user?.id;
        return user_id;
    }
};
exports.RoleController = RoleController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Registration a new role' }),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_dto_1.RoleDto]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all roles' }),
    (0, common_1.Get)('getByRole/:role'),
    __param(0, (0, common_1.Param)('role')),
    __param(1, (0, common_1.Param)('current_role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get roles with pagination' }),
    (0, common_1.Get)('pagination/:page/:limit'),
    __param(0, (0, common_1.Param)('page')),
    __param(1, (0, common_1.Param)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "pagination", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get roles with pagination' }),
    (0, common_1.Post)('reyting/:role'),
    __param(0, (0, common_1.Param)('role')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, filter_reyting_1.RoleReytingDto]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "getReyting", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get roles with pagination' }),
    (0, common_1.Post)('teacher_reyting/:subject_id'),
    __param(0, (0, common_1.Param)('subject_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, filter_reyting_1.RoleReytingDto]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "getTeacherReyting", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get roles with pagination' }),
    (0, common_1.Get)('getallstudent/:class_id'),
    __param(0, (0, common_1.Param)('class_id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "getAllStudent", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get role by ID' }),
    (0, common_1.Post)('/count_users'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "countUsers", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get role by ID' }),
    (0, common_1.Get)('/getfull/:user_id/:role'),
    __param(0, (0, common_1.Param)('user_id')),
    __param(1, (0, common_1.Param)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "getByUserId", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update user profile by ID' }),
    (0, common_1.Put)('profile/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_profile_dto_1.UpdateProfileDto]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "updateProfile", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update user profile by ID' }),
    (0, common_1.Put)('/update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_dto_1.UpdateDto]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update class profile by ID' }),
    (0, common_1.Put)('/status/:id/:role'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "updateStatus", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update profile image' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                image: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, common_1.Put)('profileImage/:user_id/:role'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Param)('user_id')),
    __param(1, (0, common_1.Param)('role')),
    __param(2, (0, common_1.UploadedFile)(new image_validation_pipe_1.ImageValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "updateProfileImage", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete role by ID' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "deleteRole", null);
exports.RoleController = RoleController = __decorate([
    (0, swagger_1.ApiTags)('Role'),
    (0, common_1.Controller)('role'),
    __metadata("design:paramtypes", [role_service_1.RoleService,
        jwt_1.JwtService])
], RoleController);
//# sourceMappingURL=role.controller.js.map