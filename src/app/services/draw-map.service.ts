import { Injectable } from '@angular/core';
import { AreasControllerService } from './areas-controller.service';


@Injectable({
  providedIn: 'root'
})
export class DrawMapService {

  canvas: any;
  contexto2D: any;

  x: number;
  y: number;
  scale: number = 1;

  countDown: number = 0;
  duploClick: boolean = false;

  touchPosition: any = {
    initialX: 0,
    initialY: 0,
    finalX: 0,
    finalY: 0,
    xUpdated: this.x,
    yUpdated: this.y
  };

  touchIsPressed = false;
  mapSensitivity = 2;

  constructor(private areasCtrl: AreasControllerService) {}

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

  // Draw Elements
  draw(x: number, y: number) {
    this.contexto2D.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let y1 = 0; y1 < 4; y1++) {
        for ( let x1 = 0; x1 < 250; x1++) {
          this.contexto2D.strokeRect(x + (x1 * 10), y + (y1 * 10), 10 / this.scale, 10 / this.scale);
        }
    }

    this.drawAreas(x, y, this.scale);
  }

  touchDown(event) {
    console.log('Alert - touchDown actived.');

    setTimeout( () => {
      this.countDown = 0;
    }, 500);

    this.countDown++;

    this.duploClick = this.countDown % 2 === 0 ? true : false;

    // console.log(this.countDown);
    console.log('Duplo Click Ativado? = ' + this.duploClick);

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

    //console.log('touchX= ' + clientX + ' touchY= ' + clientY);

    // Get final position of touch
    this.touchPosition.finalX = clientX;
    this.touchPosition.finalY = clientY;

    // tslint:disable-next-line: max-line-length
    const positionIsEqual = this.touchPosition.finalX === this.touchPosition.initialX || this.touchPosition.finalY === this.touchPosition.initialY;

    if ( !(positionIsEqual) && !this.duploClick ) {
      this.x += (this.touchPosition.finalX - this.touchPosition.initialX) / this.mapSensitivity;
      this.y += (this.touchPosition.finalY - this.touchPosition.initialY) / this.mapSensitivity;
    }

    this.draw(this.x, this.y);
    this.touchIsPressed = false;
    this.duploClick = false;
  }

  touchMove(event) {

    this.animationMovement(event);

  }

  animationMovement(event) {
    //console.log('Alert - touchMove actived.');

    // Get Position X and Y of Touch
    const clientX = event.changedTouches['0'].clientX;
    const clientY = event.changedTouches['0'].clientY;
    // posicao = posicao do mapa + Diferenca relativa a movimentacao do mouse
    this.touchPosition.xUpdated =  this.x + (clientX - this.touchPosition.initialX) / this.mapSensitivity;
    this.touchPosition.yUpdated = this.y + (clientY - this.touchPosition.initialY) / this.mapSensitivity;

    // Draw a new rectangle on movimentation relative
    if ( this.touchIsPressed && !this.duploClick) {
        this.draw(this.touchPosition.xUpdated, this.touchPosition.yUpdated);
    } else if ( this.duploClick) {

      if ( clientY > this.touchPosition.initialY) {
        this.zoomOut();
      } else if (clientY < this.touchPosition.initialY) {
        this.zoomIn();
      }

    }

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

    this.scale = 1;

    this.draw(this.x, this.y);
  }

  zoomIn() {
    this.scale -= this.scale > 0.5 ? 0.05 : 0;
    console.log('scale= ' + this.scale);
    this.draw(this.x, this.y);
  }

  zoomOut() {
    this.scale += this.scale < 2 ? 0.05 : 0;
    console.log('scale= ' + this.scale);
    this.draw(this.x, this.y);
  }

  drawAreas(x, y, scale) {
    //this.areasCtrl.getAreas.forEach( (area) => {}
    return undefined;
  }

}
