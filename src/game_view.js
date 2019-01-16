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
    checkLeftCollision = this.game.checkLeftCollision.bind(this.game);
    checkRightCollision = this.game.checkRightCollision.bind(this.game);
    checkVerticalCollisions = this.game.checkVerticalCollisions.bind(this.game);
    destroyTiles = this.game.destroyTiles.bind(this.game);

    function handleKeypress(event) {
        if (event.keyCode == 97 && checkLeftCollision() === false) {
            event.preventDefault();
            tile.shift(-1); // a
            requestAnimationFrame(render);
        } else if (event.keyCode == 100 && checkRightCollision() === false) {
            event.preventDefault();
            tile.shift(1); // d
            requestAnimationFrame(render);
        } else if (event.keyCode == 119) {
            event.preventDefault();
            tile.toggleLetter(); // w
            requestAnimationFrame(render);
        } else if (event.keyCode == 115 && checkVerticalCollisions() === false) {
            event.preventDefault();
            tile.drop(1); // s
            requestAnimationFrame(render);
        } else if (event.keyCode == 32) {
            event.preventDefault();
            destroyTiles(); // spacebar
            requestAnimationFrame(render);
        } else {
            // console.log("other key pressed ", event.keyCode);
        }
    }

    function handleKeydown(event) {
        if (event.keyCode == 37 && checkLeftCollision() === false) {
            event.preventDefault();
            tile.shift(-1); // left arrow
            requestAnimationFrame(render);
        } else if (event.keyCode == 39 && checkRightCollision() === false) {
            event.preventDefault();
            tile.shift(1); // right arrow
            requestAnimationFrame(render);
        } else if (event.keyCode == 38) {
            event.preventDefault();
            tile.toggleLetter();
            requestAnimationFrame(render);
        } else if (event.keyCode == 40 && checkVerticalCollisions() === false) {
            event.preventDefault();
            tile.drop(1); // s
            requestAnimationFrame(render);
        } else {
            // console.log("other key pressed 2 ", event.keyCode);
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
    if (!this.game.gameOver) {
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
        await sleep(1000);
        // await sleep(400);
        requestAnimationFrame(this.animate.bind(this));
    } else {
        this.game.drawGameOver(this.ctx);
        // alert("Game Over");
    }
};

module.exports = GameView;