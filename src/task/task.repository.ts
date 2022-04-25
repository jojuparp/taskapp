import { Injectable } from '@nestjs/common';
import OracleDB = require('oracledb');
import { DateDto } from 'src/app/dto/date.dto';
import { DatabaseService } from 'src/db/db.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDto } from './dto/task.dto';

interface GetTaskRow {
  ID: number;
  DESCRIPTION: string;
  DUEDATE: typeof OracleDB.DATE;
  CATEGORYID: number;
}

interface CreateOrUpdateTaskRow {
  id: number[];
  description: string[];
  dueDate: Date[];
  categoryId: number[];
}

@Injectable()
export class TaskRepository {
  constructor(private databaseService: DatabaseService) {}

  async findAll(): Promise<TaskDto[]> {
    console.log('polling for all Tasks...');
    const connection: OracleDB.Connection =
      await this.databaseService.getConnection();

    const sql = `select * from task`;

    const result = await this.databaseService.executeQuery<GetTaskRow>(
      connection,
      sql
    );

    const rows = result.rows.map(
      (r) =>
        new TaskDto(r.ID, r.DESCRIPTION, new Date(r.DUEDATE), r.CATEGORYID),
    );
    return rows;
  }

  async findById(id: number): Promise<TaskDto[]> {
    console.log(`getting task of id ${id}...`)
    const connection: OracleDB.Connection =
      await this.databaseService.getConnection();

    const sql = `select * from task where id = :id`
    const bindParams = { id: id }

    const result = await this.databaseService.executeQuery<GetTaskRow>(
      connection,
      sql,
      bindParams
    )

    const tasks = result.rows.map(
      (r) =>
        new TaskDto(r.ID, r.DESCRIPTION, new Date(r.DUEDATE), r.CATEGORYID),
    );
    return tasks;
  }

  async findByCategory(categoryId: number): Promise<TaskDto[]> {
    console.log(`fetching tasks of categoryid ${categoryId}...`)
    const connection: OracleDB.Connection =
      await this.databaseService.getConnection();

    const sql = `select * from task where categoryid = :categoryId`
    const bindParams = { categoryId: categoryId }

    const result = await this.databaseService.executeQuery<GetTaskRow>(
      connection,
      sql,
      bindParams
    );

    const tasks = result.rows.map(
      (r) =>
        new TaskDto(r.ID, r.DESCRIPTION, new Date(r.DUEDATE), r.CATEGORYID),
    );
    return tasks;
  }

  async findByDueDate(dateDto: DateDto): Promise<TaskDto[]> {
    const logFormat =
      `${dateDto.date.getDate()}/${dateDto.date.getMonth()+1}/${dateDto.date.getFullYear()}`
    console.log(`fetching tasks due on ${logFormat}...`)
    const connection: OracleDB.Connection =
      await this.databaseService.getConnection();

    const sql =`select * from task where trunc(duedate) = trunc(:dueDate)`;
    const bindParams = { dueDate: dateDto.date };

    const result = await this.databaseService.executeQuery<GetTaskRow>(
      connection,
      sql,
      bindParams
    );

    const tasks = result.rows.map(
      (r) =>
        new TaskDto(r.ID, r.DESCRIPTION, new Date(r.DUEDATE), r.CATEGORYID),
    );
    return tasks;
  }

  async create(createTaskDto: CreateTaskDto): Promise<TaskDto> {
    console.log('creating task...')
    const connection: OracleDB.Connection =
      await this.databaseService.getConnection();

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
    }

    const result = await this.databaseService.executeQuery<CreateOrUpdateTaskRow>(
      connection,
      sql,
      bindParams,
      options,
    );

    const newTask = new TaskDto(
      result.outBinds.id[0],
      result.outBinds.description[0],
      result.outBinds.dueDate[0], 
      result.outBinds.categoryId[0]
    );

    return newTask;
  }

  async update(taskDto: TaskDto): Promise<TaskDto> {
    console.log(`updating task of id ${taskDto.id}...`)
    const connection: OracleDB.Connection =
      await this.databaseService.getConnection();

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
    }

    const result = await this.databaseService.executeQuery<CreateOrUpdateTaskRow>(
      connection,
      sql,
      bindParams
    );

    const updatedTask = new TaskDto(
      result.outBinds.id[0],
      result.outBinds.description[0],
      result.outBinds.dueDate[0], 
      result.outBinds.categoryId[0]
    )

    return updatedTask;
  }

  async delete(id: number): Promise<void> {
    console.log(`deleting task of id ${id}...`);
    const connection: OracleDB.Connection =
      await this.databaseService.getConnection();

    const sql = `delete from task where id = :id`;
    const bindParams = { id: id };

    await this.databaseService.executeQuery<void>(
      connection,
      sql,
      bindParams
    );
  }

  async initTaskTable(): Promise<void> {
    console.log('checking for existing task table...')
    const connection: OracleDB.Connection =
      await this.databaseService.getConnection();

      const sql = `select table_name from all_tables where table_name = 'TASK'`;
      const result = await this.databaseService.executeQuery<void>(
        connection,
        sql
      )

      if (result.rows.length == 0) {
        console.log('no existing table for tasks. Creating one...')
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
          primary key (id))`

        await this.databaseService.executeQuery<void>(
          createConnection,
          createSql
        );
        console.log('task table initialized');
      }
      else {
        console.log('task table already initialized')
      }
  }
}
