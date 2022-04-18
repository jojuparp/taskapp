import { Inject, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { CatsModule } from './cats/cats.module';
import { DatabaseModule } from './db/db.module';
import { DatabaseService } from './db/db.service';
import { TaskModule } from './task/task.module';

@Module({
  imports: [CatsModule, DatabaseModule, TaskModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit, OnModuleDestroy {
  @Inject() private databaseService: DatabaseService;
  async onModuleInit() {
    await this.databaseService.createPool();
  }

  async onModuleDestroy() {
    await this.databaseService.closePool();
  }
}
