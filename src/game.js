const Tile = require("./tile");

function Game() {
    this.tiles = this.tiles || [];
    this.id = 1;
    this.letters = this.resetLetters();
    this.dictionary = this.loadDictionary();
    this.validWords = [];
    this.validTiles = [];
    this.validTileSet = new Set();
    this.tileGrid = [[null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null]];
    this.letterGrid = [[null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null]];
    this.gameOver = false;
}

Game.DIM_X = 600;
Game.DIM_Y = 600;

Game.prototype.loadDictionary = function loadDictionary(dictionary) {
    fetch("https://www.dropbox.com/s/obp9dthwuo7mbib/sowpods.txt?dl=0").then(
      response => {
        response.text().then(text => {
          this.dictionary = [];
          const words = text.split(/\r\n|\n/);
          words.forEach(word => {
            if (word.length >= 4) this.dictionary.push(word);
          });
          // console.log(this.dictionary.length, " words in dictionary");
          return this.dictionary;
        });
      }
    );
}

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
    const newTile = new Tile(this.id, this.rand4());
    this.add(newTile);
    this.id += 1;
    let oldTiles = this.tiles.slice(0,-1);
    if (oldTiles.filter((tile) => (tile.y === 0)).length > 0) {
        this.gameOver = true;
    }
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
        this.checkWords();
        lastTile.movable = false;
        return true;
    }
    // debugger;
    for (let i = 0; i < this.tiles.length - 1; i++) {
        const obj2 = this.tiles[i];
        // console.log(lastTile, obj2);
        if (lastTile.isCollidedWithVertically(obj2)) {
            // console.log("Collided with tile");
            this.removeLetter(lastTile.letter);
            this.checkWords();
            lastTile.movable = false;
            return true;
        }
    }
    return false;
};

Game.prototype.checkLeftCollision = function checkLeftCollision() {
    // console.log("Checking left collision");
    let lastTile = this.tiles[this.tiles.length - 1];
    // console.log(lastTile.x, lastTile.y);
    if ( lastTile && lastTile.x <= 0 ) {
        // console.log("Collided with wall");
        return true;
        }
    // debugger;
    for (let i = 0; i < this.tiles.length - 1; i++) {
        const obj2 = this.tiles[i];
        // console.log(lastTile, obj2);
        if (lastTile.isCollidedWithLeft(obj2)) {
            // console.log("Collided with tile on left");
            return true;
        }
    }
    return false;
};

Game.prototype.checkRightCollision = function checkRightCollision() {
    // console.log("Checking right collisions");
    let lastTile = this.tiles[this.tiles.length - 1];
    // console.log(lastTile.x, lastTile.y);
    if ( lastTile && lastTile.x >= 540 ) {
        // console.log("Collided with wall");
        return true;
        }
    // debugger;
    for (let i = 0; i < this.tiles.length - 1; i++) {
        const obj2 = this.tiles[i];
        // console.log(lastTile, obj2);
        if (lastTile.isCollidedWithRight(obj2)) {
            // console.log("Collided with tile on right");
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
    this.fillMissingSpaces();
    if (this.checkVerticalCollisions() === false) this.moveObjects(delta);
    // this.checkCollisions();
};

Game.prototype.checkWords = function checkWords() {
    // console.log("Checking words");
    
    this.tiles.forEach( (tile) => {
        this.tileGrid[tile.x / 60][tile.y / 60] = tile;
        this.letterGrid[tile.x / 60][tile.y / 60] = tile.letter.toLowerCase();
    });
    // Check columns and reversed columns for words 
    this.letterGrid.forEach( (column) => {
        let candidateWords = this.generateCandidateWords(column);
        candidateWords.forEach( (word) => {
            if (this.checkWord(word) && this.validWords.includes(word) === false) this.validWords.push(word);
        })
    });

    // Check rows and reverse rows for words 
    const transposed = this.letterGrid;
    for (let i = 0; i < transposed.length; i++) {
        for (let j = 0; j < i; j++) {
            [transposed[i][j], transposed[j][i]] = [transposed[j][i], transposed[i][j]];
        }
    }
    transposed.forEach( (row) => {
        let candidateWords = this.generateCandidateWords(row);
        candidateWords.forEach((word) => {
            if (this.checkWord(word) && this.validWords.includes(word) === false) this.validWords.push(word);
        });
    });
    // console.log(this.letterGrid);
    // console.log(this.validWords);

    if (this.validWords.length > 0) {
        this.validWords.forEach( word => {
            this.listValidTiles(word);
            word = word.split("").reverse().join("");
            this.listValidTiles(word);
        });
    }
    this.highlightTiles();
    // console.log(this.letterGrid);
}

Game.prototype.generateCandidateWords = function generateCandidateWords(array) {
    // console.log("Generating candidate words...");
    let string = "";
    array.forEach( (char) => {
        if (char === null) {
            string += " ";
        } else {
            string += char;
        }
    });
    let candidateWords = [];
    string.split(" ").filter( (str) => str.length >= 4 ).forEach( (str) => {
        // console.log(str);
        for (let i = 0; i < str.length; i++) {
            let temp = str[i];
            for (let j = i + 1; j < str.length; j++) {
                temp += str[j];
                if (temp.length >= 4) {
                    candidateWords.push(temp);
                    let reverse_temp = temp.split("").reverse().join("");
                    if (temp !== reverse_temp) candidateWords.push(reverse_temp);
                }
            }
        }
    });
    return candidateWords;
}

Game.prototype.checkWord = function checkWord(str) {
    let minIdx = 0;
    let maxIdx = this.dictionary.length - 1;
    let idx;
    let el;

    while (minIdx <= maxIdx) {
        idx = Math.floor((minIdx + maxIdx) / 2);
        el = this.dictionary[idx];

        if (el < str) {
            minIdx = idx + 1;
        }
        else if (el > str) {
            maxIdx = idx - 1;
        }
        else {
            return true;
        }
    }
    return false;
}

Game.prototype.listValidTiles = function listValidTiles(word) {
    this.tileGrid.forEach( (col, colIdx) => {
        // console.log(col);
        let colStr = "";
        col.forEach(tile => {
            if (tile) colStr += tile.letter.toLowerCase();
        });
        // console.log(colStr);
        if (colStr.includes(word)) {
            let tempWord = word.split("");
            let tempIds = [];
            for (let i = 0; i <= col.length; i++) {
                // debugger;
                if (tempWord.length === 0) {
                    // console.log("Saving tempids");
                    this.validTiles = this.validTiles.concat(tempIds);
                    this.validTileSet = new Set(this.validTiles);
                } else if (col[i] && col[i].letter.toLowerCase() === tempWord[0]) {
                    // console.log("Letter matches");
                    tempWord.shift();
                    tempIds.push(col[i].id);
                } else {
                    // console.log("Resetting...");
                    tempWord = word.split("");
                    tempIds = [];
                }
            }
        }
    });

    const transposed = this.tileGrid;
    for (let i = 0; i < transposed.length; i++) {
      for (let j = 0; j < i; j++) {
        [transposed[i][j], transposed[j][i]] = [transposed[j][i], transposed[i][j]];
      }
    }

    transposed.forEach((row, rowIdx) => {
        // console.log(row);
        let rowStr = "";
        row.forEach(tile => {
            if (tile) rowStr += tile.letter.toLowerCase();
        });
        // console.log(rowStr);
        if (rowStr.includes(word)) {
            let tempWord = word.split("");
            let tempIds = [];
            for (let i = 0; i <= row.length; i++) {
                // debugger;
                if (tempWord.length === 0) {
                    // console.log("Saving tempids");
                    this.validTiles = this.validTiles.concat(tempIds);
                    this.validTileSet = new Set(this.validTiles);
                } else if (row[i] && row[i].letter.toLowerCase() === tempWord[0]) {
                    // console.log("Letter matches");
                    tempWord.shift();
                    tempIds.push(row[i].id);
                } else {
                    // console.log("Resetting...");
                    tempWord = word.split("");
                    tempIds = [];
                }
            }
        }
    });
};

Game.prototype.highlightTiles = function highlightTiles() {
    let highlighted = Array.from(this.validTileSet);
    this.tiles.forEach( (tile) => {
      if (highlighted.includes(tile.id)) {
          tile.color = "#b7c9b9";
      }
    });
};

Game.prototype.destroyTiles = function destroyTiles() {
    let highlighted = Array.from(this.validTileSet);
    this.tiles = this.tiles.filter( (tile) => !highlighted.includes(tile.id) );
    this.validWords = [];
    this.validTiles = [];
    this.validTileSet = new Set();
    this.fillMissingSpaces();
    this.tileGrid = [[null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null]];
    this.letterGrid = [[null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null]];
    this.tiles.forEach((tile) => {
        // debugger;
        this.tileGrid[tile.x / 60][tile.y / 60] = tile;
        this.letterGrid[tile.x / 60][tile.y / 60] = tile.letter.toLowerCase();
    });
    this.checkWords();
}

Game.prototype.fillMissingSpaces = function fillMissingSpaces() {
    // console.log("Filling missing space");
    for (let colIdx = 0; colIdx < 10; colIdx++) {
        // loop through each column and verify if bottom most tile is touching bottom 
        let tilesInCol = this.tiles.filter((tile) => tile.x === colIdx * 60);
        let tileYValues = tilesInCol.map(tile => {return tile.y});
        // console.log(tileYValues);
        let maxGap = 0;
        for (let rowIdx = 0; rowIdx < 10; rowIdx++) {
            if (!tileYValues.includes(rowIdx * 60)) maxGap = rowIdx * 60;
        }
        // console.log(colIdx, maxGap);
        tilesInCol.forEach( tile => {
            tile.movable = (tile.y < maxGap) ? true : false;
        });
    }
    let lastTile = this.tiles[this.tiles.length - 1];
    lastTile.movable = true;
}

Game.prototype.drawGameOver = function drawGameOver(ctx) {
    ctx.fillStyle = "rgba(0, 0, 200, 0.2)";
    ctx.fillRect(0, 0, 600, 600);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(50,150,500,200);
    // ctx.font = "30px News Gothic Standard";
    ctx.font = "30px Lato";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Game Over! Thanks for playing!", 300, 200);
    ctx.font = "20px Lato";
    ctx.fillText("Refresh the Page to Play Again", 300, 300);
};

module.exports = Game;