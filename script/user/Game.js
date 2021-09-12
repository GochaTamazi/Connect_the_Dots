class Game {
    constructor() {
        this.maxDist = Config.dotSize * 2 + Config.margin * 2;    // Maximum length of dots connection
        this.dotsQueue = [];
        this.linesQueue = [];

        let fieldLength = (Config.dotSize + Config.margin) * Config.fieldSize * 2;   // Field size in pixels
        delete PIXI.Renderer.__plugins.interaction;
        this.application = new PIXI.Application({
            width: fieldLength,
            height: fieldLength,
            backgroundColor: Config.backgroundColor,
            antialias: true,
            autoDensity: true,
            resolution: 2
        });
        document.body.appendChild(this.application.view);

        if (!('events' in this.application.renderer)) {
            this.application.renderer.addSystem(PIXI.EventSystem, 'events');
        }

        this.application.stage.interactive = true;
        this.application.stage.hitArea = this.application.renderer.screen;

        this.field = new Field();
        this.addList(this.field.getList());

        let game = this;
        this.application.stage.addEventListener('mousedown', (e) => {
            game.onMousedown(e);
        });
        this.application.stage.addEventListener('mouseup', (e) => {
            game.onMouseup(e);
        });
        this.application.stage.addEventListener('mousemove', (e) => {
            game.onMousemove(e);
        });
        this.application.stage.addEventListener('mouseover', (e) => {
            game.onMouseover(e);
        });

        this.application.ticker.add(this.ticker, this);
    }

    inDotsQueue(dot) {
        return this.dotsQueue.includes(dot);
    }

    isPrevDot(dot) {
        if (this.dotsQueue.length >= 2) {
            return this.dotsQueue[this.dotsQueue.length - 2] === dot;
        }
        return false;
    }

    popDot() {
        return this.dotsQueue.pop();
    }

    popLine() {
        return this.linesQueue.pop();
    }

    getLastLine() {
        return this.linesQueue.at(-1);
    }

    addDot(dot) {
        if (!this.dotsQueue.includes(dot)) {
            this.dotsQueue.push(dot);
        }
    }

    addLine(line) {
        if (!this.linesQueue.includes(line)) {
            this.linesQueue.push(line);
        }
    }

    clearLines() {
        for (let l of this.linesQueue) {
            this.removeChild(l);
        }
        this.linesQueue = [];
    }

    clearDots() {
        for (let d of this.dotsQueue) {
            //this.removeChild(d);
        }
        this.dotsQueue = [];
    }

    addChild(displayObject) {
        this.application.stage.addChild(displayObject);
    }

    addChildBack(displayObject) {
        this.application.stage.addChildAt(displayObject, 0);
    }

    removeChild(child) {
        this.application.stage.removeChild(child);
    }

    addList(list) {
        for (let v of list) {
            this.addChild(v.displayObject);
        }
    }

    /*
        Events begin
    */
    onMousedown(e) {
        if (e.target.name === "Dot") {
            //e.x e.y | e.target.x e.target.y
            Mouse.LMB = true;
            if (Mouse.Line === false) {
                let size = Config.dotSize + Config.margin;
                let x = e.target.x + size;
                let y = e.target.y + size;
                let line = new Line([x, y, e.x, e.y], Config.lineSize, e.target.Color);
                this.addChildBack(line);
                Mouse.Line = line;
                if (!this.inDotsQueue(e.target)) {
                    this.addLine(Mouse.Line);
                    this.addDot(e.target);
                }
            }
        }
    }

    onMouseup(e) {
        this.removeChild(Mouse.Line);
        Mouse.LMB = false;
        Mouse.Line = false;
        this.clearLines();
        this.clearDots();
    }

    onMousemove(e) {
        if (Mouse.LMB === true) {
            if (Mouse.Line !== false) {
                Mouse.Line.updatePoints([null, null, e.x, e.y]);
            }
        }
    }

    onMouseover(e) {
        if (Mouse.LMB === true) {
            if (e.target.name === "Dot") {
                console.log(e.target.id);
                let field = this.field;
                let elem = field.getElement(e.target.id);
                console.log(elem)

                if (e.target.Color === Mouse.Line.lineColor) {
                    if (!this.inDotsQueue(e.target)) {
                        let size = Config.dotSize + Config.margin;
                        let x = e.target.x + size;
                        let y = e.target.y + size;
                        let length = Mouse.Line.getDistanceToPoint(x, y);
                        if (length <= this.maxDist) {
                            let line = new Line([x, y, e.x, e.y], Config.lineSize, e.target.Color);
                            Mouse.Line.updatePoints([null, null, x, y]);
                            this.addChildBack(line);
                            Mouse.Line = line;
                            this.addLine(Mouse.Line);
                            this.addDot(e.target);
                        }
                    } else if (this.isPrevDot(e.target)) {
                        let dot = this.popDot();
                        let line = this.popLine();
                        this.removeChild(line);
                        Mouse.Line = this.getLastLine();
                    }
                }
            }
        }
    }

    ticker(delta) {
        //const mouseCoords = this.application.renderer.plugins.interaction.mouse.global;
        //greenCircle.x = mouseCoords.x;
        //greenCircle.y = mouseCoords.y;
    }

    /*
        Events end
    */
}
