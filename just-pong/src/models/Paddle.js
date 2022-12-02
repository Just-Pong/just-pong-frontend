export default class Paddle {
  // TODO change hardcoding while keeping separate from ui
  static LEFT = 0
  static RIGHT = 1

  height = 15
  width = 1

  constructor(side) {
    if(side === Paddle.LEFT){
      this.x = 0;
    } else if(side === Paddle.RIGHT){
      this.x = 99;
    } else{
      throw new Error("Not a valid side");
    }
    this.reset();
  }

  reset() {
    this.y = 50;
  }

  rect() {
    return {
      top: this.y,
      bottom: this.y + this.height,
      left: this.x,
      right: this.x + this.width,
    }
  }

  update(value) {
    const rect = this.rect();

    console.log(rect);

    if (
      (rect.top < 0 && value < 0) ||
      (rect.bottom >= 100 && value > 0)
    )
      return;

    this.y += value;
  }
}
