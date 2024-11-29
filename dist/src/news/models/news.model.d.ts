import { Model } from 'sequelize-typescript';
interface NewsAttr {
    title: string;
    source: string;
    description: string;
}
export declare class News extends Model<News, NewsAttr> {
    id: number;
    title: string;
    source: string;
    description: string;
}
export {};
