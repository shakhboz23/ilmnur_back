import { Model } from 'sequelize-typescript';
import { User } from '../../user/models/user.models';
interface NotificationAttr {
    type: string;
    user_id: number;
    is_read?: boolean;
    is_accepted?: boolean;
}
export declare class Notification extends Model<Notification, NotificationAttr> {
    id: number;
    type: string;
    user_id: number;
    user: User[];
    is_read: boolean;
    is_accepted: boolean;
}
export {};
