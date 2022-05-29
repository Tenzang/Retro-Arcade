import React, { Component } from "react";
import Title from "./Title";
import Ship from './Ship'

const GameState = { // didn't do true false, cause diff stages
    StartScreen: 0,
    Playing: 1, 
    GameOver: 2
};
class Space extends Component {
    constructor() {
        super();
        this.pressedKeys = { left: 0, right: 0, space: 0, enter: 0 };
        this.state = {
            gameState: GameState.StartScreen,
            context: null
        };

        this.ship = null;
    }

    // setting direction to true or false
    handleKeys(value, e) {
        let keys = this.pressedKeys;
        const { key } = e;
        switch(key) {
            case 'ArrowLeft':
                keys.left = value;
                break;
            case 'ArrowRight':
                keys.right = value;
                break;
            case ' ':
                keys.space = value;
                console.log(e, value)
                break;
            case 'Enter':
                keys.enter = value;
                break;
        }
        this.pressedKeys = keys;
    }

    // we have two event listeners because when a key is pressed the direction pressed is set to true, and when released it is set back to false. Otherwise the object will continue moving in that direction pressed.
    bindKeys() {
        document.addEventListener("keyup", this.handleKeys.bind(this, false));
        document.addEventListener("keydown", this.handleKeys.bind(this, true));
    }

    unbindKeys() {
        document.removeEventListener("keyup", this.handleKeys);
        document.removeEventListener("keydown", this.handleKeys);
    }

    start() {
        let ship = new Ship({
            radius: 15,
            speed: 2.5,
            position: {
                x: 300,
                y: 550
            }})

        this.ship = ship;
        this.setState({ gameState: GameState.Playing });
        console.log('start and setting state')
    }
    
    // game loop --> run continuously --> for reacting to user input continuously.
    update(currentFrame) {
        const keys = this.pressedKeys;
        if ( this.state.gameState === GameState.StartScreen && keys.enter ) {
            console.log('starting game')
            this.start();
        }

        const background = new Image();
        background.src = "assets/space.png"

        const context = this.state.context;
        context.save();
        context.fillRect(background, 0,0, 600, 600);
        context.globalAlpha = 1;

        if ( this.state.gameState === GameState.Playing ) {
            if( this.ship !== null ){
                this.ship.update(keys);
                this.ship.render(this.state);
            }
        }
        requestAnimationFrame(() => { this.update() }); // requestAnimationFrame is smoother than setInterval()
    }


    componentDidMount() {
        this.bindKeys();
        const context = this.refs.canvas.getContext('2d'); //initialise ship
        this.setState({ context: context})
        requestAnimationFrame(() => { this.update() }) // calling game loop for the first time
    }

    componentWillUnmount() {
        this.unbindKeys();
    }

    render() {
        return (
            <div>
                { this.state.gameState === GameState.StartScreen && <Title /> } {/*  only render on initial state plz.. */}
                <canvas ref="canvas" width={600} height={600}/>
            </div>
        )
    }
}

export default Space