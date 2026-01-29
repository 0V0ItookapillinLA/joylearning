import { useState, useCallback } from 'react';

type Message = { role: 'user' | 'assistant'; content: string };

export interface SceneContext {
  id: number;
  title: string;
  description: string;
  goal: string;
}

interface UseAIPracticeOptions {
  onSceneComplete?: () => void;
}

// Mock 客户回复库
const mockCustomerResponses = [
  '嗯，你们的产品价格确实有点高，能再优惠一些吗？',
  '我之前用过其他品牌，效果还不错，你们有什么不一样的地方？',
  '听起来还可以，但我需要考虑一下，毕竟这个决定比较重要。',
  '你说的这些功能我都了解了，那售后服务怎么样？',
  '好的，我对这个方案比较感兴趣，能详细介绍一下具体的合作流程吗？',
  '这个提案不错，我会和团队讨论一下，下周给你答复。',
];

export const useAIPractice = (options?: UseAIPracticeOptions) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentScene, setCurrentScene] = useState<SceneContext | null>(null);
  const [messageCount, setMessageCount] = useState(0);

  const sendMessage = useCallback(async (userMessage: string, scene?: SceneContext) => {
    if (!userMessage.trim()) return;

    if (scene) {
      setCurrentScene(scene);
    }

    const userMsg: Message = { role: 'user', content: userMessage };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    setMessageCount(prev => prev + 1);

    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 600));

    // 随机选择一个 mock 回复
    const randomResponse = mockCustomerResponses[Math.floor(Math.random() * mockCustomerResponses.length)];
    
    setMessages(prev => [...prev, { role: 'assistant', content: randomResponse }]);
    setIsLoading(false);

    // 模拟场景完成（每3轮对话后触发）
    if ((messageCount + 1) % 3 === 0 && options?.onSceneComplete) {
      setTimeout(() => {
        options.onSceneComplete?.();
      }, 1500);
    }
  }, [messageCount, options]);

  const resetConversation = useCallback(() => {
    setMessages([]);
    setCurrentScene(null);
    setMessageCount(0);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    resetConversation,
    currentScene,
  };
};
