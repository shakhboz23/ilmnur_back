/// <reference types="multer" />
import { ChatGateway } from '../gateway/gateway';
import { GroupService } from './group.service';
import { GroupDto } from './dto/group.dto';
import { JwtService } from '@nestjs/jwt';
export declare class GroupController {
    private readonly groupService;
    private readonly jwtService;
    private readonly chatGateway;
    constructor(groupService: GroupService, jwtService: JwtService, chatGateway: ChatGateway);
    create(groupDto: GroupDto, file: Express.Multer.File, headers: Record<string, string>): Promise<object>;
    getById(id: number): Promise<object>;
    getAll(category_id: number, headers: string): Promise<object>;
    getMyGroup(headers: string): Promise<object>;
    pagination(page: number): Promise<object>;
    update(id: number, groupDto: GroupDto, file: Express.Multer.File, headers: Record<string, string>): Promise<object>;
    deleteGroup(id: number): Promise<object>;
}
