function PieceDisplay( props ) {
    const displayGrid = Array(4);
    for (let i = 0; i < 4; i++) {
        displayGrid[i] = Array(4).fill(false);
    }

    let nextPiece = props.nextPiece;
    if (nextPiece) {
        let xOffset = nextPiece[0].x - 1;
        let yOffset = nextPiece[0].y - 1;

        nextPiece.forEach(cell => {
            cell.x = cell.x - xOffset;
            cell.y = cell.y - yOffset;
        })


        nextPiece.forEach(cell => {
            displayGrid[cell.y][cell.x] = true;
        });
    }

    return (
        <div className="previewPiece">
            <div className="grid display">
                {displayGrid.map((row, y) => {
                    return(row.map((cell, x) => {
                        return (
                            <div
                                className={`cell ${ cell ? 'occupied' : 'empty' }`}
                                key={String(x)+ String(y)}
                            >
                                <div className="shading">
                                </div>
                            </div>
                        )
                    }))
                })}
            </div>
        </div>
    );
}

export default PieceDisplay;