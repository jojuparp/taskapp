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
exports.TaskRepository = void 0;
const common_1 = require("@nestjs/common");
const OracleDB = require("oracledb");
const db_service_1 = require("../db/db.service");
const task_dto_1 = require("./dto/task.dto");
let TaskRepository = class TaskRepository {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async findAll() {
        console.log('polling for all Tasks...');
        const connection = await this.databaseService.getConnection();
        const sql = `select * from task`;
        const result = await this.databaseService.executeQuery(connection, sql);
        const rows = result.rows.map((r) => new task_dto_1.TaskDto(r.ID, r.DESCRIPTION, new Date(r.DUEDATE), r.CATEGORYID));
        return rows;
    }
    async findById(id) {
        console.log(`getting task of id ${id}...`);
        const connection = await this.databaseService.getConnection();
        const sql = `select * from task where id = :id`;
        const bindParams = { id: id };
        const result = await this.databaseService.executeQuery(connection, sql, bindParams);
        const tasks = result.rows.map((r) => new task_dto_1.TaskDto(r.ID, r.DESCRIPTION, new Date(r.DUEDATE), r.CATEGORYID));
        return tasks;
    }
    async findByCategory(categoryId) {
        console.log(`fetching tasks of categoryid ${categoryId}...`);
        const connection = await this.databaseService.getConnection();
        const sql = `select * from task where categoryid = :categoryId`;
        const bindParams = { categoryId: categoryId };
        const result = await this.databaseService.executeQuery(connection, sql, bindParams);
        const tasks = result.rows.map((r) => new task_dto_1.TaskDto(r.ID, r.DESCRIPTION, new Date(r.DUEDATE), r.CATEGORYID));
        return tasks;
    }
    async findByDueDate(dateDto) {
        const logFormat = `${dateDto.date.getDate()}/${dateDto.date.getMonth() + 1}/${dateDto.date.getFullYear()}`;
        console.log(`fetching tasks due on ${logFormat}...`);
        const connection = await this.databaseService.getConnection();
        const sql = `select * from task where trunc(duedate) = trunc(:dueDate)`;
        const bindParams = { dueDate: dateDto.date };
        const result = await this.databaseService.executeQuery(connection, sql, bindParams);
        const tasks = result.rows.map((r) => new task_dto_1.TaskDto(r.ID, r.DESCRIPTION, new Date(r.DUEDATE), r.CATEGORYID));
        return tasks;
    }
    async create(createTaskDto) {
        console.log('creating task...');
        const connection = await this.databaseService.getConnection();
        const sql = `
    insert into task (description, dueDate, categoryId)
    values (:description, :dueDate, :categoryId)
    return id, description, duedate, categoryid into :id, :description, :dueDate, :categoryId`;
        const options = { autoCommit: true, outFormat: OracleDB.OUT_FORMAT_OBJECT };
        const bindParams = {
            description: { val: createTaskDto.description, dir: OracleDB.BIND_INOUT },
            dueDate: { val: createTaskDto.dueDate, dir: OracleDB.BIND_INOUT },
            categoryId: { val: createTaskDto.categoryId, dir: OracleDB.BIND_INOUT },
            id: { dir: OracleDB.BIND_OUT }
        };
        const result = await this.databaseService.executeQuery(connection, sql, bindParams, options);
        const newTask = new task_dto_1.TaskDto(result.outBinds.id[0], result.outBinds.description[0], result.outBinds.dueDate[0], result.outBinds.categoryId[0]);
        return newTask;
    }
    async update(taskDto) {
        console.log(`updating task of id ${taskDto.id}...`);
        const connection = await this.databaseService.getConnection();
        const sql = `
    update task set
    description = :description, duedate = :dueDate, categoryid = :categoryId
    where id = :id
    return id, description, duedate, categoryid into :id, :description, :dueDate, :categoryId`;
        const bindParams = {
            description: { val: taskDto.description, dir: OracleDB.BIND_INOUT },
            dueDate: { val: taskDto.dueDate, dir: OracleDB.BIND_INOUT },
            categoryId: { val: taskDto.categoryId, dir: OracleDB.BIND_INOUT },
            id: { val: taskDto.id, dir: OracleDB.BIND_INOUT }
        };
        const result = await this.databaseService.executeQuery(connection, sql, bindParams);
        const updatedTask = new task_dto_1.TaskDto(result.outBinds.id[0], result.outBinds.description[0], result.outBinds.dueDate[0], result.outBinds.categoryId[0]);
        return updatedTask;
    }
    async delete(id) {
        console.log(`deleting task of id ${id}...`);
        const connection = await this.databaseService.getConnection();
        const sql = `delete from task where id = :id`;
        const bindParams = { id: id };
        await this.databaseService.executeQuery(connection, sql, bindParams);
    }
    async initTaskTable() {
        console.log('checking for existing task table...');
        const connection = await this.databaseService.getConnection();
        const sql = `select table_name from all_tables where table_name = 'TASK'`;
        const result = await this.databaseService.executeQuery(connection, sql);
        if (result.rows.length == 0) {
            console.log('no existing table for tasks. Creating one...');
            const createConnection = await this.databaseService.getConnection();
            const createSql = `create table task(
          id number(3) generated always as identity cache 30,
          description varchar(40) not null,
          dueDate date,
          categoryId number(3) not null,
          constraint category_fk
            foreign key (categoryId)
            references category(id)
            on delete cascade,
          primary key (id))`;
            await this.databaseService.executeQuery(createConnection, createSql);
            console.log('task table initialized');
        }
        else {
            console.log('task table already initialized');
        }
    }
};
TaskRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [db_service_1.DatabaseService])
], TaskRepository);
exports.TaskRepository = TaskRepository;
//# sourceMappingURL=task.repository.js.map