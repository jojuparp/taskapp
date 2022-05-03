import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { DateDto } from 'src/app/dto/date.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDto } from './dto/task.dto';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  async findAll(): Promise<TaskDto[]> {
    const res = await this.taskService.findAll();
    return res;
  }

  @Get('task/:taskId')
  async findById(@Param('taskId', new ParseIntPipe()) taskId: number): Promise<TaskDto[]> {
    const res = await this.taskService.findById(taskId);
    return res;
  }

  @Get('category/:categoryId')
  async findByCategory(@Param('categoryId', new ParseIntPipe()) categoryId: number): Promise<TaskDto[]> {
    const res = await this.taskService.findByCategory(categoryId);
    return res;
  }

  @Get('duedate')
  @Header('Content-Type', 'application/json')
  async findByDueDate(@Body() dateDto: DateDto): Promise<TaskDto[]> {
    const res = await this.taskService.findByDueDate(dateDto);
    return res;
  }

  @Post('create')
  @Header('Content-Type', 'application/json')
  async create(@Body() createTaskDto: CreateTaskDto): Promise<TaskDto> {
    const res = await this.taskService.create(createTaskDto);
    return res;
  }

  @Patch()
  @Header('Content-Type', 'application/json')
  async update(@Body() taskDto: TaskDto): Promise<TaskDto> {
    const res = await this.taskService.update(taskDto);
    return res;
  }

  @Delete('delete/:taskId')
  async delete(@Param('taskId', new ParseIntPipe()) taskId: number) {
    return await this.taskService.delete(taskId);
  }
}
