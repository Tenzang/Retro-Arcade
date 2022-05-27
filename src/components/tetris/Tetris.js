import React, { Component } from 'react';
import Playfield from './Playfield';
import ScoreDisplay from './ScoreDisplay';
import PieceDisplay from './PieceDisplay';
import LinesClearedDisplay from './LinesClearedDisplay';
import LevelDisplay from './LevelDisplay';
import Controls from '../snake/Controls';
import MessageDisplay from './MessageDisplay';

class Tetris extends Component {
    constructor() {
        super();
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
                } 
            }
        };
    };

    changeScore = (score) => {
        this.setState({ score: score });
    }

    changeNextPiece = (nextPiece) => {
        this.setState({ nextPiece: nextPiece });
    }

    changeLinesCleared = (linesCleared) => {
        this.setState({ linesCleared: linesCleared });
    }

    changeLevel = (level) => {
        this.setState({ level: level });
    }


    render() {
        const {score, nextPiece, linesCleared, level, message } = this.state;
        const { changeScore, changeNextPiece, changeLinesCleared, changeLevel } = this;
        return (
            <div>
                <h3 className='gameTitle'>TETRIS</h3>
                <div className='tetrisContainer'>
                    <div>
                        <Playfield 
                            changeScore={ changeScore } 
                            changeNextPiece={ changeNextPiece }
                            changeLinesCleared={ changeLinesCleared }
                            changeLevel={ changeLevel } 
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
                <Controls />
            </div>
        );
    }
};

export default Tetris;