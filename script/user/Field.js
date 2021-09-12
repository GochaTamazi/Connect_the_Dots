class Field {
    constructor() {
        this.field = Array.from(Array(Config.fieldSize), () => new Array(Config.fieldSize));
        this.map = new Map();

        this.fillRandom();
    }

    fillRandom() {
        for (let x = 0; x < Config.fieldSize; x++) {
            for (let y = 0; y < Config.fieldSize; y++) {
                let color = Config.getRandColors();
                let dot = new Dot(x, y, color);
                this.field[x][y] = dot;
                this.map.set(dot.id, dot);
            }
        }
    }

    getElement(key) {
        return this.map.get(key);
    }

    getList() {
        return this.map.values();
    }
}
