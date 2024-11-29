import { ChatGroup } from './models/chat_group.models';
import { JwtService } from '@nestjs/jwt';
import { ChatGroupDto } from './dto/chat_group.dto';
export declare class ChatGroupService {
    private chatGroupRepository;
    private readonly jwtService;
    constructor(chatGroupRepository: typeof ChatGroup, jwtService: JwtService);
    create(chatGroupDto: ChatGroupDto): Promise<object>;
    getAll(): Promise<object>;
    getById(id: number, class_name: number): Promise<object>;
    pagination(page: number): Promise<object>;
    update(id: number, chatGroupDto: ChatGroupDto): Promise<object>;
    delete(id: number): Promise<object>;
}
