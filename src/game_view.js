function GameView(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.tile = this.game.addTile();
}

// GameView.MOVES = {
//     w: [0, -1],
//     a: [-1, 0],
//     s: [0, 1],
//     d: [1, 0],
// };

// GameView.prototype.bindKeyHandlers = function bindKeyHandlers() {
//     const tile = this.tile;

//     Object.keys(GameView.MOVES).forEach(function (k) {
//         const move = GameView.MOVES[k];
//         key(k, function () { ship.power(move); });
//     });

//     key("space", function () { ship.fireBullet(); });
// };

GameView.prototype.start = function start() {
    // this.bindKeyHandlers();
    this.lastTime = 0;
    // start the animation
    requestAnimationFrame(this.animate.bind(this));
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