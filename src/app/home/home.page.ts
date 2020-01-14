import { Component, OnInit } from '@angular/core';

import { AppConfig } from '../classes/config/app-config';
import { DrawAreaService } from '../services/draw-area.service';
import { DrawMapService } from '../services/draw-map.service';
import { MapControllerService } from '../services/map-controller.service';
import { MapConfig } from '../classes/config/map-config';
import { ToastController } from '@ionic/angular';
import { CrudAreaService } from '../services/crud-area.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  private iconSquare;
  private iconStar;
  private drawAreaActived = false;
  private registerArea = false;

  pinchScale = {
    start: 0,
    end: 0
  };

  private area = {
    name: undefined,
    description: undefined
  };

  private scales = {
    scale: MapConfig.scale,
    scale1: 0,
    scale2: 0
  };

  isZoom = false;
  contador = 1;

  countDown = 0;

  constructor(private drawMap: DrawMapService,
              private drawArea: DrawAreaService,
              private mapCtrl: MapControllerService,
              private toast: ToastController,
              private crudArea: CrudAreaService) {
    this.iconStar = AppConfig.imgBntStar;
    this.iconSquare = AppConfig.imgBntSquareDefault;
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
  }

  ngOnInit(): void {
  }

  // movimentacao do mapa
  onDown(event) {
    if (!this.isZoom && !this.drawAreaActived) {
      this.drawMap.touchDown(event);
    } else if (this.drawAreaActived) {
      this.drawArea.touchDown(event);
    }
  }

  onUp(event) {
    if (!this.isZoom && !this.drawAreaActived) {
      this.drawMap.touchUp(event);
    } else if (this.isZoom) {

      if (this.countDown === 0) {
        this.isZoom = false;
      } else {
        this.countDown--;
      }

      console.log('contador= ' + this.contador);
    } else if (this.drawAreaActived) {
      this.drawArea.touchUp(event);
      this.registerArea = true;
    }

  }

  onMove(event) {
    if (!this.isZoom && !this.drawAreaActived) {
      this.drawMap.touchMove(event);
    }
  }

  onReset() {
    this.drawMap.resetPosition();
    this.scales.scale = MapConfig.scale;
  }

  // zoom do mapa
  pinchStart(event) {
    this.isZoom = true;
    console.log('pinchStart');

    this.countDown = 2;
    this.pinchScale.start = event.scale;
    console.log('ScaleStart= ' + MapConfig.scale);
  }

  pinchEnd(event) {
    console.log('pinchEnd');

    this.pinchScale.end = event.scale;

    if ( this.pinchScale.start > this.pinchScale.end ) {
      this.zoomOut();
    } else {
      this.zoomIn();
    }

    this.contador--;
    this.drawMap.updateDraw();

    console.log('Scale= ' + MapConfig.scale);

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
    if ( this.scales.scale > 0.2) {
      this.scales.scale -= MapConfig.zoomSensibility * Math.abs( this.pinchScale.end - this.pinchScale.start );
    } else if ( this.scales.scale <= 0.2) {
      this.scales.scale = 0.2;
    }

    console.log('out ' +  ( this.pinchScale.end - this.pinchScale.start ) );
    this.updateScale();
  }

  zoomIn() {
    this.scales.scale +=  MapConfig.zoomSensibility * Math.abs( this.pinchScale.end - this.pinchScale.start );
    console.log('in ' +  (this.pinchScale.end - this.pinchScale.start) );
    this.updateScale();
  }

  zIn() {
    console.log(MapConfig.scale);
    MapConfig.scale += MapConfig.scale >= 3 ? 0 :  0.01;
    this.drawMap.updateDraw();
  }

  zOut() {
    console.log(MapConfig.scale);
    MapConfig.scale -= MapConfig.scale <= 0.5 ? 0 :  0.01;
    this.drawMap.updateDraw();
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
    this.area.name = undefined;
    this.area.description = undefined;
  }

  addArea() {
    this.drawArea.addArea(this.area.name, this.area.description);
    this.drawMap.updateDraw();

    this.registerArea = false;
    this.area.name = undefined;
    this.area.description = undefined;
    this.onDrawSquare();
  }

}
