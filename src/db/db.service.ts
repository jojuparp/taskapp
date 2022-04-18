import { Injectable } from '@nestjs/common';
import OracleDB = require('oracledb');
import { dbconfig } from './db.config';

@Injectable()
export class DatabaseService {
  async createPool(): Promise<OracleDB.Pool> {
    console.log('creating database connection pool...');
    try {
      const pool = await OracleDB.createPool(dbconfig);
      console.log('new database pool created');
      return pool;
    } catch (error) {
      console.log('error creating connection pool ', error);
    }
  }

  async closePool() {
    console.log('terminating database connection pool');
    try {
      console.log('database pool closed');
      OracleDB.getPool().close(10);
    } catch (error) {
      console.log(error);
    }
  }

  async getConnection(): Promise<OracleDB.Connection> {
    try {
      const connection = await OracleDB.getConnection();
      return connection;
    } catch (error) {
      console.log(error);
    }
  }

  async executeQuery<T>(
    connection: OracleDB.Connection,
    sql: string,
    bindParams: OracleDB.BindParameters,
    options: OracleDB.ExecuteOptions,
  ): Promise<OracleDB.Result<T>> {
    try {
      const result: OracleDB.Result<T> = await connection.execute(
        sql,
        bindParams,
        options,
      );

      return result;
    } catch (err) {
      console.error(err);
    } finally {
      connection.close();
    }
  }
}
