import OracleDB = require('oracledb');

export const dbconfig: OracleDB.ConnectionAttributes = {
  user: process.env.NODE_ORACLEDB_USER || 'super',
  password: process.env.NODE_ORACLEDB_PASSWORD || 'mypassword',
  connectString:
    process.env.NODE_ORACLEDB_CONNECTIONSTRING || 'localhost:1521/XEPDB1',
};
