
function MessageDisplay( { message} ) {
    const { gameOver, gameStart, gamePaused } = message;
    const gameStates  = [gameOver, gameStart, gamePaused];

    const currentState = gameStates.find(state => state.is );

    if (currentState) {
        return (
            <div className="messageDisplay">
                <h3 className='messageText' id={ gamePaused.is ? 'pause-text' : '' }>{ currentState.message }</h3>
                <p className="instructions">{ currentState.instruction }</p>
            </div>
        );
    }
}


export default MessageDisplay;