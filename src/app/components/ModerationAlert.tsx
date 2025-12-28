import { motion } from 'motion/react';
import { AlertTriangle, X, Shield } from 'lucide-react';
import { Button } from './ui/button';

interface ModerationAlertProps {
  warnings: number;
  onClose: () => void;
}

export function ModerationAlert({ warnings, onClose }: ModerationAlertProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-red-900 to-orange-900 rounded-2xl p-6 max-w-md w-full border-2 border-red-500/50 shadow-2xl"
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-500/30 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-red-300" />
            </div>
            <div>
              <h3 className="text-white text-xl">AI Moderation Alert</h3>
              <p className="text-red-200 text-sm">Content Policy Violation</p>
            </div>
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

        <div className="bg-red-500/20 rounded-xl p-4 mb-4 border border-red-500/30">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
            <div className="text-white">
              <p className="mb-2">
                Your message was flagged by our AI moderation system for potentially inappropriate content.
              </p>
              <p className="text-sm text-red-200">
                Please keep conversations respectful and appropriate.
              </p>
            </div>
          </div>
        </div>

        {/* Warning Counter */}
        <div className="bg-white/10 rounded-xl p-4 mb-4">
          <div className="flex justify-between items-center text-white mb-2">
            <span>Warning Level:</span>
            <span className="text-2xl">{warnings}/3</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(warnings / 3) * 100}%` }}
              className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 h-2 rounded-full"
            />
          </div>
          {warnings >= 2 && (
            <p className="text-red-300 text-sm mt-2">
              ⚠️ One more violation will result in an automatic ban!
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <div className="text-sm text-gray-300">
            <strong>ChatSpark Community Guidelines:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>No harassment or hate speech</li>
              <li>No inappropriate content</li>
              <li>No spam or advertising</li>
              <li>Respect other users</li>
            </ul>
          </div>
          
          <Button
            onClick={onClose}
            className="w-full bg-white/20 hover:bg-white/30 text-white mt-4"
          >
            I Understand
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
