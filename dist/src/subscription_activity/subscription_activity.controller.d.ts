import { RoleService } from '../role/role.service';
import { Subscription_activityService } from './subscription_activity.service';
import { SubscriptionActivityDto } from './dto/subscription_activity.dto';
export declare class Subscription_activityController {
    private readonly subscription_activityService;
    private readonly roleService;
    constructor(subscription_activityService: Subscription_activityService, roleService: RoleService);
    create(subscriptionActivityDto: SubscriptionActivityDto): Promise<object>;
    getAll(): Promise<object>;
    getById(id: number): Promise<object>;
}
