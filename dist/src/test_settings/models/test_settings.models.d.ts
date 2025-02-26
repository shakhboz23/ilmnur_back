import { Model } from 'sequelize-typescript';
import { Lesson } from '../../lesson/models/lesson.models';
interface Test_settingsAttributes {
    start_date: Date;
    end_date: Date;
    sort_level: any[];
    period: number;
    mix: boolean;
    lesson_id: number;
}
export declare class Test_settings extends Model<Test_settings, Test_settingsAttributes> {
    id: number;
    start_date: Date;
    end_date: Date;
    sort_level: any[];
    period: number;
    mix: boolean;
    lesson_id: number;
    lesson: Lesson;
}
export {};
