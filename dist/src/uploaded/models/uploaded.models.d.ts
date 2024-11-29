import { Model } from 'sequelize-typescript';
interface UploadedAttributes {
    public_id: string;
    duration: number;
    file_type: string;
    url: string;
}
export declare class Uploaded extends Model<Uploaded, UploadedAttributes> {
    id: number;
    public_id: string;
    duration: number;
    file_type: string;
    url: string;
}
export {};
