import { User } from './../../user/models/user.models';
import { Model } from 'sequelize-typescript';
import { Course } from '../../course/models/course.models';
interface LikeAttributes {
    course_id: number;
    user_id: number;
}
export declare class Like extends Model<Like, LikeAttributes> {
    id: number;
    course_id: number;
    user_id: number;
    course: Course[];
    user: User[];
}
export {};
