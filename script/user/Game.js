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

        this.application.stage.addEventListener('mousedown', Events.onMousedown);
        this.application.stage.addEventListener('mouseup', Events.onMouseup);
        this.application.stage.addEventListener('mousemove', Events.onMousemove);
        this.application.stage.addEventListener('mouseover', Events.onMouseover);

        this.field = new Field();
        this.addList(this.field.list);

        this.dotsQueue = [];
        this.linesQueue = [];
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
        return this.linesQueue.at(-1)
    }

    getLastDot() {
        return this.dotsQueue.at(-1)
    }

    inLinesQueue(line) {
        return this.linesQueue.includes(line);
    }

    addDot(dot) {
        if (!this.dotsQueue.includes(dot)) {
            this.dotsQueue.push(dot)
        }
    }

    addLine(line) {
        if (!this.linesQueue.includes(line)) {
            this.linesQueue.push(line)
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
