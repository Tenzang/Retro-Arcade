
function MessageDisplay( { message} ) {
    const { gameOver, gameStart } = message;

    if (gameOver.is) {
        return (
            <div className="messageDisplay">
                <h3 className="messageText">{gameOver.message}</h3>
                <p className="instructions">{gameOver.instruction}</p>
            </div>
        )
    } else if (gameStart.is) {
        return (
            <div className="messageDisplay">
                <h3 className="messageText">{gameStart.message}</h3>
                <p className="instructions">{gameStart.instruction}</p>
            </div>
        )
    }

}


export default MessageDisplay;