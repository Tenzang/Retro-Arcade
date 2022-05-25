import React from "react";

const Controls = ({setPlay, direction, setDirection}) => {

    function handlePlay(e, val) {
        e.preventDefault();
        (val ? setPlay(true) : setPlay(false))
        console.log(val)
    }

    function handleDirection(e, val) {
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
        <div>
            <div>
                <button onClick={(e) => handlePlay(e, true)}>Play</button>
                <button onClick={(e) => handlePlay(e, false)}>Pause</button>
            </div>
            <div>
                <button onClick={(e) => handleDirection(e, 'ArrowUp')}>Up</button>
                <button onClick={(e) => handleDirection(e, 'ArrowDown')}>Down</button>
                <button onClick={(e) => handleDirection(e, 'ArrowLeft')}>Left</button>
                <button onClick={(e) => handleDirection(e, 'ArrowRight')}>Right</button>
            </div>
        </div>
    )
}

export default Controls;