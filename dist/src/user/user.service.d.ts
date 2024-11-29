import { ResetpasswordService } from './../resetpassword/resetpassword.service';
import { HttpStatus } from '@nestjs/common';
import { User } from './models/user.models';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';
import { RoleService } from '../role/role.service';
import { CheckDto } from '../role/dto/check.dto';
import { MailService } from '../mail/mail.service';
import { NewPasswordDto } from './dto/new-password.dto';
import { UpdateDto } from './dto/update.dto';
export declare class UserService {
    private userRepository;
    private readonly jwtService;
    private readonly roleService;
    private readonly mailService;
    private readonly resetpasswordService;
    constructor(userRepository: typeof User, jwtService: JwtService, roleService: RoleService, mailService: MailService, resetpasswordService: ResetpasswordService);
    register(registerUserDto: RegisterUserDto): Promise<object>;
    activateLink(activation_link: string): Promise<{
        message: string;
        admin: User;
    }>;
    login(loginUserDto: LoginUserDto, type?: string): Promise<object>;
    getAll(role: string): Promise<object>;
    getReyting(group_id: number): Promise<object>;
    getById(id: number): Promise<object>;
    searchUsers(page: number, search: string): Promise<object>;
    checkEmail(email: string): Promise<object>;
    pagination(page: number, limit: number): Promise<object>;
    checkPassword(checkDto: CheckDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
    newPassword(newPasswordDto: NewPasswordDto): Promise<object>;
    update(id: number, updateDto: UpdateDto): Promise<object>;
    updateCurrentRole(id: number, current_role: string): Promise<object>;
    deleteUser(id: string): Promise<object>;
    verify(token: string): Promise<import("google-auth-library").TokenPayload>;
    googleAuth(credential: string): Promise<any>;
    createDefaultUser(): Promise<void>;
}
