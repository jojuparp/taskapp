import { Category } from './model/category';
import { CategoryRepository } from './category.repository';
export declare class CategoryService {
    private categoryRepository;
    constructor(categoryRepository: CategoryRepository);
    findAll(): Promise<Category[]>;
}
