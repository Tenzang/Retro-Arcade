import GameObject from "./GameObject";

class Bullet extends GameObject {
    constructor(args) {
        super({
            position: args.position,
            speed: 5,
            radius: 5
        })

        this.direction = args.direction;
    }

    update() {
        if (this.direction === "up" ) {
            this.position.y -= this.speed; // when enemy shoots
        } else {
            this.position.y += this.speed; // when player shoots
        }
    }
 
    render(state) {
        if (this.position.y > state.screen.height || this.position.y < 0) {
            this.die(); // delete when it gets to end of screen
        }

        const context = state.context;
	    context.save();
	    context.translate(this.position.x, this.position.y);
	    context.fillStyle = 'yellow';
	    context.lineWidth = 1;
	    context.beginPath();
	    context.arc(0, 0, 2, 0, 2 * Math.PI);
	    context.closePath();
	    context.fill();
	    context.restore();

    }

}

export default Bullet;