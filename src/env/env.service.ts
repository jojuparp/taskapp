import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OracleDB from 'oracledb';

@Injectable()
export class EnvService {
  constructor(private configService: ConfigService) {}

  get nodeEnv(): string {
    console.log('prööt');
    return this.configService.get<string>('NODE_ENV');
  }

  get dbConfig(): OracleDB.ConnectionAttributes {
    return {
      user: this.configService.get<string>('ORACLEDB_USER'),
      password: this.configService.get<string>('ORACLEDB_PASSWORD'),
      connectionString: this.configService.get<string>('ORACLEDB_CONNECTION_STRING')
    };
  }
}