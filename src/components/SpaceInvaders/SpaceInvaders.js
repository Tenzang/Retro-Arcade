import React, { Component } from "react";
import Title from "./Title";
import Ship from './Ship'
import './Space.scss'
import Enemy from './Enemy'
import { checkCollisionsWith } from "./Helper";
import GameOverScreen from "./GameOverScreen";


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
            score: 0,
            gameState: GameState.StartScreen,
            context: null
        };

        this.ship = null;
        this.enemies = [];
    }

    // setting direction to true or false
    handleKeys(value, e) {
        let keys = this.pressedKeys;
        const { key } = e;
        console.log('key pressed', key)
        switch(key) {
            case 'ArrowLeft':
                keys.left = value;
                break;
            case 'ArrowRight':
                keys.right = value;
                break;
            case ' ':
                keys.space = value;
                break;
            case 'Enter':
                keys.enter = value;
                break;
            default:
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
            onDie: this.die.bind(this),
            radius: 15,
            speed: 2.5,
            position: {
                x: this.state.screen.width/2,
                y: this.state.screen.height - 50
            }})

        this.ship = ship;
        this.enemies = []
        this.createEnemy(24); // how many enemy ships do you want
        this.setState({ 
            gameState: GameState.Playing,
            score: 0
        });
    }


    // game loop --> run continuously --> for reacting to user input continuously.
    update() {
        const keys = this.pressedKeys;

        if ( this.state.gameState === GameState.StartScreen && keys.enter ) {
            this.start();
        }

        if ( this.state.gameState === GameState.GameOver && keys.enter ) {
            this.setState({ gameState: GameState.StartScreen })
        }

        const context = this.state.context;
        context.save();
        context.globalAlpha = 1;

        context.clearRect(0,0, this.state.screen.width, this.state.screen.height) // clearing the screen


        if ( this.state.gameState === GameState.Playing ) {
            if( this.ship !== null ){
                this.ship.update(keys);
                this.ship.render(this.state);
                this.renderEnemy(this.state);


                // check your bullets vs enemy
                checkCollisionsWith(this.ship.bullets, this.enemies);

                // check player vs invaders
                checkCollisionsWith([this.ship], this.enemies);
                for (let i = 0; i < this.enemies.length; i++) {
                    checkCollisionsWith(this.enemies[i].bullets, [this.ship]); // check enemy bullets vs player
                }
            }


            if (this.enemies.length === 0) {
                this.createEnemy(24)
                //this.setState({ gameState: GameState.GameOver });
              }
        }




        requestAnimationFrame(() => { this.update() }); // requestAnimationFrame is smoother than setInterval()
    }

    increaseScore(val) {
        this.setState({ score: this.state.score + 200 })
    }


    die() {
        return new Promise(() => {
            this.setState({ gameState: GameState.GameOver });
            console.log('set game over', Date.now())
            this.ship = null;
            this.invaders = [];
        })
    }

    // create enemy and place on the right of previous, otherwise new row
    createEnemy(count) {
        const newPosition = { x: 100, y: 20};
        let swapStartX = true;

        for (let i = 0; i < count; i++ ) {
            const enemy = new Enemy({
                position: {x: newPosition.x, y: newPosition.y},
                speed: 1,
                radius: 40, 
                onDie: this.increaseScore.bind(this, false)
            });

            newPosition.x += enemy.radius + 15;

            if (newPosition.x + enemy.radius + 40 >= this.state.screen.width) {
                newPosition.x = swapStartX ? 110 : 100;
                swapStartX = !swapStartX;
                newPosition.y += enemy.radius + 15;
            }

            this.enemies.push(enemy);
        }
    }

    renderEnemy(state) {
        let index = 0;
        let reverse = false;

        for (let enemy of this.enemies) {
            if (enemy.delete) {
                this.enemies.splice(index, 1)
            } else if (enemy.position.x + enemy.radius >= this.state.screen.width || enemy.position.x - enemy.radius <= 0) {
                reverse = true;
            } else {
                this.enemies[index].update();
                this.enemies[index].render(state);
            }
            index++;
        }

        if (reverse) {
            this.reverseEnemies();
        }
    }

    // when enemy reaches boundary, go the opposite direction and move closer
    reverseEnemies() {
        let index = 0;
        for (let enemy of this.enemies) {
            this.enemies[index].reverse();
            this.enemies[index].position.y += 20;
            index++;
            console.log(enemy)
        }
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

    handleClick = (e) => {
        e.preventDefault();
        if (e.type === "mousedown") {
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
        } else {
            document.dispatchEvent(new KeyboardEvent('keyup', {'key': 'Enter'}));
        }
    }

    render() {
        return (
            <div className="SpaceInvaders">
                <canvas ref="canvas" width={width} height={height}/>
                { this.state.gameState === GameState.StartScreen && <Title /> } {/*  only render on initial state plz.. */}
                { this.state.gameState === GameState.GameOver && <GameOverScreen score={ this.state.score } />}
                <h2>Score: { this.state.score } </h2>
                <button className="reset button-85" onMouseDown={(e) => this.handleClick(e) } onMouseUp={(e) => this.handleClick(e) }>Start</button>
            </div>
        )
    }
}

export default Space