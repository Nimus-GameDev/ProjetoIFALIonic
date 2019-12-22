import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { Platform } from '@ionic/angular';
import { DrawMapService } from '../../services/draw-map.service';
import { DrawAreaService } from '../../services/draw-area.service';

@Component({
  selector: 'draw-canvas',
  templateUrl: './draw-canvas.component.html',
  styleUrls: ['./draw-canvas.component.scss'],
})
export class DrawCanvasComponent implements OnInit {

  @ViewChild('myCanvas', undefined) canvas: any;

  private canvasElement: any;
  private context2D: any;

  constructor(
    public platform: Platform,
    private renderer: Renderer2,
    private drawMap: DrawMapService,
    private drawArea: DrawAreaService) { }

  ngOnInit() {
    this.canvasElement = this.canvas.nativeElement;

    this.context2D = this.canvasElement.getContext('2d');

    this.renderer.setAttribute(this.canvasElement, 'width', this.platform.width() + ' ');
    this.renderer.setAttribute(this.canvasElement, 'height', this.platform.height() + ' ' );
    this.renderer.setAttribute(this.canvasElement, 'background', 'red');
    this.drawMap.initDraw(this.canvasElement);
  }

  //Reajusta o canvas para as dimensoes da tela
  click(event) {
    console.log(event);
    this.renderer.setAttribute(this.canvasElement, 'width', this.platform.width() + ' ');
    this.renderer.setAttribute(this.canvasElement, 'height', this.platform.height() + ' ' );
    this.renderer.setAttribute(this.canvasElement, 'background', 'red');
  }

}
