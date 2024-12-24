import { Subscriptions } from './models/subscriptions.models';
import { SubscriptionsDto } from './dto/subscriptions.dto';
import { UserService } from '../user/user.service';
import { UploadedService } from '../uploaded/uploaded.service';
import { CreateSubscriptionsDto } from './dto/create_subscriptions.dto';
export declare class SubscriptionsService {
    private subscriptionsRepository;
    private readonly userService;
    private uploadedService;
    constructor(subscriptionsRepository: typeof Subscriptions, userService: UserService, uploadedService: UploadedService);
    create(subscriptionsDto: SubscriptionsDto, user_id: number): Promise<object>;
    createSubscription(creaetSubscriptionsDto: CreateSubscriptionsDto, user_id: number): Promise<object>;
    getAll(): Promise<object>;
    getById(id: number): Promise<object>;
    pagination(page: number): Promise<object>;
    update(id: number, subscriptionsDto: SubscriptionsDto): Promise<object>;
    delete(user_id: number, course_id: number): Promise<object>;
}
