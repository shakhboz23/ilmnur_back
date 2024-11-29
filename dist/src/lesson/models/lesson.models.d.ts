import { Model } from 'sequelize-typescript';
import { Course } from '../../course/models/course.models';
interface LessonAttributes {
    title: string;
    course_id: number;
    lesson_id: number;
    published: boolean;
    video: string;
    content: string;
    type: lessonType;
    position: number;
}
export declare enum lessonType {
    lesson = "lesson",
    module = "module"
}
export declare class Lesson extends Model<Lesson, LessonAttributes> {
    id: number;
    position: number;
    title: string;
    video: string;
    content: string;
    published: boolean;
    type: lessonType;
    course_id: number;
    lesson_id: number;
    course: Course[];
    lessons: Lesson[];
}
export {};
