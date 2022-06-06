# Retro Arcade

Retro Arcade is a web game application created by Loden and Kristabel for our fourth and final project for General Assembly. We chose a fun final project that could show off our skills in React.

<br> 
Deployed at: https://retro-arcade.netlify.app/

------------------
## Games
* Tetris
* Snake
* Space Invaders
* Pong

## Tech Stack
* React
* Canvas
* SCSS
* Netlify (Deployment)

-----------

## Features
* Controls - two types:
    * Keyboard input 
    * On-screen buttons
* Optimised for mobile and desktop
* Video background / Static image if video not supported
* Tetris: 
    * Created in React
    * Start/Pause
    * Rotate
    * Increasing levels of difficulty through speed
    * Shows game over screen
* Snake: 
    * Created in React
    * Start/Pause
    * Restart
    * Increasing levels of difficulty through speed
    * Shows game over screen
    * Snake body wraps game board area
* Space Invaders:
    * Created in Canvas
    * Start
    * Shoot
    * Ship wraps canvas area
* Pong:
    * Created in Canvas
    * Two player
    * Ball dispenses on winning side

------

## Next Steps
* Adding levels to Space Invaders
* Adding additional set of buttons for second player in Pong
* Adding instructions
* Music

<br>

## Bugs
* Tetris - tetromino sometimes leaves a random block from a previous position it occupied. We have been unable to consistently recreate the bug, but have found slower machines to encounter the bug more frequently.
* Snake - lag in changing the direction of the snake. 
* FOUC 

-----

## Findings
You may be wondering why we haven't chosen Phaser as our game development framework. At the start of this project, we research and tried building games with Phaser, which is why you can see it in our dependencies. We spent two whole days attempting to make it work in React but the framework interacts directly with the DOM rather than through React. 
We looked at wrappers for the framework, but they were not supported on React version 18 and above. 



--------
## Screenshot
![screenshot](/public/retro-arcade.png)
![screenshot-phone](/public/retro-arcade-phone.png)
