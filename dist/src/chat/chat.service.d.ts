import { HttpStatus } from '@nestjs/common';
import { Chat } from './models/chat.model';
import { ChatDto } from './dto/chat.dto';
import { FilesService } from '../files/files.service';
export declare class ChatService {
    private readonly ChatRepository;
    private readonly fileService;
    constructor(ChatRepository: typeof Chat, fileService: FilesService);
    create(chatDto: ChatDto, file: any, user_id: number): Promise<Chat | {
        status: HttpStatus;
        error: any;
    }>;
    findAll(page: number, chatgroup_id?: number): Promise<{
        status: HttpStatus;
        data: {
            records: Chat[];
            pagination: {
                currentPage: number;
                total_pages: number;
                total_count: number;
            };
        };
    } | {
        status: HttpStatus;
        error: any;
    }>;
    getGroupChats(chatgroup_id: number, page: number): Promise<{
        status: HttpStatus;
        data: {
            records: Chat[];
            pagination: {
                currentPage: number;
                total_pages: number;
                total_count: number;
            };
        };
    } | {
        status: HttpStatus;
        error: any;
    }>;
    findAllId(): Promise<Chat[] | {
        status: HttpStatus;
        error: any;
    }>;
    findById(id: string): Promise<{
        status: HttpStatus;
        data: Chat;
        error?: undefined;
    } | {
        status: HttpStatus;
        error: any;
        data?: undefined;
    }>;
    update(id: string, chatDto: ChatDto): Promise<{
        status: HttpStatus;
        data: Chat;
        error?: undefined;
    } | {
        status: HttpStatus;
        error: any;
        data?: undefined;
    }>;
    delete(id: string): Promise<{
        status: HttpStatus;
        data: string;
        error?: undefined;
    } | {
        status: HttpStatus;
        error: any;
        data?: undefined;
    }>;
}
