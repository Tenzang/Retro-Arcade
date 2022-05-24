import React, { useState, useEffect, useRef } from 'react';
import './Snake.css'

const SnakeBoard = () => {

    // grid 20 by 20 
    const width = 20;
    const height = 20;

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
    const [snake, setSnake] = useState([{x:0, y:0}]); // our initial position for the snake is x:0, y:0
    const [direction, setDirection] = useState('right');
    const [food, setFood] = useState(randomPosition);

     console.log('snake', snake.length)

    const displayRows = rows.map((row) => 
            <div className="snakeRow">
                {row.map((e) => {
                    switch(e) {
                        case 'blank':
                            return (<div className="snakeCell"></div>)
                        case 'snake':
                            return (<div className="snake"></div>)
                        case 'food':
                            return (<div className="food"></div>)                       
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

    // useEffect(() => {
    //     displaySnake()
    // },[displayRows]);

    
    const moveSnake = () => {
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
        

        if(snake[0].x === food.x && snake[0].y === food.y) {
            setFood(randomPosition);
        } else {
            newSnake.pop();
        }

        setSnake(newSnake);
        displaySnake();
    }

    useInterval(moveSnake, 200);

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
        console.log(e.key);
        const { key } = e;
        switch(key) {
            case 'ArrowLeft':
                setDirection('left')
                break;
            case 'ArrowRight':
                setDirection('right')
                break;
            case 'ArrowUp':
                setDirection('up')
                break;
            case 'ArrowDown':
                setDirection('down')
                break;
            default:
                break;
            
        }
    }

    document.addEventListener("keydown", changeDirectionWithKeys, false);





    return (
        <div className='Snakeboard'>
            <h1>Snake</h1>
            <div className='snakeGame'>{displayRows}</div>
        </div>
    )
}


export default SnakeBoard;