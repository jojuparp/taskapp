import { Injectable, Logger } from '@nestjs/common';
import OracleDB = require('oracledb');
import { EnvService } from 'src/env/env.service';

@Injectable()
export class DatabaseService {
  constructor(private envService: EnvService) {}
  private readonly logger: Logger = new Logger();
  private readonly loggerContext = 'DatabaseService';

  async createPool(): Promise<OracleDB.Pool> {
    this.logger.log('Creating a database connection pool', this.loggerContext);
    try {
      const pool = await OracleDB.createPool(this.envService.dbConfig);
      this.logger.log('New database connection pool created', this.loggerContext);
      return pool;
    } catch (err) {
      this.logger.error('Error creating connection pool: ', err, this.loggerContext);
    }
  }

  async closePool(): Promise<void> {
    this.logger.log('Closing database connection pool', this.loggerContext);
    try {
      this.logger.log('Database connection pool closed', this.loggerContext);
      return await OracleDB.getPool().close(10);
    } catch (err) {
      this.logger.error('Error closing database connection pool: ', err, this.loggerContext);
    }
  }

  async getConnection(): Promise<OracleDB.Connection> {
    this.logger.log('Getting a database connection from the default connection pool', this.loggerContext);
    try {
      const connection = await OracleDB.getConnection();
      this.logger.log('New database connection created', this.loggerContext);
      return connection;
    } catch (err) {
      this.logger.error('Error getting a new database connection: ', err, this.loggerContext);
    }
  }

  async executeQuery<T>(
    connection: OracleDB.Connection,
    sql: string,
    bindParams: OracleDB.BindParameters = {},
    options: OracleDB.ExecuteOptions = { autoCommit: true, outFormat: OracleDB.OUT_FORMAT_OBJECT },
  ): Promise<OracleDB.Result<T>> {
    try {
      const result: OracleDB.Result<T> = await connection.execute(
        sql,
        bindParams,
        options,
      );

      return result;
    } catch (err) {
      this.logger.error('Error executing query: ', err, this.loggerContext);
    } finally {
      connection.close();
    }
  }
}
