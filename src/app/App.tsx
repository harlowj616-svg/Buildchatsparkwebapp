import { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { LandingPage } from './components/LandingPage';
import { ChatRoom } from './components/ChatRoom';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [isInChat, setIsInChat] = useState(false);

  return (
    <HelmetProvider>
      <Helmet>
        <title>ChatSpark - Random Video Chat with Strangers | Safe & AI-Moderated</title>
        <meta name="description" content="Connect with strangers worldwide through random video chat. AI-powered moderation ensures safe conversations. Play games, make friends, and chat anonymously." />
        <meta name="keywords" content="random video chat, chat with strangers, anonymous chat, video call strangers, omegle alternative, safe chat" />
        <meta property="og:title" content="ChatSpark - Random Video Chat with Strangers" />
        <meta property="og:description" content="Safe, AI-moderated random video chat platform. Connect instantly with strangers worldwide." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://chatspark.app" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
        {!isInChat ? (
          <LandingPage onStartChat={() => setIsInChat(true)} />
        ) : (
          <ChatRoom onExitChat={() => setIsInChat(false)} />
        )}
        <Toaster />
      </div>
    </HelmetProvider>
  );
}