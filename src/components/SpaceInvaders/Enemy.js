import GameObject from "./GameObject";
import Bullet from "./Bullet";
// import enemy from './assets/enemy.png'

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
            radius: 40
        });
        this.direction = Direction.Right;
        this.bullets=[]
        this.lastShot = 0;
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

        let nextShot = Math.random() * 6 * 1000000 
        if (Date.now() - this.lastShot > 200 * nextShot) { // check when "space" is pressed and at least 200ms have passed since last shot fired.
            const bullet = new Bullet({
                position: {  // bullet shoots up from enemy's position
                    x: this.position.x, 
                    y: this.position.y - 5
                },
                direction: "down"
            });

            this.bullets.push(bullet);
            this.lastShot = Date.now();
        }
    }

    renderBullets(state) {
        let index = 0;
        for (let bullet of this.bullets) {
            if ( bullet.delete ) {
                this.bullets.splice(index, 1);
            } else {
                this.bullets[index].update();
                this.bullets[index].render(state);
            }
            index++;
        }
    }

    render(state) {
	    if(this.position.y > state.screen.height || this.position.y < 0) { // when the enemy reaches end of screen - disappear
	    	this.die();
	    }
        this.renderBullets(state)

        const context = state.context;
        context.save();
        context.translate(this.position.x, this.position.y)


        // this.image = new Image();
        // this.image.src = enemy;

        // context.drawImage(this.image, this.position.x, this.position.y, 30, 20)

        context.strokeStyle = 'blue';
	    context.fillStyle = 'blue';
	    context.lineWidth = 2;
	    context.beginPath();
	    context.moveTo(-5, 20);
	    context.lineTo(5, 20);
	    context.lineTo(5, 0);
	    context.lineTo(15, 0);
	    context.lineTo(15, -15);
	    context.lineTo(-15, -15);
	    context.lineTo(-15, 0);
	    context.lineTo(-5, 0);
	    context.closePath();
	    context.fill();
	    context.stroke();
	    context.restore();
    }
}

export default Enemy;