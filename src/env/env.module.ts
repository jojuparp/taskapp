import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvService } from './env.service';

@Global()
@Module({
  providers: [EnvService],
  imports: [ConfigModule],
  exports: [EnvService],
})
export class EnvModule {}