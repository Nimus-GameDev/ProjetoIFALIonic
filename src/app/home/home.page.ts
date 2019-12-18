import { Component } from '@angular/core';

import { AppConfig } from '../classes/config/app-config';
import { DrawAreaService } from '../services/draw-area.service';
import { DrawMapService } from '../services/draw-map.service';
import { MapControllerService } from '../services/map-controller.service';
import { MapConfig } from '../classes/config/map-config';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  private iconSquare;
  private iconStar;
  private drawAreaActived = false;
  private registerArea = false;
  private name: string;
  private description: string;

  private pinchScale = {
    start: 0,
    end: 0
  };

  private scales = {
    scale: 0,
    scale1: 0,
    scale2: 0
  };

  isZoom = false;
  contador = 1;

  constructor(private drawMap: DrawMapService,
              private drawArea: DrawAreaService,
              private mapCtrl: MapControllerService) {
    this.iconStar = AppConfig.imgBntStar;
    this.iconSquare = AppConfig.imgBntSquareDefault;
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
  }
  // movimentacao do mapa
  onDown(event) {
    if (!this.isZoom) {
      this.drawMap.touchDown(event);
    }
  }

  onUp(event) {
    if (!this.isZoom) {
      this.drawMap.touchUp(event);
    }
  }

  onMove(event) {
    if (!this.isZoom) {
      this.drawMap.touchMove(event);
    }
  }

  onReset() {
    this.drawMap.resetPosition();
  }

  // zoom do mapa
  pinchStart(event) {
    this.isZoom = true;
    console.log('pinchStart');

    this.pinchScale.start = event.scale;
  }

  pinchEnd(event) {
    this.isZoom = false;
    console.log('pinchEnd');

    this.pinchScale.end = event.scale;

    if ( this.pinchScale.start > this.pinchScale.end ) {
      this.zoomOut();
    } else {
      this.zoomIn();
    }

    this.drawMap.updateDraw();

    console.log(this.scales.scale);

  }

  pinchMove(event) {

    this.pinchScale.end = event.scale;

    if ( this.contador === 1) {
      this.scales.scale1 = this.pinchScale.start;
      this.scales.scale2 = event.scale;
      this.contador++;
    } else if (this.contador === 2) {
      this.scales.scale1 = this.scales.scale2;
      console.log('Scale1: ' + this.scales.scale1);
      this.scales.scale2 = event.scale;
      console.log('Scale2: ' + this.scales.scale2);
      // this.contador--;
    }


    if ( this.scales.scale2 < this.scales.scale1) {
      this.zoomOut();
    } else if (this.scales.scale2 > this.scales.scale1) {
      this.zoomIn();
    }
    this.drawMap.updateDraw();
  }

  zoomOut() {
    this.scales.scale -= MapConfig.zoomSensibility * Math.abs( this.pinchScale.end - this.pinchScale.start );
    console.log('out ' +  ( this.pinchScale.end - this.pinchScale.start ) );
    this.updateScale();
  }

  zoomIn() {
    this.scales.scale +=  MapConfig.zoomSensibility * Math.abs( this.pinchScale.end - this.pinchScale.start );
    console.log('in ' +  (this.pinchScale.end - this.pinchScale.start) );
    this.updateScale();
  }

  updateScale() {
    MapConfig.scale = this.scales.scale;
  }
  // desenho de Area

  onDrawSquare() {
    this.drawAreaActived = !this.drawAreaActived;
    this.iconSquare = this.drawAreaActived ? AppConfig.imgBntSquareActived : AppConfig.imgBntSquareDefault;

    console.log('onDrawSquare - Actived? = ', this.drawAreaActived);
  }

  cancel() {
    this.registerArea = false;
  }

  addArea() {
    this.drawArea.addArea(this.name, this.description);

    this.registerArea = false;
  }

  printScale() {
    console.log(MapConfig.scale);
    MapConfig.scale -= 0.05;
    this.drawMap.updateDraw();
  }

}
