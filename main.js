function HTMLAllLoad() {
    try {
        let app = new PIXI.Application({width: 800, height: 800});
        document.body.appendChild(app.view);

        let f = new Field(6, 6);
        console.log(f.field[0][0])

        console.log(f.field)

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
