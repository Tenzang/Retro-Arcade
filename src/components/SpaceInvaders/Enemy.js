import GameObject from "./GameObject";


export const Direction = {
    Left: 0,
    Right: 1,
};


class Enemy extends GameObject {
    constructor(args) {
        super({
            position: args.position, 
            onDie: args.onDie,
            speed: 1,
            radius: 50
        });
        this.direction = Direction.Right;
    }

    reverse() {
        if (this.direction === Direction.Right) {
            this.position.x -= 10; 
            this.direction = Direction.Left;
        } else {
            this.direction = Direction.Right;
            this.position.x += 10;
        }
    }

    update() {
        if ( this.direction === Direction.Right) {
            this.position.x += this.speed;
        } else {
            this.position.x -= this.speed;
        }
    }

    render(state) {
        const context = state.context;
        context.save();
        context.translate(this.position.x, this.position.y)

        this.image = new Image();
        this.image.src = 'assets/enemy.png';
        context.drawImage(this.image, 0,0)

        // context.strokeStyle = '#F00';
	    // context.fillStyle = '#F00';
	    // context.lineWidth = 2;
	    // context.beginPath();
	    // context.moveTo(-5, 25);
		// context.arc(0, 25, 5, 0, Math.PI);
	    // context.lineTo(5, 25);
	    // context.lineTo(5, 0);
	    // context.lineTo(15, 0);
	    // context.lineTo(15, -15);
	    // context.lineTo(-15, -15);
	    // context.lineTo(-15, 0);
	    // context.lineTo(-5, 0);
	    // context.closePath();
	    // context.fill();
	    // context.stroke();
	    // context.restore();
    }
}

export default Enemy;