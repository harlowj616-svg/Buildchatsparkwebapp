import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { RotateCcw, Check, X } from 'lucide-react';

const words = [
  { word: 'REACT', hint: 'Popular JavaScript library' },
  { word: 'COFFEE', hint: 'Morning beverage' },
  { word: 'GUITAR', hint: 'Musical instrument' },
  { word: 'PYTHON', hint: 'Programming language' },
  { word: 'SUNSET', hint: 'Beautiful evening view' },
  { word: 'OCEAN', hint: 'Large body of water' },
];

export function WordGuess() {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [inputLetter, setInputLetter] = useState('');
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const maxWrongGuesses = 6;

  useEffect(() => {
    const uniqueLetters = new Set(currentWord.word.split(''));
    const allGuessed = Array.from(uniqueLetters).every(letter =>
      guessedLetters.includes(letter)
    );

    if (allGuessed && gameStatus === 'playing') {
      setGameStatus('won');
    } else if (wrongGuesses >= maxWrongGuesses && gameStatus === 'playing') {
      setGameStatus('lost');
    }
  }, [guessedLetters, wrongGuesses, currentWord, gameStatus]);

  const handleGuess = () => {
    const letter = inputLetter.toUpperCase();
    if (!letter || letter.length !== 1 || guessedLetters.includes(letter)) {
      setInputLetter('');
      return;
    }

    setGuessedLetters([...guessedLetters, letter]);

    if (!currentWord.word.includes(letter)) {
      setWrongGuesses(wrongGuesses + 1);
    }

    setInputLetter('');
  };

  const resetGame = () => {
    const newWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(newWord);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameStatus('playing');
    setInputLetter('');
  };

  const renderWord = () => {
    return currentWord.word.split('').map((letter, index) => (
      <motion.div
        key={index}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: index * 0.1 }}
        className="w-10 h-12 bg-white/10 rounded-lg flex items-center justify-center text-2xl text-white border-2 border-white/20"
      >
        {guessedLetters.includes(letter) || gameStatus !== 'playing' ? letter : ''}
      </motion.div>
    ));
  };

  return (
    <div className="space-y-6">
      {/* Status */}
      <div className="text-center text-white">
        {gameStatus === 'won' && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-2xl text-green-400"
          >
            🎉 You Won!
          </motion.div>
        )}
        {gameStatus === 'lost' && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-2xl text-red-400"
          >
            😔 You Lost! The word was {currentWord.word}
          </motion.div>
        )}
        {gameStatus === 'playing' && (
          <div>
            <div className="text-sm text-gray-400">Hint: {currentWord.hint}</div>
            <div className="text-lg mt-2">
              Wrong guesses: {wrongGuesses}/{maxWrongGuesses}
            </div>
          </div>
        )}
      </div>

      {/* Word Display */}
      <div className="flex justify-center gap-2">
        {renderWord()}
      </div>

      {/* Guessed Letters */}
      <div className="bg-white/5 rounded-xl p-4">
        <div className="text-sm text-gray-400 mb-2">Guessed Letters:</div>
        <div className="flex flex-wrap gap-2">
          {guessedLetters.length === 0 ? (
            <span className="text-gray-500 text-sm">None yet</span>
          ) : (
            guessedLetters.map((letter, index) => (
              <motion.span
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`px-3 py-1 rounded-lg ${
                  currentWord.word.includes(letter)
                    ? 'bg-green-500/30 text-green-300'
                    : 'bg-red-500/30 text-red-300'
                }`}
              >
                {letter}
                {currentWord.word.includes(letter) ? (
                  <Check className="w-3 h-3 inline ml-1" />
                ) : (
                  <X className="w-3 h-3 inline ml-1" />
                )}
              </motion.span>
            ))
          )}
        </div>
      </div>

      {/* Input */}
      {gameStatus === 'playing' && (
        <div className="flex gap-2">
          <Input
            value={inputLetter}
            onChange={(e) => setInputLetter(e.target.value.toUpperCase())}
            onKeyPress={(e) => e.key === 'Enter' && handleGuess()}
            placeholder="Type a letter..."
            maxLength={1}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 text-center text-2xl"
          />
          <Button
            onClick={handleGuess}
            className="bg-purple-500 hover:bg-purple-600"
          >
            Guess
          </Button>
        </div>
      )}

      {/* Reset Button */}
      {gameStatus !== 'playing' && (
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
