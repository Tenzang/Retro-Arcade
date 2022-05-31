import React from "react";
import '../snake/Snake.scss';
import'./Controls.scss';
import rotate from './rotate.png'

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
        <div>
            <div className="controls">

                <div className="play-pause">
                    <button className="push--skeuo up" onMouseDown={(e) => handleButtonPress( e, ' ')} onMouseUp={(e) => handleButtonPress( e, ' ')}>{ name === 'Space Invaders' ? 'Shoot' : 'Play' }</button>
                </div>

                <div className="controls-direction">
                    <button className="press--direction left" onMouseDown={(e) => handleButtonPress(e, 'ArrowLeft')} onMouseUp={(e) => handleButtonPress(e, 'ArrowLeft')} >Left</button>
                    <button className="press--direction up" onMouseDown={(e) => handleButtonPress(e, 'ArrowUp')} onMouseUp={(e) => handleButtonPress(e, 'ArrowUp')} >{name === 'Tetris' ? <img className="rotate" src={rotate} /> : 'Up' }</button>
                    <button className="press--direction down" onMouseDown={(e) => handleButtonPress(e, 'ArrowDown')} onMouseUp={(e) => handleButtonPress(e, 'ArrowDown')} >Down</button>
                    <button className="press--direction right" onMouseDown={(e) => handleButtonPress(e, 'ArrowRight')} onMouseUp={(e) => handleButtonPress(e, 'ArrowRight')} >Right</button>
                </div>

            </div>
        </div>
    )

}

export default Controls;