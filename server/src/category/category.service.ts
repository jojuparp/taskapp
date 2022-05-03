import { Injectable } from '@nestjs/common';
import { CategoryDto } from './dto/category.dto';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async findAll(): Promise<CategoryDto[]> {
    const res = await this.categoryRepository.findAll();
    return res;
  }

  async findOne(id: number): Promise<CategoryDto[]> {
    const res = await this.categoryRepository.findOne(id);
    return res;
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
    const res = await this.categoryRepository.create(createCategoryDto);
    return res;
  }
  
  async update(categoryDtdo: CategoryDto): Promise<CategoryDto> {
    const res = await this.categoryRepository.update(categoryDtdo);
    return res;
  }

  async delete(id: number): Promise<void> {
    const res = await this.categoryRepository.delete(id);
    return res;
  }

  async initCategoryTable(): Promise<void> {
    const res = await this.categoryRepository.initCategoryTable();
    return res;
  }
}
