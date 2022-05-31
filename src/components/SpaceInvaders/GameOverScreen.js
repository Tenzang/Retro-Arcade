import React, { Component } from "react";

class GameOverScreen extends Component {
    constructor(args) {
        super(args);
        this.state = { score: args.score };
    }

    render() {
        return (
            <div className="GameOverScreen">
                <h1>Game Over!</h1>
                <h3>Score: { this.state.score } </h3>
                <p>Press enter to play again!</p>
            </div>
        )
    }
}

export default GameOverScreen;