function PieceDisplay( props ) {
    let nextPiece = props.nextPiece;
    if (!nextPiece) return <div>loading...</div>;
    let xOffset = nextPiece[0].x - 1;
    let yOffset = nextPiece[0].y - 1;

    nextPiece.forEach(cell => {
        cell.x = cell.x - xOffset;
        cell.y = cell.y - yOffset;
    })

    const displayGrid = Array(4);
    for (let i = 0; i < 4; i++) {
        displayGrid[i] = Array(4).fill(false);
    }

    nextPiece.forEach(cell => {
        displayGrid[cell.y][cell.x] = true;
    });

    return (
        <div className="grid display">
            {nextPiece ? displayGrid.map((row, y) => {
                return(row.map((cell, x) => {
                    return (
                        <div
                            className={`cell ${ cell ? 'occupied' : 'empty' }`}
                            key={String(x)+ String(y)}
                        ></div>
                    )
                }))
            }) : "loading..."}
        </div>
    );
}

export default PieceDisplay;