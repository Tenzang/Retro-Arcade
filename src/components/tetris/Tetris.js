import React, { Component } from 'react';
import _ from 'lodash';

import Playfield from './Playfield';
import ScoreDisplay from './ScoreDisplay';
import PieceDisplay from './PieceDisplay';
import LinesClearedDisplay from './LinesClearedDisplay';
import LevelDisplay from './LevelDisplay';
import MessageDisplay from './MessageDisplay';

class Tetris extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            nextPiece: '',
            linesCleared: 0,
            level: 1,
            message: {
                gameStart: {
                    is: true, 
                    message: 'Start',
                    instruction: '[ Press "Space" to Start ]'
                },
                gameOver: {
                    is: false,
                    message: 'Game Over',
                    instruction: '[ Press "Space" to Restart ]'    
                },
                gamePaused: {
                    is: false,
                    message: 'Paused',
                    instruction: '[Press "Space" to Continue ]'
                },
                handleKeyDown: null
            }
        };
    };

    changeScore = (score) => {
        this.setState({ score: score });
    }

    changeNextPiece = (nextPiece) => {
        console.log("changing next piece to:", nextPiece);
        this.setState({ nextPiece: nextPiece });
        console.log('new piece in state:', this.state.nextPiece);
    }

    changeLinesCleared = (linesCleared) => {
        this.setState({ linesCleared: linesCleared });
    }

    changeLevel = (level) => {
        this.setState({ level: level });
    }

    changeInfo = (gameStage) => {
        const newState = _.cloneDeep(this.state);
        const message = newState.message[gameStage];
        // flip message.is
        message.is = !message.is;

        this.setState( newState );
    }

    liftHandleKeyDown = (handleKeyDown) => {
        this.setState({ handleKeyDown: handleKeyDown });
    }

    render() {
        const { score, nextPiece, linesCleared, level, message } = this.state;
        const { 
            changeScore, 
            changeNextPiece,
            changeLinesCleared,
            changeLevel,
            changeInfo,
            liftHandleKeyDown
        } = this;
        
        return (
            <div className='tetrisGame'>
                <h2 className='gameTitle'>TETRIS</h2>
                <div className='gameContainer'>
                    <div className='tetrisContainer'>
                        <div>
                            <Playfield 
                                changeScore={ changeScore } 
                                changeNextPiece={ changeNextPiece }
                                changeLinesCleared={ changeLinesCleared }
                                changeLevel={ changeLevel }
                                changeInfo={ changeInfo }
                                liftHandleKeyDown={ liftHandleKeyDown }
                            />
                        </div>
                        <div>
                            <PieceDisplay nextPiece={ nextPiece } />
                            <ScoreDisplay score={ score } />
                            <LinesClearedDisplay linesCleared={ linesCleared } />
                            <LevelDisplay level={ level } />
                            <MessageDisplay message={ message } />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Tetris;