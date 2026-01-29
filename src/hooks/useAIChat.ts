import { useState, useCallback } from 'react';

type Message = { role: 'user' | 'assistant'; content: string };

// Mock AI 回复库
const mockResponses = [
  '这是一个很好的问题！在采销工作中，供应商谈判是核心技能之一。建议你先了解市场行情，做好充分准备。',
  '根据我的经验，成本控制需要从源头抓起。你可以考虑优化供应链结构，减少中间环节。',
  '选品策略要结合市场需求和自身定位。建议先做竞品分析，找到差异化优势。',
  '团队管理方面，建议建立清晰的KPI体系，同时注重培养团队成员的专业能力。',
  '数字化采销是趋势，ERP系统可以帮助你更好地管理库存和订单，提升效率。',
];

export const useAIChat = (initialMessages: Message[] = []) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (userMessage: string) => {
    if (!userMessage.trim()) return;

    const userMsg: Message = { role: 'user', content: userMessage };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));

    // 随机选择一个 mock 回复
    const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
    
    setMessages(prev => [...prev, { role: 'assistant', content: randomResponse }]);
    setIsLoading(false);
  }, []);

  const resetConversation = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    resetConversation,
  };
};
