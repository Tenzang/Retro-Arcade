import React, { useState, useEffect, useRef } from 'react';
import './Snake.css';
import Controls from './Controls';

const SnakeBoard = () => {

    // grid 20 by 20 
    const width = 20;
    const height = 20;
    const delay = 300;

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
    const [direction, setDirection] = useState('right'); // Figure out why this state is not updating
    const [food, setFood] = useState(randomPosition);
    const [play, setPlay] = useState(true);


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
                            return (<div key={String(x) + String(y)}  className="food"></div>)                       
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

            if (snake[0].x === food.x && snake[0].y === food.y) {
                setFood(randomPosition);
            } else if (snake.length > 4) { // 
                for (let i = 4; i < snake.length; i++) {
                    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
                        console.log('collision')
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
                console.log('ArrowLeft', direction); // async 
                break;
            case 'ArrowRight':
                (direction === 'left') ? setDirection('left') : setDirection('right')
                console.log('ArrowRight', direction);
                break;
            case 'ArrowUp':
                (direction === 'down') ? setDirection('down') : setDirection('up')
                console.log('ArrowUp', direction);
                break;
            case 'ArrowDown':
               (direction === 'up') ? setDirection('up') : setDirection('down')
                console.log('ArrowDown', direction);
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


    return (
        <div className='Snakeboard'>
            <h1>Snake</h1>
            <div className='snakeGame'>{displayRows}</div>
            <Controls setPlay={setPlay} direction={direction} setDirection={setDirection} />
        </div>
    )
}


export default SnakeBoard;