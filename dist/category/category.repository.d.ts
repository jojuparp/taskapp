import { DatabaseService } from 'src/db/db.service';
import { Category } from './model/category';
export declare class CategoryRepository {
    private databaseService;
    constructor(databaseService: DatabaseService);
    findAll(): Promise<Category[]>;
}
