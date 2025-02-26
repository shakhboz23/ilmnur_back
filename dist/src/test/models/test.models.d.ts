import { Model } from 'sequelize-typescript';
import { Lesson } from '../../lesson/models/lesson.models';
interface TestsAttributes {
    lesson_id: number;
    question: string;
    variants: string[];
    true_answer: number[];
    type: TestType;
}
export declare enum TestType {
    variant = "variant",
    multiple = "multiple",
    fill = "fill",
    customizable = "customizable"
}
export declare enum ActionType {
    old = "old",
    new = "new",
    deleted = "deleted",
    edited = "edited"
}
export declare class Tests extends Model<Tests, TestsAttributes> {
    id: number;
    lesson_id: number;
    lesson: Lesson[];
    question: string;
    variants: string[];
    true_answer: number[];
    type: TestType;
}
export {};
