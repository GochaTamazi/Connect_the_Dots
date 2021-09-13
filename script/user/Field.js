class Field {
    constructor(game) {
        this.game = game;

        this.field = Array.from(Array(Config.fieldSize), () => new Array(Config.fieldSize));
        this.fillRandom();

        this.animatedObj = new Map();
    }

    fillRandom() {
        for (let x = 0; x < Config.fieldSize; x++) {
            for (let y = 0; y < Config.fieldSize; y++) {
                let dot = new Dot(x, y, Config.getRandColors());
                this.field[x][y] = dot;
                this.game.application.stage.addChild(dot);
            }
        }
    }

    rebaseField() {


        /*
        let rebaseAgain = false;
        do {
            rebaseAgain = false;
            for (let y = Config.fieldSize - 1; y >= 0; y--) {
                for (let x = 0; x < Config.fieldSize; x++) {
                    let dot = this.field[x][y];
                    if (dot.deleted) {
                        if (y - 1 >= 0) {
                            let upDot = this.field[x][y - 1];
                            let Y = upDot.displayObject.y;
                            //upDot.displayObject.moveTo(upDot.displayObject.x, dot.displayObject.y);
                            //upDot.displayObject.position.set(upDot.displayObject.x, dot.displayObject.y);
                            //upDot.displayObject.y = dot.displayObject.y;
                            upDot.animation = new MovementAnimation(upDot.displayObject, dot.displayObject.y, 8);
                            this.animatedObj.set(upDot.id, upDot);
                            //this.animatedObj.push(upDot);
                            dot.displayObject.y = Y;
                            this.field[x][y] = upDot;
                            this.field[x][y - 1] = dot;
                            rebaseAgain = true;
                        }
                    }
                }
            }
            for (let x = 0; x < Config.fieldSize; x++) {
                let dot = this.field[x][0];
                if (dot.deleted) {
                    this.nexDots[x].animation = new MovementAnimation(this.nexDots[x].displayObject, dot.displayObject.y, 8);
                    this.field[x][0] = this.nexDots[x];
                    //this.game.application.stage.addChild(this.field[x][0].displayObject);
                    let color = Config.getRandColors();
                    let nDot = new Dot(x, -2, color);
                    this.nexDots[x] = nDot;
                    this.map.set(nDot.id, nDot);
                    this.game.application.stage.addChild(nDot.displayObject);
                    rebaseAgain = true;
                }
            }
            for (let row of this.field) {
                for (let col of row) {
                    if (col.deleted) {
                        rebaseAgain = true;
                    }
                }
            }
        }
        while (rebaseAgain);
        */
    }

    getElement(key) {
        return this.map.get(key);
    }
}
