import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Avatar, Typography } from 'antd';
import { SendOutlined, BulbOutlined, UpOutlined, DownOutlined, LoadingOutlined, CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import avatarInterviewer from '@/assets/avatar-interviewer.png';
import avatarUser from '@/assets/avatar-user.png';
import { useAIPractice } from '@/hooks/useAIPractice';
import StuckHelper from '@/components/StuckHelper';
import SceneProgressBar from '@/components/SceneProgressBar';

const { Text } = Typography;

// Dynamic coaching feedback generator based on user input
const generateCoaching = (userText: string): { guidance: string; polished: string } => {
  const feedbackPool = [
    {
      keywords: ['价格', '报价', '多少钱', '费用', '成本'],
      guidance: '在报价时不要急于给出底价，先强调价值再谈价格，留有谈判空间。',
      polished: '"关于价格方面，我们的方案在同行中性价比最高，而且增值服务能为您节省额外成本。"',
    },
    {
      keywords: ['不行', '不好', '不满意', '差', '问题'],
      guidance: '避免直接否定，先肯定对方立场，再客观指出具体问题，引导对方反思。',
      polished: '"您提到的这个情况我很理解，我们一起来看看怎么优化，争取达到更好的效果。"',
    },
    {
      keywords: ['考虑', '想想', '再说', '犹豫', '不确定'],
      guidance: '面对客户犹豫时，提供限时优惠或成功案例来推动决策，制造紧迫感。',
      polished: '"理解您需要考虑，本月签约有专属优惠方案，要不我先给您做个详细的成本对比？"',
    },
    {
      keywords: ['合作', '方案', '介绍', '服务'],
      guidance: '介绍方案时要聚焦客户痛点，用数据说话，避免泛泛而谈。',
      polished: '"针对您提到的仓配弹性问题，我们有三个解决方案，先看看哪个最匹配您的需求。"',
    },
    {
      keywords: ['你好', '您好', '嗨', '在吗'],
      guidance: '寒暄时适当带出专业话题，自然过渡到业务讨论，避免闲聊太久。',
      polished: '"您好李女士，最近行业动态挺多的，正好有些新方案想跟您分享，您看方便吗？"',
    },
  ];

  // Match based on keywords
  const matched = feedbackPool.find(f => f.keywords.some(k => userText.includes(k)));
  if (matched) return { guidance: matched.guidance, polished: matched.polished };

  // Default feedback for any message
  const defaults = [
    {
      guidance: '表达时注意结构化，先说结论再展开细节，让对方更容易跟上你的思路。',
      polished: '"我的建议是这样的——首先…其次…最后…您觉得这个方向可以吗？"',
    },
    {
      guidance: '回复时可以先复述对方的关键诉求，表示你在认真倾听，再给出你的回应。',
      polished: '"您刚才提到的核心问题是…对吗？针对这一点，我的想法是…"',
    },
    {
      guidance: '尝试用提问代替陈述，引导对方说出更多需求，有助于后续精准推荐方案。',
      polished: '"您目前最希望解决的是哪方面的问题？是成本控制还是效率提升？"',
    },
    {
      guidance: '注意语气的专业度，避免过于随意的口语表达，保持职业化沟通风格。',
      polished: '"感谢您的反馈，我来针对您提到的几个关键点逐一回复。"',
    },
  ];

  return defaults[Math.floor(Math.random() * defaults.length)];
};

interface ChatMessage {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  coaching?: { guidance: string; polished: string } | null;
  coachingExpanded?: boolean;
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
  const [showStuckHelper, setShowStuckHelper] = useState(false);
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
    const coaching = generateCoaching(input);

    const userMsg: ChatMessage = {
      id: userMsgId,
      role: 'user',
      content: input,
      coaching,
    };

    setChatMessages(prev => [...prev, userMsg]);
    setInput('');

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
        <header className="sticky top-0 z-40 bg-background border-b border-border/30">
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
              onClick={() => setShowTaskDesc(true)}
              className="text-sm text-primary font-medium min-h-0 min-w-0"
            >
              任务说明
            </button>
          </div>
        </header>

        {/* Scene Progress Bar */}
        <div className="px-4 pt-2">
          <SceneProgressBar
            currentScene={currentSceneIndex}
            totalScenes={scenes.length}
            sceneProgress={chatMessages.length > 0 ? Math.min(chatMessages.length * 15, 90) : 5}
          />
        </div>

        {/* Task Description - Bottom Sheet (70% screen) */}
        {showTaskDesc && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-foreground/40 z-50 animate-fade-in"
              onClick={() => setShowTaskDesc(false)}
            />
            {/* Sheet */}
            <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center" style={{ height: '70vh' }}>
              <div className="w-full max-w-md bg-card rounded-t-2xl shadow-2xl flex flex-col animate-slide-in-bottom">
                {/* Handle bar */}
                <div className="flex justify-center pt-3 pb-1">
                  <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
                </div>
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-border/30">
                  <Text strong className="text-base">任务说明</Text>
                  <Button
                    type="text"
                    size="small"
                    icon={<CloseOutlined />}
                    onClick={() => setShowTaskDesc(false)}
                  />
                </div>
                {/* Content */}
                <div className="flex-1 overflow-y-auto px-5 py-4">
                  <div className="space-y-4">
                    <div>
                      <Text strong className="text-sm block mb-2">场景说明</Text>
                      <Text className="text-sm leading-relaxed block text-muted-foreground">
                        客户是白酒品牌方/经销商负责人，当前面临促销波峰波谷明显、仓配弹性不足、破损丢损等问题。你需要通过三幕对话（寒暄→需求挖掘→方案推荐），推动客户同意进入下一步合作。
                      </Text>
                    </div>
                    <div>
                      <Text strong className="text-sm block mb-2">任务目标</Text>
                      <Text className="text-sm leading-relaxed block text-muted-foreground">
                        推动客户同意进入下一步合作。需要完成客户寒暄、需求挖掘、方案推荐三个环节。
                      </Text>
                    </div>
                    <div>
                      <Text strong className="text-sm block mb-2">评估维度</Text>
                      <div className="space-y-2">
                        {[
                          { name: '需求澄清', desc: '问到关键数据，能复述确认客户诉求', pct: '20%' },
                          { name: '方案匹配', desc: '能把痛点映射到能力点，表达清晰', pct: '20%' },
                          { name: '异议处理', desc: '不硬怼，先理解再回应，有证据/方案', pct: '20%' },
                          { name: '推进结果', desc: '能提出下一步并获得客户明确态度', pct: '20%' },
                          { name: '沟通表达', desc: '语气专业、结构清晰、控制节奏', pct: '20%' },
                        ].map((item, i) => (
                          <div key={i} className="flex items-start gap-2 bg-muted rounded-lg p-3">
                            <Text strong className="text-xs whitespace-nowrap">{item.name} ({item.pct})</Text>
                            <Text className="text-xs text-muted-foreground">{item.desc}</Text>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
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
                  <div className="flex flex-col gap-1.5 max-w-[75%]">
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground rounded-tr-sm'
                          : 'bg-card shadow-card border border-border/30 rounded-tl-sm'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    </div>
                    {/* Coaching trigger button */}
                    {msg.coaching && (
                      <button
                        onClick={() => {
                          setChatMessages(prev => prev.map(m =>
                            m.id === msg.id ? { ...m, coachingExpanded: !m.coachingExpanded } : m
                          ));
                        }}
                        className={`self-end flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                          msg.coachingExpanded
                            ? 'bg-primary/15 text-primary'
                            : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
                        }`}
                      >
                        <span className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center text-[10px] text-primary font-bold">S</span>
                        AI 点评
                      </button>
                    )}
                  </div>
                </div>

                {/* Inline Coaching Feedback - expandable */}
                {msg.coaching && msg.coachingExpanded && (
                  <div className="mt-2 ml-2 mr-2 animate-fade-in">
                    <div className="bg-card rounded-xl p-4 border border-border/50 shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-xs text-primary font-bold">S</span>
                        <Text className="text-sm font-semibold text-primary">Mr. Sen 实时点评</Text>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <Text strong className="text-sm text-foreground block mb-1">指导建议：</Text>
                          <Text className="text-sm leading-relaxed text-foreground/80">{msg.coaching.guidance}</Text>
                        </div>
                        <div>
                          <Text strong className="text-sm text-foreground block mb-1">润色表达：</Text>
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

          {/* Stuck Helper - above input */}
          {showStuckHelper && (
            <div className="px-4 pb-2">
              <StuckHelper
                sceneId={currentScene.id}
                visible={showStuckHelper}
                onClose={() => setShowStuckHelper(false)}
              />
            </div>
          )}

        {/* Bottom Input */}
        <div className="sticky bottom-0 bg-background border-t border-border/30 p-3 safe-bottom">
          <div className="flex items-center gap-2">
            <Button
              type="text"
              shape="circle"
              icon={<QuestionCircleOutlined className="text-[hsl(var(--ai-purple))]" />}
              className="!bg-accent !w-10 !h-10 flex-shrink-0"
              onClick={() => setShowStuckHelper(!showStuckHelper)}
              title="卡住了/给我示范"
            />
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
