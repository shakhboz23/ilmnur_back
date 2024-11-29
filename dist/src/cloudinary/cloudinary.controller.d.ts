/// <reference types="multer" />
import { CloudinaryService } from './cloudinary.service';
export declare class VideoController {
    private readonly cloudinaryService;
    constructor(cloudinaryService: CloudinaryService);
    uploadVideo(file: Express.Multer.File): Promise<{
        publicId: string;
        url: string;
    }>;
    getVideoSignature(publicId: string): Promise<{
        signature: string;
        timestamp: number;
    }>;
    getSignedUrl(body: {
        public_id: string;
        format: string;
        resource_type: string;
    }): Promise<{
        url: string;
    }>;
}
