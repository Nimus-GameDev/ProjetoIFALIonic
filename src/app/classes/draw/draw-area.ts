import { MapControllerService } from '../../services/map/map-controller.service';
export class DrawArea {

    private canvas: any;
    private context: any;

    private touchPosition = {
        initX: undefined,
        initY: undefined,
        endX: undefined,
        endY: undefined,
        updateX: undefined,
        updateY: undefined
      };

    constructor(private mapCtrl: MapControllerService) {
        setTimeout(() => {
            console.log('2');
            this.canvas = this.mapCtrl.getCanvas;
            this.context = this.mapCtrl.getContext;
        }, 0);
    }

    public touchDown(event) {
        console.log(event);
        const clientX = event.changedTouches[0].clientX;
        const clientY = event.changedTouches[0].clientY;

        this.touchPosition.initX = clientX;
        this.touchPosition.initY = clientY;

    }

    public touchUp(event) {
        const clientX = event.changedTouches[0].clientX;
        const clientY = event.changedTouches[0].clientY;

        this.touchPosition.endX = clientX;
        this.touchPosition.endY = clientY;

        console.log('endX: ' + Math.round(this.touchPosition.endX));
        console.log('endY: ' + Math.round(this.touchPosition.endY));

    }
    // draw area in move
    public touchMove(event) {
        const clientX = event.changedTouches[0].clientX;
        const clientY = event.changedTouches[0].clientY;

        this.touchPosition.updateX = clientX;
        this.touchPosition.updateY = clientY;

        console.log('updateX: ' + Math.round(this.touchPosition.updateX));
        console.log('updateY: ' + Math.round(this.touchPosition.updateY));

        console.log('Draw move');

        this.context.strokeStyle = 'red';
        this.context.strokeRect(
        this.touchPosition.initX < this.touchPosition.updateX ? this.touchPosition.initX : this.touchPosition.updateX, // x
        this.touchPosition.initY < this.touchPosition.updateY ? this.touchPosition.initY : this.touchPosition.updateY, // y
        this.touchPosition.updateX > this.touchPosition.initX ? // width
        this.touchPosition.updateX - this.touchPosition.initX :
        this.touchPosition.initX - this.touchPosition.updateX,
        this.touchPosition.updateY > this.touchPosition.initY ? // height
        this.touchPosition.updateY - this.touchPosition.initY :
        this.touchPosition.initY - this.touchPosition.updateY
        );
        this.context.strokeStyle = 'black';
    }
    /*
    // add area
    public addArea(name: string, description: string) {
        this.areasCtrl.addArea(
            name,
            description,
            this.touchPosition.initX,
            this.touchPosition.initY,
            this.touchPosition.endX,
            this.touchPosition.endY,
            this.mapDraw.deslX,
            this.mapDraw.deslY
        );
    } */

    public get getPositions() {
        return {
            initX: this.touchPosition.initX,
            initY: this.touchPosition.initY,
            endX: this.touchPosition.endX,
            endY: this.touchPosition.endY
        };
    }

}
