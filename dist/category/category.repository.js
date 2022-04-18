"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepository = void 0;
const common_1 = require("@nestjs/common");
const OracleDB = require("oracledb");
const db_service_1 = require("../db/db.service");
const category_1 = require("./model/category");
let CategoryRepository = class CategoryRepository {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async findAll() {
        console.log('polling for all Categories');
        const connection = await this.databaseService.getConnection();
        const sql = `select * from category`;
        const bindParams = [];
        const options = { autoCommit: true, outFormat: OracleDB.OUT_FORMAT_OBJECT };
        const result = await this.databaseService.executeQuery(connection, sql, bindParams, options);
        const rows = result.rows.map((r) => new category_1.Category(r.ID, r.NAME));
        console.log('res', result.rows);
        console.log(rows);
        return rows;
    }
};
CategoryRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [db_service_1.DatabaseService])
], CategoryRepository);
exports.CategoryRepository = CategoryRepository;
//# sourceMappingURL=category.repository.js.map