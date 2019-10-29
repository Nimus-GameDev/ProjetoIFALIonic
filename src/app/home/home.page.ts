import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public iconSquare = '../../assets/images/bntSquare.png';
  public iconStar = '../../assets/images/bntStar.png';

  @ViewChild('myCanvas', {static: false}) canvasElement: ElementRef;

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

  constructor() {}

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
    this.canvas = this.canvasElement.nativeElement;
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height / 2;
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.backgroundColor = 'white';
    this.canvas.addEventListener('mousedown', evento => {this.down(evento); } );
    this.canvas.addEventListener('mouseup', evento => {this.up(evento); });

    this.contexto = this.canvas.getContext('2d');

    console.log(this.canvasElement);
    this.draw(this.x, this.y);
  }

  draw(x: number, y: number) {
    this.contexto.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.contexto.strokeStyle = 'black';
    this.contexto.strokeRect(x, y, 300, 20);
    this.contexto.strokeRect(x, + 50, y + 20, 100, 70);
    this.contexto.strokeRect(x, + 150, y + 20, 250, 200);
  }

down(event) {
    this.x2 = this.x;
    this.y2 = this.y;

    this.xAnterior = event.clientX;
    this.yAnteiror = event.clientY;
    this.press = true;
}

up(event) {
  this.xAtual = event.clientX;
  this.yAtual = event.clientY;

  this.x += this.xAtual - this.xAnterior;
  this.y += this.yAtual - this.yAnteiror;
  this.draw(this.x, this.y);
  this.press = false;
}

}
