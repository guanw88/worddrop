const Tile = require("./tile");

function Game() {
    this.tiles = this.tiles || [];
}

Game.DIM_X = 600;
Game.DIM_Y = 600;

Game.prototype.add = function add(object) {
    if (object instanceof Tile) {
        this.tiles.push(object);
    } else {
        throw new Error("unknown type of object");
    }
};

Game.prototype.addTile = function addTile() {
    const newTile = new Tile();
    this.add(newTile);
    return newTile;
};

Game.prototype.allObjects = function allObjects() {
    return [].concat(this.tiles);
};

Game.prototype.checkVerticalCollisions = function checkVerticalCollisions() {
    console.log("Checking vertical collisions");
    let lastTile = this.tiles[this.tiles.length - 1];
    console.log(lastTile.x, lastTile.y);
    if (lastTile && lastTile.y >= 540) {
    console.log("Collided with floor");
    return true;
    }
    // debugger;
    for (let i = 0; i < this.tiles.length - 1; i++) {
    const obj2 = this.tiles[i];
    console.log(lastTile, obj2);
    if (lastTile.isCollidedWithVertically(obj2)) {
        console.log("Collided with tile");
        lastTile.movable = false;
        return true;
    }
    }
    return false;
};

Game.prototype.draw = function draw(ctx) {
    this.allObjects().forEach(function (object) {
        object.draw(ctx);
    });
};

Game.prototype.moveObjects = function moveObjects(delta) {
    this.allObjects().forEach(function (object) {
        if (object.movable) object.move(delta);
    });
};

// Game.prototype.remove = function remove(object) {
//     if (object instanceof Tile) {
//         this.tiles.splice(this.tiles.indexOf(object), 1);
//     } else {
//         throw new Error("unknown type of object");
//     }
// };

Game.prototype.step = function step(delta) {
    this.moveObjects(delta);
    // this.checkCollisions();
};

module.exports = Game;