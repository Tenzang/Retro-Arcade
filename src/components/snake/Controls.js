import React from "react";
import './Snake.scss';

const Controls = ({setPlay, resetGame, buttonName, moves, settingMoves }) => {

    function handlePlay(e, val) { // play or pause
        e.preventDefault();
        setPlay(val) 
    }

    // push into moves
    function handleDirection(e, val) { // set direction of snake 
        e.preventDefault();
        console.log('clicked', val)
        // need to find out which game is active - as this sets moves for two
        settingMoves(moves, val) // snake
    }

    return (
        <div>
            <button className="reset button-85" onClick={resetGame}>{buttonName}</button>
            <div className="controls">
                <div className="play-pause">
                    <button className="play" onClick={(e) => handlePlay(e, true)}>Play</button>
                    <button className="pause" onClick={(e) => handlePlay(e, false)}>Pause</button>
                </div>
                <div className="controls-direction">
                    <button className="left" onClick={(e) => handleDirection(e, 'ArrowLeft')}>Left</button>
                    <button className="up" onClick={(e) => handleDirection(e, 'ArrowUp')}>Up</button>
                    <button className="down" onClick={(e) => handleDirection(e, 'ArrowDown')}>Down</button>
                    <button className="right" onClick={(e) => handleDirection(e, 'ArrowRight')}>Right</button>
                </div>
            </div>
        </div>
    )
}

export default Controls;