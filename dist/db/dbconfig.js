module.exports = {
    user: process.env.NODE_ORACLEDB_USER || 'pdbadmin',
    password: process.env.NODE_ORACLEDB_PASSWORD || 'mypassword',
    connectString: process.env.NODE_ORACLEDB_CONNECTIONSTRING || 'localhost:1521/XEPDB1',
    externalAuth: false,
};
//# sourceMappingURL=dbconfig.js.map