const BASE_VELOCITY = 0.025;
const INCREASE_VELOCITY_BY = 0.00001;

export default class Ball {
  constructor(ballElement) {
    this.ballElement = ballElement;
    this.reset();
  }

  get x() {
    return parseFloat(
      getComputedStyle(this.ballElement).getPropertyValue("--x")
    );
  }

  set x(value) {
    this.ballElement.style.setProperty("--x", value);
  }

  get y() {
    return parseFloat(
      getComputedStyle(this.ballElement).getPropertyValue("--y")
    );
  }

  set y(value) {
    this.ballElement.style.setProperty("--y", value);
  }

  rect() {
    return this.ballElement.getBoundingClientRect();
  }

  reset() {
    this.x = 50; // middle of the screen
    this.y = 50;
    this.direction = { x: 0 };

    // x = 0 means it's moving only UP and DOWN
    // x = 1 means it's moving only RIGHT and LEFT
    // so this while makes the ball movements more tricky
    while (
      Math.abs(this.direction.x <= 0.3) ||
      Math.abs(this.direction.x >= 0.8)
    ) {
      const heading = randomNumberBetween(0, 2 * Math.PI);
      this.direction = { x: Math.cos(heading), y: Math.sin(heading) };
    }

    this.velocity = BASE_VELOCITY;
  }

  update(delta) {
    this.x += this.direction.x * this.velocity * delta;
    this.y += this.direction.y * this.velocity * delta;

    if (this.velocity < 0.05) this.velocity += INCREASE_VELOCITY_BY * delta;

    const rect = this.rect();

    if (rect.bottom >= window.innerHeight || rect.top <= 0) {
      this.direction.y *= -1;
    }

    if (rect.right >= window.innerWidth || rect.left <= 0) {
      this.direction.x *= -1;
    }
  }
}

function randomNumberBetween(min, max) {
  return Math.random() * (max - min) + min;
}
