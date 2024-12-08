import { Model } from 'sequelize-typescript';
import { ChatGroupType } from '../dto/chat_group.dto';
import { Chat } from '../../chat/models/chat.model';
import { Group } from 'src/group/models/group.models';
import { Course } from 'src/course/models/course.models';
interface ChatGroupAttributes {
    title: string;
    group_id: number;
    chat_type: ChatGroupType;
}
export declare class ChatGroup extends Model<ChatGroup, ChatGroupAttributes> {
    id: number;
    title: string;
    course: Course[];
    chat_type: ChatGroupType;
    group_id: number;
    group: Group[];
    chats: Chat[];
}
export {};
