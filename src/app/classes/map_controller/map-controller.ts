export class MapController {

    positions: any = {
        initialX: 0,
        initialY: 0,
        finalX: 0,
        finalY: 0,
        xUpdated: 0,
        yUpdated: 0,
        deslX: 0,
        deslY: 0
    };

    pinch = {
        startScale: undefined,
        endScale: undefined 
    }

    scales = {
        scale1: undefined,
        scale2: undefined,
        scale: 1
    }

    sensitivity = 0;

    isZoom: boolean = false;

    contador = 1;

    constructor(displacement: any, sensitivity: number) {
        this.sensitivity = sensitivity;
        this.positions.deslX = displacement.x;
        this.positions.deslY = displacement.y;
    }

    public touchDown(event) {
        // console.log('Alert - touchDown actived.');

        // Get Position X and Y of Touch
        const clientX = event.changedTouches['0'].clientX;
        const clientY = event.changedTouches['0'].clientY;

        // Update the positions X and Y
        this.positions.xUpdated = this.positions.deslX;
        this.positions.yUpdated = this.positions.deslY;

        // Get initial position of touch
        this.positions.initialX = clientX;
        this.positions.initialY = clientY;
    }

    touchUp(event) {
        // console.log('Alert - touchUp actived.');

        // Get Position X and Y of Touch
        const clientX = event.changedTouches['0'].clientX;
        const clientY = event.changedTouches['0'].clientY;

        // Get final position of touch
        this.positions.finalX = clientX;
        this.positions.finalY = clientY;

        // tslint:disable-next-line: max-line-length
        const positionIsEqual = this.positions.finalX === this.positions.initialX || this.positions.finalY === this.positions.initialY;

        if ( !(positionIsEqual)) {
            this.positions.deslX += (this.positions.finalX - this.positions.initialX) / this.sensitivity;
            this.positions.deslY += (this.positions.finalY - this.positions.initialY) / this.sensitivity;
        }
        return {x: this.positions.deslX, y: this.positions.deslY};
    }

   touchMove(event) {
        // console.log('Alert - touchMove actived.');

        // Get Position X and Y of Touch
        const clientX = event.changedTouches['0'].clientX;
        const clientY = event.changedTouches['0'].clientY;
        // posicao = posicao do mapa + Diferenca relativa a movimentacao do mouse
        this.positions.xUpdated =  this.positions.deslX + (clientX - this.positions.initialX) / this.sensitivity;
        this.positions.yUpdated = this.positions.deslY + (clientY - this.positions.initialY) / this.sensitivity;

        return {x: this.positions.xUpdated, y: this.positions.yUpdated};
    }

    public pinchStart(event, scale: number){
        console.log('scale: ', scale);
        console.log("pinchStart");
        this.scales.scale = scale;

        this.pinch.startScale = event.scale;
    }

    public pinchEnd(event) {
        this.pinch.endScale = event.scale;

        console.log("pinchEnd");
        if ( this.pinch.startScale > this.pinch.endScale ) {
            this.zoomOut();
        } else {
            this.zoomIn();
        }

    }

    pinchMove(event) {

      if ( this.contador === 1) {
        this.scales.scale1 = this.pinch.startScale;
        this.scales.scale2 = event.scale;
        this.contador++;
      } else if (this.contador === 2) {
        this.scales.scale1 = this.scales.scale2;
        console.log('Scale1: ' + this.scales.scale1);
        this.scales.scale2 = event.scale;
        console.log('Scale2: ' + this.scales.scale2);
        // this.contador--;
      }

      if ( this.scales.scale2 < this.scales.scale1) {
        this.zoomOut();
      } else if (this.scales.scale2 > this.scales.scale1) {
        this.zoomIn();
      }
    }

    private zoomIn() {
        this.scales.scale +=  this.sensitivity * Math.abs( this.pinch.endScale - this.pinch.startScale );
        
        console.log('scaleIn: ', this.scales.scale);
    }

    private zoomOut() {

        if ( this.scales.scale > 0.5) {
            this.scales.scale -= this.sensitivity * Math.abs( this.pinch.endScale - this.pinch.startScale );
        } else if ( this.scales.scale <= 0.5) {
            this.scales.scale = 0.5;
        }

        console.log('scaleOut: ', this.scales.scale);
    }

    public get getScale():number {
        return this.scales.scale;
    }

}
