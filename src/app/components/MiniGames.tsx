import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Trophy } from 'lucide-react';
import { Button } from './ui/button';
import { TicTacToe } from './games/TicTacToe';
import { WordGuess } from './games/WordGuess';

interface MiniGamesProps {
  onClose: () => void;
}

type GameType = 'tictactoe' | 'wordguess' | null;

export function MiniGames({ onClose }: MiniGamesProps) {
  const [selectedGame, setSelectedGame] = useState<GameType>(null);
  const [score, setScore] = useState({ you: 0, stranger: 0 });

  if (selectedGame === 'tictactoe') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gradient-to-br from-purple-900 to-blue-900 rounded-2xl p-6 max-w-md w-full border border-white/20"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white text-xl">Tic-Tac-Toe</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedGame(null)}
              className="text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <TicTacToe onWin={(winner) => {
            if (winner === 'you') setScore(prev => ({ ...prev, you: prev.you + 1 }));
            else if (winner === 'stranger') setScore(prev => ({ ...prev, stranger: prev.stranger + 1 }));
          }} />
        </motion.div>
      </motion.div>
    );
  }

  if (selectedGame === 'wordguess') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gradient-to-br from-purple-900 to-blue-900 rounded-2xl p-6 max-w-md w-full border border-white/20"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white text-xl">Word Guess</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedGame(null)}
              className="text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <WordGuess />
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-white text-xl flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-400" />
            Mini Games
          </h3>
          <p className="text-sm text-gray-400 mt-1">Play while you chat!</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-white hover:bg-white/20"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Score Display */}
      <div className="bg-white/10 rounded-xl p-4 mb-6">
        <div className="flex justify-between text-white">
          <div className="text-center">
            <div className="text-3xl">{score.you}</div>
            <div className="text-sm text-gray-400">You</div>
          </div>
          <div className="text-3xl text-gray-500">VS</div>
          <div className="text-center">
            <div className="text-3xl">{score.stranger}</div>
            <div className="text-sm text-gray-400">Stranger</div>
          </div>
        </div>
      </div>

      {/* Game Selection */}
      <div className="grid grid-cols-2 gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedGame('tictactoe')}
          className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-6 text-white hover:from-purple-600 hover:to-pink-600 transition-all"
        >
          <div className="text-4xl mb-2">⭕❌</div>
          <div>Tic-Tac-Toe</div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedGame('wordguess')}
          className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-6 text-white hover:from-blue-600 hover:to-cyan-600 transition-all"
        >
          <div className="text-4xl mb-2">🔤</div>
          <div>Word Guess</div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-br from-green-500 to-teal-500 rounded-xl p-6 text-white hover:from-green-600 hover:to-teal-600 transition-all opacity-50 cursor-not-allowed"
        >
          <div className="text-4xl mb-2">✏️</div>
          <div>Quick Draw</div>
          <div className="text-xs mt-1">Coming Soon</div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-6 text-white hover:from-orange-600 hover:to-red-600 transition-all opacity-50 cursor-not-allowed"
        >
          <div className="text-4xl mb-2">❓</div>
          <div>20 Questions</div>
          <div className="text-xs mt-1">Coming Soon</div>
        </motion.button>
      </div>
    </motion.div>
  );
}
