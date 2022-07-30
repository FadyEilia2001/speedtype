import React from 'react'

export default function Topbar(props) {


  return (
    <div className='info'>

        <div className='wpm'>
            Speed Typing Game
        </div>

        <button data-text="Awesome" className="button" onClick={props.startGame}>
            <span className="actual-text">&nbsp;{props.buttonText}&nbsp;</span>
            <span className="hover-text" aria-hidden="true">&nbsp;{props.buttonText}&nbsp;</span>
        </button>

        <div className='timer'>
            Remaining Time: {props.timer}
        </div>
    </div>
    
  )
}
