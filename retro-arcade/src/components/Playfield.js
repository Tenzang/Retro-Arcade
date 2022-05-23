import React, { useEffect, useState } from 'react';
import './styles/tetris.css'

function Playfield(props) {
    // create grid (10 x 20)
    const grid = [];
    for (let y = 0; y < 20; y++) {
        const row = []
        for (let x = 0; x < 10; x++) {
            row.push(false);
        }
        grid.push(row);
    }

    // set hooks
    const [board, setBoard] = useState(grid);
    
    
    const activePiece = [{ xPos: 0, yPos: 3}, { xPos: 0, yPos: 4}, {xPos: 0, yPos: 5}, { xPos: 0, yPos: 6}];
    
    const progressPiece = () => {
        console.log("grid before update:", grid);
        activePiece.forEach(cell => {
            console.log(cell);
            grid[cell.xPos][cell.yPos] = false;
            cell.xPos++
            grid[cell.xPos][cell.yPos] = true;
            console.log(cell);
        });
        
        setBoard(grid);
        
        console.log(activePiece);
        
        console.log("grid after update:", grid);
        // setTimeout(progressPiece, 1000);
        debugger;
    };
    
    useEffect(() => {
        progressPiece()
    }, []);

 return (
    <div className='grid'>
        { board.map( (row, y) => {
            return(
                row.map((cell, x) => {
                    return (<div className='cell' key={String(x)+ String(y)}>{cell ? 'X' : null}</div>);
                })
            );
        }) }
    </div>
 );
}

export default Playfield;
