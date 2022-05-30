
import GameObject from "./GameObject";
import Bullet from './Bullet'
class Ship extends GameObject {
    constructor(args) {
        super({
            position: args.position,
            onDie: args.onDie,
            speed: 2.5, // velocity - pixels per render
            radius: 15
        });
        this.bullets = [];
        this.lastShot = 0; // controls the number of shots fired in a given time period
    }

    // position of ship - adjust along x plane
    update(keys) {
        if (keys.right) {
            this.position.x += this.speed;
        } else if (keys.left) {
            this.position.x -= this.speed;
        }

        if (keys.space && Date.now() - this.lastShot > 200) { // check when "space" is pressed and at least 200ms have passed since last shot fired. 
            const bullet = new Bullet({
                position: { // bullet shoots up from ships position
                    x: this.position.x,
                    y: this.position.y - 5
                },
                direction: "up"
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

    // drawing ship through Canvas
    render(state) {
        
        // to keep ship within frame
        if (this.position.x > 600) {
            this.position.x = 0;
        } else if (this.position.x < 0 ) {
            this.position.x = 600;
        }

        this.renderBullets(state)

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