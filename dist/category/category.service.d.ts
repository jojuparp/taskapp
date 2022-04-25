import { CategoryDto } from './dto/category.dto';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
export declare class CategoryService {
    private categoryRepository;
    constructor(categoryRepository: CategoryRepository);
    findAll(): Promise<CategoryDto[]>;
    findOne(id: number): Promise<CategoryDto[]>;
    create(createCategoryDto: CreateCategoryDto): Promise<CategoryDto>;
    update(categoryDtdo: CategoryDto): Promise<CategoryDto>;
    delete(id: number): Promise<void>;
    initCategoryTable(): Promise<void>;
}
