import React, { Component, useEffect, useState } from 'react';
import './styles/tetris.css'

class Playfield extends Component {
    constructor() {
        super();
        
        // create grid (10 x 20)
        const grid = [];
        for (let y = 0; y < 20; y++) {
            const row = []
            for (let x = 0; x < 10; x++) {
                row.push(false);
            }
            grid.push(row);
        }

        this.state = {
            grid: grid,
            activePiece: [{ xPos: 0, yPos: 3}, { xPos: 0, yPos: 4}, {xPos: 0, yPos: 5}, { xPos: 0, yPos: 6}]
        }
        
        // moves the piece down by one
        this.progressPiece = () => {
            const { grid, activePiece } = this.state;

            console.log("grid before update:", grid);
            
            activePiece.forEach(cell => {
                console.log(cell);
                grid[cell.xPos][cell.yPos] = false;
                cell.xPos++
                grid[cell.xPos][cell.yPos] = true;
                console.log(cell);
            });

            this.setState({grid: grid, activePiece: activePiece});
            
            console.log("grid after update:", grid);
            setTimeout(this.progressPiece, 1000);
            // debugger;
        };
    }

    componentDidMount() {
        this.progressPiece()
    }
    render() {
        return (
           <div className='grid'>
               { this.state.grid.map( (row, y) => {
                   return(
                       row.map((cell, x) => {
                           return (<div className='cell' key={String(x)+ String(y)}>{cell ? 'X' : null}</div>);
                       })
                   );
               }) }
           </div>
        );
    }
}

export default Playfield;
