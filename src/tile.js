
class Tile {
    constructor(letters = ["A", "B", "C", "D"], width = 60, height = 60, color = "#D4BAAC", x = 240, y = -60) {
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
    }

    draw(ctx) {
        console.log("tile added");
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        console.log("letter added");
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

    toggleLetter() {
        this.currentLetterIdx = (this.currentLetterIdx + 1) % 4;
        this.letter = this.letters[this.currentLetterIdx];
    }

}

module.exports = Tile;