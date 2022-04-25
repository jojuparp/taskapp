import { Injectable } from '@nestjs/common';
import OracleDB = require('oracledb');
import { dbconfig } from './db.config';

@Injectable()
export class DatabaseService {
  async initClient(): Promise<void> {
    const libDirPath = process.env.LIB_DIR_PATH || '/Users/joni1/devel/instantclient'
    console.log(`initalizing Instantclient with path ${libDirPath}`)
    try {
      return OracleDB.initOracleClient({libDir: libDirPath})
    } catch (err) {
      console.error("error initializing client: ", err);
    }
  }

  async createPool(): Promise<OracleDB.Pool> {
    console.log('creating database connection pool...');
    try {
      const pool = await OracleDB.createPool(dbconfig);
      console.log('new database pool created');
      return pool;
    } catch (error) {
      console.log('error creating connection pool: ', error);
    }
  }

  async closePool() {
    console.log('terminating database connection pool...');
    try {
      console.log('database pool closed');
      return OracleDB.getPool().close(10);
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
      console.error(err);
    } finally {
      connection.close();
    }
  }
}
