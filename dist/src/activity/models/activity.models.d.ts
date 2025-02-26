import { Model } from 'sequelize-typescript';
import { User } from '../../user/models/user.models';
interface ActivityAttributes {
    activity: string;
    role: string;
    user_id: number;
}
export declare enum RoleName {
    student = "student",
    teacher = "teacher",
    admin = "admin",
    super_admin = "super_admin"
}
export declare class Activity extends Model<Activity, ActivityAttributes> {
    id: number;
    activity: string;
    role: string;
    user_id: number;
    user: User[];
}
export {};
