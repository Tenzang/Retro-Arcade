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
                <div className='tetrisContainer'>
                    <div>
                        <Playfield changeScore={ this.changeScore } changeNextPiece={ this.changeNextPiece } />
                    </div>
                    <div>
                        <PieceDisplay nextPiece={ this.state.nextPiece } />
                        <ScoreDisplay score={ this.state.score } />
                    </div>
                </div>
            </div>
        );
    }
};

export default Tetris;