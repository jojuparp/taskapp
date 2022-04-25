import { Inject, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from '../category/category.module';
import { DatabaseModule } from '../db/db.module';
import { DatabaseService } from '../db/db.service';
import { TaskModule } from '../task/task.module';
import { TaskService } from 'src/task/task.service';
import { CategoryService } from 'src/category/category.service';

@Module({
  imports: [DatabaseModule, TaskModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit, OnModuleDestroy {
  @Inject() private databaseService: DatabaseService;
  @Inject() private categoryService: CategoryService;
  @Inject() private taskService: TaskService;
  
  async onModuleInit(): Promise<void> {
    await this.databaseService.initClient();
    await this.databaseService.createPool();
    await this.categoryService.initCategoryTable();
    await this.taskService.initTaskTable();
  }

  async onModuleDestroy(): Promise<void> {
    await this.databaseService.closePool();
  }
}
