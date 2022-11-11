import React from "react";
import { useEffect } from "react";
import "./style/PongGame.css";
import Ball from "./models/Ball";
import Paddle from "./models/Paddle";

function PongGame() {
  useEffect(() => {
    const ball = new Ball(document.getElementById("ball"));
    const player1Paddle = new Paddle(document.getElementById("player1-paddle"));
    const player2Paddle = new Paddle(document.getElementById("player2-paddle"));

    const UP = -1;
    const DOWN = 1;

    let lastTime;

    function update(time) {
      if (lastTime != null) {
        const delta = time - lastTime;
        ball.update(delta);
      }

      lastTime = time;
      window.requestAnimationFrame(update);
    }

    // controls for  the players

    // @TODO make this two event work at the same time
    // right now cannot listen to both of the events from the two players
    document.addEventListener("keydown", (event) => {
      var code = event.code;
      // player two
      if (code === "ArrowUp") {
        player2Paddle.update(UP);
      }
      if (code === "ArrowDown") {
        player2Paddle.update(DOWN);
      }
    });

    document.addEventListener("keydown", (event) => {
      var code = event.code;

      // player one
      if (code === "KeyW") {
        player1Paddle.update(UP);
      }
      if (code === "KeyS") {
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
