import Phaser, { Scene } from 'phaser';

import sky from './assets/sky.png';
import star from './assets/star.png';
import ground from './assets/ground.png';
import bomb from './assets/bomb.png';
import dude from './assets/dude.png';

class MyGame extends Scene
{
    constructor ()
    {
        super();

        this.player;
        this.cursors;
        this.score = 0;
        this.scoreText;
    }

    preload ()
    {
        this.load.image('sky', sky);
        this.load.image('ground', ground);
        this.load.image('star', star);
        this.load.image('bomb', bomb);
        this.load.spritesheet('dude', 
        dude,
        { frameWidth: 32, frameHeight: 48 }
        );
    }
    
    create ()
    {
        this.add.image(400, 300, 'sky');

        const platforms = this.physics.add.staticGroup();

        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');

        this.player = this.physics.add.sprite(100, 450, 'dude');

        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });
        
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.physics.add.collider(this.player, platforms);

        this.cursors = this.input.keyboard.createCursorKeys();

        const stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });
        
        stars.children.iterate(function (child) {

            child.setBounceY(Phaser.Math.FloatBetween(0.4,0.8));

        });

        this.physics.add.collider(stars, platforms);
        
        this.physics.add.overlap(this.player, stars, collectStar, null, this);

        function collectStar (player, star)
        {
            star.disableBody (true, true);

            this.score += 10;
            this.scoreText.setText('Score: ' + this.score);

            if (stars.countActive(true) === 0)
            {
                stars.children.iterate(function (child) {
        
                    child.enableBody(true, child.x, 0, true, true);
        
                });
        
                const x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        
                const bomb = bombs.create(x, 16, 'bomb');
                bomb.setBounce(1);
                bomb.setCollideWorldBounds(true);
                bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        
            }
        
        }

        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        const bombs = this.physics.add.group();

        this.physics.add.collider(bombs, platforms);
        
        this.physics.add.collider(this.player, bombs, hitBomb, null, this);
        
        function hitBomb (player, bomb)
        {
            this.physics.pause();
        
            player.setTint(0xff0000);
        
            player.anims.play('turn');
        
        }        
        
    }

    update () 
    {

        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-160);
        
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(160);
        
            this.player.anims.play('right', true);
        }
        else
        {
            this.player.setVelocityX(0);
        
            this.player.anims.play('turn');
        }
        
        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-340);
        }        
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: MyGame
};

const game = new Phaser.Game(config);
