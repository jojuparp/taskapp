import { DatabaseService } from 'src/db/db.service';
import { CategoryDto } from './dto/category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
export declare class CategoryRepository {
    private databaseService;
    constructor(databaseService: DatabaseService);
    findAll(): Promise<CategoryDto[]>;
    findOne(id: number): Promise<CategoryDto[]>;
    create(createCategoryDto: CreateCategoryDto): Promise<CategoryDto>;
    update(categoryDto: CategoryDto): Promise<CategoryDto>;
    delete(id: number): Promise<void>;
    initCategoryTable(): Promise<void>;
}
