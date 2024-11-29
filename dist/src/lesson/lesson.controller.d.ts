/// <reference types="multer" />
import { LessonService } from './lesson.service';
import { LessonDto } from './dto/lesson.dto';
import { JwtService } from '@nestjs/jwt';
export declare class LessonController {
    private readonly lessonService;
    private readonly jwtService;
    constructor(lessonService: LessonService, jwtService: JwtService);
    create(lessonDto: LessonDto, video: Express.Multer.File): Promise<object>;
    getById(id: number, headers?: string): Promise<object>;
    getAll(category_id: number): Promise<object>;
    getByCourse(id: number, headers: string): Promise<Object>;
    pagination(page: number): Promise<object>;
    update(id: number, lessonDto: LessonDto, video: Express.Multer.File): Promise<object>;
    deleteLesson(id: number): Promise<object>;
}
