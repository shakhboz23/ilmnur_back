import { Category } from './models/category.models';
import { CategoryDto } from './dto/category.dto';
export declare class CategoryService {
    private categoryRepository;
    constructor(categoryRepository: typeof Category);
    create(categoryDto: CategoryDto): Promise<object>;
    getAll(): Promise<object>;
    getById(id: number): Promise<object>;
    pagination(page: number): Promise<object>;
    update(id: number, categoryDto: CategoryDto): Promise<object>;
    delete(id: number): Promise<object>;
}
