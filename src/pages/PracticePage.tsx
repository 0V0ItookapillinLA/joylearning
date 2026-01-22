import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, ChevronLeft, Mic, MicOff, Send } from 'lucide-react';
import avatarBusiness from '@/assets/avatar-business.png';
import { useAIPractice } from '@/hooks/useAIPractice';

const PracticePage = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [input, setInput] = useState('');
  const [showChat, setShowChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { messages, isLoading, sendMessage } = useAIPractice();

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Show chat after first message
  useEffect(() => {
    if (messages.length > 0) {
      setShowChat(true);
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    sendMessage(input);
    setInput('');
  };

  const handleTalkPress = () => {
    setIsRecording(true);
    // TODO: Implement speech recognition
  };

  const handleTalkRelease = () => {
    setIsRecording(false);
    // TODO: Send recorded audio
  };

  const handleEnd = () => {
    navigate('/practice/complete');
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleHint = () => {
    // TODO: Show hint
    console.log('Show hint');
  };

  // Combine initial greeting with AI messages
  const displayMessages = [
    { role: 'assistant' as const, content: '你好，我是AI面试官。请先做一个简单的自我介绍吧。' },
    ...messages
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="max-w-md mx-auto w-full flex flex-col flex-1">
        {/* Video/Avatar Area */}
        <div className="flex-1 relative overflow-hidden">
          {/* Background Avatar */}
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <img 
              src={avatarBusiness} 
              alt="AI面试官" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Back Button */}
          <button 
            onClick={handleBack}
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-card/80 backdrop-blur flex items-center justify-center shadow-lg z-10"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>

          {/* Chat Overlay - Only shown when there are messages */}
          {showChat && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/90 via-foreground/70 to-transparent p-4 pt-20">
              <div className="space-y-3 max-h-48 overflow-y-auto hide-scrollbar mb-4">
                {displayMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-sm'
                          : 'bg-card text-card-foreground rounded-bl-sm'
                      }`}
                    >
                      {msg.content}
                      {isLoading && index === displayMessages.length - 1 && msg.role === 'assistant' && (
                        <span className="inline-block w-1 h-4 ml-1 bg-current animate-pulse" />
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Text Input */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="输入回复..."
                  disabled={isLoading}
                  className="flex-1 bg-card/90 text-card-foreground rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                />
                <Button
                  size="icon"
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="rounded-full w-10 h-10"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Recording Indicator */}
          {isRecording && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="bg-destructive/90 text-destructive-foreground px-6 py-3 rounded-full flex items-center gap-2 animate-pulse">
                <Mic className="w-5 h-5" />
                <span className="text-sm font-medium">正在录音...</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Controls */}
        <div className="bg-background p-4 pb-8 safe-bottom">
          <div className="flex items-center justify-center gap-3">
            {/* Hint Button */}
            <button 
              onClick={handleHint}
              className="w-12 h-12 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
            >
              <MapPin className="w-5 h-5 text-muted-foreground" />
            </button>
            
            {/* End Button */}
            <Button
              variant="outline"
              onClick={handleEnd}
              className="h-12 px-6 rounded-full border-destructive text-destructive hover:bg-destructive/5"
            >
              结束
            </Button>
            
            {/* Talk Button */}
            <Button
              className={`h-12 px-10 rounded-full transition-all ${
                isRecording 
                  ? 'bg-destructive hover:bg-destructive/90' 
                  : 'bg-primary hover:bg-primary/90'
              }`}
              onMouseDown={handleTalkPress}
              onMouseUp={handleTalkRelease}
              onMouseLeave={handleTalkRelease}
              onTouchStart={handleTalkPress}
              onTouchEnd={handleTalkRelease}
            >
              {isRecording ? (
                <>
                  <MicOff className="w-4 h-4 mr-2" />
                  松开发送
                </>
              ) : (
                '点击说话'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticePage;
