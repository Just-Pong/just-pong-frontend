import React from "react";
import "./PongGame.css";

function PongGame() {
  return (
    <>
      <body>
        <div class="score">
          <div id="player1-score">0</div>
          <div id="player2-score">0</div>
        </div>

        <div class="ball" id="ball"></div>
        <div class="paddle left" id="player1-paddle"></div>
        <div class="paddle right" id="player2-paddle"></div>
      </body>
    </>
  );
}

export default PongGame;
