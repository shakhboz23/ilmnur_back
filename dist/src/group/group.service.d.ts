import { Group } from './models/group.models';
import { GroupDto } from './dto/group.dto';
import { UploadedService } from '../uploaded/uploaded.service';
export declare class GroupService {
    private groupRepository;
    private readonly uploadedService;
    constructor(groupRepository: typeof Group, uploadedService: UploadedService);
    create(groupDto: GroupDto, user_id: number, cover: any): Promise<object>;
    getAll(category_id: number, user_id?: number, type?: string): Promise<object>;
    getById(id: number): Promise<object>;
    pagination(page: number): Promise<object>;
    update(id: number, groupDto: GroupDto, cover: any, user_id: number): Promise<object>;
    delete(id: number): Promise<object>;
}
