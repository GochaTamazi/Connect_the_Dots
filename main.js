function HTMLAllLoad() {
    try {
        let app = new PIXI.Application({
            width: 600,
            height: 600,
            backgroundColor: 0x1099bb,
            antialias: true,
            autoDensity: true,
            resolution: 1

        });
        document.body.appendChild(app.view);

        const greenCircle = new PIXI.Graphics();
        greenCircle.lineStyle(2, 0xFEEB77, 1);
        greenCircle.beginFill(0x00FF00, 1);
        greenCircle.drawCircle(0, 0, 60);
        greenCircle.endFill();

        app.ticker.add((delta) => {
            const mouseCoords = app.renderer.plugins.interaction.mouse.global;

            greenCircle.x = mouseCoords.x;
            greenCircle.y = mouseCoords.y;
        });
        app.stage.addChild(greenCircle);

    } catch (error) {
        alert(error.name + '\n\n' + error.message + '\n\n' + error.stack);
    }
}

class Dot {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }
}

class Field {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.field = Array.from(Array(this.width), () => new Array(this.height));
        this.colors = [
            'yellow',
            'blue',
            'green',
            'red',
            'purple'
        ];
        this.fillRandom()
    }

    fillRandom() {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                let i = Math.floor(Math.random() * this.colors.length);
                let color = this.colors[i];
                this.field[x][y] = new Dot(x, y, color)
            }
        }
    }
}
