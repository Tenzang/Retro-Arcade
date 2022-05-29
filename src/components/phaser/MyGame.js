import Phaser, { Scene } from 'phaser';
// import React, { Component } from 'react'
//import { ReactDOM } from 'react';
// import { SwiperSlide } from 'swiper/react';
// import logoImg from './assets/logo.png';
// import App from '../../App'

class MyGame extends Scene {
    constructor ()
    {
        super();
        this.player = 0;
        this.cursors = 0;
  
    }
    


    preload ()
    {
        this.load.image('sky', 'http://labs.phaser.io/assets/skies/sky4.png');
        this.load.image('ground', 'https://phaser.io/content/tutorials/coding-tips-003/platform.png');
        // this.load.image('star', 'https://www.kindpng.com/picc/m/205-2059841_star-cartoon-cute-star-png-transparent-png.png');
        // this.load.image('bomb', 'https://www.freeiconspng.com/uploads/bomb-cartoon-png-clipart-13.png');
        this.load.spritesheet('dude', 'https://phaser.io/content/tutorials/making-your-first-phaser-3-game/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );

    }
      
    create ()
    {
        this.add.image(400, 300, 'sky');
        const platforms = this.physics.add.staticGroup();
        platforms.create(400, 575, 'ground').setScale(0.5).refreshBody();
        platforms.create(300, 575, 'ground').setScale(0.5).refreshBody();
        platforms.create(200, 575, 'ground').setScale(0.5).refreshBody();
        platforms.create(100, 575, 'ground').setScale(0.5).refreshBody();
        platforms.create(500, 575, 'ground').setScale(0.5).refreshBody();
        platforms.create(600, 575, 'ground').setScale(0.5).refreshBody();
        platforms.create(700, 575, 'ground').setScale(0.5).refreshBody();

        platforms.create(700, 400, 'ground').setScale(0.5).refreshBody();
        platforms.create(600, 400, 'ground').setScale(0.5).refreshBody();

        platforms.create(100, 300, 'ground').setScale(0.5).refreshBody();
        platforms.create(200, 300, 'ground').setScale(0.5).refreshBody();

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
    parent: 'phaser',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: false
        }
    },
    scene: MyGame,
    // dom: {
    //     createContainer: true
    // }
    
};



const game = <div id="phaser"> {new Phaser.Game(config)} </div>

// ReactDOM.render(<SwiperSlide />, document.getElementById("phaser"));

export default MyGame