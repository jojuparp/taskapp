import { DateDto } from 'src/app/dto/date.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDto } from './dto/task.dto';
import { TaskRepository } from './task.repository';
export declare class TaskService {
    private taskRepository;
    constructor(taskRepository: TaskRepository);
    findAll(): Promise<TaskDto[]>;
    findById(id: number): Promise<TaskDto[]>;
    findByCategory(categoryId: number): Promise<TaskDto[]>;
    findByDueDate(dateDto: DateDto): Promise<TaskDto[]>;
    create(createTaskDto: CreateTaskDto): Promise<TaskDto>;
    update(taskDto: TaskDto): Promise<TaskDto>;
    delete(id: number): Promise<void>;
    initTaskTable(): Promise<void>;
}
