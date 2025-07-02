import { useState, useEffect } from "react";
import WinnerSound from "../../../public/assets/winnig.mp3";
import DrawSound from "../../../public/assets/game.mp3";

const initialBoard = () => Array(9).fill(null);

const useTictacTeo = () => {
    const [board, setBoard] = useState(initialBoard());
    const [isXNext, setIsXNext] = useState(true);
    const [xWins, setXWins] = useState(0);
    const [oWins, setOWins] = useState(0);
    const [gamesPlayed, setGamesPlayed] = useState(0);
    const [winnerOfTen, setWinnerOfTen] = useState("");

    const WINNING_PATTERNS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const playSound = (url) => {
        const audio = new Audio(url);
        audio.play();
    };

    const calculateWinner = (currentBoard = board) => {
        for (let pattern of WINNING_PATTERNS) {
            const [a, b, c] = pattern;
            if (
                currentBoard[a] &&
                currentBoard[a] === currentBoard[b] &&
                currentBoard[a] === currentBoard[c]
            ) {
                return currentBoard[a];
            }
        }
        return null;
    };

    const handleClick = (index) => {
        if (board[index] !== null || calculateWinner()) return;

        const newBoard = [...board];
        newBoard[index] = isXNext ? "X" : "O";
        setBoard(newBoard);
        setIsXNext(!isXNext);

        const winner = calculateWinner(newBoard);
        if (winner) {
            playSound(WinnerSound); // ✅ Play win sound only when someone wins
            if (winner === "X") {
                setXWins((prev) => prev + 1);
            } else {
                setOWins((prev) => prev + 1);
            }
        } else if (newBoard.every((cell) => cell !== null)) {
            // ✅ Play draw sound only when board is full and no winner
            playSound(DrawSound);
        }
    };

    const getStatusMessage = () => {
        const winner = calculateWinner();
        if (winner) return `🎉 Winner: ${winner}`;
        if (board.every((cell) => cell !== null)) return "It's a Draw!";
        return `Player ${isXNext ? "X" : "O"} Turn`;
    };

    const resetGame = () => {
        const winner = calculateWinner();
        const isDraw = !winner && board.every((cell) => cell !== null);

        if (winner) {
            if (winner === "X") setXWins((prev) => prev + 1);
            if (winner === "O") setOWins((prev) => prev + 1);
        }

        setGamesPlayed((prev) => prev + 1);

        // Check after every 10 games
        if ((gamesPlayed + 1) % 10 === 0) {
            if (xWins > oWins) {
                setWinnerOfTen("🏆 Winner of 10 Games: Player X");
            } else if (oWins > xWins) {
                setWinnerOfTen("🏆 Winner of 10 Games: Player O");
            } else {
                setWinnerOfTen("🏆 It's a Tie in 10 Games!");
            }
            // Reset win counts after 10 games
            setXWins(0);
            setOWins(0);
        } else {
            setWinnerOfTen("");
        }

        setBoard(initialBoard());
        setIsXNext(true);
    };

    return {
        board,
        handleClick,
        getStatusMessage,
        resetGame,
        isXNext,
        gamesPlayed,
        winnerOfTen,
    };
};

export default useTictacTeo;
