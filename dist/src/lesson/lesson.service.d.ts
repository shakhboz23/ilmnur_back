import { Lesson } from './models/lesson.models';
import { LessonDto } from './dto/lesson.dto';
import { UploadedService } from '../uploaded/uploaded.service';
import { CourseService } from 'src/course/course.service';
export declare class LessonService {
    private lessonRepository;
    private readonly courseService;
    private uploadedService;
    constructor(lessonRepository: typeof Lesson, courseService: CourseService, uploadedService: UploadedService);
    create(lessonDto: LessonDto, video: any): Promise<object>;
    getAll(category_id: number): Promise<object>;
    getByCourse(course_id: number, user_id: number): Promise<Object>;
    getById(id: number, user_id?: number): Promise<object>;
    pagination(page: number): Promise<object>;
    update(id: number, lessonDto: LessonDto, video: any): Promise<object>;
    delete(id: number): Promise<object>;
}
