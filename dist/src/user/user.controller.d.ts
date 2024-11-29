import { RoleService } from '../role/role.service';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';
import { CheckDto } from './dto/check.dto';
import { NewPasswordDto } from './dto/new-password.dto';
export declare class UserController {
    private readonly userService;
    private readonly roleService;
    constructor(userService: UserService, roleService: RoleService);
    register(registerUserDto: RegisterUserDto): Promise<object>;
    activate(activation_link: string): Promise<{
        message: string;
        admin: import("./models/user.models").User;
    }>;
    login(loginUserDto: LoginUserDto): Promise<object>;
    getAll(role: string): Promise<object>;
    getReyting(group_id: number): Promise<object>;
    getById(id: number): Promise<object>;
    pagination(page: number, limit: number): Promise<object>;
    searchUsers(page: number, search: string): Promise<object>;
    checkEmail(email: string): Promise<object>;
    checkPassword(checkDto: CheckDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: any;
    }>;
    newPassword(newPasswordDto: NewPasswordDto): Promise<object>;
    deleteUser(id: string): Promise<object>;
    googleAuth({ credential }: {
        credential: string;
    }): Promise<any>;
}
