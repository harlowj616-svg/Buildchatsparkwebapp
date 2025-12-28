import { Sparkles, Video, Shield, Gamepad2, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './ui/button';

interface LandingPageProps {
  onStartChat: () => void;
}

export function LandingPage({ onStartChat }: LandingPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-white">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl text-center space-y-8"
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <Sparkles className="w-12 h-12 text-yellow-400" />
          <h1 className="text-6xl md:text-7xl tracking-tight bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
            ChatSpark
          </h1>
        </div>

        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
          Connect with strangers worldwide through AI-moderated video chat. Safe, fun, and always engaging.
        </p>

        {/* Main CTA */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={onStartChat}
            className="text-xl px-12 py-8 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 shadow-2xl shadow-purple-500/50 transition-all duration-300"
          >
            <Zap className="w-6 h-6 mr-2" />
            Start Chatting Now
          </Button>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
          >
            <Video className="w-10 h-10 text-purple-400 mb-4" />
            <h3 className="text-xl mb-2">Random Matching</h3>
            <p className="text-gray-400">
              Connect instantly with strangers through video, voice, or text chat.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
          >
            <Shield className="w-10 h-10 text-green-400 mb-4" />
            <h3 className="text-xl mb-2">AI Moderation</h3>
            <p className="text-gray-400">
              Real-time content filtering keeps conversations safe and respectful.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
          >
            <Gamepad2 className="w-10 h-10 text-pink-400 mb-4" />
            <h3 className="text-xl mb-2">Built-in Games</h3>
            <p className="text-gray-400">
              Play Tic-Tac-Toe, 20 Questions, and more while chatting!
            </p>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-12 mt-12 text-center">
          <div>
            <div className="text-3xl mb-1">10K+</div>
            <div className="text-sm text-gray-400">Active Users</div>
          </div>
          <div>
            <div className="text-3xl mb-1">50K+</div>
            <div className="text-sm text-gray-400">Chats Daily</div>
          </div>
          <div>
            <div className="text-3xl mb-1">99%</div>
            <div className="text-sm text-gray-400">Safe Matches</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
