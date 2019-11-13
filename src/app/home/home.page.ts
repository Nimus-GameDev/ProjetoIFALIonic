import { DrawMapService } from './../draw-map.service';
import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [ DrawMapService]
})
export class HomePage {

  public iconSquare = '../../assets/images/bntSquare.png';
  public iconStar = '../../assets/images/bntStar.png';

  @ViewChild('myCanvas', {static: false}) canvasElement: ElementRef;

  constructor(private drawMap: DrawMapService) {}

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

}
