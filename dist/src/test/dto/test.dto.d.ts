import { Test_settingsDto } from 'src/test_settings/dto/test_settings.dto';
declare class QuestionDto {
    question: string;
    variants: string[];
}
export declare class TestsDto extends Test_settingsDto {
    lesson_id: number;
    test: QuestionDto[];
    files: any[];
}
export {};
