class Line extends PIXI.Graphics {
    constructor(points, lineSize, lineColor) {
        super();
        let s = this.lineWidth = lineSize || 10;
        let c = this.lineColor = lineColor || "0x000000";
        this.points = points;
        let x1 = points[0];
        let y1 = points[1];
        let x2 = points[2];
        let y2 = points[3];

        this.lineStyle(s, c)
        this.moveTo(x1, y1);
        this.lineTo(x2, y2);

        this.length = this.getDistance(x1, y1, x2, y2)
    }

    getDistanceToNextPoint(x2, y2) {
        let x1 = this.points[0];
        let y1 = this.points[1];
        return this.getDistance(x1, y1, x2, y2);
    }

    getDistance(x1, y1, x2, y2) {
        let x = x2 - x1;
        let y = y2 - y1;
        x *= x;
        y *= y;
        let s = x + y;
        return Math.sqrt(s);
    }

    updatePoints(p) {
        let points = this.points = p.map((val, index) => val || this.points[index]);
        let x1 = points[0];
        let y1 = points[1];
        let x2 = points[2];
        let y2 = points[3];

        let s = this.lineWidth, c = this.lineColor;
        this.clear();
        this.lineStyle(s, c);
        this.moveTo(x1, y1);
        this.lineTo(x2, y2);

        this.length = this.getDistance(x1, y1, x2, y2)
    }
}
