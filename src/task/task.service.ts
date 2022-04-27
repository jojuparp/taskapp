import { Injectable } from '@nestjs/common';
import { DateDto } from 'src/app/dto/date.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDto } from './dto/task.dto';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  async findAll(): Promise<TaskDto[]> {
    const res = await this.taskRepository.findAll();
    return res;
  }

  async findById(id: number): Promise<TaskDto[]> {
    const res = await this.taskRepository.findById(id);
    return res;
  }

  async findByCategory(categoryId: number): Promise<TaskDto[]> {
    const res = await this.taskRepository.findByCategory(categoryId);
    return res;
  }

  async findByDueDate(dateDto: DateDto): Promise<TaskDto[]> {
    const res = await this.taskRepository.findByDueDate(dateDto);
    return res;
  }

  async create(createTaskDto: CreateTaskDto): Promise<TaskDto> {
    const res = await this.taskRepository.create(createTaskDto);
    return res;
  }

  async update(taskDto: TaskDto): Promise<TaskDto> {
    const res = await this.taskRepository.update(taskDto);
    return res;
  }

  async delete(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }

  async initTaskTable(): Promise<void> {
    await this.taskRepository.initTaskTable();
  }
}
