export declare class FilesService {
    createFile(file: any, file_type: string): Promise<string>;
    deleteFile(file_name: string): Promise<void>;
}
