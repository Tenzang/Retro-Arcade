import React, { Component } from "react";
import Title from "./Title";
import Ship from './Ship'
import './Space.scss'

const width = 620;
const height = 620;

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
            screen: {
                width: width,
                height: height
            },
            gameState: GameState.StartScreen,
            context: null
        };

        this.ship = null;
        this.invaders = [];
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
                x: this.state.screen.width/2,
                y: this.state.screen.height - 50
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

        const context = this.state.context;
        context.save();
        context.fillRect(0,0, this.state.width, this.state.height);
        context.globalAlpha = 1;

        context.clearRect(0,0, this.state.screen.width, this.state.screen.height) // clearing the screen


        if ( this.state.gameState === GameState.Playing ) {
            console.log('clearing this background')
            if( this.ship !== null ){
                this.ship.update(keys);
                this.ship.render(this.state);
            }
        }
        requestAnimationFrame(() => { this.update() }); // requestAnimationFrame is smoother than setInterval()
        // console.log('frame animation')
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
            <div className="SpaceInvaders">
                <canvas ref="canvas" width={width} height={height}/>
                { this.state.gameState === GameState.StartScreen && <Title /> } {/*  only render on initial state plz.. */}
            </div>
        )
    }
}

export default Space