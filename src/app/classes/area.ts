export class Area {

    private id: number;
    private name: string;
    private description: string;
    private position = {
        x: undefined,
        y: undefined
    };
    private dimension = {
        width: undefined,
        height: undefined
    };

    constructor(id: number, name: string, description: string, x: number, y: number, width: number, height: number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.position.x = x;
        this.position.y = y;
        this.dimension.width = width;
        this.dimension.height = height;
    }

    public get getId(): number {
        return this.id;
    }

    public set setId(id: number) {
        this.id = id;
    }

    public get getName(): string {
        return this.name;
    }

    public set setName(name: string) {
        this.name = name;
    }

    public get getDescription(): string {
        return this.description;
    }

    public set setDescription(description: string) {
        this.description = description;
    }

    public get getPosition() {
        return this.position;
    }

    public set setPosition(position: {x: number, y: number}) {
        this.position = position;
    }

    public get getDimension() {
        return this.dimension;
    }

    public set setDimension(dimension: {width: number, height: number}) {
        this.dimension = dimension;
    }

    public get getX(): number {
        return this.position.x;
    }

    public set setX(x: number) {
        this.position.x = x;
    }

    public get getY(): number {
        return this.position.y;
    }

    public set setY(y: number) {
        this.position.y = y;
    }

    public get getWidth(): number {
        return this.dimension.width;
    }

    public set setWidth(width: number) {
        this.dimension.width = width;
    }

    public get getHeight(): number {
        return this.dimension.height;
    }

    public set setHeight(height: number) {
        this.dimension.height = height;
    }

}
