export default class Paddle {
  constructor(paddleElement) {
    this.paddleElement = paddleElement;
    this.reset();
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

  rect() {
    return this.paddleElement.getBoundingClientRect();
  }

  update(value) {
    const rect = this.rect();

    if (
      (rect.top < 0 && value < 0) ||
      (rect.bottom >= window.innerHeight && value > 0)
    )
      return;

    this.position += value;
  }
}
