import { RoleDto } from '../../role/dto/role.dto';
export declare class RegisterUserDto extends RoleDto {
    name: string;
    surname: string;
    email?: string;
    phone?: string;
    password: string;
}
