import { Injectable } from '@angular/core';

import { MapConfig } from '../classes/config/map-config';
import { DatabaseService } from './sqlite/database.service';
import { Area } from '../classes/objects/area';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AreasControllerService {

  areas = [];

  constructor(private database: DatabaseService, private toastCtrl: ToastController) { }

  save(area: Area) {
    if ( area.id > 0 ) {
      return this.update(area);
    } else {
      return this.insert(area);
    }
  }

  private insert(area: Area) {
    const sql = 'insert into areas (name, description, x, y, width, height) values (?, ?, ?, ?, ?, ?) ';
    const data = [area.name, area.description, area.x, area.y, area.width, area.height];

    return this.database.executeSql(sql, data);
  }

  private update(area: Area) {
    const sql = 'update areas set name = ?, description = ?, x = ?, y = ?, width = ?, height = ? where id = ?';
    const data = [area.name, area.description, area.x, area.y, area.width, area.height, area.id];
    // tslint:disable-next-line: max-line-length
    console.log(' nome: ? desc: ?, x: ?, y: ?, width: ?, height ?', [area.name, area.description, area.x, area.y, area.width, area.height, area.id]);

    return this.database.executeSql(sql, data);
  }

  delete(id: number) {
    const sql = 'delete from areas where id = ?';
    const data = [id];

    return this.database.executeSql(sql, data);
  }

  async getById(id: number) {
    const sql = 'select * from areas where id = ?';
    const data = [id];
    const result = await this.database.executeSql(sql, data);
    const rows = result.rows;
    const area = new Area();
    if (rows && rows.length > 0) {
      const item = rows.item(0);
      area.id = item.id;
      area.name = item.name;
      area.description = item.description;
      area.x = item.x;
      area.y = item.y;
      area.width = item.width;
      area.height = item.height;
    }
    return area;
  }

  async getAll() {
    const sql = 'select * from areas';
    const result = await this.database.executeSql(sql);
    const areas = this.fillAreas(result.rows);
    return areas;
  }

  fillAreas(rows: any) {
    const areas: Area[] = [];

    for ( let i = 0; i < rows.length; i++ ) {
      const item = rows.item(i);
      const area = new Area();
      area.id = item.id;
      area.name = item.name;
      area.description = item.description;
      area.x = item.x;
      area.y = item.y;
      area.width = item.width;
      area.height = item.height;
      areas.push(area);
    }
    return areas;

  }

  async addArea(name: string, description: string,
    initX: number, initY: number, endX: number, endY: number, deslX: number, deslY: number) {

    const toast = await this.toastCtrl.create(
      {
        message: 'Adicionado com sucesso!',
        duration: 2000
      }
    );
    toast.present();

    /*
    const area = {
      name,
      description,
      x: initX < endX ? initX - deslX : endX - deslX,
      y: initY < endY ? initY - deslY : endY - deslY,
      width: endX > initX ? endX - initX : initX - endX,
      height: endY > initY ? endY - initY : initY - endY
    }; */

    const area: Area = new Area();
    area.name = name;
    area.description = description;
    area.x =  initX < endX ? initX - deslX : endX - deslX;
    area.y =  initY < endY ? initY - deslY : endY - deslY;
    area.width = endX > initX ? endX - initX : initX - endX;
    area.height = endY > initY ? endY - initY : initY - endY;

    area.x /= MapConfig.scale;
    area.y /= MapConfig.scale;
    area.width /= MapConfig.scale;
    area.height /= MapConfig.scale;

    console.log('width: ' + area.width);
    console.log('height: ' + area.height);
    await this.save(area);
    }

    // tslint:disable-next-line: ban-types
    get getAreas() {
      return this.areas;
    }


}
