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
const PAUSE = "p";

export default function PongGame(props) {
  const [gameId, setGameId] = useState();

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
    let ws = new WebSocket("ws://127.0.0.1:8000/game/host/ws");
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      setGameId(data.game_id);

      paddle1.update(data.player_1);
      setPaddle1Y(data.player_1);
      paddle2.update(data.player_2);
      setPaddle2Y(data.player_2);
    }

    ws.onclose = (event) => {
      console.log(event);
    }

  }, []);
  

  return (
    <>
      <div className="score">
        <div id="player1-score">{ score1 }</div>
        <div id="player2-score">{ score2 }</div>
      </div>
      <h2 className="score">{gameId}</h2>

      <BallComponent x={ballX} y={ballY}/>
      <PaddleComponent side="left" position={paddle1Y}/>
      <PaddleComponent side="right" position={paddle2Y}/>
    </>
  );
};


