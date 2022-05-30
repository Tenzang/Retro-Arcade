import React from "react";
import '../snake/Snake.scss';

const Controls = ({setPlay, direction, setDirection}) => {

    function handlePlay(e, val) { // play or pause
        e.preventDefault();
        (val ? setPlay(true) : setPlay(false))
    }

    function handleDirection(e, val) { // set direction of snake 
        e.preventDefault();
        switch(val) {
            case 'ArrowLeft':
                (direction === 'right') ? setDirection('right') : setDirection('left')
                break;
            case 'ArrowRight':
                (direction === 'left') ? setDirection('left') : setDirection('right')
                break;
            case 'ArrowUp':
                (direction === 'down') ? setDirection('down') : setDirection('up')
                break;
            case 'ArrowDown':
               (direction === 'up') ? setDirection('up') : setDirection('down')
                break;
            default:
                break;
            
        }
    }


    return (
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
    )
}

export default Controls;