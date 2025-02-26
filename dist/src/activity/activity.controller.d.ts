import { ActivityService } from './activity.service';
import { ActivityDto } from './dto/activity.dto';
import { GetActivityDto } from './dto/get_activity.dto';
export declare class ActivityController {
    private readonly activityService;
    constructor(activityService: ActivityService);
    register(activityDto: ActivityDto): Promise<object>;
    getAll(): Promise<object>;
    getActivity(getActivityDto: GetActivityDto): Promise<object>;
    getById(id: string): Promise<object>;
    pagination(page: number, limit: number): Promise<object>;
    deleteUser(id: string): Promise<object>;
}
