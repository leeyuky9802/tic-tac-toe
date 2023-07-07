import {useState} from "react";

export default function Game(){
    const [boardStatusHistory, setBoardHistory] = useState([{
        squares:Array(9).fill(null),
        nextPlayer:'X',
        ifEnded:false,
    }]);

    const currentBoardStatus = boardStatusHistory[boardStatusHistory.length - 1];

    function registerNewBoardStatus(newBoardStatus){
        let nextBoardStatusHistory = boardStatusHistory.slice();
        nextBoardStatusHistory.push(newBoardStatus);
        setBoardHistory(nextBoardStatusHistory);
    }

    function jumpTo(index){
        setBoardHistory(boardStatusHistory.slice(0, index+1));
    }

    let moves = boardStatusHistory.map((boardStatus, index) =>{
        let description;
        if (index > 0) {
            description = 'Go to move #' + index;
        } else {
            description = 'Go to game start';
        }
        return (
            <li key={index}>
                <button onClick={() => jumpTo(index)}>{description}</button>
            </li>
        )
    })


    return (
        <div className="game">
            <div className="game-board">
                <Board currentBoard={currentBoardStatus} registerNewBoard={registerNewBoardStatus}  />
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

function Board ({currentBoard, registerNewBoard})
{
    let squares = currentBoard.squares;
    let nextPlayer = currentBoard.nextPlayer;
    let ifEnded = currentBoard.ifEnded;

    let status = calculateWin() ? calculateWin() : "Gaming";

    function handleClick(index){
        if (!squares[index] && !ifEnded){
            const nextSquares = squares.slice();
            nextSquares[index] = nextPlayer;
            squares = nextSquares;

            let newBoardStatus = {
                squares:nextSquares,
                nextPlayer:nextPlayer==='X'? 'O':'X',
                ifEnded:!!calculateWin(),
            }

            registerNewBoard(newBoardStatus);
        }
    }

    function calculateWin(){
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < 8; i++){
            const [a, b, c] = winConditions[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a] + " Won";
            }
        }
        return null;
    }

    return (
        <>
            <div>{status}</div>
            <div className="board-row">
                <Square value={squares[0]} handleClick={() => handleClick(0)}></Square>
                <Square value={squares[1]} handleClick={() => handleClick(1)}></Square>
                <Square value={squares[2]} handleClick={() => handleClick(2)}></Square>
            </div>
            <div className="board-row">
                <Square value={squares[3]} handleClick={() => handleClick(3)}></Square>
                <Square value={squares[4]} handleClick={() => handleClick(4)}></Square>
                <Square value={squares[5]} handleClick={() => handleClick(5)}></Square>
            </div>
            <div className="board-row">
                <Square value={squares[6]} handleClick={() => handleClick(6)}></Square>
                <Square value={squares[7]} handleClick={() => handleClick(7)}></Square>
                <Square value={squares[8]} handleClick={() => handleClick(8)}></Square>
            </div>
        </>
    );
}

function Square ({value, handleClick}){
    return (
        <button className="square" onClick={handleClick}>{value}</button>
    );
}