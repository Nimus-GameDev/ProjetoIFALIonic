import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DrawMapService {

  canvas: any;
  contexto2D: any;

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

  touchIsPressed = false;
  mapSensitivity = 2;

  constructor() {}

  initDraw(canvasElement: ElementRef) {

    this.canvas = canvasElement.nativeElement;
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
    this.contexto2D.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.contexto2D.strokeStyle = 'black';
    this.contexto2D.strokeRect(x, y, 300, 20);
    this.contexto2D.strokeRect(x, y, 100, 50);
    this.contexto2D.strokeRect(x + 100, y, 100, 50);
    this.contexto2D.strokeRect(x + 200, y, 100, 50);
    this.contexto2D.strokeRect(x + 20, y + 50, 300, 20);

    for (let i = 0; i < 2; i++) {
      this.contexto2D.strokeRect(x - i * 2, y + i * 2, 300, 20);
      this.contexto2D.strokeRect(x - i * 2, y + i * 2, 100, 50);
      this.contexto2D.strokeRect(x + 100 - i * 2, y + i * 2, 100, 50);
      this.contexto2D.strokeRect(x + 200 - i * 2, y + i * 2, 100, 50);
      this.contexto2D.strokeRect(x + 20 - i * 2, y + 50 + i * 2, 300, 20);
    }
  }

  touchDown(event) {
    console.log('Alert - touchDown actived.');
    // Get Position X and Y of Touch
    const clientX = event.changedTouches['0'].clientX;
    const clientY = event.changedTouches['0'].clientY;

    console.log('touchX= ' + clientX + ' touchY= ' + clientY);
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

    console.log('touchX= ' + clientX + ' touchY= ' + clientY);

    // Get final position of touch
    this.touchPosition.finalX = clientX;
    this.touchPosition.finalY = clientY;

    if ( !(this.touchPosition.finalX === this.touchPosition.initialX || this.touchPosition.finalY === this.touchPosition.initialY) ) {
      this.x += (this.touchPosition.finalX - this.touchPosition.initialX) / this.mapSensitivity;
      this.y += (this.touchPosition.finalY - this.touchPosition.initialY) / this.mapSensitivity;
      this.draw(this.x, this.y);
      this.touchIsPressed = false;
    } else {
      this.x += this.touchPosition.finalX - this.touchPosition.initialX;
      this.y += this.touchPosition.finalY - this.touchPosition.initialY;
      this.draw(this.x, this.y);
      this.touchIsPressed = false;
    }
  }

  touchMove(event) {

  }

  resetPosition() {
  }

}
