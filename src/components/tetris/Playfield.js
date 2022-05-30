import React, { Component } from 'react';
import startingPieces from './helpers/segments';
import './styles/tetris.scss';
import _ from 'lodash';

class Playfield extends Component { 
    constructor(props) {
        super(props);

        // create grid (10 x 20)
        const grid = [];
        for (let y = 0; y < 20; y++) {
            const row = []
            for (let x = 0; x < 10; x++) {
                row.push(false);
            }
            grid.push(row);
        }
        
        this.startingPieces = startingPieces;
        
        // ensures one timeout per playfield
        this.timeoutID = null;
        
        this.randomPiece = () => {
            // select piece randomely from startingPieces
            let randomPiece = _.sample(this.startingPieces).orientations[0];
            // make a deep copy of piece
            randomPiece = _.cloneDeep(randomPiece);
            // return deep copy of random piece
            return randomPiece;
        }

        this.state = {
            emptyGrid: grid,
            grid: _.cloneDeep(grid),
            activePiece: this.randomPiece(),
            score: 0,
            nextPiece: this.randomPiece(),
            delay: 500,
            lines: 0,
            level: 1,
            gamePaused: false
        }

        // removes or adds piece to the grid
        this.hidePiece = (grid, hide = true) => {
            const { activePiece } = this.state;
            activePiece.pos.forEach(cell => {
                grid[cell.y][cell.x] = !hide;
            });
            return grid;
        }

        this.clearFullRows = (gridCopy) => {
            gridCopy = gridCopy.filter((row) => {
                return !row.every(cell => cell);
            });

            let linesCleared = 0;
            while (gridCopy.length < 20) {
                gridCopy.unshift(Array(10).fill(false))
                linesCleared++;
            };

            let points;
            switch (linesCleared) {
                case 1:
                    points = 40;
                    break;
                case 2:
                    points = 100;
                    break;
                case 3:
                    points = 300;
                    break;
                case 4:
                    points = 1200;
                    break;
                default:
                    points = 0;
            }

            if (linesCleared) {
                const { state } = this;
                const newScore = state.score + points;
                const newLines = state.lines + linesCleared
                const newLevel = Math.floor(newLines/10) + 1;
                const newDelay = 500 - (newLevel * 10);

                this.setState(
                    { 
                        score: newScore,
                        lines: newLines,
                        level: newLevel,
                        delay: newDelay
                    });

                const { changeScore, changeLinesCleared, changeLevel } = props;
                changeScore(newScore);
                changeLinesCleared(newLines);
                changeLevel(newLevel);
            }

            return gridCopy;
        }
        
        // moves the piece down by one
        this.movePiece = (xMove, yMove, repeat = false) => {
            const { state, hidePiece, movePiece, clearFullRows} = this;
            const { grid, activePiece } = state;
            const { pos } = activePiece;
            
            let exitFunction = false;

            // hide piece from board while checking move to prevent self collision detection
            let newGrid = hidePiece(_.cloneDeep(grid));
            const checkIfOccupied = (cell) => newGrid[cell.y][cell.x];

            for (let i = 0; i < pos.length; i++) {
                const cell = pos[i];
                
                // return if lateral move would place piece out of bounds or inside other piece
                const outsideLowerBound = (cell.x + xMove) < 0;
                const outsideupperBound = (cell.x + xMove) >= 10;
                const spaceOccupied = newGrid[cell.y][cell.x + xMove];
                
                if ( outsideLowerBound || outsideupperBound || spaceOccupied) {
                    exitFunction = true;
                    break;
                }
                
                const floorBelow = cell.y + yMove >= 20;
                const pieceBelow = floorBelow ? false : newGrid[cell.y + yMove][cell.x];
                
                // if next cell down is occupied or outside grid lower bound, set new piece
                if (floorBelow || pieceBelow) {
                    
                    // reveal piece
                    newGrid = hidePiece(newGrid, false);
                    // remove any full rows
                    newGrid = clearFullRows(newGrid);
                    
                    // check if starting position is occupied
                    let newPiece = _.cloneDeep(this.state.nextPiece);
                    const startPosOccupied = newPiece.pos.some(checkIfOccupied);

                    if (startPosOccupied) {
                        this.gameOver();
                        return;
                    }

                    const newNextPiece = this.randomPiece();

                    this.setState({ grid: newGrid, activePiece: newPiece, nextPiece: newNextPiece });

                    this.props.changeNextPiece(_.cloneDeep(newNextPiece.pos));
                    
                    // prevents multiple timeouts being set
                    clearTimeout(this.timeoutID);
                    this.timeoutID = (setTimeout(() => {
                        movePiece(0, 0, true);
                    }, this.state.delay));
                    
                    exitFunction = true;
                    break;
                }

            }

            if (exitFunction) return;

            // change pieces coordinates
            activePiece.pos.forEach(cell => {
                cell.x += xMove;
                cell.y += yMove;
            });

            // reveal cell after coordinate update
            newGrid = hidePiece(newGrid, false);

            // set grid to new grid with updated coordinates
            this.setState({grid: newGrid, activePiece: activePiece});

            // repeat after a second if move was not triggered by player input
            if (repeat) {
                this.timeoutID = setTimeout(() => {
                    movePiece(0, 1, repeat);
                }, this.state.delay);
            }
        };

        // ALGORITHM FOR ROTATION
        this.rotatePiece = () => {
            const { state, startingPieces, hidePiece } = this;
            const { grid, activePiece } = state;

            // create grid and activePiece copy
            let gridCopy = _.cloneDeep(grid);
            let activePieceCopy = _.cloneDeep(activePiece);
            const { piece, orientation } = activePieceCopy.id;
            
            // remove piece from grid
            gridCopy = hidePiece(gridCopy);

            // determine pivot cells OFFSET from original position
            const startPiece = startingPieces[piece].orientations[orientation];
            
            // TODO: use composition
            const xStart = startPiece.pos[0].x;
            const xCurrent = activePieceCopy.pos[0].x;
            const xOffset = xCurrent - xStart;
            
            const yStart = startPiece.pos[0].y;
            const yCurrent = activePieceCopy.pos[0].y;
            const yOffset = yCurrent - yStart;
            
            // swap activePieceCopy with new orientation
            const nextID = activePieceCopy.next.id;
            const nextPiece = nextID.piece;
            const nextOrientation = nextID.orientation;
            const newPiece = this.startingPieces[nextPiece].orientations[nextOrientation];

            activePieceCopy = _.cloneDeep(newPiece);
            
            // check if the piece is in a valid location after rotation
            let validRotation = true;
            activePieceCopy.pos.forEach(cell => {
                // apply offset to new pieces coordinates
                cell.x += xOffset;
                cell.y += yOffset;

                const outOfBounds = (
                    cell.x < 0 ||
                    cell.y < 0 ||
                    cell.x >= 10 ||
                    cell.y >= 20
                );
                
                // invalid if cell is out of bounds or already occupied
                if (outOfBounds || gridCopy[cell.y][cell.x]) {
                    validRotation = false;
                }

            });

            // if in bounds and not occupied, set new orientation to activePiece, else return out of function

            if (validRotation) {
                // add piece back onto gridCopy
                for (let i = 0; i < activePieceCopy.pos.length; i++) {
                    const cell = activePieceCopy.pos[i];
                    gridCopy[cell.y][cell.x] = true;
                }

                this.setState({grid: gridCopy, activePiece: activePieceCopy});
            }
        }

        this.gameOver = () => {
            clearTimeout(this.timeoutID);
            document.removeEventListener('keydown', this.handleKeyDown);
            document.addEventListener('keydown', this.handleRestart);

            props.changeInfo('gameOver');
        }

        this.restartGame = () => {
            const { props, state, handleKeyDown, handleRestart, movePiece, randomPiece } = this;
            document.removeEventListener('keydown', handleRestart);
            
            // reset state
            this.setState({ 
                grid: _.cloneDeep(state.emptyGrid),
                activePiece: randomPiece(),
                score: 0,
                nextPiece: randomPiece(),
                delay: 500,
                level: 1,
                lines: 0
            }, () => {
                movePiece(0, 0, true);
                document.addEventListener('keydown', handleKeyDown);
                
                props.changeNextPiece(_.cloneDeep(state.nextPiece.pos));
                props.changeScore(0);
                props.changeInfo('gameOver');
            });

        }

        this.handleRestart = (event) => {
            const { key } = event;
            if (key === ' ') {
                this.restartGame();
            }
        }

        this.handlePause = (event) => {
            const { key } = event;

            if (key === ' ') this.flipPauseState();
        }

        this.flipPauseState = () => {
            const { state, timeoutID, handleKeyDown, movePiece, handlePause } = this;
            const { gamePaused } = state;

            if (gamePaused) {
                console.log('starting piece');
                this.timeoutID = (setTimeout(() => {
                    movePiece(0, 1, true);
                }, this.state.delay));
                
                document.removeEventListener('keydown', handlePause);
                document.addEventListener('keydown', handleKeyDown);
            } else {
                console.log('stopping piece');
                clearTimeout(timeoutID);
                
                document.removeEventListener('keydown', handleKeyDown);
                document.addEventListener('keydown', handlePause);
            }

            props.changeInfo('gamePaused');
            this.setState( { gamePaused: !gamePaused });
        }

        this.handleKeyDown = (event) => {
            const { key } = event;
            if (key === ' ') {
                this.flipPauseState();
            } else {
                const { movePiece, rotatePiece } = this;
                let x = 0;
                let y = 0;
                switch (key) {
                    case 'ArrowLeft':
                        x--;
                        break;
                    case 'ArrowRight':
                        x++;
                        break;
                    case 'ArrowDown':
                        y++;
                        break;
                    case 'ArrowUp':
                        rotatePiece();
                        return;
                    default:
                        break;
                }
                movePiece(x, y);
            }
        }

        this.handleStart = (event) => {
            const { key } = event;

            if (key === ' ') {
                document.removeEventListener('keydown', this.handleStart);
                const { props, movePiece } = this;
        
                movePiece(0, 0, true);
                document.addEventListener('keydown', this.handleKeyDown);
                props.changeInfo('gameStart');
                props.changeNextPiece(_.cloneDeep(this.state.nextPiece.pos));
            }
        }


    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleStart);
    }

    render() {
        return (
            <div className='tetrisGrid'>
                <div className='grid playField'>
                    { this.state.grid.map( (row, y) => {
                        return(
                            row.map((cell, x) => {
                                return (<div
                                    className={`cell ${ cell ? 'occupied' : 'empty' }`}
                                    key={String(x)+ String(y)}
                                > <div className='shading'></div></div>);
                            })
                            );
                        }) }
                </div>
            </div>
        );
    }
}

export default Playfield;
