import { useState, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

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

const AI_PRACTICE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-practice`;

export const useAIPractice = (options?: UseAIPracticeOptions) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentScene, setCurrentScene] = useState<SceneContext | null>(null);

  const sendMessage = useCallback(async (userMessage: string, scene?: SceneContext) => {
    if (!userMessage.trim()) return;

    const activeScene = scene || currentScene;
    if (scene) {
      setCurrentScene(scene);
    }

    const userMsg: Message = { role: 'user', content: userMessage };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    let assistantContent = '';
    let sceneCompleted = false;

    const updateAssistant = (chunk: string) => {
      assistantContent += chunk;
      
      // Check for scene completion marker
      if (assistantContent.includes('[SCENE_COMPLETE]')) {
        sceneCompleted = true;
        assistantContent = assistantContent.replace('[SCENE_COMPLETE]', '').trim();
      }
      
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant') {
          return prev.map((m, i) => 
            i === prev.length - 1 ? { ...m, content: assistantContent } : m
          );
        }
        return [...prev, { role: 'assistant', content: assistantContent }];
      });
    };

    try {
      const allMessages = [...messages, userMsg].map(m => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetch(AI_PRACTICE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ 
          messages: allMessages,
          scene: activeScene 
        }),
      });

      if (!response.ok || !response.body) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || '连接失败');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) updateAssistant(content);
          } catch {
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }

      // Final flush
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split('\n')) {
          if (!raw) continue;
          if (raw.endsWith('\r')) raw = raw.slice(0, -1);
          if (raw.startsWith(':') || raw.trim() === '') continue;
          if (!raw.startsWith('data: ')) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === '[DONE]') continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) updateAssistant(content);
          } catch { /* ignore */ }
        }
      }

      // Trigger scene complete callback if goal was achieved
      if (sceneCompleted && options?.onSceneComplete) {
        setTimeout(() => {
          options.onSceneComplete?.();
        }, 1500); // Delay to let user read the response
      }
    } catch (error) {
      console.error('AI practice error:', error);
      toast({
        title: '连接失败',
        description: error instanceof Error ? error.message : '请稍后重试',
        variant: 'destructive',
      });
      // Remove the user message if failed
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  }, [messages, currentScene, options]);

  const resetConversation = useCallback(() => {
    setMessages([]);
    setCurrentScene(null);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    resetConversation,
    currentScene,
  };
};
