export class Area {

    private id: number;
    private x: number;
    private y: number;
    private width: number;
    private height: number;

    public constructor(id:number, x:number, y:number, width:number, height:number) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }


    public getPosition() {
        return {x: this.getX(), y: this.getY()};
    }

    public setPosition(x: number, y: number) {
        this.setX(x);
        this.setY(y);
    }

    // Getters and Setters
    public getId() {
        return this.id;
    }
    public setId(id: number) {
        this.id = id;
    }
    public getX() {
        return this.x;
    }
    public setX(x: number){
        this.x = x;
    }
    public getY() {
        return this.y;
    }
    public setY(y: number) {
        this.y = y;
    }
    public getWidth() {
        return this.width;
    }
    public setWidth(width: number) {
        this.width = width;
    }
    public getHeight() {
        return this.height;
    }
    public setHeight(height: number) {
        this.height = height;
    } 

}
