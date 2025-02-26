import { Model } from 'sequelize-typescript';
import { User } from '../../user/models/user.models';
interface ResetpasswordAttributes {
    email: string;
    activate_link: string;
}
export declare class Resetpassword extends Model<Resetpassword, ResetpasswordAttributes> {
    id: number;
    email: string;
    activate_link: string;
    user_id: number;
    user: User[];
}
export {};
