import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './model/create-task.dto';
import { GetTaskDto } from './model/get-task.dto';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  async findAll(): Promise<GetTaskDto[]> {
    const res = await this.taskRepository.findAll();
    return res;
  }

  async create(createTaskDto: CreateTaskDto): Promise<string> {
    const res = await this.taskRepository.create(createTaskDto);
    return res;
  }
}
