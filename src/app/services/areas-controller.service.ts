import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AreasControllerService {

  private areas = [
    {
      name: 'Name',
      description: 'Here were a description of area',
      x: Math.floor(Math.random() * 1000),
      y: Math.floor(Math.random() * 1000),
      width: Math.floor(Math.random() * 100),
      height: Math.floor(Math.random() * 100)
    },
    {
      name: 'Name2',
      description: 'Here were a description of area',
      x: Math.floor(Math.random() * 1000),
      y: Math.floor(Math.random() * 1000),
      width: Math.floor(Math.random() * 100),
      height: Math.floor(Math.random() * 100)
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
}
