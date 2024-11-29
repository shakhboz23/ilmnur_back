import { lessonType } from '../models/lesson.models';
export declare class LessonDto {
    title: string;
    course_id: number;
    lesson_id: number;
    published: boolean;
    content: string;
    type: lessonType;
}
