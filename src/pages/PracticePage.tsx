import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Phone, Video, VideoOff, Lightbulb, TrendingUp, Clock, ThumbsUp } from 'lucide-react';
import avatarAi from '@/assets/avatar-ai.png';

interface FeedbackTip {
  id: number;
  icon: 'lightbulb' | 'trending' | 'clock' | 'thumbsup';
  message: string;
  type: 'tip' | 'encouragement' | 'warning';
}

const feedbackTips: Omit<FeedbackTip, 'id'>[] = [
  { icon: 'lightbulb', message: '试着用具体数据支撑你的观点', type: 'tip' },
  { icon: 'trending', message: '语速适中，继续保持！', type: 'encouragement' },
  { icon: 'lightbulb', message: '可以多问一些开放性问题', type: 'tip' },
  { icon: 'thumbsup', message: '很好的开场白！', type: 'encouragement' },
  { icon: 'clock', message: '注意控制每段回复的长度', type: 'warning' },
  { icon: 'lightbulb', message: '尝试突出产品的差异化优势', type: 'tip' },
  { icon: 'trending', message: '表达清晰流畅，非常棒！', type: 'encouragement' },
  { icon: 'lightbulb', message: '记得倾听客户的需求', type: 'tip' },
];

const PracticePage = () => {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [messages, setMessages] = useState<Array<{ role: 'ai' | 'user'; content: string }>>([
    { role: 'ai', content: '你好，我是AI陪练助手。现在开始我们的销售场景练习。请向我推销一款新产品。' },
  ]);
  const [input, setInput] = useState('');
  const [currentTip, setCurrentTip] = useState<FeedbackTip | null>(null);
  const [tipVisible, setTipVisible] = useState(false);

  // Show random tips periodically
  useEffect(() => {
    const showRandomTip = () => {
      const randomTip = feedbackTips[Math.floor(Math.random() * feedbackTips.length)];
      setCurrentTip({ ...randomTip, id: Date.now() });
      setTipVisible(true);
      
      // Hide tip after 4 seconds
      setTimeout(() => {
        setTipVisible(false);
      }, 4000);
    };

    // Show first tip after 3 seconds
    const initialTimeout = setTimeout(showRandomTip, 3000);
    
    // Then show tips every 8-12 seconds
    const interval = setInterval(() => {
      showRandomTip();
    }, 8000 + Math.random() * 4000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const getTipIcon = (icon: FeedbackTip['icon']) => {
    switch (icon) {
      case 'lightbulb': return <Lightbulb className="w-4 h-4" />;
      case 'trending': return <TrendingUp className="w-4 h-4" />;
      case 'clock': return <Clock className="w-4 h-4" />;
      case 'thumbsup': return <ThumbsUp className="w-4 h-4" />;
    }
  };

  const getTipStyles = (type: FeedbackTip['type']) => {
    switch (type) {
      case 'tip': return 'bg-primary/90 text-primary-foreground';
      case 'encouragement': return 'bg-green-500/90 text-white';
      case 'warning': return 'bg-amber-500/90 text-white';
    }
  };

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
    <div className="min-h-screen bg-background flex flex-col">
      <div className="max-w-md mx-auto w-full flex flex-col flex-1">
        {/* Video Area - Dark section for video call */}
        <div className="relative flex-1 bg-foreground rounded-b-3xl overflow-hidden mx-2 mt-2">
          {/* Feedback Tip Overlay */}
          {currentTip && (
            <div 
              className={`absolute top-4 left-4 right-4 z-10 transition-all duration-500 ${
                tipVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
            >
              <div className={`flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg ${getTipStyles(currentTip.type)}`}>
                {getTipIcon(currentTip.icon)}
                <span className="text-sm font-medium">{currentTip.message}</span>
              </div>
            </div>
          )}
          
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
          <div className="absolute top-16 right-4 w-24 h-32 bg-muted rounded-xl overflow-hidden shadow-lg">
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
        
        {/* Controls - White background */}
        <div className="bg-background p-6 safe-bottom">
          <div className="flex items-center justify-center gap-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMuted(!isMuted)}
              className={`w-14 h-14 rounded-full ${isMuted ? 'bg-destructive/20 text-destructive' : 'bg-muted text-muted-foreground'}`}
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
              className={`w-14 h-14 rounded-full ${!isVideoOn ? 'bg-destructive/20 text-destructive' : 'bg-muted text-muted-foreground'}`}
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
