import React, { Component } from 'react';
import Playfield from './Playfield';


class Tetris extends Component {
    constructor() {
        super();
        this.state = {};
    };

    render() {
        return (
            <div>
                {/* <ScoreDisplay />
                <PieceDisplay /> */}
                <Playfield />
            </div>
        );
    }
};

export default Tetris;