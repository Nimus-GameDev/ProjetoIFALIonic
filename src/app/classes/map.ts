import { MapControllerService } from '../services/map/map-controller.service';
import { OnInit } from '@angular/core';
import { MapController } from './map_controller/map-controller';
export class Map implements OnInit {

    public canvas: any;
    public context: any;
    public map: any;
    public areas: any = [];

    public scale = 1;

    public position = {
        x: 0,
        y: 0
    };

    public displacement = {
        x: 0,
        y: 0
    };

    public isZoom = false;

    public sensitivy = 2;

    public pixelMapWidth = 20;
    public pixelMapHeight = 20;

    public mapCtrl: MapController;

    public isTouch = false;

    public countDown = 0;

    constructor(private mapCtrlServ: MapControllerService) {
        setTimeout(() => {
            console.log('1');
            this.canvas = this.mapCtrlServ.getCanvas;
            this.context = this.mapCtrlServ.getContext;

            this.map = this.mapCtrlServ.getMapInBits;

            console.log('Context: ' + this.context);
            this.displacement.x = this.canvas.width / 2;
            this.displacement.y = this.canvas.height / 2;
            this.mapCtrl = new MapController({x: this.displacement.x, y: this.displacement.y }, this.sensitivy);
        }, 0);
    }

    ngOnInit() {

    }


    public updateMap() {
        this.clearScreen();
        this.drawMap();
    }
    
    public drawMap() {
        /*
        //console.log('Context: ' + this.context);
        for (let pixelY = 0; pixelY < this.map.length; pixelY++) {
            for ( let pixelX = 0; pixelX < this.map.length; pixelX++) {
              if ( this.map[pixelY] == 1) {
                this.context.strokeRect(
                Math.round( this.position.x + this.displacement.x + ( pixelX * ( this.pixelMapWidth * this.scale ) ) ),
                Math.round( this.position.x + this.displacement.y +  ( pixelY * (this.pixelMapHeight * this.scale) ) ),
                this.pixelMapWidth * this.scale, this.pixelMapHeight * this.scale);
              }
            }
        }*/

        this.context.strokeRect(
            Math.round( this.position.x + this.displacement.x + ( 1 * ( this.pixelMapWidth * this.scale ) ) ),
            Math.round( this.position.x + this.displacement.y +  ( 1 * (this.pixelMapHeight * this.scale) ) ),
            this.pixelMapWidth * this.scale, this.pixelMapHeight * this.scale
        );

    }

    public drawArea(areas: any) {
        areas.forEach(  (area) => {
            //this.contexto2D.strokeStyle = 'red';
            this.context.globalAlpha = 0.2;
            this.context.fillStyle = 'green';
            this.context.fillRect(
                this.displacement.x + (area.getX * this.scale),
                this.displacement.y + (area.getY * this.scale),
                area.getWidth * this.scale,
                area.getHeight * this.scale
                );
            // console.log(area);
        });

        this.context.globalAlpha = 1;
        this.context.fillStyle = 'black';
        /*
        this.context.globalAlpha = 0.2;
        this.context.fillStyle = 'green';
        this.context.fillRect(
        this.displacement.x + (20 * this.scale),
        this.displacement.y + (20 * this.scale),
        50 * this.scale,
        50 * this.scale
        ); */
    }

    public clearScreen() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public touchDown(event) {
       this.mapCtrl.touchDown(event);
       this.isTouch = true;
       // console.log(this.mapCtrl.sensitivity);
    }

    public touchUp(event) {
        const position = this.mapCtrl.touchUp(event);
        console.log("countDown: " + this.countDown);
        if (this.countDown === 0 ) {
            this.isZoom = false;
        } else {
            this.countDown--;
        }
        

        if ( this.isTouch ) {
            this.displacement.x = position.x;
            this.displacement.y = position.y;
            this.clearScreen();
            this.drawMap();
            this.drawArea(this.areas);
            // console.log(position.x);
            // console.log(position.y);
            this.isTouch = false;
        }
    }

    public touchMove(event) {
        const position = this.mapCtrl.touchMove(event);

        if (this.isTouch) {
            this.displacement.x = position.x;
            this.displacement.y = position.y;
            this.clearScreen();
            this.drawMap();
            this.drawArea(this.areas);
        }

        // console.log(position.x);
        // console.log(position.y);
    }

    public pinchStart(event) {
        this.isZoom = true;
        this.mapCtrl.pinchStart(event, this.scale);
        this.countDown = 2;
    }
    public pinchEnd(event) {
        this.mapCtrl.pinchEnd(event);
        this.scale = this.mapCtrl.getScale;
        //console.log('scale: ', this.scale)
    }
    public pinchMove(event) {
        this.mapCtrl.pinchMove(event);
        this.scale = this.mapCtrl.getScale;
        //console.log('scale: ', this.scale)
    }

    
    public get iszoom() : boolean {
        return this.isZoom
    }
    

}
