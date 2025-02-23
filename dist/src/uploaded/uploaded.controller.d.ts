/// <reference types="multer" />
import { UploadedService } from './uploaded.service';
import { UpdateDto } from './dto/update';
export declare class UploadedController {
    private readonly uploadedService;
    constructor(uploadedService: UploadedService);
    create(file: Express.Multer.File, body: {
        file_type: string;
    }): Promise<any>;
    getById(id: number): Promise<void>;
    getAll(): Promise<object>;
    pagination(page: number): Promise<object>;
    update(id: number, updateDto: UpdateDto): Promise<object>;
    deleteUploaded(id: number): Promise<object>;
}
