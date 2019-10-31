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

  ngAfterViewInit() {
    this.drawMap.initDraw(this.canvasElement);
    
  }

  pan() {
    this.drawMap.pan();
  }

}
