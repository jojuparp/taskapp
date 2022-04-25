import { DateDto } from 'src/app/dto/date.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDto } from './dto/task.dto';
import { TaskService } from './task.service';
export declare class TaskController {
    private taskService;
    constructor(taskService: TaskService);
    findAll(): Promise<TaskDto[]>;
    findById(taskId: number): Promise<TaskDto[]>;
    findByCategory(categoryId: number): Promise<TaskDto[]>;
    findByDueDate(dateDto: DateDto): Promise<TaskDto[]>;
    create(createTaskDto: CreateTaskDto): Promise<TaskDto>;
    update(taskDto: TaskDto): Promise<TaskDto>;
    delete(taskId: number): Promise<void>;
}
