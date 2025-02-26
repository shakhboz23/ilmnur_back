import { Model } from 'sequelize-typescript';
interface UploadedAttributes {
    status: boolean;
    duration: number;
    file_type: string;
    url: string;
}
export declare class Uploaded extends Model<Uploaded, UploadedAttributes> {
    id: number;
    duration: number;
    file_type: string;
    url: string;
    status: boolean;
}
export {};
