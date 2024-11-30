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
exports.UserService = void 0;
const resetpassword_service_1 = require("./../resetpassword/resetpassword.service");
const common_1 = require("@nestjs/common");
const user_models_1 = require("./models/user.models");
const sequelize_1 = require("@nestjs/sequelize");
const jwt_1 = require("@nestjs/jwt");
const token_1 = require("../utils/token");
const sequelize_2 = require("sequelize");
const role_service_1 = require("../role/role.service");
const role_models_1 = require("../role/models/role.models");
const mail_service_1 = require("../mail/mail.service");
const bcryptjs_1 = require("bcryptjs");
const uuid = require("uuid");
const sequelize_typescript_1 = require("sequelize-typescript");
const bcrypt = require("bcrypt");
const google_auth_library_1 = require("google-auth-library");
const files_service_1 = require("../files/files.service");
let UserService = class UserService {
    constructor(userRepository, jwtService, roleService, mailService, resetpasswordService, fileService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.roleService = roleService;
        this.mailService = mailService;
        this.resetpasswordService = resetpasswordService;
        this.fileService = fileService;
    }
    async register(registerUserDto) {
        var _a;
        try {
            let is_new_role = false;
            let { email, role, password } = registerUserDto;
            const hashed_password = await (0, bcryptjs_1.hash)(password, 7);
            let user = await this.userRepository.findOne({
                where: { email },
            });
            let is_role;
            if (user) {
                is_role = await this.roleService.getUserRoles(user.id, role);
                if ((_a = is_role.data) === null || _a === void 0 ? void 0 : _a.length) {
                    throw new common_1.BadRequestException('Already registered');
                }
                else {
                    is_new_role = true;
                }
            }
            const current_role = registerUserDto.role;
            if (is_new_role) {
                const roleData = Object.assign(Object.assign({}, registerUserDto), { user_id: user.id });
                await this.roleService.create(roleData);
                user = await this.userRepository.findByPk(user.id);
                await this.updateCurrentRole(user.id, current_role);
                const { access_token, refresh_token } = await (0, token_1.generateToken)({ id: user.id }, this.jwtService);
                const user_data = await this.userRepository.findByPk(user.id, {
                    include: { model: role_models_1.Role },
                });
                return {
                    statusCode: common_1.HttpStatus.OK,
                    message: 'Successfully registered1!',
                    data: {
                        user: user_data,
                    },
                    token: access_token,
                };
            }
            else {
                user = await this.userRepository.create(Object.assign(Object.assign({}, registerUserDto), { hashed_password }));
                const { access_token, refresh_token } = await (0, token_1.generateToken)({ id: user.id, is_active: user.is_active }, this.jwtService);
                const hashed_refresh_token = await (0, bcryptjs_1.hash)(refresh_token, 7);
                const uniqueKey = uuid.v4();
                const updateuser = await this.userRepository.update({
                    hashed_refresh_token: hashed_refresh_token,
                    activation_link: uniqueKey,
                }, { where: { id: user.id }, returning: true });
                const roleData = Object.assign(Object.assign({}, registerUserDto), { user_id: user.id });
                await this.roleService.create(roleData);
                await this.updateCurrentRole(user.id, current_role);
                const user_data = await this.userRepository.findByPk(user.id, {
                    include: { model: role_models_1.Role },
                });
                return {
                    statusCode: common_1.HttpStatus.OK,
                    message: 'Verification code sended successfully',
                    data: {
                        user: user_data,
                    },
                    token: access_token,
                };
            }
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async activateLink(activation_link) {
        if (!activation_link) {
            throw new common_1.BadRequestException('Activation link not found');
        }
        const user = await this.userRepository.findOne({
            where: { activation_link },
        });
        if (!user) {
            throw new common_1.BadRequestException('Activation link not found');
        }
        else if (user === null || user === void 0 ? void 0 : user.is_active) {
            throw new common_1.BadRequestException('User already activated');
        }
        const updateduser = await this.userRepository.update({ is_active: true }, { where: { activation_link }, returning: true });
        return {
            message: 'User activated successfully',
            admin: updateduser[1][0],
        };
    }
    async login(loginUserDto, type) {
        try {
            const user = await this.userRepository.findOne({
                where: { email: loginUserDto.email },
            });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            if (type != 'googleauth') {
                const isMatchPass = await bcrypt.compare(loginUserDto.password, user.hashed_password);
                if (!isMatchPass) {
                    throw new common_1.BadRequestException('Password did not match!');
                }
            }
            const { access_token, refresh_token } = await (0, token_1.generateToken)({ id: user.id }, this.jwtService);
            return {
                statusCode: common_1.HttpStatus.OK,
                mesage: 'Logged in successfully',
                data: user,
                token: access_token,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getAll(role) {
        try {
            console.log(role);
            const where = {};
            if (role != 'all') {
                where.role = { [sequelize_2.Op.contains]: [[role, '']] };
            }
            const users = await this.userRepository.findAll({ where });
            return {
                statusCode: common_1.HttpStatus.OK,
                data: users,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getReyting(group_id) {
        try {
            const users = await this.userRepository.findAll({
                where: {
                    id: {
                        [sequelize_2.Op.in]: sequelize_typescript_1.Sequelize.literal(`(
              SELECT DISTINCT "Reyting"."user_id"
              FROM "reyting" AS "Reyting"
              INNER JOIN "lesson" AS "Lesson" ON "Lesson"."id" = "Reyting"."lesson_id"
              INNER JOIN "course" AS "Course" ON "Course"."id" = "Lesson"."course_id"
              WHERE "Course"."group_id" = :group_id
            )`),
                    },
                },
                attributes: {
                    include: [
                        [
                            sequelize_typescript_1.Sequelize.literal(`(
                SELECT SUM("reyting"."ball")
                FROM "reyting"
                INNER JOIN "lesson" ON "lesson"."id" = "reyting"."lesson_id"
                INNER JOIN "course" ON "course"."id" = "lesson"."course_id"
                INNER JOIN "group" ON "group"."id" = "course"."group_id"
                WHERE "group"."id" = :group_id AND "reyting"."user_id" = "User"."id"
              )::int`),
                            'totalReyting',
                        ],
                    ],
                },
                replacements: { group_id },
            });
            return users;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getById(id) {
        console.log('getById', id);
        try {
            if (!id) {
                throw new common_1.NotFoundException('User not found!');
            }
            const userdata = await this.userRepository.findByPk(id);
            const current_role = (userdata === null || userdata === void 0 ? void 0 : userdata.current_role) || 'student';
            const user = await this.userRepository.findOne({
                where: { id },
                include: [
                    {
                        model: role_models_1.Role,
                        attributes: {
                            include: [],
                        },
                    },
                ],
                replacements: { id, current_role },
            });
            if (!user) {
                throw new common_1.NotFoundException('User not found!');
            }
            return user;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async searchUsers(page, search) {
        try {
            const limit = 20;
            const offset = (page - 1) * limit;
            const users = await this.userRepository.findAll({
                where: {
                    [sequelize_2.Op.or]: [
                        { name: { [sequelize_2.Op.iLike]: `%${search}%` } },
                        { surname: { [sequelize_2.Op.iLike]: `%${search}%` } },
                    ],
                },
                include: { model: role_models_1.Role, where: { role: 'student' } },
                offset,
                limit,
            });
            const total_count = await this.userRepository.count({
                where: {
                    [sequelize_2.Op.or]: [
                        { name: { [sequelize_2.Op.like]: `%${search}%` } },
                        { surname: { [sequelize_2.Op.like]: `%${search}%` } },
                    ],
                },
            });
            const total_pages = Math.ceil(total_count / limit);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                data: {
                    records: users,
                    pagination: {
                        currentPage: Number(page),
                        total_pages,
                        total_count,
                    },
                },
            };
            return response;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async checkEmail(email) {
        try {
            const user = await this.userRepository.findOne({
                where: { email },
            });
            if (!user) {
                throw new common_1.BadRequestException('User not found');
            }
            return {
                statusCode: common_1.HttpStatus.OK,
                data: user,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async pagination(page, limit) {
        try {
            const offset = (page - 1) * limit;
            const users = await this.userRepository.findAll({ offset, limit });
            const total_count = await this.userRepository.count();
            const total_pages = Math.ceil(total_count / limit);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                data: {
                    records: users,
                    pagination: {
                        currentPage: Number(page),
                        total_pages,
                        total_count,
                    },
                },
            };
            return response;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async checkPassword(checkDto) {
        const res = await this.roleService.checkPassword(checkDto);
        if (res) {
            const user = await this.updateCurrentRole(res.data.id, res.data.role);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Updated successfully',
                data: user.data,
            };
        }
    }
    async updateProfile(id, updateDto, image) {
        console.log(image);
        try {
            let user = await this.userRepository.findByPk(id);
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            if (image) {
                image = await this.fileService.createFile(image, 'image');
                updateDto.image = image.url;
                console.log(updateDto.image);
                if (image == 'error') {
                    return {
                        status: common_1.HttpStatus.BAD_REQUEST,
                        error: 'Error while uploading a file',
                    };
                }
            }
            else {
                updateDto.image = null;
            }
            user = await this.userRepository.update(updateDto, {
                where: { id },
                returning: true,
            });
            return user[1][0];
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async newPassword(newPasswordDto) {
        try {
            const { new_password, confirm_password, activation_link } = newPasswordDto;
            const email = await this.resetpasswordService.checkActivationLink(activation_link);
            const hashed_password = await (0, bcryptjs_1.hash)(new_password, 7);
            const updated_info = await this.userRepository.update({ hashed_password }, { where: { email }, returning: true });
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Password updated successfully',
                data: {
                    user: updated_info[1][0],
                },
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async update(id, updateDto) {
        try {
            const user = await this.userRepository.findByPk(id);
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            console.log(updateDto, id);
            const update = await this.userRepository.update(updateDto, {
                where: { id },
                returning: true,
            });
            console.log(update);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Updated successfully',
                data: update[1][0],
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async updateCurrentRole(id, current_role) {
        try {
            const user = await this.userRepository.findByPk(id);
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            const update = await this.userRepository.update({ current_role }, {
                where: { id },
                returning: true,
            });
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Updated successfully',
                data: update[1][0],
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async deleteUser(id) {
        try {
            const user = await this.userRepository.findByPk(id);
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            user.destroy();
            return {
                statusCode: common_1.HttpStatus.ACCEPTED,
                message: 'Deleted successfully',
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async verify(token) {
        const client = new google_auth_library_1.OAuth2Client(process.env.CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID,
        });
        const payload = ticket.getPayload();
        return payload;
    }
    async googleAuth(credential) {
        console.log(credential, 'credential');
        try {
            const payload = await this.verify(credential);
            console.log(payload);
            const data = {
                name: payload.given_name,
                surname: payload.family_name,
                password: credential,
                email: payload.email,
                role: 'student',
            };
            const is_user = await this.userRepository.findOne({
                where: {
                    email: payload.email,
                },
            });
            let user;
            console.log(is_user);
            if (is_user) {
                user = await this.login(data, 'googleauth');
            }
            else {
                user = await this.register(data);
            }
            return user;
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException(error);
        }
    }
    async createDefaultUser() {
        try {
            await this.register({
                name: process.env.INITIAL_NAME,
                surname: process.env.INITIAL_SURNAME,
                password: process.env.INITIAL_EMAIL,
                role: user_models_1.RoleName.super_admin,
                email: process.env.INITIAL_EMAIL,
            });
        }
        catch (_a) { }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_models_1.User)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService,
        role_service_1.RoleService,
        mail_service_1.MailService,
        resetpassword_service_1.ResetpasswordService,
        files_service_1.FilesService])
], UserService);
//# sourceMappingURL=user.service.js.map