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
  }, [messages]);

  // Update input when transcript changes
  useEffect(() => {
    if (transcript) {
      setInput(prev => prev + transcript);
    }
  }, [transcript]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    
    // Stop listening if active
    if (isListening) {
      stopListening();
    }
    
    sendMessage(input);
    setInput('');
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // Combine initial greeting with AI messages
  const displayMessages = [
    { role: 'assistant' as const, content: '你好！我是你的AI零售采销专家助手，拥有20年采销经验。无论是采购技巧、供应商沟通还是库存管理，都可以向我咨询！' },
    ...messages
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 bg-card/80 backdrop-blur-lg z-40 border-b border-border">
        <div className="flex items-center justify-center h-14 px-4 max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <Avatar src={avatarAi} size={32} />
            <h1 className="text-lg font-semibold text-foreground">AI采销专家</h1>
          </div>
        </div>
      </header>
      
      {/* Messages */}
      <main className="flex-1 overflow-y-auto pb-44 pt-4">
        <div className="max-w-md mx-auto px-4 space-y-4">
          {displayMessages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 animate-fade-in ${
                message.role === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <Avatar
                src={message.role === 'assistant' ? avatarAi : avatarUser}
                size={36}
                className="flex-shrink-0"
              />
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-tr-sm'
                    : 'bg-card shadow-card rounded-tl-sm'
                }`}
              >
                <p className="text-sm leading-relaxed">
                  {message.content}
                  {isLoading && index === displayMessages.length - 1 && message.role === 'assistant' && (
                    <span className="inline-block w-1 h-4 ml-1 bg-current animate-pulse" />
                  )}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>
      
      {/* Input */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md z-40">
        <div className="bg-card/80 backdrop-blur-lg rounded-2xl border border-border/50 shadow-lg p-3">
          {/* Voice Recording Indicator */}
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
            />
          </div>
        </div>
      </div>
      
      <TabBar />
    </div>
  );
};

export default ChatPage;
