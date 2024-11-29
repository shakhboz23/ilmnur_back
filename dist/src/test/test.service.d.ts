import { LessonService } from './../lesson/lesson.service';
import { Test_settingsService } from './../test_settings/test_settings.service';
import { HttpStatus } from '@nestjs/common';
import { Tests } from './models/test.models';
import { TestsDto } from './dto/test.dto';
import { CheckDto } from './dto/check.dto';
import { ReytingService } from '../reyting/reyting.service';
import { FilesService } from 'src/files/files.service';
export declare class TestsService {
    private testsRepository;
    private readonly reytingService;
    private readonly lessonService;
    private readonly test_settingsService;
    private readonly fileService;
    constructor(testsRepository: typeof Tests, reytingService: ReytingService, lessonService: LessonService, test_settingsService: Test_settingsService, fileService: FilesService);
    create(testsDto: TestsDto): Promise<object>;
    create_url(file: any): Promise<{
        statusCode: HttpStatus;
        data: any;
        error?: undefined;
    } | {
        statusCode: HttpStatus;
        error: any;
        data?: undefined;
    }>;
    getAll(class_name: number): Promise<object>;
    getTests(): Promise<object>;
    getById(lesson_id: number, user_id: number): Promise<object>;
    checkById(id: number, answer: string): Promise<object>;
    checkAnswers(user_id: number, lesson_id: number, checkDto: CheckDto): Promise<object>;
    pagination(page: number): Promise<object>;
    update(id: number, testsDto: TestsDto): Promise<object>;
    delete(id: number): Promise<object>;
    private shuffle;
}
