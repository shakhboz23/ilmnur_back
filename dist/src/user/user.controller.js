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
exports.UserController = void 0;
const role_service_1 = require("../role/role.service");
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const swagger_1 = require("@nestjs/swagger");
const register_dto_1 = require("./dto/register.dto");
const login_dto_1 = require("./dto/login.dto");
const check_dto_1 = require("./dto/check.dto");
const new_password_dto_1 = require("./dto/new-password.dto");
const update_dto_1 = require("./dto/update.dto");
const token_1 = require("../utils/token");
const jwt_1 = require("@nestjs/jwt");
const image_validation_pipe_1 = require("../pipes/image-validation.pipe");
const platform_express_1 = require("@nestjs/platform-express");
let UserController = class UserController {
    constructor(userService, roleService, jwtService) {
        this.userService = userService;
        this.roleService = roleService;
        this.jwtService = jwtService;
    }
    async register(registerUserDto) {
        const data = await this.userService.register(registerUserDto);
        return data;
    }
    activate(activation_link) {
        return this.userService.activateLink(activation_link);
    }
    login(loginUserDto) {
        return this.userService.login(loginUserDto);
    }
    getAll(role) {
        return this.userService.getAll(role);
    }
    getReyting(group_id) {
        return this.userService.getReyting(group_id);
    }
    getById(id) {
        return this.userService.getById(id);
    }
    pagination(page, limit) {
        return this.userService.pagination(page, limit);
    }
    searchUsers(page, search) {
        return this.userService.searchUsers(page, search);
    }
    checkEmail(email) {
        return this.userService.checkEmail(email);
    }
    checkPassword(checkDto) {
        return this.userService.checkPassword(checkDto);
    }
    newPassword(newPasswordDto) {
        return this.userService.newPassword(newPasswordDto);
    }
    updateProfile(updateDto, image, headers) {
        const user_id = (0, token_1.extractUserIdFromToken)(headers, this.jwtService, true);
        console.log("HI");
        return this.userService.updateProfile(user_id, updateDto, image);
    }
    deleteUser(id) {
        return this.userService.deleteUser(id);
    }
    googleAuth({ credential }) {
        return this.userService.googleAuth(credential);
    }
};
exports.UserController = UserController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Registration a new user' }),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, common_1.Get)('activation_link/:activation_link'),
    __param(0, (0, common_1.Param)('activation_link')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "activate", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Login user with send OTP' }),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all users' }),
    (0, common_1.Get)('getByRole/:role'),
    __param(0, (0, common_1.Param)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get user reytings' }),
    (0, common_1.Get)('/reyting/:group_id'),
    __param(0, (0, common_1.Param)('group_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getReyting", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get user by ID' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get users with pagination' }),
    (0, common_1.Get)('pagination/:page/:limit'),
    __param(0, (0, common_1.Param)('page')),
    __param(1, (0, common_1.Param)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "pagination", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get users with pagination' }),
    (0, common_1.Get)('searchusers/:search/:page'),
    __param(0, (0, common_1.Param)('page')),
    __param(1, (0, common_1.Param)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "searchUsers", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get users with pagination' }),
    (0, common_1.Get)('checkemail/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "checkEmail", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update user profile by ID' }),
    (0, common_1.Post)('/check_password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [check_dto_1.CheckDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "checkPassword", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'New password of user' }),
    (0, common_1.Put)('/newPassword'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [new_password_dto_1.NewPasswordDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "newPassword", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update user profile by ID' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                },
                surname: {
                    type: 'string',
                },
                bio: {
                    type: 'string',
                },
                image: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    (0, common_1.Put)('profile'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)(new image_validation_pipe_1.ImageValidationPipe())),
    __param(2, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_dto_1.UpdateDto, Object, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateProfile", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete user by ID' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete user by ID' }),
    (0, common_1.Post)('/auth/google'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "googleAuth", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        role_service_1.RoleService,
        jwt_1.JwtService])
], UserController);
//# sourceMappingURL=user.controller.js.map