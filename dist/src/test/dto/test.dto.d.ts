import { Test_settingsDto } from 'src/test_settings/dto/test_settings.dto';
import { ActionType, TestType } from '../models/test.models';
export declare class QuestionDto {
    id?: number;
    question: string;
    variants: string[];
    true_answer: number[];
    type: TestType;
    is_action: ActionType;
}
export declare class TestsDto extends Test_settingsDto {
    lesson_id: number;
    test: QuestionDto[];
    files: any[];
}
