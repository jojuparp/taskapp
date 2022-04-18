import { Injectable } from '@nestjs/common';
import OracleDB = require('oracledb');
import { DatabaseService } from 'src/db/db.service';
import { CreateTaskDto } from './model/create-task.dto';
import { GetTaskDto } from './model/get-task.dto';

interface TaskRow {
  ID: number;
  DESCRIPTION: string;
  DUEDATE: typeof OracleDB.DATE;
  CATEGORYID: number;
}

@Injectable()
export class TaskRepository {
  constructor(private databaseService: DatabaseService) {}
  async findAll(): Promise<GetTaskDto[]> {
    console.log('polling for all Tasks');
    const connection: OracleDB.Connection =
      await this.databaseService.getConnection();

    const sql = `select * from task`;
    const bindParams = [];
    const options = { autoCommit: true, outFormat: OracleDB.OUT_FORMAT_OBJECT };

    const result = await this.databaseService.executeQuery<TaskRow>(
      connection,
      sql,
      bindParams,
      options,
    );

    const rows = result.rows.map(
      (r) =>
        new GetTaskDto(r.ID, r.DESCRIPTION, new Date(r.DUEDATE), r.CATEGORYID),
    );
    console.log('res', result.rows);
    console.log(rows);
    return rows;
  }

  async create(createTaskDto: CreateTaskDto): Promise<string> {
    console.log(`creating task ${createTaskDto}`);
    const connection: OracleDB.Connection =
      await this.databaseService.getConnection();

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
    /* 
    const bparam = {
      description: {
        dir: OracleDB.BIND_IN,
        val: createTaskDto.description,
        type: OracleDB.STRING,
      },
    } */

    const result = await this.databaseService.executeQuery<TaskRow>(
      connection,
      sql,
      bindParams,
      options,
    );

    console.log('res', result.rowsAffected);
    return result.lastRowid;
  }
}
