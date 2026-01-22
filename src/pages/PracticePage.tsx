import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, ChevronLeft, ChevronUp, ChevronDown, X, Video } from 'lucide-react';
import avatarInterviewer from '@/assets/avatar-interviewer.png';
import { useAIPractice } from '@/hooks/useAIPractice';

interface Scene {
  id: number;
  title: string;
  description: string;
  goal: string;
}

const scenes: Scene[] = [
  {
    id: 1,
    title: '第一幕',
    description: '您是物流销售，之前和一名老客户李女士谈到冷链商品销售，本次为第二次回访，由客户朋友圈冷链需求的话题进行切入，推荐一款适合客户的物流产品。',
    goal: '跟客户愉意交流，熟悉客户近况，询问是否有新的物流需求',
  },
  {
    id: 2,
    title: '第二幕',
    description: '客户对你的提议比较感兴趣，但是有很多顾虑，比如价格、运输效率、售后保障上，还需要多方考虑比较，才能决定。',
    goal: '介绍自己产品的优势，说服客户订购自己的物流服务',
  },
  {
    id: 3,
    title: '第三幕',
    description: '客户对你的物流产品兴趣很大，想要知道更多的细节，长期订购是否有优惠，能否针对老用户提供足够吸引人的价格。',
    goal: '介绍物流的服务，并且针对老用户做出一定的让步，需要跟客户合理周旋，确保自己利益最大化。',
  },
];

const PracticePage = () => {
  const navigate = useNavigate();
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isSceneExpanded, setIsSceneExpanded] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [realtimeSubtitle, setRealtimeSubtitle] = useState('');
  const [aiSubtitle, setAiSubtitle] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { messages, isLoading, sendMessage } = useAIPractice();

  const currentScene = scenes[currentSceneIndex];

  // Update AI subtitle when messages change
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'assistant') {
        setAiSubtitle(lastMessage.content);
      }
    }
  }, [messages]);

  // Auto-hide scene banner after 5 seconds
  useEffect(() => {
    if (isSceneExpanded) {
      const timer = setTimeout(() => {
        setIsSceneExpanded(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isSceneExpanded, currentSceneIndex]);

  const handleTalkPress = () => {
    setIsRecording(true);
    setRealtimeSubtitle('正在聆听...');
    // TODO: Implement speech recognition
  };

  const handleTalkRelease = () => {
    setIsRecording(false);
    // Simulate sending message
    if (realtimeSubtitle && realtimeSubtitle !== '正在聆听...') {
      sendMessage(realtimeSubtitle);
    }
    setRealtimeSubtitle('');
  };

  const handleEnd = () => {
    navigate('/practice/complete');
  };

  const handleComplete = () => {
    // Move to next scene or complete
    if (currentSceneIndex < scenes.length - 1) {
      setCurrentSceneIndex(currentSceneIndex + 1);
      setIsSceneExpanded(true);
    } else {
      navigate('/practice/complete');
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleHint = () => {
    // Generate hint based on current context
    const hints = [
      '试着询问客户目前仓储方面遇到的具体痛点',
      '可以介绍我们的冷链一体化解决方案的优势',
      '强调售后服务和运输时效的保障',
      '可以提供一些成功案例来增强说服力',
    ];
    setCurrentHint(hints[Math.floor(Math.random() * hints.length)]);
    setShowHint(true);
  };

  const closeHint = () => {
    setShowHint(false);
  };

  return (
    <div className="fixed inset-0 bg-background flex flex-col">
      {/* Main Content Area */}
      <div className="flex-1 relative overflow-hidden bg-muted">
        {/* Background Avatar */}
        <img 
          src={avatarInterviewer} 
          alt="AI面试官" 
          className="absolute inset-0 w-full h-full object-contain object-center bg-muted"
        />
        
        {/* Back Button */}
        <button 
          onClick={handleBack}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-card/80 backdrop-blur flex items-center justify-center shadow-lg z-20"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>

        {/* User Video Preview - Top Right */}
        <div className="absolute top-4 right-4 w-20 h-28 rounded-xl overflow-hidden shadow-lg z-20 bg-muted border-2 border-card">
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted-foreground/20">
            <Video className="w-6 h-6 text-muted-foreground/50" />
          </div>
          <span className="absolute bottom-1 left-1 right-1 text-[10px] text-center text-card bg-foreground/60 rounded px-1">
            百川
          </span>
        </div>

        {/* Scene Announcement - Top */}
        <div className="absolute top-16 left-4 right-4 z-20">
          <div 
            className={`bg-card/95 backdrop-blur rounded-xl shadow-xl overflow-hidden transition-all duration-300 border ${
              isSceneExpanded ? 'max-h-80' : 'max-h-12'
            }`}
          >
            <button 
              onClick={() => setIsSceneExpanded(!isSceneExpanded)}
              className="w-full flex items-center justify-between px-4 py-3 text-foreground"
            >
              <span className="font-semibold text-sm">{currentScene.title}</span>
              {isSceneExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            
            {isSceneExpanded && (
              <div className="px-4 pb-4 text-foreground/90">
                <p className="text-xs leading-relaxed mb-2">
                  {currentScene.description}
                </p>
                <p className="text-xs leading-relaxed">
                  <span className="font-semibold">目标：</span>
                  {currentScene.goal}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Hint Overlay - Middle */}
        {showHint && (
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 z-30">
            <div className="bg-card/95 backdrop-blur rounded-xl shadow-xl p-4 border">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground">提示</span>
                </div>
                <button 
                  onClick={closeHint}
                  className="p-1 hover:bg-muted rounded-full"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                {currentHint}
              </p>
            </div>
          </div>
        )}

        {/* AI Subtitle - Above Controls */}
        {aiSubtitle && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/90 to-transparent p-4 pt-12 z-10">
            <div className="bg-foreground/80 backdrop-blur rounded-lg px-4 py-2">
              <p className="text-xs text-muted-foreground mb-1">AI陪练：</p>
              <p className="text-sm text-card leading-relaxed line-clamp-2">
                {aiSubtitle}
              </p>
            </div>
          </div>
        )}

        {/* Recording Indicator */}
        {isRecording && (
          <div className="absolute bottom-32 left-4 right-4 z-20">
            <div className="bg-card/95 backdrop-blur rounded-lg px-4 py-3 shadow-lg">
              <p className="text-xs text-muted-foreground mb-1">您正在说：</p>
              <p className="text-sm text-foreground">
                {realtimeSubtitle}
                <span className="inline-block w-0.5 h-4 ml-1 bg-primary animate-pulse" />
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="bg-background p-4 pb-6 safe-bottom">
        {/* Real-time subtitle display area */}
        {realtimeSubtitle && !isRecording && (
          <div className="mb-3 px-2">
            <p className="text-sm text-muted-foreground text-center">
              {realtimeSubtitle}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between gap-2">
          {/* Hint Button */}
          <button 
            onClick={handleHint}
            className="w-12 h-12 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors flex-shrink-0"
          >
            <MapPin className="w-5 h-5 text-muted-foreground" />
          </button>
          
          {/* End Button */}
          <Button
            variant="outline"
            onClick={handleEnd}
            className="h-10 px-4 rounded-full border-destructive text-destructive hover:bg-destructive/5 text-sm"
          >
            结束
          </Button>

          {/* Audio Waveform / Talk Button */}
          <div 
            className={`flex-1 h-10 rounded-full flex items-center justify-center gap-1 transition-all cursor-pointer ${
              isRecording ? 'bg-primary' : 'bg-muted'
            }`}
            onMouseDown={handleTalkPress}
            onMouseUp={handleTalkRelease}
            onMouseLeave={() => isRecording && handleTalkRelease()}
            onTouchStart={handleTalkPress}
            onTouchEnd={handleTalkRelease}
          >
            {isRecording ? (
              // Animated waveform
              <div className="flex items-center gap-0.5 h-6">
                {[...Array(12)].map((_, i) => (
                  <div 
                    key={i}
                    className="w-1 bg-primary-foreground rounded-full animate-pulse"
                    style={{ 
                      height: `${Math.random() * 16 + 8}px`,
                      animationDelay: `${i * 0.05}s`,
                      animationDuration: '0.5s'
                    }}
                  />
                ))}
              </div>
            ) : (
              // Static waveform
              <div className="flex items-center gap-0.5 h-6">
                {[4, 8, 12, 16, 12, 16, 20, 16, 12, 8, 12, 8].map((h, i) => (
                  <div 
                    key={i}
                    className="w-1 bg-primary rounded-full"
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Complete Button */}
          <Button
            onClick={handleComplete}
            className="h-10 px-4 rounded-full bg-primary hover:bg-primary/90 text-sm"
          >
            完成
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PracticePage;
