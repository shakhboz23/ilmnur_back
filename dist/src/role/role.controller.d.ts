/// <reference types="multer" />
import { JwtService } from '@nestjs/jwt';
import { RoleService } from './role.service';
import { RoleDto } from './dto/role.dto';
import { UpdateProfileDto } from './dto/update_profile.dto';
import { UpdateDto } from './dto/update.dto';
import { RoleReytingDto } from './dto/filter_reyting';
export declare class RoleController {
    private readonly roleService;
    private readonly jwtService;
    constructor(roleService: RoleService, jwtService: JwtService);
    create(roleDto: RoleDto): Promise<object>;
    getAll(role: string, current_role: string): Promise<object>;
    pagination(page: number, limit: number): Promise<object>;
    getReyting(role: string, roleReytingDto: RoleReytingDto): Promise<object>;
    getTeacherReyting(subject_id: number, roleReytingDto: RoleReytingDto): Promise<object>;
    getAllStudent(class_id: number, request: any): Promise<object>;
    countUsers(users: string[]): Promise<object>;
    getByUserId(user_id: number, role: string): Promise<object>;
    updateProfile(id: string, updateDto: UpdateProfileDto): Promise<object>;
    update(id: number, updateDto: UpdateDto): Promise<object>;
    updateStatus(id: number, role: string): Promise<object>;
    updateProfileImage(user_id: number, role: string, image: Express.Multer.File): Promise<object>;
    deleteRole(id: number): Promise<object>;
    handleUserId(headers: any): any;
}
