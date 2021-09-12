class Dot {
    static lastId = 0;

    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.id = Dot.lastId;
        Dot.lastId++;
        this.displayObject = this.createDisplayObject(x, y, color);
    }

    createDisplayObject(x, y, color) {
        let displayObject = new PIXI.Graphics();
        //displayObject.lineStyle(2, 0xFFFFFF, 1);
        displayObject.beginFill(color, 1);
        displayObject.Color = color;
        let size = Config.dotSize + Config.margin;
        displayObject.drawCircle(size, size, Config.dotSize);
        displayObject.endFill();
        displayObject.x = x * size * 2;
        displayObject.y = y * size * 2;
        displayObject.interactive = true;
        displayObject.buttonMode = true;
        displayObject.name = "Dot";
        displayObject.id = this.id;
        return displayObject;
    }
}
