import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, message } from 'antd';
import { BulbOutlined, LeftOutlined, UpOutlined, DownOutlined, CloseOutlined, VideoCameraOutlined, AudioOutlined, AudioMutedOutlined } from '@ant-design/icons';
import avatarInterviewer from '@/assets/avatar-interviewer.png';
import { useAIPractice } from '@/hooks/useAIPractice';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';

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
    description: '您是零售采销专员，之前和一名老供应商李女士谈到冷链商品采购，本次为第二次回访，由供应商朋友圈冷链需求的话题进行切入，洽谈一款适合的物流产品采购方案。',
    goal: '跟供应商愉意交流，熟悉供应商近况，询问是否有新的供货资源',
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
  const [aiSubtitle, setAiSubtitle] = useState('');
  const [sceneTransitioning, setSceneTransitioning] = useState(false);
  const [finalTranscript, setFinalTranscript] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Speech recognition hook
  const { 
    isListening, 
    transcript, 
    startListening, 
    stopListening, 
    isSupported: isSpeechSupported,
    error: speechError 
  } = useSpeechRecognition();
  const currentScene = scenes[currentSceneIndex];

  // Handle automatic scene progression
  const handleSceneComplete = () => {
    if (currentSceneIndex < scenes.length - 1) {
      setSceneTransitioning(true);
      setTimeout(() => {
        setCurrentSceneIndex(prev => prev + 1);
        setIsSceneExpanded(true);
        setSceneTransitioning(false);
      }, 500);
    } else {
      navigate('/practice/complete');
    }
  };
  
  const { messages, isLoading, sendMessage } = useAIPractice({
    onSceneComplete: handleSceneComplete,
  });

  // Update AI subtitle when messages change
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'assistant') {
        setAiSubtitle(lastMessage.content);
      }
    }
  }, [messages]);

  // Sync speech recognition state with recording state
  useEffect(() => {
    setIsRecording(isListening);
  }, [isListening]);

  // Show speech error
  useEffect(() => {
    if (speechError) {
      message.error(speechError);
    }
  }, [speechError]);

  const handleTalkPress = () => {
    if (!isSpeechSupported) {
      message.error('请使用Chrome或Edge浏览器');
      return;
    }
    setFinalTranscript('');
    startListening();
  };

  const handleTalkRelease = () => {
    stopListening();
    // Send the final transcript to AI
    const textToSend = transcript || finalTranscript;
    if (textToSend && textToSend.trim()) {
      sendMessage(textToSend.trim(), currentScene);
      setFinalTranscript('');
    }
  };

  const handleEnd = () => {
    navigate('/practice/complete');
  };

  const handleBack = () => {
    navigate('/plan/2'); // Navigate back to course page
  };

  const handleHint = () => {
    // Generate hint based on current scene context
    const sceneHints: Record<number, string[]> = {
      1: [
        '试着从客户朋友圈的冷链需求话题切入',
        '询问客户最近的生意情况，建立亲切感',
        '了解客户目前的物流使用情况和痛点',
      ],
      2: [
        '针对客户的价格顾虑，强调性价比和长期价值',
        '介绍运输效率方面的保障措施',
        '说明售后服务的具体内容和响应时间',
      ],
      3: [
        '提供老客户专属优惠方案',
        '介绍长期合作的阶梯式优惠',
        '在让步的同时争取更长的合作周期',
      ],
    };
    const hints = sceneHints[currentScene.id] || ['继续与客户保持良好沟通'];
    setCurrentHint(hints[Math.floor(Math.random() * hints.length)]);
    setShowHint(true);
  };

  const closeHint = () => {
    setShowHint(false);
  };

  return (
    <div className="fixed inset-0 bg-background flex justify-center">
      <div className="w-full max-w-md flex flex-col relative">
      {/* Main Content Area */}
      <div className="flex-1 relative overflow-hidden bg-muted">
        {/* Background Avatar */}
        <img 
          src={avatarInterviewer} 
          alt="AI面试官" 
          className="absolute inset-0 w-full h-full object-contain object-center bg-muted"
        />
        
        {/* Back Button */}
        <Button 
          type="text"
          shape="circle"
          icon={<LeftOutlined />}
          onClick={handleBack}
          className="absolute top-4 left-4 !w-10 !h-10 !bg-card/80 backdrop-blur shadow-lg z-20"
        />

        {/* User Video Preview - Top Right */}
        <div className="absolute top-4 right-4 w-20 h-28 rounded-xl overflow-hidden shadow-lg z-20 bg-muted border-2 border-card">
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted-foreground/20">
            <VideoCameraOutlined className="text-muted-foreground/50 text-xl" />
          </div>
          <span className="absolute bottom-1 left-1 right-1 text-[10px] text-center text-card bg-foreground/60 rounded px-1">
            百川
          </span>
        </div>

        {/* Scene Announcement - Top */}
        <div className="absolute top-16 left-4 right-4 z-20">
          <Card
            className={`!rounded-xl shadow-xl overflow-hidden transition-all duration-300 ${
              isSceneExpanded ? '' : '!p-0'
            }`}
            styles={{ body: { padding: isSceneExpanded ? 16 : 0 } }}
          >
            <div 
              onClick={() => setIsSceneExpanded(!isSceneExpanded)}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">{currentScene.title}</span>
                <span className="text-xs text-muted-foreground">({currentSceneIndex + 1}/{scenes.length})</span>
              </div>
              {isSceneExpanded ? <UpOutlined className="text-xs" /> : <DownOutlined className="text-xs" />}
            </div>
            
            {isSceneExpanded && (
              <div className="mt-3 text-foreground/90">
                <p className="text-xs leading-relaxed mb-2">
                  {currentScene.description}
                </p>
                <p className="text-xs leading-relaxed">
                  <span className="font-semibold">目标：</span>
                  {currentScene.goal}
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* Hint Overlay - Middle */}
        {showHint && (
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 z-30">
            <Card className="!rounded-xl shadow-xl" styles={{ body: { padding: 16 } }}>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <BulbOutlined className="text-primary" />
                  <span className="font-semibold text-foreground">提示</span>
                </div>
                <Button 
                  type="text"
                  size="small"
                  icon={<CloseOutlined />}
                  onClick={closeHint}
                />
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                {currentHint}
              </p>
            </Card>
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
            <Card className="!rounded-lg shadow-lg" styles={{ body: { padding: 12 } }}>
              <div className="flex items-center gap-2 mb-1">
                <AudioOutlined className="text-primary animate-pulse" />
                <p className="text-xs text-muted-foreground">正在聆听...</p>
              </div>
              <p className="text-sm text-foreground">
                {transcript || '请开始说话...'}
                <span className="inline-block w-0.5 h-4 ml-1 bg-primary animate-pulse" />
              </p>
            </Card>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="bg-background p-4 pb-6 safe-bottom">
        {/* Speech not supported warning */}
        {!isSpeechSupported && (
          <div className="mb-3 px-2 py-2 bg-destructive/10 rounded-lg">
            <p className="text-xs text-destructive text-center flex items-center justify-center gap-1">
              <AudioMutedOutlined />
              您的浏览器不支持语音识别，请使用Chrome或Edge
            </p>
          </div>
        )}

        <div className="flex items-center justify-between gap-2">
          {/* Hint Button */}
          <Button 
            type="text"
            shape="circle"
            size="large"
            icon={<BulbOutlined />}
            onClick={handleHint}
            className="!w-12 !h-12 !bg-muted"
          />
          
          {/* End Button */}
          <Button
            danger
            ghost
            onClick={handleEnd}
            className="!h-10 !px-4 !rounded-full"
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
        </div>
      </div>
      
      {/* Scene Transition Overlay */}
      {sceneTransitioning && (
        <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-50">
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">🎉 目标达成！</p>
            <p className="text-sm text-muted-foreground mt-2">正在进入下一幕...</p>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default PracticePage;
