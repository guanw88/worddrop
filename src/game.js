const Tile = require("./tile");

function Game() {
    this.tiles = this.tiles || [];
    this.letters = this.resetLetters();
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

Game.prototype.resetLetters = function resetLetters() {
    // letter_freq = {"A": 1, "B": 1, "C": 1, "D": 1}; // letter freq for testing
    // letter_freq = {"A": 9, "B": 2, "C": 2, "D": 4}; // letter freq for testing
    letter_freq = {"A": 9, "B": 2, "C": 2, "D": 4, "E": 12, "F": 2, "G": 3, "H": 2, "I": 9, "J": 1, 
        "K": 1, "L": 4, "M": 2, "N": 6, "O": 8, "P": 2, "Q": 1, "R": 6, "S": 4, "T": 6,
        "U": 4, "V": 2, "W": 2, "X": 1, "Y": 2, "Z": 1
    }; // optionally add wildcard letters later?
    letters = []
    Object.values(letter_freq).forEach( (numTimes, idx) => {
        for (let i = 0; i < numTimes; i++) {
            letters.push(Object.keys(letter_freq)[idx]);
        }
    });
    return letters;
}

Game.prototype.randomize = function randomize(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

Game.prototype.rand4 = function rand4() {
    random = this.randomize(this.letters).slice(0,4);
    // console.log(random);
    return random;
}

Game.prototype.removeLetter = function removeLetter(letter) {
    const idx = this.letters.indexOf(letter);
    // console.log(this.letters);
    this.letters.splice(idx, 1);
    // console.log(this.letters);
    if (this.letters.length === 0) {
        this.letters = this.resetLetters();
        this.randomize(this.letters);
    }
    return this.letters;
}

Game.prototype.addTile = function addTile() {
    const newTile = new Tile(this.rand4());
    this.add(newTile);
    return newTile;
};

Game.prototype.allObjects = function allObjects() {
    return [].concat(this.tiles);
};

Game.prototype.checkVerticalCollisions = function checkVerticalCollisions() {
    // console.log("Checking vertical collisions");
    let lastTile = this.tiles[this.tiles.length - 1];
    // console.log(lastTile.x, lastTile.y);
    if (lastTile && lastTile.y >= 540) {
        // console.log("Collided with floor");
        this.removeLetter(lastTile.letter);
        return true;
    }
    // debugger;
    for (let i = 0; i < this.tiles.length - 1; i++) {
        const obj2 = this.tiles[i];
        // console.log(lastTile, obj2);
        if (lastTile.isCollidedWithVertically(obj2)) {
            // console.log("Collided with tile");
            this.removeLetter(lastTile.letter);
            lastTile.movable = false;
            return true;
        }
    }
    return false;
};

Game.prototype.checkHorizontalCollisions = function checkHorizontalCollisions() {
    console.log("Checking horizontal collisions");
    let lastTile = this.tiles[this.tiles.length - 1];
    // console.log(lastTile.x, lastTile.y);
    if ( lastTile && (lastTile.x >= 540 || lastTile.x <= 0) ) {
        console.log("Collided with wall");
        return true;
        }
    // debugger;
    for (let i = 0; i < this.tiles.length - 1; i++) {
        const obj2 = this.tiles[i];
        // console.log(lastTile, obj2);
        if (lastTile.isCollidedWithHorizontally(obj2)) {
            console.log("Collided with tile horizontally");
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