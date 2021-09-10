function HTMLAllLoad() {
    try {
        let game = new Game();
        game.run();
    } catch (error) {
        alert(error.name + '\n\n' + error.message + '\n\n' + error.stack);
    }
}
