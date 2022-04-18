import { DatabaseService } from 'src/db/db.service';
import { CreateTaskDto } from './model/create-task.dto';
import { GetTaskDto } from './model/get-task.dto';
export declare class TaskRepository {
    private databaseService;
    constructor(databaseService: DatabaseService);
    findAll(): Promise<GetTaskDto[]>;
    create(createTaskDto: CreateTaskDto): Promise<string>;
}
