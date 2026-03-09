import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Avatar, Typography } from 'antd';
import { SendOutlined, BulbOutlined, UpOutlined, DownOutlined, LoadingOutlined } from '@ant-design/icons';
import avatarInterviewer from '@/assets/avatar-interviewer.png';
import avatarUser from '@/assets/avatar-user.png';
import { useAIPractice } from '@/hooks/useAIPractice';

const { Text } = Typography;

// Mock real-time coaching feedback
const coachingFeedbacks: Record<number, { guidance: string; polished: string } | null> = {
  1: null,
  2: {
    guidance: '避免直接否定，先肯定工作态度，再客观指出具体问题，引导他反思。',
    polished: '"李女士，您一直很努力，想和您一起回顾一下最近的合作，看看如何进一步提升。"',
  },
  3: null,
  4: {
    guidance: '在报价时不要急于给出底价，先强调价值再谈价格，留有谈判空间。',
    polished: '"关于价格方面，我们的方案在同行中性价比是最高的，而且我们提供的增值服务能为您节省额外成本。"',
  },
  5: null,
  6: {
    guidance: '面对客户犹豫时，提供限时优惠或成功案例来推动决策。',
    polished: '"理解您需要考虑，这样吧，本月签约的客户我们有专属的老客户优惠方案，要不我先给您做个详细的成本对比？"',
  },
};

interface ChatMessage {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  coaching?: { guidance: string; polished: string } | null;
}

const scenes = [
  {
    id: 1,
    title: '第一幕：寒暄建联',
    guide: '客户李女士是白酒品牌方负责人，之前有过初步接触。需要通过寒暄建立信任感，了解她最近的经营状况和需求变化，内容可适度自由发挥。',
  },
  {
    id: 2,
    title: '第二幕：需求挖掘',
    guide: '李女士对合作有一定兴趣但有顾虑。需要用具体事实指出她的痛点，同时引导她承认差距并强调改进要求，内容可适度自由发挥。',
  },
  {
    id: 3,
    title: '第三幕：方案推荐',
    guide: '李女士想要知道更多细节和优惠。需要介绍物流服务并针对老客户做出合理让步，需要跟客户合理周旋，确保自身利益最大化。',
  },
];

const PracticeTextChat = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isGuideExpanded, setIsGuideExpanded] = useState(true);
  const [showTaskDesc, setShowTaskDesc] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const msgCounter = useRef(0);

  const { isLoading, sendMessage } = useAIPractice();
  const currentScene = scenes[currentSceneIndex];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  // Add initial AI greeting
  useEffect(() => {
    const timer = setTimeout(() => {
      setChatMessages([{
        id: 0,
        role: 'assistant',
        content: '领导，有什么事吗？',
        coaching: null,
      }]);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    msgCounter.current += 1;
    const userMsgId = msgCounter.current;
    const coaching = coachingFeedbacks[userMsgId] || null;

    const userMsg: ChatMessage = {
      id: userMsgId,
      role: 'user',
      content: input,
      coaching,
    };

    setChatMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate AI response
    await sendMessage(input, { id: currentScene.id, title: currentScene.title, description: currentScene.guide, goal: '' });

    msgCounter.current += 1;
    const mockResponses = [
      '嗯，你们的产品价格确实有点高，能再优惠一些吗？',
      '好的，您说。',
      '听起来还可以，我需要考虑一下。',
      '那售后服务怎么样？',
      '好的，我对这个方案比较感兴趣，能详细介绍一下吗？',
      '这个提案不错，我会和团队讨论一下。',
    ];
    const aiContent = mockResponses[Math.floor(Math.random() * mockResponses.length)];

    setChatMessages(prev => [...prev, {
      id: msgCounter.current,
      role: 'assistant',
      content: aiContent,
      coaching: null,
    }]);
  };

  const handleEnd = () => {
    navigate('/practice/complete');
  };

  return (
    <div className="fixed inset-0 bg-background flex justify-center">
      <div className="w-full max-w-md flex flex-col relative">
        {/* Header */}
        <header className="sticky top-0 z-40 glass-strong">
          <div className="flex items-center justify-between h-12 px-4">
            <button
              onClick={handleEnd}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors min-h-0 min-w-0"
            >
              <span className="text-xs">⏱</span> 结束
            </button>
            <div className="flex items-center gap-2">
              <Avatar src={avatarInterviewer} size={24} />
              <Text strong className="text-sm">李女士</Text>
            </div>
            <button
              onClick={() => setShowTaskDesc(!showTaskDesc)}
              className="text-sm text-primary font-medium min-h-0 min-w-0"
            >
              任务说明
            </button>
          </div>
        </header>

        {/* Task Description Overlay */}
        {showTaskDesc && (
          <div className="absolute top-12 left-0 right-0 z-30 px-4 pt-2 animate-fade-in">
            <div className="bg-card rounded-xl p-4 shadow-lg border border-border/50">
              <Text strong className="text-sm block mb-2">任务说明</Text>
              <Text className="text-sm leading-relaxed block text-muted-foreground">
                推动客户同意进入下一步合作。需要完成客户寒暄、需求挖掘、方案推荐三个环节。评估维度包括需求澄清、方案匹配、异议处理、推进结果、沟通表达。
              </Text>
              <Button type="text" size="small" onClick={() => setShowTaskDesc(false)} className="mt-2 !text-primary">
                收起
              </Button>
            </div>
          </div>
        )}

        {/* Communication Guide */}
        <div className="px-4 pt-3">
          <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
            <button
              onClick={() => setIsGuideExpanded(!isGuideExpanded)}
              className="w-full flex items-center justify-between px-4 py-2.5 min-h-0"
            >
              <div className="flex items-center gap-2">
                <span className="text-primary">📋</span>
                <Text className="text-sm font-medium">沟通指南</Text>
              </div>
              {isGuideExpanded ? (
                <UpOutlined className="text-xs text-muted-foreground" />
              ) : (
                <DownOutlined className="text-xs text-muted-foreground" />
              )}
            </button>
            {isGuideExpanded && (
              <div className="px-4 pb-3 animate-fade-in">
                <Text className="text-sm leading-relaxed text-foreground/80">{currentScene.guide}</Text>
              </div>
            )}
          </div>
        </div>

        {/* Messages */}
        <main className="flex-1 overflow-y-auto px-4 pt-3 pb-20">
          <div className="space-y-4">
            {chatMessages.map((msg) => (
              <div key={msg.id}>
                {/* Message Bubble */}
                <div className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <Avatar
                    src={msg.role === 'assistant' ? avatarInterviewer : avatarUser}
                    size={36}
                    className="flex-shrink-0 mt-0.5"
                  />
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-tr-sm'
                        : 'bg-card shadow-card border border-border/30 rounded-tl-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  </div>
                </div>

                {/* Inline Coaching Feedback - After user messages */}
                {msg.coaching && (
                  <div className="mt-3 ml-2 mr-2 animate-fade-in">
                    <div className="gradient-ai-soft rounded-xl p-4 border border-primary/15 shadow-sm ai-glow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm">💡</span>
                        <Text className="text-xs font-semibold text-ai-purple">Mr. Sen 实时点评</Text>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <Text className="text-xs font-medium text-foreground block mb-0.5">指导建议：</Text>
                          <Text className="text-sm leading-relaxed text-foreground/80">{msg.coaching.guidance}</Text>
                        </div>
                        <div>
                          <Text className="text-xs font-medium text-foreground block mb-0.5">润色表达：</Text>
                          <Text className="text-sm leading-relaxed text-foreground/80">{msg.coaching.polished}</Text>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5">
                <Avatar src={avatarInterviewer} size={36} className="flex-shrink-0" />
                <div className="bg-card shadow-card border border-border/30 rounded-2xl rounded-tl-sm px-4 py-3">
                  <LoadingOutlined className="text-muted-foreground" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </main>

        {/* Bottom Input */}
        <div className="sticky bottom-0 glass-strong border-t border-border/30 p-3 safe-bottom">
          <div className="flex items-center gap-2">
            <Button
              type="text"
              shape="circle"
              icon={<BulbOutlined className="text-primary" />}
              className="!bg-accent !w-10 !h-10 flex-shrink-0"
              onClick={() => setIsGuideExpanded(!isGuideExpanded)}
            />
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              onPressEnter={handleSend}
              placeholder="输入你的回复..."
              disabled={isLoading}
              className="!rounded-full"
            />
            <Button
              type="primary"
              shape="circle"
              icon={isLoading ? <LoadingOutlined spin /> : <SendOutlined />}
              disabled={!input.trim() || isLoading}
              onClick={handleSend}
              className="!w-10 !h-10 flex-shrink-0"
            />
          </div>
          <div className="text-center mt-1.5">
            <Text type="secondary" className="!text-[10px]">内容由AI生成</Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeTextChat;
