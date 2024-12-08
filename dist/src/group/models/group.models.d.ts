import { Model } from 'sequelize-typescript';
import { User } from '../../user/models/user.models';
import { Course } from 'src/course/models/course.models';
import { ChatGroup } from 'src/chat_group/models/chat_group.models';
interface GroupAttributes {
    title: string;
    description: string;
    cover: string;
    user_id: number;
}
export declare class Group extends Model<Group, GroupAttributes> {
    id: number;
    title: string;
    description: string;
    cover: string;
    user_id: number;
    user: User[];
    course: Course[];
    chatGroup: ChatGroup[];
}
export {};
