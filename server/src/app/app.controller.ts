import { Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('init')
  async initTables(): Promise<void> {
    await this.appService.initTalbes();
  } 
}
