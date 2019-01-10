
class Tile {
    constructor(width = 60, height = 60, color = "#D4BAAC", x = 240, y = -60) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.color = color;
    }

    draw (ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    move (delta) {
        if (this.y <= 480) this.y += 60;
    }

}

module.exports = Tile;