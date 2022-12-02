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
const PAUSE = "p";

const PongGame = () => {
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
};

export default PongGame;
