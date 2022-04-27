import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OracleDB from 'oracledb';

@Injectable()
export class EnvService {
  constructor(private configService: ConfigService) {}

  get oracleLibDirPath(): string {
    return this.configService.get<string>('NODE_ORACLEDB_LIBDIR_PATH');
  }

  get oracleUser(): string {
    return this.configService.get<string>('NODE_ORACLEDB_USER');
  }

  get oraclePassword(): string {
    return this.configService.get<string>('NODE_ORACLEDB_PASSWORD');
  }

  get oracleConnectionString(): string {
    return this.configService.get<string>('NODE_ORACLEDB_CONNECTION_STRING');
  }

  get dbConfig(): OracleDB.ConnectionAttributes {
    return {
      user: this.configService.get<string>('NODE_ORACLEDB_USER'),
      password: this.configService.get<string>('NODE_ORACLEDB_PASSWORD'),
      connectionString: this.configService.get<string>('NODE_ORACLEDB_CONNECTION_STRING')
    };
  }
}