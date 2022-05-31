import React, { Component } from 'react';
import _ from 'lodash';

const width = 600;
const height = 600;

class Pong extends Component {
    constructor() {
        super();

        this.state = {
            paddleInfo: {
                height: 80,
                width: 15
            },
            paddle1: {
                xPos: 10,
                yPos: height/2 - 45
            },
            paddle2: {
                xPos: width - 10 - 15,
                yPos: height/2 - 45
            },
            ball: {
                xPos: width/2,
                yPos: height/2,
                xVel: 3,
                yVel: 0,
                radius: 10
            },
            screen: {
                width: 600,
                height: 600
            },
            scores: {
                player1: 0,
                player2: 0
            }
            
        }

    }

    drawPaddles() {
        const { paddle1, paddle2, context, paddleInfo } = this.state;
        const { height, width } = paddleInfo;

        context.fillStyle = 'white';
        context.fillRect(paddle1.xPos, paddle1.yPos, width, height);
        context.fillRect(paddle2.xPos, paddle2.yPos, width, height);
    }
    
    updateBall() {
        let { xPos, yPos, xVel, yVel } = this.state.ball;
        
        xPos = xPos + xVel;
        yPos = yPos + yVel;
        this.setState({ ball: { ...this.state.ball, xPos, yPos} });
    }
    
    drawBall() {
        const { context, ball } = this.state;
        let { xPos, yPos, radius } = ball;

        context.lineWidth = 1;
        context.beginPath();
        context.arc(xPos, yPos, radius, 0, 2 * Math.PI);
        context.strokeStyle = 'white';
        context.fill();
        context.stroke();
    }

    drawField() {
        const { context, screen, scores } =  this.state;

        // background
        context.fillStyle = 'black';
        context.clearRect(0,0, screen.width, screen.height); // clearing the screen
        context.fillRect(0, 0, screen.width, screen.height);

        // scores
        context.font = "30px 'Press Start 2P'";
        context.fillStyle = "white";
        // player 1
        context.textAlign = "center";
        context.fillText(scores.player1, screen.width/2 - 100, 75);
        // player 2
        context.textAlign = "center";
        context.fillText(scores.player2, screen.width/2 + 100, 75);

        context.beginPath();
        context.moveTo(width/2, 0 + 20);
        context.lineTo(width/2, height - 20);
        context.setLineDash([15, 15]);
        context.lineWidth = 7;
        context.stroke();
    }

    resetBall(xVel) {
        const { screen, scores, ball } = this.state;
        let { xPos, yPos } = ball;

        // increase winners score by 1
        (xPos < screen.width/2) ? (scores.player1 += 1) : (scores.player2 += 1);

        xPos = screen.width/2;
        yPos = screen.height/2;

        console.log('state before reset', this.state);
        this.setState({ ball: { ...this.state.ball, xPos, yPos, xVel } });
    }

    checkForCollision() {
        const { paddle1, paddle2, paddleInfo, ball, screen, scores } = this.state;
        let { xVel } = ball;
        const { height, width } = paddleInfo;
        
        // collision with paddle1
        let xAligned = ball.xPos - ball.radius < paddle1.xPos + paddleInfo.width;

        let ballBottom = ball.yPos + ball.radius;
        let ballTop = ball.yPos - ball.radius;

        let paddleBottom = paddle1.yPos + paddleInfo.height;
        let paddleTop = paddle1.yPos;
        
        let padding = 10; // idek

        let yOverlap = ballBottom <= paddleBottom + padding && ballTop >= paddleTop - padding;

        if (xAligned && yOverlap) {
            let { xPos } = ball;
            xVel *= -1;
            xPos += xVel;

            this.setState({ ball: { ...ball, xPos, xVel } });
        }

        // collision with paddle2
        xAligned = ball.xPos + ball.radius > paddle2.xPos;

        ballBottom = ball.yPos + ball.radius;
        ballTop = ball.yPos - ball.radius;

        paddleBottom = paddle2.yPos + paddleInfo.height;
        paddleTop = paddle2.yPos;
        
        padding = 10; // idek

        yOverlap = ballBottom <= paddleBottom + padding && ballTop >= paddleTop - padding;


        if (xAligned && yOverlap) {
            let { xPos } = ball;
            console.log('collision with paddle2 detected!');
            xVel *= -1;
            xPos += xVel;

            this.setState({ ball: { ...ball, xPos, xVel } });
        }
        
        const outsideBoundary = ball.xPos < 0 || ball.xPos > screen.width;
        if (outsideBoundary) {
            console.log('outside bounds!');

            this.resetBall((xVel * -1));
        }

    }

    update() {
        this.drawField();
        
        this.drawPaddles();

        this.updateBall();
        this.drawBall();

        this.checkForCollision();

        requestAnimationFrame(() => { this.update() });
    }

    componentDidMount() {
        const { paddle1, paddle2, ball } = this.state;
        const context = this.refs.canvas.getContext("2d");
        // context.save();
        // background
        context.fillRect(0, 0, width, height);

        // paddles
        context.fillStyle = 'white';
        context.fillRect(paddle1.xPos, paddle1.yPos, 15, 80);
        context.fillRect(paddle2.xPos, paddle2.yPos, 15, 80);
        
        // ball
        context.beginPath();
        context.arc(ball.xPos, ball.yPos, ball.radius, 0, 2 * Math.PI);
        context.strokeStyle = 'white';
        context.fill();
        context.stroke();
        
        // divider
        context.beginPath();
        context.moveTo(width/2, 0 + 20);
        context.lineTo(width/2, height - 20);
        context.setLineDash([15, 15]);
        context.lineWidth = 7;
        context.stroke();

        this.setState({ context: context });

        requestAnimationFrame(() => { this.update() })

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    };

    handleKeyDown(event) {
        const { key } = event;
        const { paddle1, paddle2 } = this.state;

        switch (key) {
            case('ArrowDown'):
                this.setState(
                    { 
                        paddle2: { 
                            xPos: paddle2.xPos,
                            yPos: paddle2.yPos + 10
                        }                 
                    }
                );
                break;
            case('ArrowUp'):
                this.setState(
                    {
                        paddle2: {
                            xPos: paddle2.xPos,
                            yPos: paddle2.yPos - 10
                        }
                    }
                );
                break;
            case('s'):
                this.setState(
                    { 
                        paddle1: { 
                            xPos: paddle1.xPos,
                            yPos: paddle1.yPos + 10
                        }                 
                    }
                );
                break;
            case('w'):
                this.setState(
                    {
                        paddle1: {
                            xPos: paddle1.xPos,
                            yPos: paddle1.yPos - 10
                        }
                    }
                );
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <div id="pong">
                <h2 className='gameTitle'>PONG</h2>

                <canvas ref="canvas" id="pong" width={ width } height={ height } />
            </div>
        )
    }
}

export default Pong;
