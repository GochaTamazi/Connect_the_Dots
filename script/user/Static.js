class Config {
    static fieldSize = 6;
    static dotSize = 30;
    static margin = 15;
    static maxDist = Config.dotSize * 2 + Config.margin * 2;
    static lineSize = 30;
    static fieldLength = (Config.dotSize + Config.margin) * Config.fieldSize * 2;
    static dotColors = [
        0xddd01f, //yellow
        0x81b2fe, //blue
        0x82e08a, //green
        0xe65d42, //red
        0x8e5dab  //purple
    ];
    static game;

    static getRandColors() {
        let i = Math.floor(Math.random() * Config.dotColors.length);
        return Config.dotColors[i];
    }
}

class Mouse {
    static LMB = false;
    static Line = false;
}
