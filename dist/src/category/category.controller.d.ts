import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(categoryDto: CategoryDto): Promise<object>;
    getById(id: number): Promise<object>;
    getAll(): Promise<object>;
    pagination(page: number): Promise<object>;
    update(id: number, categoryDto: CategoryDto): Promise<object>;
    deleteCategory(id: number): Promise<object>;
}
