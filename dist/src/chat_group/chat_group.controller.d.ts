import { ChatGroupDto } from './dto/chat_group.dto';
import { ChatGroupService } from './chat_group.service';
export declare class ChatGroupController {
    private readonly chatGroupService;
    constructor(chatGroupService: ChatGroupService);
    create(chatGroupDto: ChatGroupDto): Promise<object>;
    getById(id: number, class_name: number): Promise<object>;
    getAll(): Promise<object>;
    pagination(page: number): Promise<object>;
    update(id: number, chatGroupDto: ChatGroupDto): Promise<object>;
    delete(id: number): Promise<object>;
}