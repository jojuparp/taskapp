import { Category } from './model/category';
import { CategoryService } from './category.service';
export declare class CategoryController {
    private categoryService;
    constructor(categoryService: CategoryService);
    findAll(): Promise<Category[]>;
    findOne(id: string): string;
}
