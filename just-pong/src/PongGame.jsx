import React from "react";
import { useEffect } from "react";
import "./style/PongGame.css";
import Ball from "./models/Ball";
import Paddle from "./models/Paddle";

const UP = -1;
const DOWN = 1;
const KEY_UP_P1 = "w";
const KEY_DOWN_P1 = "s";
const KEY_UP_P2 = "ArrowUp";
const KEY_DOWN_P2 = "ArrowDown";

function PongGame() {
  useEffect(() => {
    let lastTime;
    const ball = new Ball(document.getElementById("ball"));
    const player1Paddle = new Paddle(document.getElementById("player1-paddle"));
    const player2Paddle = new Paddle(document.getElementById("player2-paddle"));

    const player1ScoreElement = document.getElementById("player1-score");
    const player2ScoreElement = document.getElementById("player2-score");

    function update(time) {
      if (lastTime != null) {
        const delta = time - lastTime;
        ball.update(delta, [player1Paddle.rect(), player2Paddle.rect()]);

        if (hasWinner()) handleWin();
      }

      lastTime = time;
      window.requestAnimationFrame(update);
    }

    function hasWinner() {
      const rect = ball.rect();
      return rect.right >= window.innerWidth || rect.left <= 0;
    }

    function handleWin() {
      const rect = ball.rect();
      ball.reset();
      if (rect.right >= window.innerWidth) {
        player1ScoreElement.textContent =
          parseInt(player1ScoreElement.textContent) + 1;
      } else {
        player2ScoreElement.textContent =
          parseInt(player2ScoreElement.textContent) + 1;
      }
      lastTime = null;
    }
    // controls for  the players

    // @TODO make this two event work at the same time
    // right now cannot listen to both of the events from the two players
    document.addEventListener("keydown", (event) => {
      var key = event.key;
      // player two
      if (key === KEY_UP_P2) {
        player2Paddle.update(UP);
      }
      if (key === KEY_DOWN_P2) {
        player2Paddle.update(DOWN);
      }
    });

    document.addEventListener("keydown", (event) => {
      var key = event.key;

      // player one
      if (key === KEY_UP_P1) {
        player1Paddle.update(UP);
      }
      if (key === KEY_DOWN_P1) {
        player1Paddle.update(DOWN);
      }
    });

    window.requestAnimationFrame(update);
  });

  return (
    <>
      <div className="score">
        <div id="player1-score">0</div>
        <div id="player2-score">0</div>
      </div>

      <div className="ball" id="ball"></div>
      <div className="paddle left" id="player1-paddle"></div>
      <div className="paddle right" id="player2-paddle"></div>
    </>
  );
}

export default PongGame;
