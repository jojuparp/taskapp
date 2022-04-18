import { Injectable } from '@nestjs/common';
import OracleDB = require('oracledb');
import { DatabaseService } from 'src/db/db.service';
import { Category } from './model/category';

interface CategoryRow {
  ID: number;
  NAME: string;
}

@Injectable()
export class CategoryRepository {
  constructor(private databaseService: DatabaseService) {}
  async findAll(): Promise<Category[]> {
    console.log('polling for all Categories');
    const connection: OracleDB.Connection =
      await this.databaseService.getConnection();

    const sql = `select * from category`;
    const bindParams = [];
    const options = { autoCommit: true, outFormat: OracleDB.OUT_FORMAT_OBJECT };

    const result = await this.databaseService.executeQuery<CategoryRow>(
      connection,
      sql,
      bindParams,
      options,
    );

    const rows = result.rows.map((r) => new Category(r.ID, r.NAME));
    console.log('res', result.rows);
    console.log(rows);
    return rows;
  }
}
