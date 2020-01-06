import { Injectable } from '@angular/core';
import { AreasControllerService } from './areas-controller.service';
import { MapControllerService } from './map-controller.service';
import { MapConfig } from '../classes/config/map-config';


@Injectable({
  providedIn: 'root'
})
export class DrawMapService {

  private canvas: any;
  private contexto2D: any;

  x: number = 0;
  y: number = 0;

  deslX: number = 0;
  deslY: number = 0;

  touchPosition: any = {
    initialX: 0,
    initialY: 0,
    finalX: 0,
    finalY: 0,
    xUpdated: this.deslX,
    yUpdated: this.deslY
  };

  touchIsPressed = false;
  mapSensitivity = 5;

  pixelMapWidth = 5;
  pixelMapHeight = 5;

  constructor( private mapCtrl: MapControllerService, private areasCtrl: AreasControllerService) {}

  initDraw(canvas: any) {

    this.canvas = canvas;

    console.log(this.canvas);
    // Init Position x and y
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height / 2;

    this.canvas.style.backgroundColor = 'white';

    // Context2d in Canvas
    this.contexto2D = this.canvas.getContext('2d');

    console.log(canvas);
    this.draw(this.deslX, this.deslY);
  }


  updateDraw() {
    this.draw(this.deslX, this.deslY);
  }
  // Draw Elements
  draw(deslX: number, deslY: number) {

    const scale: number = MapConfig.scale;

    this.contexto2D.clearRect(0, 0, this.canvas.width, this.canvas.height);

    let map = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
      [1, 1, 1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    for (let pixelH = 0; pixelH < map.length; pixelH++) {
        for ( let pixelW = 0; pixelW < map[pixelH].length; pixelW++) {
          // tslint:disable-next-line: max-line-length
          if ( map[pixelH][pixelW]  !== 0) {
            this.contexto2D.strokeRect(
            Math.round( this.x + deslX + ( pixelW * ( this.pixelMapWidth * scale ) ) ),
            Math.round( this.y + deslY +  ( pixelH * (this.pixelMapHeight * scale) ) ),
            this.pixelMapWidth * scale, this.pixelMapHeight * scale);
          }
        }
    }

    this.contexto2D.strokeStyle = 'green';
    this.contexto2D.strokeRect(
      deslX + 180 + ( 1 * scale ),
      deslY + 270 + ( 1 * scale ),
      100 * scale,
      100 * scale
    );


    this.areasCtrl.getAreas.forEach( (area) => {
      this.contexto2D.strokeStyle = 'red';
      this.contexto2D.strokeRect(
        deslX + area.x,
        deslY + area.y,
        area.width * scale,
        area.height * scale
       );
    });

    this.areasCtrl.getAreas.forEach( (area) => {
      this.contexto2D.strokeStyle = 'blue';
      this.contexto2D.fillRect(
        deslX + area.x,
        deslY + area.y,
        area.width * scale,
        area.height * scale
       );
    });


    this.contexto2D.strokeStyle = 'black';

    /*
    let area = this.areasCtrl.getAreas[this.areasCtrl.getAreas.length - 1];

    this.contexto2D.strokeRect(
      deslX  + area.x,
      deslY + area.y,
      area.width * scale,
      area.height * scale
     ); */

    this.contexto2D.strokeStyle = 'black';

  }

  touchDown(event) {
    console.log('Alert - touchDown actived.');

    // Get Position X and Y of Touch
    const clientX = event.changedTouches['0'].clientX;
    const clientY = event.changedTouches['0'].clientY;

    // console.log('touchX= ' + clientX + ' touchY= ' + clientY);

    // Update the positions X and Y
    this.touchPosition.xUpdated = this.deslX;
    this.touchPosition.yUpdated = this.deslY;

    // Get initial position of touch
    this.touchPosition.initialX = clientX;
    this.touchPosition.initialY = clientY;


    this.touchIsPressed = true;
  }

  touchUp(event) {
    console.log('Alert - touchUp actived.');

    // Get Position X and Y of Touch
    const clientX = event.changedTouches['0'].clientX;
    const clientY = event.changedTouches['0'].clientY;

    // Get final position of touch
    this.touchPosition.finalX = clientX;
    this.touchPosition.finalY = clientY;

    // tslint:disable-next-line: max-line-length
    const positionIsEqual = this.touchPosition.finalX === this.touchPosition.initialX || this.touchPosition.finalY === this.touchPosition.initialY;


    if ( !(positionIsEqual)) {
      this.deslX += (this.touchPosition.finalX - this.touchPosition.initialX) / this.mapSensitivity;
      this.deslY += (this.touchPosition.finalY - this.touchPosition.initialY) / this.mapSensitivity;
    }

    this.draw(this.deslX, this.deslY);
    this.touchIsPressed = false;
  }

  touchMove(event) {

    this.animationMovement(event);

  }

  animationMovement(event) {
    console.log('Alert - touchMove actived.');

    // Get Position X and Y of Touch
    const clientX = event.changedTouches['0'].clientX;
    const clientY = event.changedTouches['0'].clientY;

    // posicao = posicao do mapa + Diferenca relativa a movimentacao do mouse
    this.touchPosition.xUpdated =  this.deslX + (clientX - this.touchPosition.initialX) / this.mapSensitivity;
    this.touchPosition.yUpdated = this.deslY + (clientY - this.touchPosition.initialY) / this.mapSensitivity;

    // Draw a new rectangle on movimentation relative
    if ( this.touchIsPressed) {
        this.draw(this.touchPosition.xUpdated, this.touchPosition.yUpdated);
    }

   // this.draw(this.touchPosition.xUpdated, this.touchPosition.yUpdated);

  }

  resetPosition() {
    console.log('Alert - resetPosition actived.');

    // Init Position x and y
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height / 2;

    this.touchPosition.initialX = 0;
    this.touchPosition.initialY = 0;
    this.touchPosition.finalX = 0;
    this.touchPosition.finalY = 0;
    this.deslX = 0;
    this.deslY = 0;
    this.touchPosition.xUpdated = this.deslX;
    this.touchPosition.yUpdated = this.deslY;

    MapConfig.scale = 1;

    this.draw(this.deslX, this.deslY);
  }

}
