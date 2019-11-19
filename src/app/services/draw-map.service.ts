import { Injectable } from '@angular/core';


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

  constructor() {}

  initDraw(canvasElement: any) {

    this.canvas = canvasElement.nativeElement;

    console.log(this.canvas);
    // Init Position x and y
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height / 2;

    // Canvas Configurations
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';

    this.canvas.style.backgroundColor = 'white';

    // Context2d in Canvas
    this.contexto2D = this.canvas.getContext('2d');

    console.log(canvasElement);
    this.draw(this.x, this.y);
  }

  // Draw Elements
  draw(x: number, y: number) {
    //console.log('width: ' + this.canvas.width + ' height: ' + this.canvas.height );
    this.contexto2D.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //this.contexto2D.

    this.contexto2D.strokeRect(x + this.scale, y + this.scale, 300 / this.scale, 20 / this.scale);
    this.contexto2D.strokeRect(x + this.scale, y + this.scale, 100 / this.scale, 50 / this.scale);
    /*
    this.contexto2D.strokeRect( (x + 100) / this.scale, y / this.scale, 100 / this.scale, 50 / this.scale);
    this.contexto2D.strokeRect( ( x + 200) / this.scale, y / this.scale, 100 / this.scale, 50 / this.scale);
    this.contexto2D.strokeRect( (x + 20) / this.scale, (y + 50) / this.scale, 300 / this.scale, 20 / this.scale); */
    /*
    for (let i = 0; i < 2; i++) {
      this.contexto2D.strokeRect(x - i * 2, y + i * 2, 300, 20);
      this.contexto2D.strokeRect(x - i * 2, y + i * 2, 100, 50);
      this.contexto2D.strokeRect(x + 100 - i * 2, y + i * 2, 100, 50);
      this.contexto2D.strokeRect(x + 200 - i * 2, y + i * 2, 100, 50);
      this.contexto2D.strokeRect(x + 20 - i * 2, y + 50 + i * 2, 300, 20);
    } */
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

    this.draw(this.x, this.y);
  }

  zoomIn() {
    this.scale -= 0.05;

    this.draw(this.x, this.y);
  }

  zoomOut() {
    this.scale += 0.05;
    this.draw(this.x, this.y);
  }

}
