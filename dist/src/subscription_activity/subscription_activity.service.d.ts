import { JwtService } from '@nestjs/jwt';
import { SubscriptionActivity, SubscriptionActivityStatus } from './models/subscription_activity.models';
import { SubscriptionActivityDto } from './dto/subscription_activity.dto';
export declare class Subscription_activityService {
    private subscription_activityRepository;
    private readonly jwtService;
    constructor(subscription_activityRepository: typeof SubscriptionActivity, jwtService: JwtService);
    create(subscriptionActivityDto: SubscriptionActivityDto): Promise<object>;
    update(id: number, status: SubscriptionActivityStatus): Promise<object>;
    getAll(): Promise<object>;
    getById(id: number): Promise<object>;
    pagination(page: number): Promise<object>;
    delete(id: number): Promise<object>;
}
