import React, { Component } from 'react';
import Playfield from './Playfield';
import ScoreDisplay from './ScoreDisplay';
import PieceDisplay from './PieceDisplay';
import LinesClearedDisplay from './LinesClearedDisplay';
import LevelDisplay from './LevelDisplay';

class Tetris extends Component {
    constructor() {
        super();
        this.state = {
            score: 0,
            nextPiece: '',
            linesCleared: 0,
            level: 1
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
        const {score, nextPiece, linesCleared, level } = this.state;
        const { changeScore, changeNextPiece, changeLinesCleared, changeLevel } = this;
        return (
            <div>
                <ScoreDisplay score={ score } />
                <LinesClearedDisplay linesCleared={ linesCleared } />
                <LevelDisplay level={ level } />
                <PieceDisplay nextPiece={ nextPiece } />
                <Playfield 
                    changeScore={ changeScore } 
                    changeNextPiece={ changeNextPiece }
                    changeLinesCleared={ changeLinesCleared }
                    changeLevel={ changeLevel } 
                />
            </div>
        );
    }
};

export default Tetris;