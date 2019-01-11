function GameView(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.tile = this.game.addTile();
}

GameView.MOVES = {
    a: -1,
    d: 1
};

GameView.prototype.bindKeyHandlers = function bindKeyHandlers(tile) {
    render = this.render.bind(this);

    function handleKeypress(event) {
        if (event.keyCode == 97) {
            tile.shift(-1); // a
            requestAnimationFrame(render);
        } else if (event.keyCode == 100) {
            tile.shift(1); // d
            requestAnimationFrame(render);
        } else if (event.keyCode == 119) {
            tile.toggleLetter();
            requestAnimationFrame(render);
        } else {
            // console.log("other key pressed ", event.keyCode);
        }
    }

    function handleKeydown(event) {
        if (event.keyCode == 37) {
            tile.shift(-1); // left arrow
            requestAnimationFrame(render);
        } else if (event.keyCode == 39) {
            tile.shift(1); // right arrow
            requestAnimationFrame(render);
        } else if (event.keyCode == 38) {
            tile.toggleLetter();
            requestAnimationFrame(render);
        } else {
            //   console.log("other key pressed 2 ", event.keyCode);
        }
    }

    document.handleKeypress = handleKeypress.bind(tile);
    document.handleKeydown = handleKeydown.bind(tile);

    document.addEventListener('keypress', document.handleKeypress);
    document.addEventListener('keydown', document.handleKeydown);

};

GameView.prototype.unbindKeyHandlers = function unbindKeyHandlers(tile) {
    // console.log("Attempting to remove keybinds...");
    // debugger;
    document.removeEventListener('keypress', document.handleKeypress);
    document.removeEventListener('keydown', document.handleKeydown);
}

GameView.prototype.start = function start() {
    this.bindKeyHandlers(this.tile);
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
    if ( this.game.checkVerticalCollisions() ) {
        // debugger;
        this.unbindKeyHandlers(this.tile);
        this.tile = this.game.addTile();
        this.bindKeyHandlers(this.tile);
    }
    this.ctx.clearRect(0, 0, 600, 600);
    this.game.draw(this.ctx);
    this.lastTime = time;
    const sleep = function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    // await sleep(1000);
    await sleep(400);
    requestAnimationFrame(this.animate.bind(this));
};

module.exports = GameView;