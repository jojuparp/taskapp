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
const get_task_dto_1 = require("./model/get-task.dto");
let TaskRepository = class TaskRepository {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async findAll() {
        console.log('polling for all Tasks');
        const connection = await this.databaseService.getConnection();
        const sql = `select * from task`;
        const bindParams = [];
        const options = { autoCommit: true, outFormat: OracleDB.OUT_FORMAT_OBJECT };
        const result = await this.databaseService.executeQuery(connection, sql, bindParams, options);
        const rows = result.rows.map((r) => new get_task_dto_1.GetTaskDto(r.ID, r.DESCRIPTION, new Date(r.DUEDATE), r.CATEGORYID));
        console.log('res', result.rows);
        console.log(rows);
        return rows;
    }
    async create(createTaskDto) {
        console.log(`creating task ${createTaskDto}`);
        const connection = await this.databaseService.getConnection();
        const dueDate = new Date(createTaskDto.dueDate);
        const format = `${dueDate.getDate()}-${dueDate.getMonth()}-${dueDate.getFullYear()} ${dueDate.getHours()}:${dueDate.getMinutes()}:${dueDate.getSeconds()}`;
        const a = `to_date (${format}, 'DD-MM-YYYY HH24:MI:SS')`;
        const sql = `insert into task (description, dueDate, categoryId) values (:description, :dueDate, :categoryId)`;
        const bindParams = [
            createTaskDto.description,
            dueDate,
            createTaskDto.categoryId,
        ];
        const options = { autoCommit: true, outFormat: OracleDB.OUT_FORMAT_OBJECT };
        const result = await this.databaseService.executeQuery(connection, sql, bindParams, options);
        console.log('res', result.rowsAffected);
        return result.lastRowid;
    }
};
TaskRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [db_service_1.DatabaseService])
], TaskRepository);
exports.TaskRepository = TaskRepository;
//# sourceMappingURL=task.repository.js.map