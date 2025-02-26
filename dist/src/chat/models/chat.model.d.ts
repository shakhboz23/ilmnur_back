import { Model } from 'sequelize-typescript';
import { ChatGroup } from '../../chat_group/models/chat_group.models';
import { User } from '../../user/models/user.models';
interface ChatAttr {
    text: string;
    user_id: number;
    chatgroup_id: number;
    file: string;
}
export declare class Chat extends Model<Chat, ChatAttr> {
    id: number;
    text: string;
    user_id: number;
    user: User[];
    chatgroup_id: number;
    chatgroups: ChatGroup[];
    file: string;
}
export {};
