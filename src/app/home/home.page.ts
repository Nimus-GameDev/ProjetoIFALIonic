import { Component, ViewChild } from '@angular/core';

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

  public drawSquareActived: boolean = false;

  public iconSquare;
  public iconStar;

  public registerArea: boolean = true;

  
  //public iconStarActived = '../../assets/images/bntStarActived.png';

  @ViewChild('myCanvas', undefined) canvasElement: any;
  constructor(private drawMap: DrawMapService) {
    this.iconStar = this.iconStarDefault;
    this.iconSquare = this.iconSquareDefault;
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
    this.drawMap.initDraw(this.canvasElement);
  }

  onDown(event) {
    this.drawMap.touchDown(event);
  }
  onUp(event) {
    this.drawMap.touchUp(event);
  }

  onMove(event) {
    this.drawMap.touchMove(event);
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
    this.drawSquareActived = !this.drawSquareActived;
    this.iconSquare = this.drawSquareActived ? this.iconSquareActived : this.iconSquareDefault;

    console.log('onDrawSquare - Actived? = ', this.drawSquareActived);
  }

  saveData() {
    this.registerArea = false;
  }

}
