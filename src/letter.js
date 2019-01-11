
class Letter {
  constructor(letters = ["A", "B", "C", "D"], x = 240, y = -60) {
    this.letters = letters;
    this.currentLetterIdx = 0;
    this.letter = this.letters[this.currentLetterIdx];
    this.x = x;
    this.y = y;
  }

  draw(ctx) {
    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(this.letter, this.x, this.y);
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

module.exports = Letter;