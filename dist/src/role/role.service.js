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
exports.RoleService = void 0;
const files_service_1 = require("../files/files.service");
const common_1 = require("@nestjs/common");
const role_models_1 = require("./models/role.models");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_2 = require("sequelize");
const user_models_1 = require("../user/models/user.models");
const bcryptjs_1 = require("bcryptjs");
const activity_service_1 = require("../activity/activity.service");
const sequelize_typescript_1 = require("sequelize-typescript");
const reyting_models_1 = require("../reyting/models/reyting.models");
const test_models_1 = require("../test/models/test.models");
const lesson_models_1 = require("../lesson/models/lesson.models");
const user_service_1 = require("../user/user.service");
let RoleService = class RoleService {
    constructor(roleRepository, fileService, activityService, userService) {
        this.roleRepository = roleRepository;
        this.fileService = fileService;
        this.activityService = activityService;
        this.userService = userService;
    }
    async create(roleDto) {
        try {
            const role = await this.roleRepository.create(roleDto);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Successfully registered!',
                data: role,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async checkPassword(checkDto) {
        try {
            let message;
            const { user_id, role, password } = checkDto;
            const user = await this.roleRepository.findOne({
                where: { user_id, role },
            });
            if (!user) {
                throw new common_1.NotFoundException('User not found!');
            }
            if (user.hashed_password) {
                const is_match_pass = await (0, bcryptjs_1.compare)(String(password), String(user.hashed_password));
                if (!is_match_pass) {
                    throw new common_1.ForbiddenException('Password did not match!');
                }
                message = 'true';
            }
            else {
                const hashed_password = await (0, bcryptjs_1.hash)(password, 7);
                message = 'updated';
            }
            return {
                statusCode: common_1.HttpStatus.OK,
                message,
                data: {
                    id: user_id,
                    role,
                },
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async userAvailable(id, is_online, role) {
        try {
            let user = await this.roleRepository.findOne({
                where: {
                    user_id: id,
                    role,
                },
            });
            let last_activity = new Date();
            let activity = String(new Date().getTime() - new Date(+user.last_activity).getTime());
            await this.activityService.create({
                activity,
                role: user.role,
                user_id: user.id,
            });
            if (user) {
                user = await this.roleRepository.update({}, { where: { user_id: id, role }, returning: true });
                return {
                    statusCode: common_1.HttpStatus.OK,
                    message: is_online ? 'You are online!' : 'You are offline!',
                    data: user[1][0],
                };
            }
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'User not found!',
            };
        }
        catch (error) {
            console.log(error.message);
        }
    }
    async getAll(role) {
        try {
            const roles = await this.roleRepository.findAll({
                where: {
                    role,
                },
                include: {
                    model: user_models_1.User,
                },
            });
            return {
                statusCode: common_1.HttpStatus.OK,
                data: roles,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getAllStudent(class_id) {
        try {
            const roles = await this.roleRepository.findAll({
                where: {},
                include: [{ model: user_models_1.User, attributes: ['phone'] }],
            });
            return {
                statusCode: common_1.HttpStatus.OK,
                data: roles,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getUserRoles(user_id, role) {
        try {
            const roles = await this.roleRepository.findAll({
                where: { user_id, role },
            });
            return {
                statusCode: common_1.HttpStatus.OK,
                data: roles,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getReyting(role, roleReytingDto) {
        try {
            const { class: class_data, subject_id } = roleReytingDto;
            const filter = [];
            let data = {};
            for (let i in roleReytingDto) {
                if (roleReytingDto[i] && i != 'class' && i != 'subject_id') {
                    data[i] = roleReytingDto[i];
                }
            }
            filter.push(data);
            if (class_data.length == 2) {
                filter.push(sequelize_typescript_1.Sequelize.literal(`"Role"."class"::text LIKE '%${JSON.stringify([class_data])}%'`));
            }
            const roles = await this.roleRepository.findAll({
                where: {
                    [sequelize_2.Op.and]: [...filter, { role }],
                },
                include: [
                    {
                        model: reyting_models_1.Reyting,
                        attributes: [],
                        include: [
                            {
                                model: test_models_1.Tests,
                                attributes: [],
                                include: [
                                    { model: lesson_models_1.Lesson, attributes: [], where: { subject_id } },
                                ],
                            },
                        ],
                    },
                ],
                attributes: [
                    'id',
                    'role',
                    'full_name',
                    'image',
                    'class',
                    [
                        sequelize_typescript_1.Sequelize.literal(`(
                SELECT COALESCE(SUM("reyting"."ball"), 0) FROM "reyting"
                WHERE "reyting"."role_id" = "Role"."id"
                AND  (:subjectId = 0 OR EXISTS (
                    SELECT 1 FROM "tests"
                    INNER JOIN "lesson" ON "tests"."lesson_id" = "lesson"."id"
                    WHERE "reyting"."test_id" = "tests"."id"
                    AND "lesson"."subject_id" = :subjectId
                ))
              )`),
                        'totalReyting',
                    ],
                ],
                replacements: { subjectId: subject_id },
                order: [['totalReyting', 'DESC']],
            });
            return {
                statusCode: common_1.HttpStatus.OK,
                data: roles,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getTeacherReyting(subject_id, roleReytingDto) {
        try {
            const { class: class_data } = roleReytingDto;
            const filter = [];
            for (let i in roleReytingDto) {
                if (roleReytingDto[i] && i != 'class' && i != 'subject_id') {
                    filter[i] = roleReytingDto[i];
                }
            }
            if (class_data.length) {
                filter.push(sequelize_typescript_1.Sequelize.literal(`"Role"."class"::text = '${JSON.stringify([class_data])}'`));
            }
            const roles = await this.roleRepository.findAll({
                where: { role: 'teacher', ...filter },
            });
            let result = [];
            let data;
            for (let i = 0; i < roles?.length; i++) {
                let totalReyting = 0;
                const conditions = roles[i].class.map((role_class) => {
                    return sequelize_typescript_1.Sequelize.literal(`"Role"."class"::text = '${JSON.stringify([role_class])}'`);
                });
                data = await this.roleRepository.findAll({
                    where: {
                        [sequelize_2.Op.and]: [{ [sequelize_2.Op.or]: conditions }, { role: 'student' }],
                    },
                    include: [
                        {
                            model: reyting_models_1.Reyting,
                            attributes: [],
                            include: [
                                {
                                    model: test_models_1.Tests,
                                    attributes: [],
                                    include: [
                                        { model: lesson_models_1.Lesson, attributes: [], where: { subject_id } },
                                    ],
                                },
                            ],
                        },
                    ],
                    attributes: [
                        'id',
                        'role',
                        'full_name',
                        'image',
                        [
                            sequelize_typescript_1.Sequelize.literal(`(
                  SELECT COALESCE(SUM("reyting"."ball"), 0) FROM "reyting"
                  WHERE "reyting"."role_id" = "Role"."id"
                  AND (:subjectId = 0 OR EXISTS (
                      SELECT 1 FROM "tests"
                      INNER JOIN "lesson" ON "tests"."lesson_id" = "lesson"."id"
                      WHERE "reyting"."test_id" = "tests"."id"
                      AND "lesson"."subject_id" = :subjectId
                  ))
                )`),
                            'totalReyting',
                        ],
                    ],
                    replacements: { subjectId: subject_id },
                    order: [['totalReyting', 'DESC']],
                });
                for (let total of data) {
                    totalReyting += +total.get('totalReyting');
                }
                result.push({ ...roles[i].toJSON(), totalReyting });
            }
            result.sort((a, b) => b.totalReyting - a.totalReyting);
            return {
                statusCode: common_1.HttpStatus.OK,
                data: result,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getByUserId(user_id, role) {
        try {
            const role_data = await this.roleRepository.findOne({
                where: {
                    [sequelize_2.Op.and]: [{ user_id }, { role }],
                },
                include: [
                    {
                        model: user_models_1.User,
                    },
                ],
            });
            if (!role_data) {
                throw new common_1.NotFoundException('Role topilmadi!');
            }
            return {
                statusCode: common_1.HttpStatus.OK,
                data: role_data,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getById(id) {
        try {
            const role_data = await this.roleRepository.findByPk(id);
            if (!role_data) {
                throw new common_1.NotFoundException('Role topilmadi!');
            }
            return role_data;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async pagination(page, limit) {
        try {
            const offset = (page - 1) * limit;
            const roles = await this.roleRepository.findAll({ offset, limit });
            const total_count = await this.roleRepository.count();
            const total_pages = Math.ceil(total_count / limit);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                data: {
                    records: roles,
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
    async updateProfile(id, updateDto) {
        try {
            let role = await this.roleRepository.findByPk(id, {
                include: { model: user_models_1.User },
            });
            if (!role) {
                throw new common_1.NotFoundException('Role not found');
            }
            await this.roleRepository.update(updateDto, {
                where: { id },
                returning: true,
            });
            role = await this.roleRepository.findByPk(id, {
                include: { model: user_models_1.User },
            });
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Updated successfully',
                data: role,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async update(id, updateDto) {
        try {
            const role = await this.roleRepository.findByPk(id);
            if (!role) {
                throw new common_1.NotFoundException('Role not found');
            }
            const update = await this.roleRepository.update(updateDto, {
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
    async countUsers(users) {
        try {
            const total_users = await this.roleRepository.count();
            const user_data = {};
            for (let i of users) {
                user_data[i] = await this.roleRepository.count({
                    where: {
                        role: i,
                    },
                });
            }
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Updated successfully',
                data: {
                    total_users,
                    user_data,
                },
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async updateStatus(id, role) {
        try {
            const user = await this.roleRepository.findByPk(id);
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            const update = await this.roleRepository.update({ ...user, user_status: 'solved' }, {
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
    async updateParentId(searchChildDto) {
        try {
            const { class: classes, parent_id, user_id } = searchChildDto;
            console.log(classes, 'classes');
            const user = await this.roleRepository.findOne({
                where: {
                    [sequelize_2.Op.and]: [
                        sequelize_typescript_1.Sequelize.literal(`"class"::text = '${JSON.stringify(classes)}'`),
                        { user_id },
                        { role: 'student' },
                    ],
                },
            });
            if (!user) {
                throw new common_1.NotFoundException('User not found2');
            }
            if (user.parent_id) {
                throw new common_1.NotFoundException('Already exists');
            }
            const update = await this.roleRepository.update({ ...user, parent_id }, {
                where: {
                    [sequelize_2.Op.and]: [
                        sequelize_typescript_1.Sequelize.literal(`"class"::text = '${JSON.stringify(classes)}'`),
                        { user_id },
                        { role: 'student' },
                    ],
                },
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
    async updateProfileImage(user_id, role, image) {
        try {
            const user = await this.roleRepository.findOne({
                where: {
                    user_id,
                    role,
                },
            });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            if (image) {
                image = await this.fileService.createFile(image, 'image');
                if (image == 'error') {
                    return {
                        status: common_1.HttpStatus.BAD_REQUEST,
                        error: 'Error while uploading a file',
                    };
                }
            }
            const update = await this.roleRepository.update({}, {
                where: { user_id, role },
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
    async delete(id) {
        try {
            const role = await this.roleRepository.findByPk(id);
            if (!role) {
                throw new common_1.NotFoundException('Role not found');
            }
            role.destroy();
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Deleted successfully',
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.RoleService = RoleService;
exports.RoleService = RoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(role_models_1.Role)),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [Object, files_service_1.FilesService,
        activity_service_1.ActivityService,
        user_service_1.UserService])
], RoleService);
//# sourceMappingURL=role.service.js.map