const Tile = require("./tile");
const Letter = require("./letter");

function Game() {
    this.tiles = [];
    this.letters = [];
}

Game.DIM_X = 600;
Game.DIM_Y = 600;

Game.prototype.add = function add(object) {
    if (object instanceof Tile) {
        this.tiles.push(object);
    } else if (object instanceof Letter) {
        this.letters.push(object);
    } else {
        throw new Error("unknown type of object");
    }
};

Game.prototype.addTile = function addTile() {
    const newTile = new Tile();
    this.add(newTile);
    return newTile;
};

Game.prototype.addLetter = function addLetter() {
    const newLetter = new Letter();
    this.add(newLetter);
    return newLetter;
};

Game.prototype.allObjects = function allObjects() {
    return [].concat(this.letters, this.tiles);
};

// Game.prototype.checkCollisions = function checkCollisions() {
//     const allObjects = this.allObjects();
//     for (let i = 0; i < allObjects.length; i++) {
//         for (let j = 0; j < allObjects.length; j++) {
//             const obj1 = allObjects[i];
//             const obj2 = allObjects[j];

//             if (obj1.isCollidedWith(obj2)) {
//                 const collision = obj1.collideWith(obj2);
//                 if (collision) return;
//             }
//         }
//     }
// };

Game.prototype.draw = function draw(ctx) {
    this.allObjects().forEach(function (object) {
        object.draw(ctx);
    });
};

Game.prototype.moveObjects = function moveObjects(delta) {
    this.allObjects().forEach(function (object) {
        object.move(delta);
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