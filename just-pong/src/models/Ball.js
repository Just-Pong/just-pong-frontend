const BASE_VELOCITY = 0.025;
const INCREASE_VELOCITY_BY = 0.0001;

export default class Ball {
  // TODO remove hardcode (same as Paddle)
  height = 2.5
  width = 2.5

  constructor() {
    this.reset();
  }

  rect() {
    return {
      top: this.y + this.height,
      bottom: this.y,
      left: this.x,
      right: this.x + this.width,
    }
  }

  reset() {
    this.velocity = BASE_VELOCITY;
    this.x = 50; // middle of the screen
    this.y = 50;
    this.direction = { x: 0 };

    // x = 0 means it's moving only UP and DOWN
    // x = 1 means it's moving only RIGHT and LEFT
    // so this while makes the ball movements more tricky
    while (
      Math.abs(this.direction.x) <= 0.2 ||
      Math.abs(this.direction.x) >= 0.9
    ) {
      const heading = randomNumberBetween(0, 2 * Math.PI);
      this.direction = { x: Math.cos(heading), y: Math.sin(heading) };
    }
  }

  update(delta, paddles) {
    this.x += this.direction.x * this.velocity * delta;
    this.y += this.direction.y * this.velocity * delta;

    if (this.velocity < 0.03) this.velocity += INCREASE_VELOCITY_BY;

    const ballRect = this.rect();

    // bounce on the top and on the bottom of the screen
    if (ballRect.bottom >= 100 || ballRect.top <= 0) {
      this.direction.y *= -1;
      return;
    }

    // collision with the paddles
    if (paddles.some((r) => hasCollided(r, ballRect))) {
      this.direction.x *= -1;
      this.direction.y = Math.sin(randomNumberBetween(0, 2 * Math.PI));
      return;
    }
  }
}

function randomNumberBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function hasCollided(paddle, ball) {
  return (
    paddle.left < ball.right &&
    paddle.right > ball.left &&
    paddle.top < ball.bottom &&
    paddle.bottom > ball.top
  );
}
