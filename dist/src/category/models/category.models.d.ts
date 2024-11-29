import { Model } from 'sequelize-typescript';
interface CategoryAttributes {
    category: string;
}
export declare class Category extends Model<Category, CategoryAttributes> {
    id: number;
    category: string;
}
export {};
