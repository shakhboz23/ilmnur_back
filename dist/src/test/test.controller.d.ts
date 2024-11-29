/// <reference types="multer" />
import { TestsService } from './test.service';
import { TestsDto } from './dto/test.dto';
import { CheckDto } from './dto/check.dto';
import { JwtService } from '@nestjs/jwt';
export declare class TestsController {
    private readonly testsService;
    private readonly jwtService;
    constructor(testsService: TestsService, jwtService: JwtService);
    create(testsDto: TestsDto): Promise<object>;
    getTests(): Promise<object>;
    getAll(class_number: number): Promise<object>;
    checkById(id: number, { answer }: {
        answer: any;
    }): Promise<object>;
    checkAllAnswers(lesson_id: number, answers: CheckDto, headers: Record<string, string>): Promise<object>;
    getById(id: number, headers: Record<string, string>): Promise<object>;
    pagination(page: number): Promise<object>;
    create_url(file: Express.Multer.File): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        data: any;
        error?: undefined;
    } | {
        statusCode: import("@nestjs/common").HttpStatus;
        error: any;
        data?: undefined;
    }>;
    update(id: number, testsDto: TestsDto): Promise<object>;
    deleteTests(id: number): Promise<object>;
}
