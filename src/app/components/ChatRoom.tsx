import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Video, VideoOff, Mic, MicOff, SkipForward, Home, Gamepad2, Send, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner';
import { MatchingScreen } from './MatchingScreen';
import { MiniGames } from './MiniGames';
import { ModerationAlert } from './ModerationAlert';

interface ChatRoomProps {
  onExitChat: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'you' | 'stranger';
  timestamp: Date;
  flagged?: boolean;
}

export function ChatRoom({ onExitChat }: ChatRoomProps) {
  const [isMatching, setIsMatching] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [showGames, setShowGames] = useState(false);
  const [moderationWarnings, setModerationWarnings] = useState(0);
  const [showModerationAlert, setShowModerationAlert] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate finding a match
    const timer = setTimeout(() => {
      setIsMatching(false);
      setIsConnected(true);
      toast.success('Connected! Say hi 👋');
      
      // Simulate stranger's first message
      setTimeout(() => {
        addMessage('Hi there! How are you?', 'stranger');
      }, 1000);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (text: string, sender: 'you' | 'stranger', flagged = false) => {
    const newMessage: Message = {
      id: Math.random().toString(36),
      text,
      sender,
      timestamp: new Date(),
      flagged,
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Mock AI moderation check
    const flaggedWords = ['spam', 'inappropriate'];
    const isFlagged = flaggedWords.some(word => 
      inputMessage.toLowerCase().includes(word)
    );

    if (isFlagged) {
      setModerationWarnings(prev => prev + 1);
      setShowModerationAlert(true);
      toast.error('Message flagged by AI moderation');
      
      if (moderationWarnings >= 2) {
        toast.error('Too many violations. You have been banned.');
        setTimeout(() => onExitChat(), 2000);
        return;
      }
    }

    addMessage(inputMessage, 'you', isFlagged);
    setInputMessage('');

    // Simulate stranger response
    if (!isFlagged) {
      setTimeout(() => {
        const responses = [
          "That's interesting!",
          "Tell me more!",
          "Cool! What else do you like?",
          "Nice! Want to play a game?",
        ];
        addMessage(responses[Math.floor(Math.random() * responses.length)], 'stranger');
      }, 1000 + Math.random() * 2000);
    }
  };

  const handleSkip = () => {
    toast.info('Finding new match...');
    setIsMatching(true);
    setMessages([]);
    setModerationWarnings(0);
    
    setTimeout(() => {
      setIsMatching(false);
      setIsConnected(true);
      toast.success('New match found!');
    }, 2000);
  };

  if (isMatching) {
    return <MatchingScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-6 gap-4">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20"
      >
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
          <span className="text-white">Connected to Stranger</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSkip}
            className="text-white hover:bg-white/20"
          >
            <SkipForward className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onExitChat}
            className="text-white hover:bg-white/20"
          >
            <Home className="w-5 h-5" />
          </Button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 grid md:grid-cols-2 gap-4">
        {/* Video Section */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-black/50 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 relative"
        >
          {/* Mock video preview */}
          <div className="aspect-video bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
            <div className="text-white text-center space-y-2">
              <Video className="w-16 h-16 mx-auto text-white/50" />
              <p className="text-sm text-white/70">Video Chat (Demo Mode)</p>
              <p className="text-xs text-white/50">WebRTC will be enabled in production</p>
            </div>
          </div>

          {/* Video Controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
            <Button
              size="icon"
              onClick={() => setVideoEnabled(!videoEnabled)}
              className={`rounded-full ${videoEnabled ? 'bg-white/20' : 'bg-red-500'}`}
            >
              {videoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </Button>
            <Button
              size="icon"
              onClick={() => setAudioEnabled(!audioEnabled)}
              className={`rounded-full ${audioEnabled ? 'bg-white/20' : 'bg-red-500'}`}
            >
              {audioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </Button>
            <Button
              size="icon"
              onClick={() => setShowGames(!showGames)}
              className="rounded-full bg-purple-500 hover:bg-purple-600"
            >
              <Gamepad2 className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>

        {/* Chat Section */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 flex flex-col"
        >
          <div className="p-4 border-b border-white/20">
            <h3 className="text-white">Chat</h3>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[300px] max-h-[500px]">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`flex ${message.sender === 'you' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.sender === 'you'
                        ? message.flagged
                          ? 'bg-red-500/30 border border-red-500'
                          : 'bg-purple-500'
                        : 'bg-white/20'
                    } text-white`}
                  >
                    <p>{message.text}</p>
                    {message.flagged && (
                      <div className="flex items-center gap-1 mt-1 text-xs text-red-300">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Flagged by AI</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/20">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button onClick={handleSendMessage} className="bg-purple-500 hover:bg-purple-600">
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Games Panel */}
      <AnimatePresence>
        {showGames && (
          <MiniGames onClose={() => setShowGames(false)} />
        )}
      </AnimatePresence>

      {/* Moderation Alert */}
      <AnimatePresence>
        {showModerationAlert && (
          <ModerationAlert
            warnings={moderationWarnings}
            onClose={() => setShowModerationAlert(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
