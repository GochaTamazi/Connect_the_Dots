class Game {
    constructor() {
        Config.game = this;
        delete PIXI.Renderer.__plugins.interaction;
        this.application = new PIXI.Application({
            width: Config.fieldLength,
            height: Config.fieldLength,
            backgroundColor: 0xffffff,
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
        this.application.stage.addEventListener('mousedown', this.onMousedown);
        this.application.stage.addEventListener('mouseup', this.onMouseup);
        this.application.stage.addEventListener('mousemove', this.onMousemove);
        this.field = new Field();
        this.addList(this.field.list);
    }

    onMouseup(e) {
        this.removeChild(Mouse.Line)
        Mouse.LMB = false;
        Mouse.Line = false;
    }

    onMousemove(e) {
        if (Mouse.LMB === true) {
            //console.log(`stage onMousemove: ${e.x} ${e.y}`)
            //console.log(`stage onMousemove target: ${e.target.x} ${e.target.y}`)
            //console.log(e.target.name)
            if (Mouse.Line !== false) {
                Mouse.Line.updatePoints([null, null, e.x, e.y])
            }
        }
    }

    onMousedown(e) {
        if (e.target.name === "Dot") {
            //console.log(`stage onMousedown: ${e.x} ${e.y}`)
            //console.log(`stage onMousedown target: ${e.target.x} ${e.target.y}`)
            //console.log(e.target.name)
            Mouse.LMB = true;
            if (Mouse.Line === false) {
                let size = Config.dotSize + Config.margin
                let x = e.target.x + size;
                let y = e.target.y + size;
                let line = new Line([x, y, e.x, e.y], Config.lineSize, e.target.Color);
                Config.game.addChildBack(line);
                Mouse.Line = line;
            }
        }
    }

    run() {
        //this.application.ticker.add(this.ticker, this);
    }

    addChild(displayObject) {
        this.application.stage.addChild(displayObject);
    }

    addChildBack(displayObject) {
        this.application.stage.addChildAt(displayObject, 0);
    }

    removeChild(child) {
        this.application.stage.removeChild(child)
    }

    addList(list) {
        for (let v of list) {
            this.addChild(v.displayObject)
        }
    }

    ticker(delta) {
        const mouseCoords = this.application.renderer.plugins.interaction.mouse.global;
        //greenCircle.x = mouseCoords.x;
        //greenCircle.y = mouseCoords.y;
    }
}
