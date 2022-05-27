import React, { Component } from 'react';
import Playfield from './Playfield';
import ScoreDisplay from './ScoreDisplay';
import PieceDisplay from './PieceDisplay';

class Tetris extends Component {
    constructor() {
        super();
        this.state = {
            score: 0,
            nextPiece: ''
        };
    };

    changeScore = (score) => {
        this.setState({ score: score });
    }

    changeNextPiece = (nextPiece) => {
        this.setState({ nextPiece: nextPiece });
    }

    render() {
        return (
            <div>
                <h3 className='gameTitle'>TETRIS</h3>
                <ScoreDisplay score={ this.state.score } />
                <PieceDisplay nextPiece={ this.state.nextPiece } />
                <Playfield changeScore={ this.changeScore } changeNextPiece={ this.changeNextPiece } />
            </div>
        );
    }
};

export default Tetris;