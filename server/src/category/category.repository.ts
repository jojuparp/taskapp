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

    const sql = 'select * from category';

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

    const sql = 'select * from category where id = :id';
    const bindParams = { id: id };

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

    const sql = 'insert into category (name) values (:name) return id into :id';
    const bindParams = {
      name: { val: createCategoryDto.name, dir: OracleDB.BIND_INOUT },
      id: { dir: OracleDB.BIND_OUT }
    };

    const result = await this.databaseService.executeQuery<CreateOrUpdateCategoryRow>(
      connection,
      sql,
      bindParams
    );

    return new CategoryDto(result.outBinds.id[0], result.outBinds.name[0]);
  }

  async update(categoryDto: CategoryDto): Promise<CategoryDto> {
    const connection: OracleDB.Connection =
      await this.databaseService.getConnection();

    const sql = 'update category set name = :name where id = :id return id, name into :id, :name';
    const bindParams = { 
      id: { val: categoryDto.id, dir: OracleDB.BIND_INOUT },
      name: { val: categoryDto.name, dir: OracleDB.BIND_INOUT}
    };

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

    const sql = 'delete from category where id = :id';
    const bindParams = { id: id };

    await this.databaseService.executeQuery<void>(
      connection,
      sql,
      bindParams
    );
  }

  async initCategoryTable(): Promise<void> {
    const connection: OracleDB.Connection =
      await this.databaseService.getConnection();

    const sql = `DECLARE
    tbl_count number;
    sql_stmt long;
    
    BEGIN
        SELECT COUNT(*) INTO tbl_count 
        FROM all_tables
        WHERE table_name = 'CATEGORY';
    
        IF(tbl_count <= 0)
            THEN
            sql_stmt:='
            create table category(
              id number(3) generated always as identity cache 30,
              name varchar(20) not null,
              constraint category_name unique (name),
              primary key (id))';
            EXECUTE IMMEDIATE sql_stmt;
        END IF;
    END;`;

    await this.databaseService.executeQuery<void>(
      connection,
      sql
    );
    this.logger.log('Category table initialized', this.loggerContext);
  }
}
