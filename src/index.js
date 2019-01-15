console.log("Webpack is working!");
const Game = require("./game");
const GameView = require("./game_view");
import Tile from "./tile";

document.addEventListener("DOMContentLoaded", function (e) {
    const canvas = document.getElementById("game-canvas");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 150, 75);

    alert("Welcome to WordDrop! Make words from the dropped tiles, then press SPACE to clear them! Press UP ARROW to toggle letters, LEFT/RIGHT to move, and DOWN to drop.")
    const game = new Game(ctx);
    new GameView(game, ctx).start();
});