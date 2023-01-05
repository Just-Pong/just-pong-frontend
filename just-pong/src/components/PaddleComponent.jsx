import React from 'react';
import "../style/PongGame.css";

/**
 * props
 * @param {string} side left / right 
 * @param {number} positon
 */
export default function PaddleComponent(props) {
  if(props.position === -1){
    return <>
      <h1 className={`status ${props.side}`}>Connecting</h1>
      <div className={`paddle ${props.side}`} style={{ '--position': 50 }}></div>
    </>
  }

  return <div className={`paddle ${props.side}`} style={{ '--position': `${props.position}` }}></div>
}