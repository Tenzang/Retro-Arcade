import React from "react";
import '../snake/Snake.scss';
import'./Controls.scss';
import rotate from './assets/refresh.png'
import play from './assets/play.png'
import arrow from './assets/arrow.png'

const Controls = ({ name, resetGame, buttonName }) => {
    function handleButtonPress(e, buttonPressed) {
        e.preventDefault();
        if (e.type === "mousedown") {
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': buttonPressed}));
        } else {
            document.dispatchEvent(new KeyboardEvent('keyup', {'key': buttonPressed}));
        }
    }

    return (
        <div className="controls">

            <div className="play-pause">
                <button className="push--skeuo play" onMouseDown={(e) => handleButtonPress( e, ' ')} onMouseUp={(e) => handleButtonPress( e, ' ')}>{ name === 'Space Invaders' ? 'SHOOT' : <img className="play-img" alt="play-pause button" src={play} /> }</button>
            </div>

            <div className="controls-direction">
                <button className="press--direction left" onMouseDown={(e) => handleButtonPress(e, 'ArrowLeft')} onMouseUp={(e) => handleButtonPress(e, 'ArrowLeft')} ><img id="left" alt="left button" src={ arrow } /></button>
                <button className="press--direction up" onMouseDown={(e) => handleButtonPress(e, 'ArrowUp')} onMouseUp={(e) => handleButtonPress(e, 'ArrowUp')} >{name === 'Tetris' ? <img alt="rotate button" className="rotate" src={rotate} /> : <img alt="up button" id="up" src={ arrow } /> }</button>
                <button className="press--direction down" onMouseDown={(e) => handleButtonPress(e, 'ArrowDown')} onMouseUp={(e) => handleButtonPress(e, 'ArrowDown')} ><img alt="down button" id="down" src={ arrow } /></button>
                <button className="press--direction right" onMouseDown={(e) => handleButtonPress(e, 'ArrowRight')} onMouseUp={(e) => handleButtonPress(e, 'ArrowRight')} ><img alt="right button" id="right" src={ arrow } /></button>
            </div>

        </div>
    )

}

export default Controls;