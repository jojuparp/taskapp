import { CategoryDto } from './dto/category.dto';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
export declare class CategoryController {
    private categoryService;
    constructor(categoryService: CategoryService);
    findAll(): Promise<CategoryDto[]>;
    findOne(id: number): Promise<CategoryDto[]>;
    create(createCategoryDto: CreateCategoryDto): Promise<CategoryDto>;
    update(categoryDto: CategoryDto): Promise<CategoryDto>;
    delete(id: number): Promise<void>;
}
