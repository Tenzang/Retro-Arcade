import React from "react";
import '../snake/Snake.scss';

const Controls = ({name, resetGame, buttonName, moves, settingMoves, handleKeyDown }) => {
    function handleButtonPress(e, buttonPressed) {
        e.preventDefault();

        document.dispatchEvent(new KeyboardEvent('keydown', {'key': buttonPressed}));
    }

    return (
        <div>
            { name === 'Snake' ? <button className="reset button-85" onClick={resetGame}>{buttonName}</button> : <div></div>}
            <div className="controls">

                <div className="play-pause">
                    <button className="play" onClick={(e) => handleButtonPress( e, ' ')}>Play</button>
                </div>

                <div className="controls-direction">
                    <button className="left" onClick={(e) => handleButtonPress(e, 'ArrowLeft')}>Left</button>
                    <button className="up" onClick={(e) => handleButtonPress(e, 'ArrowUp')}>{name === 'Tetris' ? 'Rotate' : 'Up' }</button>
                    <button className="down" onClick={(e) => handleButtonPress(e, 'ArrowDown')}>Down</button>
                    <button className="right" onClick={(e) => handleButtonPress(e, 'ArrowRight')}>Right</button>
                </div>

            </div>
        </div>
    )

}

export default Controls;