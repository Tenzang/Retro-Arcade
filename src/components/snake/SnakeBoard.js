import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Snake.scss';
import Controls from './Controls';


const SnakeBoard = () => {

    // grid 20 by 20 
    const width = 20;
    const height = 20;
    const instruction = '[ Press "Space" to start ]';
    const initialSnake = [{x:0, y:0}];
    const initialDirection = 'ArrowRight';
       

    const initialRows = [];
    for (let i = 0; i < height; i++) {
        initialRows.push([]);
        for (let j = 0; j < width; j++) {
            initialRows[i].push('blank') // string 
        }
    }

    // adding food - randomize
    let foodPosition;
    const newRows = initialRows; 

    const randomPosition = () => { // need to add base case = when there are no blanks left for food position
        const position = {
            x: Math.floor(Math.random()*width),
            y: Math.floor(Math.random()*height)
        };
    
        if (!newRows.some(row => row.includes('blank'))) { // if there are no blank rows = you win!
            setMessage('You win!')
            setVisibility('visible')
            setPlay(false)
        } else if (rows[position.x][position.y] === 'snake' || rows[position.x][position.y] === 'food') {
            return randomPosition();
        } else {
            foodPosition = position;
            return foodPosition;
        }
        // return position;
        
    }

    // const blanksLeft = (array, search) {

    // }

    const [rows, setRows] = useState(initialRows);
    const [snake, setSnake] = useState(initialSnake); // our initial position for the snake is x:0, y:0
    const [direction, setDirection] = useState(initialDirection); // Figure out why this state is not updating
    const [food, setFood] = useState(randomPosition);
    const [play, setPlay] = useState(false);
    const [visibility, setVisibility] = useState('visible')
    const [message, setMessage] = useState('Start')
    const [delay, setDelay] = useState(300)
    const [moves, setMoves] = useState([])
    const [showReset, setShowReset] = useState('hidden')
    const [showInstruction, setShowInstruction] = useState('visible')
    const [buttonName, setButtonName] = useState('START')

    const displayRows = rows.map((row, x) => 
            <div key={String(x)} className="snakeRow">
                {row.map((e, y) => {
                    let div;
                    switch(e) {
                        case 'snake':
                            div = <div key={String(x) + String(y)} className="snake"></div>
                            break;
                            
                        case 'food':
                            div = (
                                <div key={String(x) + String(y)}  className="food">
                                    <div className='leaf'></div> 
                                    <div className='apple'></div>
                                </div>
                            )        
                            break;

                        default:
                            div = <div key={String(x) + String(y)} className="snakeCell"></div>
                    }
                    return (div);
                })}
            </div>
    );


    const displaySnake = () => {
        //const newRows = initialRows;
        snake.forEach(cell => {
            newRows[cell.x][cell.y]='snake';
        })
        newRows[food.x][food.y]='food';
        setRows(newRows);
    }


    const moveSnake = () => {
        changeDirection();
        const newSnake = [];
        switch(direction) {
            case 'ArrowRight':
                newSnake.push({x: snake[0].x, y: (snake[0].y + 1)%width}) // this is how many boxes in array --> the % sends it back to the start as it would have no remainders once it gets to the 20 --> gives it the effect that it wraps
                break;
            case 'ArrowLeft':
                newSnake.push({x: snake[0].x, y: (snake[0].y - 1 + width)%width})
                break;
            case 'ArrowUp':
                newSnake.push({x: (snake[0].x - 1 + height)%height, y: snake[0].y})
                break;
            case 'ArrowDown':
                newSnake.push({x: (snake[0].x + 1)%height, y: snake[0].y})
                break;
            default:
                break;
        }
        
            snake.forEach(cell => {
                newSnake.push(cell);
            })

            if (snake[0].x === food.x && snake[0].y === food.y) { // when the snake eats food
                setFood(randomPosition());
                increaseSpeed()
            } else if (snake.length > 4) { // 
                for (let i = 4; i < snake.length; i++) {
                    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
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


    const changeDirection = () => {
        if (moves.length === 0) {
            return
        } else {
            setDirection(moves.shift())
        }
    }
 
   
    const settingMoves = useCallback((moves, direction) => {
        setMoves([...moves, direction]);
    }, []);
    

    useEffect(() => {
        const changeDirectionWithKeys = (e) => {
            const { key } = e;
            let movePressed;
            switch(key) {
                case 'ArrowLeft':
                    if (direction !== 'ArrowRight') {
                        movePressed = 'ArrowLeft';
                        settingMoves(moves, 'ArrowLeft')
                    }
                    break;
                case 'ArrowRight':
                    if (direction !== 'ArrowLeft') {
                        movePressed = 'ArrowRight';
                        settingMoves(moves, 'ArrowRight')
                    }
                    break;
                case 'ArrowUp':
                    if (direction !== 'ArrowDown') {
                        movePressed = 'ArrowUp';
                        settingMoves(moves, 'ArrowUp')
                    }
                    break;
                case 'ArrowDown':
                   if (direction !== 'ArrowUp') {
                        movePressed = 'ArrowDown';
                       settingMoves(moves, 'ArrowDown')
                    }
                    break;
                default:
                    break;
            }
            if (movePressed) settingMoves(moves, movePressed)
        }

        document.addEventListener("keydown", changeDirectionWithKeys);
        return () => {
            document.removeEventListener("keydown", changeDirectionWithKeys);
        }
        
    },[direction, moves, settingMoves])
    

    const start = useCallback(e => { //start game with a space bar - remove modal & event listener
        switch(e.code) {
            case 'Space':
                setPlay(true)
                setVisibility('hidden')
                setShowInstruction('hidden')
                setButtonName('RESET')
                document.removeEventListener("keydown", start);
                break;
            default:
                break;
        }
    }, [])

    const gameOver = useCallback(() => {
        setMessage('Game Over')
        setVisibility('visible')
        setPlay(false)
        setShowReset('visible')
        setShowInstruction('hidden')
    }, [])

    const resetGame = () => {
        setSnake(initialSnake);
        setDirection(initialDirection);
        setPlay(true)
        setShowReset('hidden')
        setMessage('Start')
        setVisibility('hidden')
        setDelay(300)
        setShowInstruction('hidden')
        setButtonName('RESET')
    }

    useEffect(() => {
        document.addEventListener("keydown", start);
        return () => {
            document.removeEventListener("keydown", start);
        }
    },[gameOver, start])

    const increaseSpeed = () => {
        let level = snake.length-1
        if (level === 10 || level === 20 || level === 25 || level === 30 || level === 40) {
            let speed = delay - 50 // times: 250, 200, 150, 100, 50
            setDelay(speed)
        }
    }

    return (
        <div className='Snakeboard'>
            <h2 className='gameTitle'>SNAKE</h2>
            <div className='snakeGame'>{ displayRows }
                <div className='message' style={{ visibility: visibility }}>
                    <div className='messageText'>{ message }</div>
                    <div style={{ visibility: showInstruction }} className='instruction'>{ instruction }</div>
                    <button className="reset button-85" style={{ visibility: showReset }} onClick={ resetGame }>Reset</button>
                </div>       
            </div>
            <div className='points'>Points: { snake.length-1 }</div>
            <Controls 
                name={ 'Snake' }
                setPlay={ setPlay } 
                direction={ direction } 
                setDirection={ setDirection }
                resetGame={ resetGame }
                buttonName={ buttonName }
                moves={ moves }
                settingMoves={  settingMoves }
            />
        </div>
    )
}


export default SnakeBoard;