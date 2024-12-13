import { Model } from 'sequelize-typescript';
import { Activity } from '../../activity/models/activity.models';
import { Chat } from '../../chat/models/chat.model';
import { Role } from '../../role/models/role.models';
import { Reyting } from 'src/reyting/models/reyting.models';
interface UserAttributes {
    name: string;
    surname: string;
    email: string;
    current_role: string;
    bio: string;
    is_active: boolean;
    is_online: boolean;
    last_activity: Date;
    image: string;
    hashed_password: string;
    hashed_refresh_token: string;
}
export declare enum RoleName {
    student = "student",
    teacher = "teacher",
    super_admin = "super_admin"
}
export declare class User extends Model<User, UserAttributes> {
    id: number;
    name: string;
    surname: string;
    email: string;
    bio: string;
    is_active: boolean;
    is_online: boolean;
    current_role: string;
    hashed_password: string;
    hashed_refresh_token: string;
    activation_link: string;
    chats: Chat[];
    role: Role[];
    activity: Activity[];
    last_activity: Date;
    image: string;
    reyting: Reyting[];
}
export {};
