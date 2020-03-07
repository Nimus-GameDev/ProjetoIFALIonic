import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { Platform } from '@ionic/angular';
import { MapControllerService } from '../../services/map/map-controller.service';

@Component({
  selector: 'map-canvas',
  templateUrl: './map-canvas.component.html',
  styleUrls: ['./map-canvas.component.scss'],
})
export class MapCanvasComponent implements OnInit {

  @ViewChild('myCanvas', undefined) canvas: any;

  private canvasElement: any;
  private context: any;

  constructor(public platform: Platform, private renderer: Renderer2, private mapCtrl: MapControllerService) { }

  ngOnInit() {
    this.canvasElement = this.canvas.nativeElement;

    this.context = this.canvasElement.getContext('2d');

    this.renderer.setAttribute(this.canvasElement, 'width', this.platform.width() + ' ');
    this.renderer.setAttribute(this.canvasElement, 'height', this.platform.height() + ' ' );

    this.mapCtrl.initMap(this.canvasElement, this.context);

  }

}
