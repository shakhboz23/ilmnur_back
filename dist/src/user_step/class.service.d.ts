import { UserStep } from './models/class.models';
import { JwtService } from '@nestjs/jwt';
import { UserStepDto } from './dto/class.dto';
export declare class UserStepService {
    private classRepository;
    private readonly jwtService;
    constructor(classRepository: typeof UserStep, jwtService: JwtService);
    create(UserStepDto: UserStepDto): Promise<object>;
    getAll(): Promise<object>;
    getById(id: number): Promise<object>;
    getByClass(subject_id: number, class_number: number, role_id: number): Promise<object>;
    pagination(page: number): Promise<object>;
    update(id: number, UserStepDto: UserStepDto): Promise<object>;
    delete(id: number): Promise<object>;
}
