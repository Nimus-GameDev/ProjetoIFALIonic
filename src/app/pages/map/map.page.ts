import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import { MapControllerService } from '../../services/map/map-controller.service';
import { Map } from '../../classes/map';
import { AppConfig } from '../../config/app-config';
import { DrawArea } from '../../classes/draw/draw-area';
import { AreaController } from '../../classes/area_controller/area-controller';
import { DatabaseService } from '../../services/sqlite/database.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  private map: Map;
  private drawArea: DrawArea;
  private areaCtrl: AreaController;

  private areas: any = [];

  // area
  public area = {
    name: '',
    description: ''
  };

  // icons
  private iconStar = AppConfig.imgBntStar;
  private iconSquare = AppConfig.imgBntSquareDefault;

  public isDrawArea = false;
  public isRegister = false;

  constructor(private mapCtrl: MapControllerService, private database: DatabaseService) {
    this.map = new Map(this.mapCtrl);
    this.drawArea = new DrawArea(this.mapCtrl);
    this.areaCtrl = new AreaController(this.database);

  }

  ngOnInit() {
    
    setTimeout(() => {
      this.areaCtrl.loadAreas();
    }, 2);

  }

  
  ionViewWillEnter() {

    setTimeout(() => {
      this.areaCtrl.loadAreas();
    }, 2);

  }

  // isso salva vidas
  ionViewDidEnter() {
    console.log('ionView')
    
    this.areas = this.areaCtrl.areas;
    this.map.areas = this.areas;

    console.log('areas: ', this.areas);
    
    if ( this.areas.length > 0) {
      this.map.drawArea(this.areas);
    }
    
    this.map.updateMap();
  }

  a

  touch(event) {
    // console.log(this.mapCtrl.getCanvas);
  }

  down(event) {
    if ( this.isDrawArea) {
      this.drawArea.touchDown(event);
    } else if ( !this.map.isZoom ){
      this.map.touchDown(event);
    }
  }
  up(event) {
    if ( this.isDrawArea ) {
      this.drawArea.touchUp(event);
      this.isRegister = true;
    } else if ( !this.map.isZoom)  {
      this.map.touchUp(event);
    }
  }

  move(event) {
    if ( this.isDrawArea ) {
      this.map.clearScreen();
      this.map.drawMap();
      this.map.drawArea(this.areas);
      this.drawArea.touchMove(event);
    } else if ( !this.map.isZoom) {
      this.map.touchMove(event);
    }
  }

  pinchStart(event) {
    console.log("pinchStart brow");
    this.map.pinchStart(event);
    this.map.updateMap()
    this.map.drawArea(this.areas);
  }
  pinchEnd(event) {
    this.map.pinchEnd(event);
    
    this.map.updateMap()
    this.map.drawArea(this.areas);
  }
  pinchMove(event) {
    this.map.pinchMove(event);
    
    this.map.updateMap()
    this.map.drawArea(this.areas);
  }

  onDrawActived() {
    this.isDrawArea = this.isDrawArea ? false : true;
    this.iconSquare = this.isDrawArea ? AppConfig.imgBntSquareActived : AppConfig.imgBntSquareDefault;
  }

  addArea() {
    const positions = this.drawArea.getPositions;
    console.log(positions);
    const area = this.areaCtrl.addArea(
      this.area.name,
      this.area.description,
      positions.initX,
      positions.initY,
      positions.endX,
      positions.endY,
      this.map.displacement.x,
      this.map.displacement.y,
      this.map.scale
    )
    this.areas = this.areaCtrl.getAreas;

    // this.areas = this.areaCtrl.loadAreas();

    console.log('areas: ', this.areas);

    this.onDrawActived();
    this.isRegister = false;
    this.map.updateMap();
    this.map.drawArea(this.areas);
  }

  cancel() {
    this.onDrawActived();
    this.isRegister = false;

    this.map.updateMap();
    this.map.drawArea(this.areas);
  }


}
