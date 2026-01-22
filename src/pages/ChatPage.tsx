import { useState, useRef, useEffect } from 'react';
import TabBar from '@/components/TabBar';
import { Send, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Message } from '@/types';
import avatarAi from '@/assets/avatar-ai.png';
import avatarUser from '@/assets/avatar-user.png';

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '你好！我是你的AI学习助手，有什么可以帮助你的吗？',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '这是一个模拟的AI回复。在实际应用中，这里会连接到真正的AI服务来生成回复。',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 bg-card/80 backdrop-blur-lg z-40 border-b border-border">
        <div className="flex items-center justify-center h-14 px-4 max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <img src={avatarAi} alt="AI" className="w-8 h-8 rounded-full" />
            <h1 className="text-lg font-semibold text-foreground">AI助手</h1>
          </div>
        </div>
      </header>
      
      {/* Messages */}
      <main className="flex-1 overflow-y-auto pb-36 pt-4">
        <div className="max-w-md mx-auto px-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 animate-fade-in ${
                message.role === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <img
                src={message.role === 'assistant' ? avatarAi : avatarUser}
                alt={message.role}
                className="w-9 h-9 rounded-full flex-shrink-0"
              />
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-tr-sm'
                    : 'bg-card shadow-card rounded-tl-sm'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>
      
      {/* Input */}
      <div className="fixed bottom-16 left-0 right-0 bg-background border-t border-border p-4 safe-bottom">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="输入消息..."
              className="w-full bg-muted rounded-full px-5 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full w-9 h-9"
            >
              <Mic className="w-4 h-4 text-muted-foreground" />
            </Button>
          </div>
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!input.trim()}
            className="rounded-full w-11 h-11 bg-primary hover:bg-primary/90"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <TabBar />
    </div>
  );
};

export default ChatPage;
