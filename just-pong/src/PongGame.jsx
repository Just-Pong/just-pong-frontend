import React, { useEffect, useRef, useState } from "react";
import "./style/PongGame.css";
import Ball from "./models/Ball";
import Paddle from "./models/Paddle";
import PaddleComponent from './components/PaddleComponent'
import BallComponent from "./components/BallComponent";

const UP = -1;
const DOWN = 1;
const KEY_UP_P1 = "w";
const KEY_DOWN_P1 = "s";
const KEY_UP_P2 = "ArrowUp";
const KEY_DOWN_P2 = "ArrowDown";

export default function PongGame(props) {
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);

  const [paddle1Y, setPaddle1Y] = useState(50);
  const [paddle2Y, setPaddle2Y] = useState(50);
  
  const [ballX, setBallX] = useState(50);
  const [ballY, setBallY] = useState(50);

  const requestRef = useRef()

  const lastTime = useRef();

  let ball = new Ball();
  let paddle1 = new Paddle(Paddle.LEFT);
  let paddle2 = new Paddle(Paddle.RIGHT);

  const update = time => {
      if (lastTime.current != null) {
        const delta = time - lastTime.current;
        ball.update(delta, [paddle1.rect(), paddle2.rect()]);
        setBallX(ball.x);
        setBallY(ball.y);

        if (hasWinner()) handleWin();
      }

      lastTime.current = time;
      requestRef.current = requestAnimationFrame(update);
    }

  function hasWinner() {
      const rect = ball.rect();
      return rect.right > 110 || rect.left < -10;
    }
  
    function handleWin() {
      const rect = ball.rect();
      ball.reset();
      if (rect.right >= 100) {
        setScore1(score => score + 1);
      } else {
        setScore2(score => score + 1);
      }
      lastTime.current = null;
    }
  
    useEffect(() => {
      requestRef.current = requestAnimationFrame(update);
      return() => cancelAnimationFrame(requestRef.current);
  }, []);

  useEffect(() => {
    // controls for  the players

    // @TODO make this two event work at the same time
    // right now cannot listen to both of the events from the two players
    document.addEventListener("keydown", (event) => {
      let key = event.key;
      // player two
      if (key === KEY_UP_P2) {
        paddle2.update(UP);
        setPaddle2Y(paddle2.y);
      }
      if (key === KEY_DOWN_P2) {
        paddle2.update(DOWN);
        setPaddle2Y(paddle2.y);
      }
    });

    document.addEventListener("keydown", (event) => {
      let key = event.key;
      // player one
      if (key === KEY_UP_P1) {
        paddle1.update(UP);
        setPaddle1Y(paddle1.y);
      }
      if (key === KEY_DOWN_P1) {
        paddle1.update(DOWN);
        setPaddle1Y(paddle1.y);
      }
    });
  }, []);
  

  return (
    <>
      <div className="score">
        <div id="player1-score">{ score1 }</div>
        <div id="player2-score">{ score2 }</div>
      </div>

      <BallComponent x={ballX} y={ballY}/>
      <PaddleComponent side="left" position={paddle1Y}/>
      <PaddleComponent side="right" position={paddle2Y}/>
    </>
  );
}


