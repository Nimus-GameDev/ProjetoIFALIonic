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

  x: number;
  y: number;

  touchPosition: any = {
    initialX: 0,
    initialY: 0,
    finalX: 0,
    finalY: 0,
    xUpdated: this.x,
    yUpdated: this.y
  };

  //Variaveis para zoom

  touchIsPressed = false;
  mapSensitivity = 5;

  width = 20;
  height = 20;

  constructor( private mapCtrl: MapControllerService) {}

  initDraw(canvas: any) {

    this.canvas = canvas;

    console.log(this.canvas);
    // Init Position x and y
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height / 2;
  

    this.canvas.style.backgroundColor = 'red';

    // Context2d in Canvas
    this.contexto2D = this.canvas.getContext('2d');

    console.log(canvas);
    this.draw(this.x, this.y);
  }


  updateDraw() {
    this.draw(this.x, this.y);
  }
  // Draw Elements
  draw(x: number, y: number) {

    const scale: number = MapConfig.scale;

    this.contexto2D.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let y1 = 0; y1 < 10; y1++) {
        for ( let x1 = 0; x1 < 20; x1++) {
          // tslint:disable-next-line: max-line-length
          if ( !( (x1 >= 1 && x1 < 4) ) ) {
            this.contexto2D.strokeRect(
            Math.round( x + ( x1 * (this.width * scale ) ) ),
            Math.round( y +  ( y1 * (this.width * scale) ) ), this.height * scale, this.height * scale);
          }
        }
    }
  }

  touchDown(event) {
    console.log('Alert - touchDown actived.');

    // console.log(this.countDown);
    // console.log('Duplo Click Ativado? = ' + this.duploClick);

    // Get Position X and Y of Touch
    const clientX = event.changedTouches['0'].clientX;
    const clientY = event.changedTouches['0'].clientY;

    // console.log('touchX= ' + clientX + ' touchY= ' + clientY);

    // Update the positions X and Y
    this.touchPosition.xUpdated = this.x;
    this.touchPosition.yUpdated = this.y;

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
      this.x += (this.touchPosition.finalX - this.touchPosition.initialX) / this.mapSensitivity;
      this.y += (this.touchPosition.finalY - this.touchPosition.initialY) / this.mapSensitivity;
    }

    this.draw(this.x, this.y);
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
    this.touchPosition.xUpdated =  this.x + (clientX - this.touchPosition.initialX) / this.mapSensitivity;
    this.touchPosition.yUpdated = this.y + (clientY - this.touchPosition.initialY) / this.mapSensitivity;

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
    this.touchPosition.xUpdated = this.x;
    this.touchPosition.yUpdated = this.y;

    MapConfig.scale = 1;

    this.draw(this.x, this.y);
  }

}
