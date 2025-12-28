import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { RotateCcw } from 'lucide-react';

type Player = 'X' | 'O' | null;
type Board = Player[];

interface TicTacToeProps {
  onWin: (winner: 'you' | 'stranger' | 'draw') => void;
}

export function TicTacToe({ onWin }: TicTacToeProps) {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<Player | 'Draw' | null>(null);

  const calculateWinner = (squares: Board): Player => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6], // Diagonals
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  useEffect(() => {
    const gameWinner = calculateWinner(board);
    if (gameWinner) {
      setWinner(gameWinner);
      onWin(gameWinner === 'X' ? 'you' : 'stranger');
    } else if (board.every(cell => cell !== null)) {
      setWinner('Draw');
      onWin('draw');
    }
  }, [board, onWin]);

  // AI move (simple random strategy)
  useEffect(() => {
    if (!isXNext && !winner) {
      const timer = setTimeout(() => {
        const emptyIndices = board
          .map((cell, index) => (cell === null ? index : null))
          .filter(index => index !== null) as number[];

        if (emptyIndices.length > 0) {
          const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
          handleClick(randomIndex);
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isXNext, winner, board]);

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const renderCell = (index: number) => {
    const value = board[index];
    return (
      <motion.button
        whileHover={{ scale: winner ? 1 : 1.05 }}
        whileTap={{ scale: winner ? 1 : 0.95 }}
        onClick={() => handleClick(index)}
        className={`aspect-square bg-white/10 rounded-xl flex items-center justify-center text-4xl ${
          winner ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-white/20'
        } transition-colors`}
        disabled={!!winner || !!value || !isXNext}
      >
        {value === 'X' && <span className="text-purple-400">X</span>}
        {value === 'O' && <span className="text-pink-400">O</span>}
      </motion.button>
    );
  };

  return (
    <div className="space-y-4">
      {/* Status */}
      <div className="text-center text-white">
        {winner ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-2xl"
          >
            {winner === 'X' && '🎉 You Won!'}
            {winner === 'O' && '😔 Stranger Won!'}
            {winner === 'Draw' && '🤝 It\'s a Draw!'}
          </motion.div>
        ) : (
          <div className="text-lg">
            {isXNext ? 'Your turn (X)' : 'Stranger\'s turn (O)'}
          </div>
        )}
      </div>

      {/* Board */}
      <div className="grid grid-cols-3 gap-3">
        {Array(9).fill(null).map((_, index) => (
          <div key={index}>{renderCell(index)}</div>
        ))}
      </div>

      {/* Reset Button */}
      {winner && (
        <Button
          onClick={resetGame}
          className="w-full bg-purple-500 hover:bg-purple-600"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Play Again
        </Button>
      )}
    </div>
  );
}
