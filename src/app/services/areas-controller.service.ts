import { Injectable } from '@angular/core';
import { MapConfig } from '../classes/config/map-config';

@Injectable({
  providedIn: 'root'
})
export class AreasControllerService {

  private areas = [
    {
      id: 1,
      name: 'Name',
      description: 'Add Here a description of area',
      x: Math.floor(Math.random() * 100),
      y: Math.floor(Math.random() * 100),
      width: Math.floor(Math.random() * 10),
      height: Math.floor(Math.random() * 10)
    },
    {
      id: 2,
      name: 'Name2',
      description: 'Add Here a description of area',
      x: Math.floor(Math.random() * 100),
      y: Math.floor(Math.random() * 100),
      width: Math.floor(Math.random() * 10),
      height: Math.floor(Math.random() * 10)
    },
    {
      id: 3,
      name: 'Name3',
      description: 'Add Here a description of area',
      x: Math.floor(Math.random() * 100),
      y: Math.floor(Math.random() * 100),
      width: Math.floor(Math.random() * 10),
      height: Math.floor(Math.random() * 10)
    }
  ]

  constructor() { }

  // tslint:disable-next-line: ban-types
  get getAreas() {

    return this.areas;

  }

  removeArea(area: any) {

    this.areas.splice(this.areas.indexOf(area), 1);

  }

  addArea(
    id: number, name: string, description: string,
    initX: number, initY: number, endX: number, endY: number, deslX: number, deslY: number) {

    const area = {
      id,
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

    this.areas.push(area);
  }
}
