import { Model } from 'sequelize-typescript';
import { User } from '../../user/models/user.models';
interface VideoChatAttr {
    room: string;
    user_id: number;
}
export declare class VideoChat extends Model<VideoChat, VideoChatAttr> {
    id: number;
    room: string;
    user_id: number;
    user: User[];
}
export {};
