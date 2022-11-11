export default class Paddle {
  constructor(paddleElement) {
    this.paddleElement = paddleElement;
  }

  get position() {
    return parseFloat(
      getComputedStyle(this.paddleElement).getPropertyValue("--position")
    );
  }

  set position(value) {
    this.paddleElement.style.setProperty("--position", value);
  }

  get height() {
    return parseFloat(this.paddleElement.getPropertyValue("--height"));
  }

  reset() {
    this.position = 50;
  }

  // @TODO
  // do not let the paddle to leave the game area
  update(value) {
    this.position += value;
  }
}
