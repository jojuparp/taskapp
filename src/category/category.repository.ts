import { Injectable, Logger } from '@nestjs/common';
import OracleDB = require('oracledb');
import { DatabaseService } from 'src/db/db.service';
import { CategoryDto } from './dto/category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';

interface CategoryRow {
  ID: number;
  NAME: string;
}

interface CreateOrUpdateCategoryRow {
  id: number[];
  name: string[];
}

@Injectable()
export class CategoryRepository {
  constructor(private databaseService: DatabaseService) {}
  private logger: Logger = new Logger();
  private loggerContext = 'CategoryRepository';

  async findAll(): Promise<CategoryDto[]> {
    const connection: OracleDB.Connection =
      await this.databaseService.getConnection();

    const sql = `select * from category`;

    const result = await this.databaseService.executeQuery<CategoryRow>(
      connection,
      sql
    );

    const rows = result.rows.map((r) => new CategoryDto(r.ID, r.NAME));
    return rows;
  }

  async findOne(id: number): Promise<CategoryDto[]> {
    const connection: OracleDB.Connection =
      await this.databaseService.getConnection();

    const sql = `select * from category where id = :id`
    const bindParams = { id: id }

    const result = await this.databaseService.executeQuery<CategoryRow>(
      connection,
      sql,
      bindParams
    );

    const rows = result.rows.map((r) => new CategoryDto(r.ID, r.NAME));
    return rows;
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
    const connection: OracleDB.Connection =
      await this.databaseService.getConnection();

    const sql = `insert into category (name) values (:name) return id into :id`
    const bindParams = {
      name: { val: createCategoryDto.name, dir: OracleDB.BIND_INOUT },
      id: { dir: OracleDB.BIND_OUT }
    }

    const result = await this.databaseService.executeQuery<CreateOrUpdateCategoryRow>(
      connection,
      sql,
      bindParams
    );

    return new CategoryDto(result.outBinds.id[0], result.outBinds.name[0])
  }

  async update(categoryDto: CategoryDto): Promise<CategoryDto> {
    const connection: OracleDB.Connection =
      await this.databaseService.getConnection();

    const sql = `update category set name = :name where id = :id return id, name into :id, :name`
    const bindParams = { 
      id: { val: categoryDto.id, dir: OracleDB.BIND_INOUT },
      name: { val: categoryDto.name, dir: OracleDB.BIND_INOUT}
    }

    const result = await this.databaseService.executeQuery<CreateOrUpdateCategoryRow>(
      connection,
      sql,
      bindParams
    );

    return new CategoryDto(result.outBinds.id[0], result.outBinds.name[0]);
  }

  async delete(id: number): Promise<void> {
    const connection: OracleDB.Connection =
      await this.databaseService.getConnection();

    const sql = `delete from category where id = :id`;
    const bindParams = { id: id };

    await this.databaseService.executeQuery<void>(
      connection,
      sql,
      bindParams
    );
  }

  async initCategoryTable(): Promise<void> {
    this.logger.log('Checking for existing category table', this.loggerContext)
    const connection: OracleDB.Connection =
      await this.databaseService.getConnection();

      const sql = `select table_name from all_tables where table_name = 'CATEGORY'`;
      const result = await this.databaseService.executeQuery<void>(
        connection,
        sql
      )

      if (result.rows.length == 0) {
        this.logger.log('No existing table for categories. Creating one', this.loggerContext)
        const createConnection = await this.databaseService.getConnection();
        const createSql = `create table category(
          id number(3) generated always as identity cache 30,
          name varchar(20) not null,
          constraint category_name unique (name),
          primary key (id))`

        await this.databaseService.executeQuery<void>(
          createConnection,
          createSql
        );
        this.logger.log('Category table initialized', this.loggerContext);
      }
      else {
        this.logger.log('Category table already initialized', this.loggerContext);
      }
  }
}
