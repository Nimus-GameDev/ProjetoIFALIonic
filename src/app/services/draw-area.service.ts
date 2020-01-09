import { Injectable } from '@angular/core';
import { DrawMapService } from './draw-map.service';
import { AreasControllerService } from './areas-controller.service';
import { CrudAreaService } from './crud-area.service';

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
    private mapDraw: DrawMapService,
    private crudArea: CrudAreaService
    ) {
  }

  public initDraw(canvasElement: any) {
    this.canvas = canvasElement;
    this.context2d = this.canvas.getContext('2d');

    //this.drawAreas();
  }

  private drawAreas() {

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
      console.log(this.areas);
    });

    this.areas.forEach( (area) => {
      this.context2d.fillRect(area.x, area.y, area.width, area.height);
      console.log('area: ' + area);
    } );

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
