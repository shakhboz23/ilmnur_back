import { ChatGateway } from './../gateway/gateway';
import { UserStepService } from './class.service';
import { UserStepDto } from './dto/class.dto';
export declare class UserStepController {
    private readonly classService;
    private readonly chatGateway;
    constructor(classService: UserStepService, chatGateway: ChatGateway);
    create(userStepDto: UserStepDto): Promise<object>;
    getAll(): Promise<object>;
    getById(id: number): Promise<object>;
    pagination(page: number): Promise<object>;
    update(id: number, userStepDto: UserStepDto): Promise<object>;
    deleteClass(id: number): Promise<object>;
}
