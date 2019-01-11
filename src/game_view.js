function GameView(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.tile = this.game.addTile();
    this.letter = this.game.addLetter();
}

GameView.MOVES = {
    a: -1,
    d: 1
};

GameView.prototype.bindKeyHandlers = function bindKeyHandlers() {
    const tile = this.tile;
    const letter = this.letter;

    document.addEventListener('keypress', (event) => {
        if (event.keyCode == 97) {
            tile.shift(-1); // a
            requestAnimationFrame(this.render.bind(this));
        } else if (event.keyCode == 100) {
            tile.shift(1); // d
            requestAnimationFrame(this.render.bind(this));
        } else if (event.keyCode == 119) {
            letter.toggleLetter();
            requestAnimationFrame(this.render.bind(this));
        } else {
            // console.log("other key pressed ", event.keyCode);
        }
    })

    document.addEventListener('keydown', (event) => {
        if (event.keyCode == 37) {
          tile.shift(-1); // left arrow
          requestAnimationFrame(this.render.bind(this));
        } else if (event.keyCode == 39) {
          tile.shift(1); // right arrow
          requestAnimationFrame(this.render.bind(this));
        } else if (event.keyCode == 38) {
          letter.toggleLetter();
          requestAnimationFrame(this.render.bind(this));
        } else {
        //   console.log("other key pressed 2 ", event.keyCode);
        }
    })

};

GameView.prototype.start = function start() {
    this.bindKeyHandlers();
    this.lastTime = 0;
    // start the animation
    requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.render = function render(time) {
    const timeDelta = time - this.lastTime;
    this.ctx.clearRect(0, 0, 600, 600);
    this.game.draw(this.ctx);
    this.lastTime = time;
};

GameView.prototype.animate = async function animate(time) {
    const timeDelta = time - this.lastTime;
    this.game.step(timeDelta);
    this.ctx.clearRect(0, 0, 600, 600);
    this.game.draw(this.ctx);
    this.lastTime = time;
    const sleep = function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    await sleep(1000);
    requestAnimationFrame(this.animate.bind(this));
};

module.exports = GameView;