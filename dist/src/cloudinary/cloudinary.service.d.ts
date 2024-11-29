export declare class CloudinaryService {
    uploadPrivateVideo(filePath: string): Promise<import("cloudinary").UploadApiResponse>;
    generateVideoSignature(publicId: string): {
        signature: string;
        timestamp: number;
    };
}
