import { Injectable } from '@angular/core';

import { AreasControllerService } from './areas-controller.service';
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

  areas = [];

  constructor(
    private areasCtrl: AreasControllerService,
    private mapDraw: DrawMapService
    ) {
  }

  public initDraw(canvasElement: any) {
    this.canvas = canvasElement;
    this.context2d = this.canvas.getContext('2d');

    // this.drawAreas();
  }

  private drawAreas() {

    this.areas.forEach( (area) => {
      this.context2d.fillRect(area.x, area.y, area.width, area.height);
      console.log('area: ' + area);
    } );

  }

  public touchDown(event) {
    console.log(event);
    const clientX = event.changedTouches[0].clientX;
    const clientY = event.changedTouches[0].clientY;

    this.touchPosition.initX = clientX;
    this.touchPosition.initY = clientY;

    console.log('initX: ' + Math.round(this.touchPosition.initX));
    console.log('initY: ' + Math.round(this.touchPosition.initY));

  }

  public touchUp(event) {
    const clientX = event.changedTouches[0].clientX;
    const clientY = event.changedTouches[0].clientY;

    this.touchPosition.endX = clientX;
    this.touchPosition.endY = clientY;

    console.log('endX: ' + Math.round(this.touchPosition.endX));
    console.log('endY: ' + Math.round(this.touchPosition.endY));

  }
  // draw area in move
  public touchMove(event) {
    const clientX = event.changedTouches[0].clientX;
    const clientY = event.changedTouches[0].clientY;

    this.touchPosition.updateX = clientX;
    this.touchPosition.updateY = clientY;

    console.log('updateX: ' + Math.round(this.touchPosition.updateX));
    console.log('updateY: ' + Math.round(this.touchPosition.updateY));

    console.log('Draw move');

    this.mapDraw.updateDraw();
    this.context2d.strokeStyle = 'red';
    this.context2d.strokeRect(
    this.touchPosition.initX < this.touchPosition.updateX ? this.touchPosition.initX : this.touchPosition.updateX, // x
    this.touchPosition.initY < this.touchPosition.updateY ? this.touchPosition.initY : this.touchPosition.updateY, // y
    this.touchPosition.updateX > this.touchPosition.initX ? // width
    this.touchPosition.updateX - this.touchPosition.initX :
    this.touchPosition.initX - this.touchPosition.updateX,
    this.touchPosition.updateY > this.touchPosition.initY ? // height
    this.touchPosition.updateY - this.touchPosition.initY :
    this.touchPosition.initY - this.touchPosition.updateY
    );
    this.context2d.strokeStyle = 'black';
  }
  // add area
  public addArea(name: string, description: string) {
    this.areasCtrl.addArea(
      name,
      description,
      this.touchPosition.initX,
      this.touchPosition.initY,
      this.touchPosition.endX,
      this.touchPosition.endY,
      this.mapDraw.deslX,
      this.mapDraw.deslY
    );
  }

}
