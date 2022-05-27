import Tetris from './components/tetris/Tetris';
import SnakeBoard from './components/snake/SnakeBoard';
import MyGame from './components/phaser/MyGame'
import './App.css';
import React, {Component} from 'react'

// function App() {
//   return (
//     <div className="App">
//         {/* <Tetris /> */}
//         <SnakeBoard />
//         <div>
//             <h1>Hello</h1>
//         </div>
//         <div id="phaser">
//         </div>
//     </div>
//   );
// }

// export default App;

export default class App extends Component {
    render() {
     return (
      <div style={{ textAlign: "center" }}>
       <h1>Arcade Games</h1>
       <Tetris />
      </div>
     );
    }
   }