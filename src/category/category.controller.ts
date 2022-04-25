import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  ParseIntPipe,
  Patch,
  Post
} from '@nestjs/common';
import { CategoryDto } from './dto/category.dto';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  async findAll(): Promise<CategoryDto[]> {
    const res = await this.categoryService.findAll();
    return res;
  }

  @Get('category/:id')
  async findOne(@Param('id', new ParseIntPipe()) id: number): Promise<CategoryDto[]> {
    const res = await this.categoryService.findOne(id);
    return res;
  }

  @Post('create')
  @Header('Content-Type', 'application/json')
  async create(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
    const res = this.categoryService.create(createCategoryDto);
    return res;
  }


  @Patch('update')
  @Header('Content-Type', 'application/json')
  async update(@Body() categoryDto: CategoryDto): Promise<CategoryDto> {
    const res = await this.categoryService.update(categoryDto);
    return res;
  }

  @Delete('delete/:id') 
  async delete(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
    const res = await this.categoryService.delete(id);
    return res;
  }
}
