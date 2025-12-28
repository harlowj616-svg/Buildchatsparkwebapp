import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Loader2, Sparkles } from 'lucide-react';

const funFacts = [
  "💡 Over 50,000 people use ChatSpark daily!",
  "🌍 Connect with people from 150+ countries",
  "🎮 Play games while you chat for extra fun",
  "🛡️ AI moderation keeps 99% of chats safe",
  "✨ Average match time is under 5 seconds",
  "🎯 Shared interests increase match quality",
  "🚀 New features added every week",
  "💬 Most popular topic: Movies & TV shows",
];

export function MatchingScreen() {
  const [currentFact, setCurrentFact] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % funFacts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-white">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center space-y-8 max-w-md"
      >
        {/* Animated Loader */}
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-24 h-24 mx-auto"
          >
            <Sparkles className="w-24 h-24 text-purple-400" />
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Loader2 className="w-16 h-16 text-pink-400 animate-spin" />
          </motion.div>
        </div>

        {/* Status Text */}
        <div className="space-y-3">
          <motion.h2
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-3xl"
          >
            Finding your match...
          </motion.h2>
          <p className="text-gray-400">
            Connecting you with someone new
          </p>
        </div>

        {/* Fun Facts Carousel */}
        <motion.div
          key={currentFact}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 min-h-[100px] flex items-center justify-center"
        >
          <p className="text-lg text-purple-200">
            {funFacts[currentFact]}
          </p>
        </motion.div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-3 h-3 rounded-full bg-purple-400"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
