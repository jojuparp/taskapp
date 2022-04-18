import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { Category } from './model/category';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  /*   @Post()
  @Header('Content-Type', 'application/json')
  async create(@Body(new ValidationPipe()) task: Task) {
    console.log(task);
    return 'This action adds a new task';
  } */

  @Get()
  async findAll(): Promise<Category[]> {
    const tasks = await this.categoryService.findAll();
    return tasks;
  }

  @Get(':id/get')
  findOne(@Param('id') id: string): string {
    console.log(id);
    return `This action returns a #${id} task`;
  }
}
