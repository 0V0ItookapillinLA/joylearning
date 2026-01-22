import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Phone, Video, VideoOff } from 'lucide-react';
import avatarAi from '@/assets/avatar-ai.png';

const PracticePage = () => {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [messages, setMessages] = useState<Array<{ role: 'ai' | 'user'; content: string }>>([
    { role: 'ai', content: '你好，我是AI陪练助手。现在开始我们的销售场景练习。请向我推销一款新产品。' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user' as const, content: input }]);
    setInput('');
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai' as const, 
        content: '你的表达很清晰。请继续补充产品的核心优势和差异化特点。' 
      }]);
    }, 1500);
  };

  const handleEnd = () => {
    navigate('/history/1');
  };

  return (
    <div className="min-h-screen bg-foreground flex flex-col">
      <div className="max-w-md mx-auto w-full flex flex-col flex-1">
        {/* Video Area */}
        <div className="relative flex-1 bg-gradient-to-b from-foreground to-foreground/90">
          {/* AI Avatar */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 animate-pulse-soft" />
              <img 
                src={avatarAi} 
                alt="AI" 
                className="absolute inset-0 w-32 h-32 rounded-full object-cover"
              />
            </div>
          </div>
          
          {/* Self Video Preview */}
          <div className="absolute top-20 right-4 w-24 h-32 bg-muted rounded-xl overflow-hidden shadow-lg">
            <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center">
              <Video className="w-8 h-8 text-muted-foreground/50" />
            </div>
          </div>
          
          {/* Chat Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground via-foreground/95 to-transparent p-4 pt-16">
            <div className="space-y-3 max-h-48 overflow-y-auto hide-scrollbar mb-4">
              {messages.map((msg, index) => (
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
                  </div>
                </div>
              ))}
            </div>
            
            {/* Input */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="输入回复..."
                className="flex-1 bg-card/90 text-card-foreground rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button
                size="icon"
                onClick={handleSend}
                className="rounded-full w-10 h-10"
              >
                <Mic className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Controls */}
        <div className="bg-foreground p-6 safe-bottom">
          <div className="flex items-center justify-center gap-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMuted(!isMuted)}
              className={`w-14 h-14 rounded-full ${isMuted ? 'bg-destructive/20 text-destructive' : 'bg-card/10 text-card'}`}
            >
              {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </Button>
            
            <Button
              size="icon"
              onClick={handleEnd}
              className="w-16 h-16 rounded-full bg-destructive hover:bg-destructive/90"
            >
              <Phone className="w-7 h-7 rotate-[135deg]" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`w-14 h-14 rounded-full ${!isVideoOn ? 'bg-destructive/20 text-destructive' : 'bg-card/10 text-card'}`}
            >
              {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticePage;
