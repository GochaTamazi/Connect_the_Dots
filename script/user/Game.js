class Game {
    constructor() {
        this.maxDist = Config.dotSize * 2 + Config.margin * 2;    // Maximum length of dots connection
        this.dotsQueue = [];
        this.linesQueue = [];
        this.score = 0;
        this.LMB = false;
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
        this.field = new Field(this);
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

    onMousedown(e) {
        if (e.target.name !== "Dot") {
            return;
        }
        this.LMB = true;
        let size = Config.dotSize + Config.margin;
        let x = e.target.x + size;
        let y = e.target.y + size;
        let line = new Line([x, y, e.global.x, e.global.y], Config.lineSize, e.target.Color);
        this.application.stage.addChildAt(line, 0);
        this.linesQueue.push(line);
        this.dotsQueue.push(e.target);
    }

    onMousemove(e) {
        if (this.LMB !== true) {
            return;
        }
        if (this.linesQueue.length <= 0) {
            return;
        }
        let line = this.linesQueue[this.linesQueue.length - 1];
        line.updatePoints([null, null, e.global.x, e.global.y]);
    }

    onMouseover(e) {
        if (e.target.name !== "Dot") {
            return;
        }
        if (this.LMB !== true) {
            return;
        }
        if (this.linesQueue.length <= 0) {
            return;
        }
        let line = this.linesQueue[this.linesQueue.length - 1];

        if (e.target.Color !== line.lineColor) {
            return;
        }
        let size = Config.dotSize + Config.margin;
        let x = e.target.x + size;
        let y = e.target.y + size;
        let length = line.getDistanceToPoint(x, y);
        if (length > this.maxDist) {
            return;
        }
        if (!this.dotsQueue.includes(e.target)) {
            line.updatePoints([null, null, x, y]);
            line = new Line([x, y, e.global.x, e.global.y], Config.lineSize, e.target.Color);
            this.application.stage.addChildAt(line, 0);
            this.linesQueue.push(line);
            this.dotsQueue.push(e.target);
        } else {
            if (this.dotsQueue.length < 2) {
                return;
            }
            let dot = this.dotsQueue[this.dotsQueue.length - 2];
            if (dot.id !== e.target.id) {
                return;
            }
            this.application.stage.removeChild(line);
            this.linesQueue.pop();
            this.dotsQueue.pop();
            if (this.linesQueue.length <= 0) {
                return;
            }
            line = this.linesQueue[this.linesQueue.length - 1];
            line.updatePoints([null, null, e.global.x, e.global.y]);
        }
    }

    onMouseup(e) {
        this.LMB = false;
        for (let l of this.linesQueue) {
            this.application.stage.removeChild(l);
        }
        this.linesQueue = [];
        if (this.dotsQueue.length >= 2) {
            for (let d of this.dotsQueue) {
                this.score++;
                //d.alpha = 0.5;
                this.application.stage.removeChild(d);
            }
            document.getElementById('score').innerHTML = this.score;
            this.field.rebaseField();
        }
        this.dotsQueue = [];
    }

    ticker(delta) {
        //const mouseCoords = this.application.renderer.plugins.interaction.mouse.global;
        //greenCircle.x = mouseCoords.x;
        //greenCircle.y = mouseCoords.y;
        for (const [key, a] of this.field.animatedObj) {
            if (a.animation) {
                if (!a.animation.done) {
                    a.animation.tick();
                } else {
                    a.animation = false;
                    this.field.animatedObj.delete(a.id);
                }
            }
        }
    }
}
