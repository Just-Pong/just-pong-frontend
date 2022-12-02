import React from 'react';
import "../style/PongGame.css";

/**
 * props
 * @param {string} side left / right 
 * @param {number} positon
 */
export default function PaddleComponent(props) {
  return <div className={`paddle ${props.side}`} style={{ '--position': `${props.position}` }}></div>
}