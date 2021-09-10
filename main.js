function HTMLAllLoad() {
    try {
        let game = new Game();

        let field = new Field(game.fieldSize, game.fieldSize);

        for (let rov of field.field) {
            for (let col of rov) {
                game.addChild(col.displayObject)
            }
        }

        game.run()

    } catch (error) {
        alert(error.name + '\n\n' + error.message + '\n\n' + error.stack);
    }
}

class Game {
    constructor() {
        this.dotSize = 65;
        this.fieldSize = 6;
        this.backgroundColor = 0x6abdce;
        //this.backgroundColor = '#6abdce';

        this.application = new PIXI.Application({
            width: this.dotSize * this.fieldSize * 2,
            height: this.dotSize * this.fieldSize * 2,
            backgroundColor: this.backgroundColor,
            antialias: true,
            autoDensity: true,
            resolution: 1
        });
        document.body.appendChild(this.application.view);
    }

    run() {
        this.application.ticker.add(this.ticker, this);
    }

    addChild(displayObject) {
        this.application.stage.addChild(displayObject);
    }

    ticker(delta) {
        const mouseCoords = this.application.renderer.plugins.interaction.mouse.global;

        //greenCircle.x = mouseCoords.x;
        //greenCircle.y = mouseCoords.y;
    }
}

class Dot {
    constructor(x, y, color, displayObject) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.displayObject = displayObject;
    }
}

class Field {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.colors = [
            0xFFFF00, //yellow
            0x1E90FF, //dodgerblue
            0xADFF2F, //greenyellow
            0xCD5C5C, //indianred
            0x9370DB  //mediumpurple
        ];

        this.field = Array.from(Array(this.width), () => new Array(this.height));


        this.fillRandom()

    }

    fillRandom() {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                let i = Math.floor(Math.random() * this.colors.length);
                let color = this.colors[i];
                this.field[x][y] = this.createRandomDot(x, y, color)

            }
        }
    }

    createRandomDot(x, y, color) {
        let displayObject = new PIXI.Graphics();
        displayObject.lineStyle(2, 0xFFFFFF, 1);
        displayObject.beginFill(color, 1);
        displayObject.drawCircle(65, 65, 60);
        displayObject.endFill();

        displayObject.x = x * 65 * 2;
        displayObject.y = y * 65 * 2;

        return new Dot(x, y, color, displayObject)
    }
}
