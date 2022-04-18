import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTaskDto } from './model/create-task.dto';
import { GetTaskDto } from './model/get-task.dto';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  @Header('Content-Type', 'application/json')
  async create(@Body() createTaskDto: CreateTaskDto): Promise<string> {
    const res = await this.taskService.create(createTaskDto);
    return res;
  }

  @Get()
  async findAll(): Promise<GetTaskDto[]> {
    const tasks = await this.taskService.findAll();
    return tasks;
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    console.log(id);
    return `This action returns a #${id} task`;
  }
}
