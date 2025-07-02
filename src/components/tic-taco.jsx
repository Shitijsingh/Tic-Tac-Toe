import useTictacTeo from './hook/use-tic-taco';

function Tictaco() {
    const {
        board,
        handleClick,
        getStatusMessage,
        resetGame,
        winnerOfTen,
        gamesPlayed
    } = useTictacTeo();

    return (
        <div className='game'>
            <div className="status">
                {getStatusMessage()}
                <button className="reset" onClick={resetGame}>Reset Game</button>
            </div>
            <div className="board-ui">
                {
                    board.map((cell, index) => (
                        <button
                            className='cell'
                            key={index}
                            onClick={() => handleClick(index)}
                        >
                            {cell}
                        </button>
                    ))
                }
            </div>
            <div className="game-info">
                <p>Games Played: {gamesPlayed}</p>
                {winnerOfTen && <h3>{winnerOfTen}</h3>}
            </div>
        </div>
    );
}

export default Tictaco;
