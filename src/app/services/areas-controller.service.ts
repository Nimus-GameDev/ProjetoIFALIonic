import { Injectable } from '@angular/core';

import { MapConfig } from '../classes/config/map-config';
import { CrudAreaService } from './crud-area.service';

@Injectable({
  providedIn: 'root'
})
export class AreasControllerService {

  areas = [];

  constructor(
    private crudArea: CrudAreaService
  ) { }

  ngOnInit(): void {

    this.crudArea.readAreas().subscribe(data => {
      this.areas = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          description: e.payload.doc.data()['description'],
          x: e.payload.doc.data()['x'],
          y: e.payload.doc.data()['y'],
          width: e.payload.doc.data()['width'],
          height: e.payload.doc.data()['height']
        };
      });
    });

  }

  addArea(name: string, description: string,
    initX: number, initY: number, endX: number, endY: number, deslX: number, deslY: number) {

    const area = {
      name,
      description,
      x: initX < endX ? initX - deslX : endX - deslX,
      y: initY < endY ? initY - deslY : endY - deslY,
      width: endX > initX ? endX - initX : initX - endX,
      height: endY > initY ? endY - initY : initY - endY
    };

    area.width /= MapConfig.scale;
    area.height /= MapConfig.scale;

    console.log('width: ' + area.width);
    console.log('height: ' + area.height);

    return this.crudArea.createArea(area).then((resp) => {
      console.log(resp);
    }).catch(error => {
      console.log(error);
    });
  }

    // tslint:disable-next-line: ban-types
    get getAreas() {
      return this.areas;
    }


}
