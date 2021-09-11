class Events {
    static onMousedown(e) {
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
                if (!Config.game.inDotsQueue(e.target)) {
                    Config.game.addLine(Mouse.Line);
                    Config.game.addDot(e.target);
                }
            }
        }
    }

    static onMouseup(e) {
        Config.game.removeChild(Mouse.Line)
        Mouse.LMB = false;
        Mouse.Line = false;
        Config.game.clearLines();
        Config.game.clearDots();
    }

    static onMousemove(e) {
        if (Mouse.LMB === true) {
            //console.log(`stage onMousemove: ${e.x} ${e.y}`)
            //console.log(`stage onMousemove target: ${e.target.x} ${e.target.y}`)
            //console.log(e.target.name)
            if (Mouse.Line !== false) {
                Mouse.Line.updatePoints([null, null, e.x, e.y])
                //console.log(Mouse.Line.lineColor)
            }
        }
    }

    static onMouseover(e) {
        if (Mouse.LMB === true) {
            if (e.target.name === "Dot") {
                if (e.target.Color === Mouse.Line.lineColor) {
                    if (!Config.game.inDotsQueue(e.target)) {
                        let size = Config.dotSize + Config.margin
                        let x = e.target.x + size;
                        let y = e.target.y + size;
                        let line = new Line([x, y, e.x, e.y], Config.lineSize, e.target.Color);
                        Mouse.Line.updatePoints([null, null, x, y])
                        Config.game.addChildBack(line);
                        Mouse.Line = line;
                        Config.game.addLine(Mouse.Line)
                        Config.game.addDot(e.target)
                    }
                }
            }
        }
    }
}