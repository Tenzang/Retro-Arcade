import { keys } from "lodash";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Enemy from "./Enemy";
import Title from "./Title";


const SpaceInvaders = () => {

    // const [play, setPlay] = useState(false);
    // const [delay, setDelay] = useState(1000)

    const canvasRef = useRef(null)
    
    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        canvas.width = 620;
        canvas.height = 620;

        const background = new Image();
        background.src = "assets/space.png"

        const enemy = new Enemy(canvas);

        // context.fillStyle = '#FF0000'
        context.fillRect(background,0,0, context.canvas.width, context.canvas.height)
    }, [])

    function game() {
        console.log('game space invaders')
    }

    // const start = useCallback(e => { //start game with a space bar - remove modal & event listener
    //     switch(e.code) {
    //         case 'Space':
    //             setPlay(true)
    //             document.removeEventListener("keydown", start);
    //             break;
    //         default:
    //             break;
    //     }
    // }, [])

    // useEffect(() => {
    //     document.addEventListener("keydown", start);
    //     return () => {
    //         document.removeEventListener("keydown", start);
    //     }
    // },[start])


    // function useInterval(callback, delay) {
    //     const savedCallback = useRef(); // holds the mutable value without re-rendering
    //     //remember the latest callback
    //     useEffect(() => {
    //         savedCallback.current = callback;
    //     }, [callback]);

    //     // set up the interval
    //     useEffect(() => {
    //         function tick() {
    //             savedCallback.current();
    //         }
    //         if (delay !== null ) {
    //             let id = setInterval(tick, delay);
    //             return () => clearInterval(id);
    //         }
    //     }, [delay])

    // }

    // useInterval(game, play ? delay : null);

    // left & right navigate, space to shoot, enter to navigate menu
    const pressedkey = { left: 0, right: 0, space: 0, enter: 0 }

    useEffect(() => {
        const handleKeys = (e, value) => {
            const { key } = e;
            switch(key) {
                case 'ArrowLeft':
                    pressedkey.left = value
                    console.log('pressing left', key, pressedkey)
                    break;
                case 'ArrowRight':
                    console.log('pressing right', key)
                    break;
                case 'ArrowUp':
                    console.log('pressing up', key)
                    break;
                case 'ArrowDown':
                    console.log('pressing down', key)
                    break;
                default:
                    break;
            }
        }

        document.addEventListener("keyup", handleKeys(false));
        document.addEventListener("keydown", handleKeys(true));
        return () => {
            document.removeEventListener("keyup", handleKeys);
            document.removeEventListener("keydown", handleKeys);
        }
        
    },[])


    return (
        <div>
            <Title />
            <canvas ref={ canvasRef } style={{border: '3px solid red' }} />
        </div>
    )
}

export default SpaceInvaders;