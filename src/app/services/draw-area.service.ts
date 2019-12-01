import { Injectable } from '@angular/core';
import { DrawMapService } from './draw-map.service';

@Injectable({
  providedIn: 'root'
})
export class DrawAreaService {

  private canvas: any;
  private context2d: any;

  private touchPosition = {
    initX: undefined,
    initY: undefined,
    endX: undefined,
    endY: undefined,
    updateX: undefined,
    updateY: undefined
  };

  constructor(private drawMap: DrawMapService) {
  }

  public touchDown(event) {
    console.log(event);
    let clientX = event.changedTouches[0].clientX;
    let clientY = event.changedTouches[0].clientY;

    this.touchPosition.initX = clientX;
    this.touchPosition.initY = clientY;

    console.log('initX: ' + Math.round(this.touchPosition.initX));
    console.log('initY: ' + Math.round(this.touchPosition.initY));

  }

  public touchUp(event) {
    let clientX = event.changedTouches[0].clientX;
    let clientY = event.changedTouches[0].clientY;

    this.touchPosition.endX = clientX;
    this.touchPosition.endY = clientY;

    console.log('endX: ' + Math.round(this.touchPosition.endX));
    console.log('endY: ' + Math.round(this.touchPosition.endY));

  }

  public touchMove(event) {
    let clientX = event.changedTouches[0].clientX;
    let clientY = event.changedTouches[0].clientY;

    this.touchPosition.updateX = clientX;
    this.touchPosition.updateY = clientY;

    console.log('updateX: ' + Math.round(this.touchPosition.updateX));
    console.log('updateY: ' + Math.round(this.touchPosition.updateY));
  }

}
