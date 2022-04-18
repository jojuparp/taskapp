import { CreateTaskDto } from './model/create-task.dto';
import { GetTaskDto } from './model/get-task.dto';
import { TaskRepository } from './task.repository';
export declare class TaskService {
    private taskRepository;
    constructor(taskRepository: TaskRepository);
    findAll(): Promise<GetTaskDto[]>;
    create(createTaskDto: CreateTaskDto): Promise<string>;
}
