import { Model } from 'sequelize-typescript';
import { Role } from '../../role/models/role.models';
interface UserStepAttributes {
    lesson_id: number;
    role_id: number;
}
export declare class UserStep extends Model<UserStep, UserStepAttributes> {
    id: number;
    role_id: number;
    role: Role[];
}
export {};
