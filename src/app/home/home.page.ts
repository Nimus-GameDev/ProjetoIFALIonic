import { Component, Renderer2, ViewChild } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';

import { AreasControllerService } from '../services/areas-controller.service';
import { DrawAreaService } from '../services/draw-area.service';
import { DrawMapService } from '../services/draw-map.service';
import { MapControllerService } from '../services/map-controller.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  private iconSquareDefault = '../../assets/images/bntSquare.png';
  private iconStarDefault = '../../assets/images/bntStar.png';
  private iconSquareActived = '../../assets/images/bntSquareActived.png';
  private iconSquare;
  private iconStar;
  private drawAreaActived: boolean = true;
  private registerArea: boolean = false;
  private name: string;
  private description: string;

  private pinchScale = {
    start: 0,
    end: 0
  };

  private zoomSensibility = 0.005;

  private scales = {
    scale: 0,
    scale1: 0,
    scale2: 0
  };

  isZoom = false;
  contador = 1;

  constructor(private drawMap: DrawMapService,
              private areasCtrl: AreasControllerService,
              private drawArea: DrawAreaService,
              private mapCtrl: MapControllerService,
              private toast: ToastController) {
    this.iconStar = this.iconStarDefault;
    this.iconSquare = this.iconSquareDefault;
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
      //this.contador--;
    }


    if ( this.scales.scale2 < this.scales.scale1) {
      this.zoomOut();
    } else if (this.scales.scale2 > this.scales.scale1) {
      this.zoomIn();
    }
    this.drawMap.updateDraw();
  }

  zoomOut() {
    this.scales.scale -= this.zoomSensibility * Math.abs( this.pinchScale.end - this.pinchScale.start );
    console.log('out ' +  ( this.pinchScale.end - this.pinchScale.start ) );
    this.mapCtrl.setScale(this.scales.scale);
  }

  zoomUpdate() {

  }

  zoomIn() {
    this.scales.scale += this.zoomSensibility * Math.abs( this.pinchScale.end - this.pinchScale.start );
    console.log('in ' +  (this.pinchScale.end - this.pinchScale.start) );
    this.mapCtrl.setScale(this.scales.scale);
  }
  // desenho de Area

  onDrawSquare() {
    this.drawAreaActived = !this.drawAreaActived;
    this.changeIcon();

    console.log('onDrawSquare - Actived? = ', this.drawAreaActived);
  }

  changeIcon() {
    this.iconSquare = this.drawAreaActived ? this.iconSquareActived : this.iconSquareDefault;
  }

  cancel() {
    this.registerArea = false;
  }

  addArea() {
    this.drawArea.addArea(this.name, this.description);

    this.registerArea = false;
  }

}
