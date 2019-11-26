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
      x: Math.floor(Math.random() * 1000),
      y: Math.floor(Math.random() * 1000),
      width: Math.floor(Math.random() * 100),
      height: Math.floor(Math.random() * 100)
    },
    {
      id: 2,
      name: 'Name2',
      description: 'Add Here a description of area',
      x: Math.floor(Math.random() * 1000),
      y: Math.floor(Math.random() * 1000),
      width: Math.floor(Math.random() * 100),
      height: Math.floor(Math.random() * 100)
    },
    {
      id: 3,
      name: 'Name3',
      description: 'Add Here a description of area',
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

  addArea(area: any) {
    this.areas.push(area);
  }
}
