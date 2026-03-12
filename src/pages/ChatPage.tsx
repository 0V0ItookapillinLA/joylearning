import { useState, useRef, useEffect } from 'react';
import { Button, Input, Avatar, Spin } from 'antd';
import { SendOutlined, AudioOutlined, AudioMutedOutlined, LoadingOutlined } from '@ant-design/icons';
import TabBar from '@/components/TabBar';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useAIChat } from '@/hooks/useAIChat';
import avatarAi from '@/assets/avatar-ai.png';
import avatarUser from '@/assets/avatar-user.png';

const ChatPage = () => {
  const [input, setInput] = useState('');
  const [displayedTexts, setDisplayedTexts] = useState<Record<number, string>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { messages, isLoading, sendMessage } = useAIChat();
  
  const { 
    isListening, 
    transcript, 
    startListening, 
    stopListening, 
    isSupported,
    error: speechError 
  } = useSpeechRecognition();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, displayedTexts]);

  useEffect(() => {
    if (transcript) {
      setInput(prev => prev + transcript);
    }
  }, [transcript]);

  // Typewriter effect for new assistant messages
  useEffect(() => {
    messages.forEach((msg, index) => {
      if (msg.role === 'assistant' && displayedTexts[index] === undefined) {
        let charIndex = 0;
        const text = msg.content;
        const interval = setInterval(() => {
          charIndex++;
          setDisplayedTexts(prev => ({ ...prev, [index]: text.slice(0, charIndex) }));
          if (charIndex >= text.length) clearInterval(interval);
        }, 30);
        return () => clearInterval(interval);
      }
    });
  }, [messages.length]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    if (isListening) stopListening();
    sendMessage(input);
    setInput('');
  };

  const toggleListening = () => {
    if (isListening) stopListening();
    else startListening();
  };

  const displayMessages = [
    { role: 'assistant' as const, content: '你好！我是你的AI零售采销专家助手，拥有20年采销经验。无论是采购技巧、供应商沟通还是库存管理，都可以向我咨询！' },
    ...messages
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 glass-strong z-40">
        <div className="flex items-center justify-center h-14 px-4 max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-full opacity-40" style={{ background: 'var(--gradient-ai)' }} />
              <Avatar src={avatarAi} size={32} className="relative" />
            </div>
            <h1 className="text-base font-semibold text-foreground">AI采销专家</h1>
            <span className="w-2 h-2 rounded-full bg-status-complete animate-pulse" />
          </div>
        </div>
      </header>
      
      {/* Messages */}
      <main className="flex-1 overflow-y-auto pb-44 pt-4">
        <div className="max-w-md mx-auto px-4 space-y-4">
          {displayMessages.map((message, index) => {
            const isAssistant = message.role === 'assistant';
            const displayText = isAssistant && index > 0
              ? (displayedTexts[index - 1] ?? message.content)
              : message.content;
            const isTyping = isAssistant && index > 0 && displayedTexts[index - 1] !== undefined && displayedTexts[index - 1] !== message.content;
            
            return (
              <div
                key={index}
                className={`flex gap-3 animate-fade-in ${
                  !isAssistant ? 'flex-row-reverse' : ''
                }`}
              >
                <Avatar
                  src={isAssistant ? avatarAi : avatarUser}
                  size={36}
                  className="flex-shrink-0"
                />
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                    !isAssistant
                      ? 'rounded-tr-sm text-primary-foreground'
                      : 'bg-card shadow-card rounded-tl-sm border border-border/30'
                  }`}
                  style={!isAssistant ? { background: 'var(--gradient-ai)' } : undefined}
                >
                  {/* AI label tag */}
                  {isAssistant && index > 0 && (
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-xs text-ai-purple font-medium">💬 AI 点评</span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">
                    {displayText}
                    {isTyping && <span className="inline-block w-0.5 h-4 ml-0.5 bg-primary animate-pulse" />}
                  </p>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 animate-fade-in">
              <Avatar src={avatarAi} size={36} className="flex-shrink-0" />
              <div className="bg-card shadow-card rounded-2xl rounded-tl-sm px-4 py-3 border border-border/30">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">🧠 正在分析你的话术</span>
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-ai-purple animate-pulse" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-ai-purple animate-pulse" style={{ animationDelay: '300ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-ai-purple animate-pulse" style={{ animationDelay: '600ms' }} />
                  </span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>
      
      {/* Input */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md z-40">
        <div className="glass-strong rounded-2xl shadow-ai p-3">
          {isListening && (
            <div className="flex items-center gap-2 mb-2 px-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-destructive"></span>
              </span>
              <span className="text-xs text-muted-foreground">正在录音...</span>
            </div>
          )}
          
          {speechError && (
            <div className="text-xs text-destructive mb-2 px-2">
              {speechError === 'not-allowed' ? '请允许麦克风权限' : speechError}
            </div>
          )}
          
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onPressEnter={handleSend}
                placeholder={isListening ? "正在听..." : "输入消息..."}
                disabled={isLoading}
                className="!rounded-full !pr-11"
                suffix={
                  <Button
                    type={isListening ? "primary" : "text"}
                    danger={isListening}
                    shape="circle"
                    size="small"
                    onClick={toggleListening}
                    disabled={!isSupported || isLoading}
                    icon={isListening ? <AudioMutedOutlined /> : <AudioOutlined />}
                    className={isListening ? 'animate-pulse' : ''}
                  />
                }
              />
            </div>
            <Button
              type="primary"
              shape="circle"
              size="large"
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              icon={isLoading ? <LoadingOutlined spin /> : <SendOutlined />}
              style={input.trim() && !isLoading ? { background: 'var(--gradient-ai)' } : undefined}
            />
          </div>
        </div>
      </div>
      
      <TabBar />
    </div>
  );
};

export default ChatPage;
