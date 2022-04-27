import { Injectable, Logger } from '@nestjs/common';
import OracleDB = require('oracledb');
import { EnvService } from 'src/env/env.service';

@Injectable()
export class DatabaseService {
  constructor(private envService: EnvService) {}
  private readonly logger: Logger = new Logger();
  private readonly loggerContext = 'DatabaseService';
  
  async initClient(): Promise<void> {
    const libDirPath = this.envService.oracleLibDirPath;
    this.logger.log('Initalizing Instantclient', this.loggerContext);
    try {
      return OracleDB.initOracleClient({libDir: libDirPath});
    } catch (err) {
      this.logger.error('Error initializing Instantclient: ', err, this.loggerContext);
    }
  }

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

  async closePool() {
    this.logger.log('Closing database connection pool', this.loggerContext);
    try {
      this.logger.log('Database connection pool closed', this.loggerContext);
      return await OracleDB.getPool().close(10);
    } catch (err) {
      this.logger.error('Error closing database connection pool: ', err, this.loggerContext);
    }
  }

  async getConnection(): Promise<OracleDB.Connection> {
    try {
      const connection = await OracleDB.getConnection();
      return connection;
    } catch (err) {
      this.logger.error('Error getting a new database connection: ', err, this.loggerContext);
    }
  }

  async testConnection(): Promise<void> {
    this.logger.log('Testing database connection', this.loggerContext);
    await this.getConnection();
    this.logger.log('Succesfully connected to database', this.loggerContext);
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
