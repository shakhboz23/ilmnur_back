import { Model } from "sequelize-typescript";
import { User } from "src/user/models/user.models";
interface BotAttr {
    user_id: number;
    bot_id: number;
    username: string;
    name: string;
    surname: string;
    phone: string;
    status: boolean;
}
export declare class Bot extends Model<Bot, BotAttr> {
    user_id: number;
    user: User[];
    bot_id: number;
    username: string;
    name: string;
    surname: string;
    phone: string;
    status: boolean;
}
export {};
