
class Tile {
    constructor(letters, width = 60, height = 60, color = "#D4BAAC", x = 240, y = -60, movable = true) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.color = color;
        this.letters = letters;
        this.currentLetterIdx = 0;
        this.letter = this.letters[this.currentLetterIdx];
        this.x = x;
        this.y = y;
        this.movable = movable;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.font = "30px News Gothic Standard";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.letter, this.x + 30, this.y+32);
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
        this.currentLetterIdx = (this.currentLetterIdx + 1) % 4;
        this.letter = this.letters[this.currentLetterIdx];
    }

    isCollidedWithVertically(otherObject) {
        const maxY = this.y + 60;
        const otherMaxY = otherObject.y + 60;
        // console.log("Moving Object: ", this.y, maxY);
        // console.log("Other Object: ", otherObject.y, otherMaxY);
        if ( this.x == otherObject.x && (maxY == otherObject.y || this.y == otherMaxY) ) {
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