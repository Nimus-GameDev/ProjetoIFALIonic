import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  database: SQLiteObject;
  databaseName = 'slamduino.db';

  constructor(private sqlite: SQLite, private sqlitePorter: SQLitePorter) { }

  async openDataBase() {
    try {
      this.database = await this.sqlite.create( { name: this.databaseName, location: 'default' } );
      await this.createDataBase();
    } catch (error) {
      console.error('Erro ao criar o banco de dados: ', error);
    }
  }

  async createDataBase() {
    const sqlCreateDatabase = this.getCreateTable();
    const result = await this.sqlitePorter.importSqlToDb(this.database, sqlCreateDatabase);

    return result ? true : false;
  }

  getCreateTable() {
    const sqls = [];
    // tslint:disable-next-line: max-line-length
    sqls.push( 'CREATE TABLE IF NOT EXISTS areas ( id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50), description TEXT, x REAL, y REAL, width REAL, height REAL ); ' );
    return sqls.join('\n');
  }

  executeSql(sql: string, params?: any[] ) {
    return this.database.executeSql(sql, params);
  }



}
