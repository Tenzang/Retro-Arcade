import React from "react";
import '../snake/Snake.scss';
import'./Controls.scss';

const Controls = ({ name }) => {
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
                    <button className="play" onMouseDown={(e) => handleButtonPress( e, ' ')} onMouseUp={(e) => handleButtonPress( e, ' ')}>{ name === 'Space Invaders' ? 'Shoot' : 'Play' }</button>
                </div>

                <div className="controls-direction">
                    <button className="left" onMouseDown={(e) => handleButtonPress(e, 'ArrowLeft')} onMouseUp={(e) => handleButtonPress(e, 'ArrowLeft')} >Left</button>
                    <button className="up" onMouseDown={(e) => handleButtonPress(e, 'ArrowUp')} onMouseUp={(e) => handleButtonPress(e, 'ArrowUp')} >{name === 'Tetris' ? 'Rotate' : 'Up' }</button>
                    <button className="down" onMouseDown={(e) => handleButtonPress(e, 'ArrowDown')} onMouseUp={(e) => handleButtonPress(e, 'ArrowDown')} >Down</button>
                    <button className="right" onMouseDown={(e) => handleButtonPress(e, 'ArrowRight')} onMouseUp={(e) => handleButtonPress(e, 'ArrowRight')} >Right</button>
                </div>

            </div>
        </div>
    )

}

export default Controls;