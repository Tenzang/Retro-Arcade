import React, { Component } from "react";
import GameObject from "./GameObject";
class Ship extends GameObject {
    constructor(args) {
        super({
            position: args.position,
            onDie: args.onDie,
            speed: 2.5, // velocity - pixels per render
            radius: 15
        })
    }

    // position of ship - adjust along x plane
    update(keys) {
        if (keys.right) {
            this.position.x += this.speed;
        } else if (keys.left) {
            this.position.x -= this.speed;
        }
    }

    // drawing ship through Canvas
    render(state) {


        
        // to keep ship within frame
        if (this.position.x > 600) {
            this.position.x = 0;
        } else if (this.position.x < 0 ) {
            this.position.x = 600;
        }

        const context = state.context;
        context.save();
        context.translate(this.position.x, this.position.y);
        context.strokeStyle = 'white';
        context.fillStyle = 'white';
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(0, -25);
        context.lineTo(15, 15);
        context.lineTo(5, 7);
        context.lineTo(-5, 7);
        context.lineTo(-15, 15);
        context.closePath();
        context.fill();
        context.stroke();
        context.restore();
    }
}

export default Ship;