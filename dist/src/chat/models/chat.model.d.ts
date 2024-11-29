import { Model } from 'sequelize-typescript';
import { ChatGroup } from '../../chat_group/models/chat_group.models';
import { User } from '../../user/models/user.models';
interface ChatAttr {
    icon: number;
    text: string;
    file_type: object;
    user_id: number;
    chatgroup_id: number;
    file: string;
}
export declare class Chat extends Model<Chat, ChatAttr> {
    id: number;
    icon: number;
    text: string;
    file_type: object;
    user_id: number;
    user: User[];
    chatgroup_id: number;
    chatgroups: ChatGroup[];
    file: string;
}
export {};
