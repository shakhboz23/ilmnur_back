import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsDto } from './dto/subscriptions.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateSubscriptionsDto } from './dto/create_subscriptions.dto';
export declare class SubscriptionsController {
    private readonly subscriptionsService;
    private readonly jwtService;
    constructor(subscriptionsService: SubscriptionsService, jwtService: JwtService);
    create(subscriptionsDto: SubscriptionsDto, headers?: string): Promise<object>;
    CreateSubscription(createSubscriptionDto: CreateSubscriptionsDto, headers?: string): Promise<object>;
    getById(id: number): Promise<object>;
    getAll(headers?: string): Promise<object>;
    getByUserId(headers?: string): Promise<object>;
    pagination(page: number): Promise<object>;
    update(id: number, subscriptionsDto: SubscriptionsDto): Promise<object>;
    deleteSubscriptions(id: number): void;
}
