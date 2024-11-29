import { Model } from 'sequelize-typescript';
import { User } from '../../user/models/user.models';
interface RoleAttributes {
    user_id: number;
    role: string;
}
export declare enum GenderType {
    MALE = "MALE",
    FEMALE = "FEMALE"
}
export declare class Role extends Model<Role, RoleAttributes> {
    id: number;
    subjects: string[];
    gender: GenderType;
    get_answered: boolean;
    new_task: boolean;
    chat_messages: boolean;
    test_reyting: number;
    user_id: number;
    user: User[];
    role: string;
    hashed_password: string;
    last_activity: Date;
}
export {};
