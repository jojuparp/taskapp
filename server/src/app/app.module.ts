import { Inject, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from '../category/category.module';
import { DatabaseModule } from '../db/db.module';
import { DatabaseService } from '../db/db.service';
import { TaskModule } from '../task/task.module';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from 'src/env/env.validation';
import { EnvModule } from 'src/env/env.module';

@Module({
  imports: [
    DatabaseModule,
    EnvModule,
    TaskModule,
    CategoryModule,
    ConfigModule.forRoot({
      cache: true,
      validate: validateEnv,
      ignoreEnvFile: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit, OnModuleDestroy {
  @Inject() private databaseService: DatabaseService;
  
  async onModuleInit(): Promise<void> {
    await this.databaseService.createPool();
    await this.databaseService.getConnection();
  }

  async onModuleDestroy(): Promise<void> {
    await this.databaseService.closePool();
  }
}
