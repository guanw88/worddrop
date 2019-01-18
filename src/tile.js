
class Tile {
    constructor(id, letters, width = 60, height = 60, color = "#D4BAAC", x = 240, y = -60, movable = true) {
        this.id = id;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.color = color;
        this.letters = letters;
        this.currentLetterIdx = 0;
        this.letter = this.letters[this.currentLetterIdx];
        this.score = this.calculateScore();
        this.x = x;
        this.y = y;
        this.movable = movable;
    }

    draw(ctx) {
        const cornerRadius = 5;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.font = "60px Scramble";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.letter, this.x + 30, this.y+32);
        // Old version without using Scramble font
        // ctx.font = "30px Lato";
        // ctx.fillStyle = "black";
        // ctx.textAlign = "center";
        // ctx.textBaseline = "middle";
        // ctx.fillText(this.letter, this.x + 30, this.y+32);
        // ctx.font = "16px Lato";
        // ctx.fillStyle = "black";
        // ctx.textAlign = "center";
        // ctx.textBaseline = "middle";
        // ctx.fillText(this.score, this.x + 50, this.y + 48);
    }

    move(delta) {
        if (this.y <= 480) this.y += 60;
    }

    shift(units) {
        const new_x_pos = this.x + units * 60;
        if (new_x_pos >= 0 && new_x_pos <= 540) this.x += units * 60;
    }
    
    drop(units) {
        // console.log("moving tile down");
        const new_y_pos = this.y + units * 60; // looser collision detection in case drop is synchronized with step
        if (new_y_pos >= 0 && new_y_pos <= 540) this.y += units * 60;
    }

    toggleLetter() {
        this.currentLetterIdx = (this.currentLetterIdx + 1) % this.letters.length;
        this.letter = this.letters[this.currentLetterIdx];
        this.score = this.calculateScore();
    }

    calculateScore() {
        const letter_scores = {
            "A": 1, "B": 3, "C": 3, "D": 2, "E": 1, "F": 4, "G": 2, "H": 4, "I": 1, "J": 8,
            "K": 5, "L": 1, "M": 3, "N": 1, "O": 1, "P": 3, "Q": 10, "R": 1, "S": 1, "T": 1,
            "U": 1, "V": 4, "W": 4, "X": 8, "Y": 4, "Z": 10
        }; 
        return letter_scores[this.letter];
    }

    isCollidedWithVertically(otherObject) {
        const maxY = this.y + 60;
        const otherMaxY = otherObject.y + 60;
        // console.log("Moving Object: ", this.y, maxY);
        // console.log("Other Object: ", otherObject.y, otherMaxY);
        if ( this.x == otherObject.x && (maxY == otherObject.y) ) {
            return true;
        }
        return false;
    };

    isCollidedWithLeft(otherObject) {
        const otherMaxX = otherObject.x + 60;
        if ( this.y == otherObject.y && this.x == otherMaxX ) {
            return true;
        }
        return false;
    };

    isCollidedWithRight(otherObject) {
        const maxX = this.x + 60;
        if ( this.y == otherObject.y && maxX == otherObject.x ) {
            return true;
        }
        return false;
    };

}

module.exports = Tile;