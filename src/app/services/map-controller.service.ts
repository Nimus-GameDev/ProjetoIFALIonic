import { Injectable } from '@angular/core';
import { DrawMapService } from './draw-map.service';

@Injectable({
  providedIn: 'root'
})
export class MapControllerService {

  private scale: number = 1;

  constructor() {
   }

  public get getScale(): number {
    return this.scale;
  }

  public setScale( scale: number) {
    this.scale = scale;
    console.log('scale: ' + this.scale);
  }

}
