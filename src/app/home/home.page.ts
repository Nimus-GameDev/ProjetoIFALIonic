import { Component, Renderer2, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';

import { AreasControllerService } from '../services/areas-controller.service';
import { DrawAreaService } from '../services/draw-area.service';
import { DrawMapService } from '../services/draw-map.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [ DrawMapService]
})
export class HomePage {

  private iconSquareDefault = '../../assets/images/bntSquare.png';
  private iconStarDefault = '../../assets/images/bntStar.png';

  private iconSquareActived = '../../assets/images/bntSquareActived.png';

  public drawAreaActived: boolean = false;

  public iconSquare;
  public iconStar;

  public registerArea: boolean = false;

  public name: string;
  public description: string;

  constructor(private drawMap: DrawMapService,
              private areasCtrl: AreasControllerService,
              private drawArea: DrawAreaService) {
    this.iconStar = this.iconStarDefault;
    this.iconSquare = this.iconSquareDefault;
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
  }

  onDown(event) {
    if ( !this.drawAreaActived ) {
      this.drawMap.touchDown(event);
    } else {
      this.drawArea.touchDown(event);
    }
  }
  onUp(event) {
    if ( !this.drawAreaActived ) {
      this.drawMap.touchUp(event);
    } else {
      this.drawArea.touchUp(event);
      this.drawAreaActived = !this.drawAreaActived;
      this.changeIcon();
    }
  }

  onMove(event) {
    if ( !this.drawAreaActived ) {
      this.drawMap.touchMove(event);
    } else {
      this.drawArea.touchMove(event);
    }
  }

  onReset() {
    this.drawMap.resetPosition();
  }

  zoomIn() {
    this.drawMap.zoomIn();
  }

  zoomOut() {
    this.drawMap.zoomOut();
  }

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
    this.areasCtrl.addArea({
      id: this.areasCtrl.getAreas.length + 1,
      name: this.name,
      description: this.description,
      x: Math.floor(Math.random() * 1000),
      y: Math.floor(Math.random() * 1000),
      width: Math.floor(Math.random() * 100),
      height: Math.floor(Math.random() * 100)
    });
    this.registerArea = false;
  }

}
