import OracleDB = require('oracledb');

export const dbconfig: OracleDB.ConnectionAttributes = {
  user: process.env.NODE_ORACLEDB_USER || 'taskapp',
  password: process.env.NODE_ORACLEDB_PASSWORD || 'taskapp',
  connectString:
    process.env.NODE_ORACLEDB_CONNECTIONSTRING || 'localhost:1521/XEPDB1',
};
