/// <reference types="multer" />
import { UploadedService } from './uploaded.service';
import { UploadedDto } from './dto/uploaded.dto';
import { UpdateDto } from './dto/update';
export declare class UploadedController {
    private readonly uploadedService;
    constructor(uploadedService: UploadedService);
    create(uploadedDto: UploadedDto, file: Express.Multer.File): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: any;
        error?: undefined;
    } | {
        statusCode: import("@nestjs/common").HttpStatus;
        error: any;
        message?: undefined;
        data?: undefined;
    }>;
    getById(id: number): Promise<object>;
    getAll(): Promise<object>;
    pagination(page: number): Promise<object>;
    update(id: number, updateDto: UpdateDto): Promise<object>;
    deleteUploaded(id: number): Promise<object>;
}
