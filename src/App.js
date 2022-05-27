import Tetris from './components/tetris/Tetris';
import SnakeBoard from './components/snake/SnakeBoard';
// import MyGame from './components/phaser/MyGame'
import './App.css';
import React, {Component} from 'react'

export default class App extends Component {
    render() {
     return (
      <div style={{ textAlign: "center" }}>
       <h1>Arcade Games</h1>
       <Tetris />
       {/* <SnakeBoard /> */}
      </div>
     );
    }
   }