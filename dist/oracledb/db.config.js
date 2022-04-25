"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbconfig = void 0;
exports.dbconfig = {
    user: process.env.NODE_ORACLEDB_USER || 'taskapp',
    password: process.env.NODE_ORACLEDB_PASSWORD || 'taskapp',
    connectString: process.env.NODE_ORACLEDB_CONNECTIONSTRING || 'localhost:1521/XEPDB1',
};
//# sourceMappingURL=db.config.js.map