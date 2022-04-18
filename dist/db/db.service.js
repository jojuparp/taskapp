"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const OracleDB = require("oracledb");
const db_config_1 = require("./db.config");
let DatabaseService = class DatabaseService {
    async createPool() {
        console.log('creating database connection pool...');
        try {
            const pool = await OracleDB.createPool(db_config_1.dbconfig);
            console.log('new database pool created');
            return pool;
        }
        catch (error) {
            console.log('error creating connection pool ', error);
        }
    }
    async closePool() {
        console.log('terminating database connection pool');
        try {
            console.log('database pool closed');
            OracleDB.getPool().close(10);
        }
        catch (error) {
            console.log(error);
        }
    }
    async getConnection() {
        try {
            const connection = await OracleDB.getConnection();
            return connection;
        }
        catch (error) {
            console.log(error);
        }
    }
    async executeQuery(connection, sql, bindParams, options) {
        try {
            const result = await connection.execute(sql, bindParams, options);
            return result;
        }
        catch (err) {
            console.error(err);
        }
        finally {
            connection.close();
        }
    }
};
DatabaseService = __decorate([
    (0, common_1.Injectable)()
], DatabaseService);
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=db.service.js.map