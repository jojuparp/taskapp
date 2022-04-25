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
const category_dto_1 = require("./dto/category.dto");
let CategoryRepository = class CategoryRepository {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async findAll() {
        console.log('polling for all Categories');
        const connection = await this.databaseService.getConnection();
        const sql = `select * from category`;
        const result = await this.databaseService.executeQuery(connection, sql);
        const rows = result.rows.map((r) => new category_dto_1.CategoryDto(r.ID, r.NAME));
        return rows;
    }
    async findOne(id) {
        console.log(`polling for category of id ${id}`);
        const connection = await this.databaseService.getConnection();
        const sql = `select * from category where id = :id`;
        const bindParams = { id: id };
        const result = await this.databaseService.executeQuery(connection, sql, bindParams);
        const rows = result.rows.map((r) => new category_dto_1.CategoryDto(r.ID, r.NAME));
        return rows;
    }
    async create(createCategoryDto) {
        console.log('creating category...');
        const connection = await this.databaseService.getConnection();
        const sql = `insert into category (name) values (:name) return id into :id`;
        const bindParams = {
            name: { val: createCategoryDto.name, dir: OracleDB.BIND_INOUT },
            id: { dir: OracleDB.BIND_OUT }
        };
        const result = await this.databaseService.executeQuery(connection, sql, bindParams);
        return new category_dto_1.CategoryDto(result.outBinds.id[0], result.outBinds.name[0]);
    }
    async update(categoryDto) {
        console.log(`updating Category of id ${categoryDto.id}`);
        const connection = await this.databaseService.getConnection();
        const sql = `update category set name = :name where id = :id return id, name into :id, :name`;
        const bindParams = {
            id: { val: categoryDto.id, dir: OracleDB.BIND_INOUT },
            name: { val: categoryDto.name, dir: OracleDB.BIND_INOUT }
        };
        const result = await this.databaseService.executeQuery(connection, sql, bindParams);
        return new category_dto_1.CategoryDto(result.outBinds.id[0], result.outBinds.name[0]);
    }
    async delete(id) {
        console.log(`deleting category of id ${id}...`);
        const connection = await this.databaseService.getConnection();
        const sql = `delete from category where id = :id`;
        const bindParams = { id: id };
        await this.databaseService.executeQuery(connection, sql, bindParams);
    }
    async initCategoryTable() {
        console.log('checking for existing category table...');
        const connection = await this.databaseService.getConnection();
        const sql = `select table_name from all_tables where table_name = 'CATEGORY'`;
        const result = await this.databaseService.executeQuery(connection, sql);
        if (result.rows.length == 0) {
            console.log('no existing table for categories. Creating one...');
            const createConnection = await this.databaseService.getConnection();
            const createSql = `create table category(
          id number(3) generated always as identity cache 30,
          name varchar(20) not null,
          constraint category_name unique (name),
          primary key (id))`;
            await this.databaseService.executeQuery(createConnection, createSql);
            console.log('category table initialized');
        }
        else {
            console.log('category table already initialized');
        }
    }
};
CategoryRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [db_service_1.DatabaseService])
], CategoryRepository);
exports.CategoryRepository = CategoryRepository;
//# sourceMappingURL=category.repository.js.map