import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DrawMapService {

  canvas: any;
  contexto: any;
  x: number;
  y: number;
  xAnterior = 0;
  yAnteiror = 0;

  xAtual = 0;
  yAtual = 0;
  press = false;

  x2 = this.x;
  y2 = this.y;

  sensibilidade: number = 2;

  constructor() {}

  // tslint:disable-next-line: use-lifecycle-interface
  initDraw(canvasElement: ElementRef) {
    this.canvas = canvasElement.nativeElement;
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height / 2;
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.backgroundColor = 'white';
    //this.canvas.addEventListener('click', evento => {this.pan(); } );
    //this.canvas.addEventListener('mouseup', evento => {this.up(evento); });

    this.contexto = this.canvas.getContext('2d');

    console.log(canvasElement);
    this.draw(this.x, this.y);
  }

  draw(x: number, y: number) {
    this.contexto.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.contexto.strokeStyle = 'black';
    this.contexto.strokeRect(x, y, 300, 20);
    this.contexto.strokeRect(x, y, 100, 50);
    this.contexto.strokeRect(x + 100, y, 100, 50);
    this.contexto.strokeRect(x + 200, y, 100, 50);
    this.contexto.strokeRect(x + 20, y + 50, 300, 20);

    for (let i = 0; i < 2; i++) {
      this.contexto.strokeRect(x - i * 2, y + i * 2, 300, 20);
      this.contexto.strokeRect(x - i * 2, y + i * 2, 100, 50);
      this.contexto.strokeRect(x + 100 - i * 2, y + i * 2, 100, 50);
      this.contexto.strokeRect(x + 200 - i * 2, y + i * 2, 100, 50);
      this.contexto.strokeRect(x + 20 - i * 2, y + 50 + i * 2, 300, 20);
    }
  }

  down(event) {
    console.log('down');
    console.log('x= ' + event.changedTouches["0"].clientX + ' y= ' + event.changedTouches["0"].clientY);
      this.x2 = this.x;
      this.y2 = this.y;

      this.xAnterior = event.changedTouches["0"].clientX; //event.clientX;
      this.yAnteiror = event.changedTouches["0"].clientY; //event.clientY;
      this.press = true;
  }

  up(event) {

  }

  move(event) {
    
  }

}
