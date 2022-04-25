import OracleDB = require('oracledb');
export declare class DatabaseService {
    initClient(): Promise<void>;
    createPool(): Promise<OracleDB.Pool>;
    closePool(): Promise<void>;
    getConnection(): Promise<OracleDB.Connection>;
    executeQuery<T>(connection: OracleDB.Connection, sql: string, bindParams?: OracleDB.BindParameters, options?: OracleDB.ExecuteOptions): Promise<OracleDB.Result<T>>;
}
