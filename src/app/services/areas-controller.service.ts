import { Injectable } from '@angular/core';

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
    initX: number, initY: number, endX: number, endY: number ) {

    const area = {
      id,
      name,
      description,
      x: initX < endX ? initX : endX,
      y: initY < endY ? initY : endY,
      width: endX > initX ? endX - initX : initX - endX,
      height: endY > initY ? endX - initX : initX - endX
    };

    this.areas.push(area);
  }
}
