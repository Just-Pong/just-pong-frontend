import React from 'react';
import "../style/PongGame.css";

/**
 * props
 * @param {string} side left / right 
 * @param {number} positon
 */
export default function BallComponent(props) {
  return <div className="ball" style={{ '--x': `${props.x}`, '--y': `${props.y}` }}></div>
}