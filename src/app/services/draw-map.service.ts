import { Injectable, OnInit, OnChanges } from '@angular/core';

import { MapConfig } from '../classes/config/map-config';
import { AreasControllerService } from './areas-controller.service';


@Injectable({
  providedIn: 'root'
})
export class DrawMapService implements OnInit, OnChanges{

  private canvas: any;
  private contexto2D: any;

  x = 0;
  y = 0;

  deslX = 0;
  deslY = 0;

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

  areas = [];

  constructor(private areaService: AreasControllerService) {
  }

  ngOnInit(): void {

  }
  ngOnChanges(): void {
    //this.loadAreas();
  }

  initDraw(canvas: any) {
    this.canvas = canvas;

    console.log(this.canvas);

    // Init Position x and y of deslocation
    this.deslX = this.canvas.width / 2;
    this.deslY = this.canvas.height / 2;

    this.canvas.style.backgroundColor = 'white';

    // Context2d in Canvas
    this.contexto2D = this.canvas.getContext('2d');

    // Drawing the elements of map
    this.draw(this.deslX, this.deslY);
  }

  // Update Elements
  updateDraw() {
    this.draw(this.deslX, this.deslY);
  }

  // Draw Elements
  async draw(deslX: number, deslY: number) {
    // scale of world
    const scale: number = MapConfig.scale;

    // Cleaning the World
    this.contexto2D.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Map in bits
    const map = [
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

    // Draw map in world
    for (let pixelY = 0; pixelY < map.length; pixelY++) {
        for ( let pixelX = 0; pixelX < map[pixelY].length; pixelX++) {
          if ( map[pixelY][pixelX]  !== 0) {
            this.contexto2D.strokeRect(
            Math.round( this.x + deslX + ( pixelX * ( this.pixelMapWidth * scale ) ) ),
            Math.round( this.y + deslY +  ( pixelY * (this.pixelMapHeight * scale) ) ),
            this.pixelMapWidth * scale, this.pixelMapHeight * scale);
          }
        }
    }
    /*
    this.contexto2D.globalAlpha = 0.5;
    this.contexto2D.fillStyle = 'green';
    this.contexto2D.strokeStyle = 'green';
    this.contexto2D.fillRect(
      deslX  + (20 * scale) , // deslocalmento + ( posicao * scale )
      deslY + (20 * scale) , // deslocalmento + ( posicao * scale )
      20 * scale, // width * scale
      50 * scale // height * scale
    ); */
    this.areas = await this.areaService.getAll();

    this.areas.forEach(  (area) => {
      //this.contexto2D.strokeStyle = 'red';
      this.contexto2D.globalAlpha = 0.2;
      this.contexto2D.fillStyle = 'green';
      this.contexto2D.fillRect(
        deslX + (area.x * scale),
        deslY + (area.y * scale),
        area.width * scale,
        area.height * scale
       );
      console.log(area);
    });

    this.contexto2D.globalAlpha = 1;
    this.contexto2D.strokeStyle = 'black';

  }

  async loadAreas() {
    this.areas = await this.areaService.getAll();
    this.updateDraw();
  }

  // Lembre-se de mudar isso para um outro service
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


    this.contexto2D.font = '20px serif';
    this.contexto2D.fillText('X: ' + clientX + ' Y: ' + clientY, 20, 20);

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
