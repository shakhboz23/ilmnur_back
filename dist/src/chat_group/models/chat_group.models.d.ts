import { Model } from 'sequelize-typescript';
import { ChatGroupType } from '../dto/chat_group.dto';
import { Chat } from '../../chat/models/chat.model';
interface ChatGroupAttributes {
    title: string;
    chat_type: ChatGroupType;
}
export declare class ChatGroup extends Model<ChatGroup, ChatGroupAttributes> {
    id: number;
    title: string;
    chat_type: ChatGroupType;
    chats: Chat[];
}
export {};
