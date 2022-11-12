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
    this.direction = { x: 0, y: 0 };

    // x = 0 means it's moving only UP and DOWN
    // x = 1 means it's moving only RIGHT and LEFT
    // so this while makes the ball movements more tricky
    while (
      Math.abs(this.direction.x <= 0.2) ||
      Math.abs(this.direction.x >= 0.9)
    ) {
      const heading = randomNumberBetween(0, 2 * Math.PI);
      this.direction = { x: Math.cos(heading), y: Math.sin(heading) };
    }

    this.velocity = BASE_VELOCITY;
  }

  update(delta, paddles) {
    this.x += this.direction.x * this.velocity * delta;
    this.y += this.direction.y * this.velocity * delta;

    if (this.velocity < 0.05) this.velocity += INCREASE_VELOCITY_BY * delta;

    const rect = this.rect();

    // bounce on the top and on the bottom of the screen
    if (rect.bottom >= window.innerHeight || rect.top <= 0) {
      const heading = randomNumberBetween(0, 2 * Math.PI);
      this.direction.y *= -1;

      return;
    }

    // collision with the paddles
    if (paddles.some((r) => hasCollided(r, rect))) {
      this.direction.x *= -1;

      return;
    }
  }
}

function randomNumberBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function hasCollided(ball, paddle) {
  return (
    ball.left <= paddle.right &&
    ball.right >= paddle.left &&
    ball.top <= paddle.bottom &&
    ball.bottom >= paddle.top
  );
}
