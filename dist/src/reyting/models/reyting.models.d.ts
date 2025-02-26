import { Model } from 'sequelize-typescript';
import { User } from 'src/user/models/user.models';
import { Lesson } from 'src/lesson/models/lesson.models';
interface ReytingAttributes {
    user_id: number;
    ball: number;
    lesson_id: number;
}
export declare class Reyting extends Model<Reyting, ReytingAttributes> {
    id: number;
    ball: number;
    user_id: number;
    user: User[];
    lesson_id: number;
    test: Lesson[];
}
export {};
