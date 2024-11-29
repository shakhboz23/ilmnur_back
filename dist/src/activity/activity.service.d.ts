import { GetActivityDto } from './dto/get_activity.dto';
import { Activity } from './models/activity.models';
import { ActivityDto } from './dto/activity.dto';
export declare class ActivityService {
    private activityRepository;
    constructor(activityRepository: typeof Activity);
    create(activityDto: ActivityDto): Promise<object>;
    getAll(): Promise<object>;
    getActivity(getActivityDto: GetActivityDto): Promise<object>;
    getById(id: string): Promise<object>;
    pagination(page: number, limit: number): Promise<object>;
    deleteUser(id: string): Promise<object>;
}
