import { Course } from './models/course.models';
import { CourseDto } from './dto/course.dto';
import { UserService } from '../user/user.service';
import { UploadedService } from '../uploaded/uploaded.service';
import { ChatGroupService } from 'src/chat_group/chat_group.service';
export declare class CourseService {
    private courseRepository;
    private readonly userService;
    private readonly chatGroupService;
    private readonly uploadedService;
    constructor(courseRepository: typeof Course, userService: UserService, chatGroupService: ChatGroupService, uploadedService: UploadedService);
    create(courseDto: CourseDto, cover: any, user_id: number): Promise<object>;
    getAll(category_id: number): Promise<object>;
    getByCourse(group_id: number, category_id: number): Promise<Object>;
    getUsersByGroupId(group_id: number, date: Date, user_id: number, course_id: number): Promise<object>;
    getById(id: number, user_id: number): Promise<object>;
    pagination(page: number): Promise<object>;
    update(id: number, courseDto: CourseDto): Promise<object>;
    delete(id: number): Promise<object>;
}
