import { Model } from 'sequelize-typescript';
interface OtpAttributes {
    id: string;
    phone: string;
    code: string;
    expire_time: number;
}
export declare class Otp extends Model<Otp, OtpAttributes> {
    id: string;
    phone: string;
    code: string;
    expire_time: number;
}
export {};
