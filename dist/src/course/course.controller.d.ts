/// <reference types="multer" />
import { CourseService } from './course.service';
import { CourseDto } from './dto/course.dto';
import { JwtService } from '@nestjs/jwt';
export declare class CourseController {
    private readonly courseService;
    private readonly jwtService;
    constructor(courseService: CourseService, jwtService: JwtService);
    create(courseDto: CourseDto, image: Express.Multer.File, headers: string): Promise<object>;
    getById(id: number, headers: string): Promise<object>;
    getUsersByGroupId(group_id: number, { date, course_id, page }: {
        date: Date;
        course_id: number;
        page: string;
    }, headers: string): Promise<object>;
    getAll(category_id: number): Promise<object>;
    getByCourse({ id, category_id }: {
        id: number;
        category_id: number;
    }): Promise<Object>;
    pagination(page: number): Promise<object>;
    update(id: number, courseDto: CourseDto): Promise<object>;
    deleteCourse(id: number): Promise<object>;
}
