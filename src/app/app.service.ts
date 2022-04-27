import { Injectable } from '@nestjs/common';
import { CategoryService } from 'src/category/category.service';
import { TaskService } from 'src/task/task.service';

@Injectable()
export class AppService {
  constructor(private categoryService: CategoryService, private taskService: TaskService) {}
  
  async initTalbes() {
    await this.categoryService.initCategoryTable();
    await this.taskService.initTaskTable();
  }
}
