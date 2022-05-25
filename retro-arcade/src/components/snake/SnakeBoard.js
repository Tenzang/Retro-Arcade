import React, { useState, useEffect, useRef } from 'react';
import './Snake.scss';
import Controls from './Controls';
import _ from 'lodash';

const SnakeBoard = () => {

    // grid 20 by 20 
    const width = 20;
    const height = 20;
    const instruction = '[ Press "Space" to start ]'
    // const initialSnake = [{x:0, y:0}]

    const initialRows = [];
    for (let i = 0; i < 20; i++) {
        initialRows.push([]);
        for (let j = 0; j < 20; j++) {
            initialRows[i].push('blank') // string 
        }
    }

    // adding food - randomize
    const randomPosition = () => {
        const position = {
            x: Math.floor(Math.random()*width),
            y: Math.floor(Math.random()*height)
        };
        return position;
    }

    const [rows, setRows] = useState(initialRows);
    const [initialSnake] = useState([{x:0, y:0}]);
    const [snake, setSnake] = useState(_.cloneDeep(initialSnake)); // our initial position for the snake is x:0, y:0
    const [direction, setDirection] = useState('right'); // Figure out why this state is not updating
    const [food, setFood] = useState(randomPosition);
    const [play, setPlay] = useState(false);
    const [visibility, setVisibility] = useState('visible')
    const [message, setMessage] = useState('Start')
    const [delay, setDelay] = useState(300)

    //  console.log('snake', snake.length)

    const displayRows = rows.map((row, x) => 
            <div key={String(x)} className="snakeRow">
                {row.map((e, y) => {
                    switch(e) {
                        case 'blank':
                            return (<div key={String(x) + String(y)} className="snakeCell"></div>)
                        case 'snake':
                            return (<div key={String(x) + String(y)} className="snake"></div>)
                        case 'food':
                            return (<div key={String(x) + String(y)}  className="food"><div className='egg'></div></div>)                       
                        }
                    })
                }
            </div>
    );

    
    const displaySnake = () => {
        const newRows = initialRows;
        snake.forEach(cell => {
            newRows[cell.x][cell.y]='snake';
        })
        newRows[food.x][food.y]='food';
        setRows(newRows);
    }


    const moveSnake = () => {
        // console.log('snake moving')
        const newSnake = [];
        switch(direction) {
            case 'right':
                newSnake.push({x: snake[0].x, y: (snake[0].y + 1)%width}) // this is how many boxes in array --> the % sends it back to the start as it would have no remainders once it gets to the 20 --> gives it the effect that it wraps
                break;
            case 'left':
                newSnake.push({x: snake[0].x, y: (snake[0].y - 1 + width)%width})
                break;
            case 'up':
                newSnake.push({x: (snake[0].x - 1 + height)%height, y: snake[0].y})
                break;
            case 'down':
                newSnake.push({x: (snake[0].x + 1)%height, y: snake[0].y})

        }
        
            snake.forEach(cell => {
                newSnake.push(cell);
            })

            if (snake[0].x === food.x && snake[0].y === food.y) { // when the snake eats food
                setFood(randomPosition);
                increaseSpeed()
            } else if (snake.length > 4) { // 
                for (let i = 4; i < snake.length; i++) {
                    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
                        console.log('collision & game over')
                        gameOver()
                    } 
                }
                newSnake.pop();
            } else {
                newSnake.pop();
            }


        setSnake(newSnake);
        displaySnake();
    }
    // onsole.log('setting interval')
    useInterval(moveSnake, play ? delay : null);

    // setInterval doesn't work because when its in a useEffect, its called only once
    function useInterval(callback, delay) {
        const savedCallback = useRef(); // holds the mutable value without re-rendering
        //remember the latest callback
        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        // set up the interval
        useEffect(() => {
            function tick() {
                savedCallback.current();
            }
            if (delay !== null ) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [delay])

    }

    const changeDirectionWithKeys = (e) => {
        console.log(e)
        const { key } = e;
        switch(key) {
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

   
    useEffect(() => {
        document.addEventListener("keyup", changeDirectionWithKeys);
        return () => {
            document.removeEventListener("keyup", changeDirectionWithKeys);
        }
        
    },[direction])
    

    const start = (e) => { //start game with a space bar - remove modal & event listener
        console.log('start', e.code)
        switch(e.code) {
            case 'Space':
                setPlay(true)
                setVisibility('hidden')
                document.removeEventListener("keyup", start);
                break;
        }
    }

    const gameOver = () => {
        setMessage('Game Over')
        setVisibility('visible')
        setSnake(_.cloneDeep(initialSnake))
        setPlay(false)

    }

    useEffect(() => {
        document.addEventListener("keyup", start);
        return () => {
            document.removeEventListener("keyup", start);
        }
    },[gameOver])

    const increaseSpeed = () => {
        let level = snake.length-1
        if (level === 10 || level === 20 || level === 25 || level === 30 || level === 40) {
            let speed = delay - 50 // times: 250, 200, 150, 100, 50
            console.log('speed',speed)
            setDelay(speed)
        }
    }

    return (
        <div className='Snakeboard'>
            <h1>Snake</h1>
            <div className='snakeGame'>{displayRows}</div>
            <div className='message' style={{visibility: visibility}}>
                <div className='messageText'>{message}</div>
                <div className='instruction' style={{visibility: visibility}}>{instruction}</div>
                </div>
            <div>Points: {snake.length-1}</div>
            <Controls setPlay={setPlay} direction={direction} setDirection={setDirection} />
        </div>
    )
}


export default SnakeBoard;