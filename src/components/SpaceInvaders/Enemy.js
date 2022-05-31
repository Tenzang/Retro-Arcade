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
        this.bullets=[];
        this.lastShot = 0;
        this.shootDelay = Date.now();
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

        let nextShot = Math.random() * 6 * 200000 // such a high number because there are so any enemy ships and they will fire too many bullets otherwise

        let now = Date.now();
        if (now - this.shootDelay > nextShot && this.bullets.length <= 2 && now - this.lastShot > nextShot) { // don't fire unless the delay is greater than next shot & no more than 2 bullets fired
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