console.log("Webpack is working!");
const Game = require("./game");
const GameView = require("./game_view");
import Tile from "./tile";

document.addEventListener("DOMContentLoaded", function (e) {
    const canvas = document.getElementById("game-canvas");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 150, 75);
    // const newTile = new Tile(60, 60, "#D4BAAC", 240, 0);
    // newTile.draw(ctx);
    const game = new Game(ctx);
    new GameView(game, ctx).start();
});