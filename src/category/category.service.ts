import { Injectable } from '@nestjs/common';
import { Category } from './model/category';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async findAll(): Promise<Category[]> {
    const res = await this.categoryRepository.findAll();
    return res;
  }
}
