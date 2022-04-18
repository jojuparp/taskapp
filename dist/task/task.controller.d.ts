import { CreateTaskDto } from './model/create-task.dto';
import { GetTaskDto } from './model/get-task.dto';
import { TaskService } from './task.service';
export declare class TaskController {
    private taskService;
    constructor(taskService: TaskService);
    create(createTaskDto: CreateTaskDto): Promise<string>;
    findAll(): Promise<GetTaskDto[]>;
    findOne(id: string): string;
}
