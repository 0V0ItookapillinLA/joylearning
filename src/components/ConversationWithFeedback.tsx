import { useState } from 'react';
import { Card, Tag, Typography } from 'antd';
import { MessageOutlined, ExclamationCircleOutlined, BulbOutlined, StarOutlined, UpOutlined, DownOutlined } from '@ant-design/icons';
import { cn } from '@/lib/utils';

const { Text } = Typography;

type FeedbackType = 'error' | 'improvement' | 'good' | null;

interface ConversationMessage {
  role: 'AI' | 'user';
  content: string;
  feedback?: {
    type: FeedbackType;
    issue?: string;
    suggestion?: string;
  };
}

// Enhanced mock data with feedback
const conversationWithFeedback: ConversationMessage[] = [
  { 
    role: 'AI', 
    content: '您好，我是来自XX公司的采销专员小王。请问您最近有考虑过扩大供货渠道吗？' 
  },
  { 
    role: 'user', 
    content: '我们公司目前用的系统还行吧，暂时没有换的打算。',
    feedback: {
      type: 'improvement',
      issue: '回应过于消极，缺乏探索性问题',
      suggestion: '建议反问："您说的还行是指哪些方面呢？如果在效率或成本方面有提升空间，您会感兴趣了解吗？"'
    }
  },
  { 
    role: 'AI', 
    content: '理解您的想法。不过我想了解一下，您目前的系统在处理大批量数据时，响应速度怎么样？' 
  },
  { 
    role: 'user', 
    content: '这个我不太清楚，反正我们用着没什么问题。',
    feedback: {
      type: 'error',
      issue: '回避问题，没有提供有价值的信息交换',
      suggestion: '即使不了解技术细节，也应该表现出专业态度："这个我需要确认一下，不过我可以安排技术同事详细测试并提供报告给您。"'
    }
  },
  { 
    role: 'AI', 
    content: '好的，那您方便告诉我，贵公司目前团队规模大概有多少人在使用这个系统呢？' 
  },
  { 
    role: 'user', 
    content: '大概有50多人吧，但这个跟你们的产品有什么关系呢？',
    feedback: {
      type: 'good',
    }
  },
  { 
    role: 'AI', 
    content: '非常感谢您的信息。50人规模的团队，如果能提升10%的工作效率，一年能节省不少成本呢。' 
  },
  { 
    role: 'user', 
    content: '你们的产品价格是多少？我先看看再说。',
    feedback: {
      type: 'improvement',
      issue: '直接询问价格显得过于急躁',
      suggestion: '建议先了解更多价值信息："在讨论价格之前，我想先了解一下贵公司具体的需求点，这样才能给您推荐最合适的方案。"'
    }
  },
];

const ConversationWithFeedback = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<FeedbackType>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const toggleFilter = (type: FeedbackType) => {
    setFilterType(filterType === type ? null : type);
    setExpandedIndex(null); // Reset expanded state when filter changes
  };

  const getFeedbackStyle = (type: FeedbackType) => {
    switch (type) {
      case 'error':
        return {
          border: 'border-l-destructive',
          bg: 'bg-destructive/5',
          tagColor: 'error' as const,
          icon: <ExclamationCircleOutlined />,
          label: '需要改进'
        };
      case 'improvement':
        return {
          border: 'border-l-[hsl(var(--status-pending))]',
          bg: 'bg-[hsl(var(--status-pending))]/5',
          tagColor: 'warning' as const,
          icon: <BulbOutlined />,
          label: '可以优化'
        };
      case 'good':
        return {
          border: 'border-l-[hsl(var(--status-complete))]',
          bg: 'bg-[hsl(var(--status-complete))]/5',
          tagColor: 'success' as const,
          icon: <StarOutlined />,
          label: '表现良好'
        };
      default:
        return {
          border: 'border-l-primary/30',
          bg: '',
          tagColor: 'default' as const,
          icon: null,
          label: ''
        };
    }
  };

  const userMessages = conversationWithFeedback.filter(m => m.role === 'user');
  const errorCount = userMessages.filter(m => m.feedback?.type === 'error').length;
  const improvementCount = userMessages.filter(m => m.feedback?.type === 'improvement').length;
  const goodCount = userMessages.filter(m => m.feedback?.type === 'good').length;

  // Group conversations into rounds (AI message + user response)
  const conversationRounds: { ai: ConversationMessage | null; user: ConversationMessage | null; roundIndex: number }[] = [];
  for (let i = 0; i < conversationWithFeedback.length; i += 2) {
    const ai = conversationWithFeedback[i]?.role === 'AI' ? conversationWithFeedback[i] : null;
    const user = conversationWithFeedback[i + 1]?.role === 'user' ? conversationWithFeedback[i + 1] : null;
    conversationRounds.push({ ai, user, roundIndex: Math.floor(i / 2) });
  }

  // Filter rounds based on selected filter type
  const filteredRounds = filterType
    ? conversationRounds.filter(round => round.user?.feedback?.type === filterType)
    : conversationRounds;

  return (
    <Card className="!rounded-xl shadow-card" styles={{ body: { padding: 16 } }}>
      <div className="flex items-center gap-2 mb-3">
        <MessageOutlined className="text-primary" />
        <Text strong>会话记录分析</Text>
      </div>
      
      {/* Summary Stats - Clickable Filters */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <Tag
          color={filterType === 'error' ? 'error' : undefined}
          onClick={() => toggleFilter('error')}
          className="cursor-pointer"
        >
          {errorCount} 处错误
        </Tag>
        <Tag
          color={filterType === 'improvement' ? 'warning' : undefined}
          onClick={() => toggleFilter('improvement')}
          className="cursor-pointer"
        >
          {improvementCount} 处可优化
        </Tag>
        <Tag
          color={filterType === 'good' ? 'success' : undefined}
          onClick={() => toggleFilter('good')}
          className="cursor-pointer"
        >
          {goodCount} 处表现良好
        </Tag>
      </div>

      {/* Conversation List - By Rounds */}
      <div className="space-y-4">
        {filteredRounds.map((round, roundIdx) => {
          const globalIndex = round.roundIndex * 2;
          
          return (
            <div key={roundIdx} className="space-y-2">
              {/* AI Message */}
              {round.ai && (
                <div className="border-l-2 border-l-primary/30 pl-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Text type="secondary" className="text-xs font-medium">AI</Text>
                  </div>
                  <Text type="secondary" className="text-sm line-clamp-3">
                    {round.ai.content}
                  </Text>
                </div>
              )}
              
              {/* User Message with Feedback */}
              {round.user && (() => {
                const record = round.user;
                const style = getFeedbackStyle(record.feedback?.type || null);
                const isExpanded = expandedIndex === globalIndex + 1;
                const hasFeedback = record.feedback && record.feedback.type !== 'good' && (record.feedback.issue || record.feedback.suggestion);
                
                return (
                  <div 
                    className={cn(
                      "border-l-2 pl-3 transition-all duration-200",
                      style.border,
                      record.feedback && style.bg,
                      hasFeedback && "cursor-pointer hover:bg-accent/50 rounded-r-lg -ml-0.5 pl-3.5"
                    )}
                    onClick={() => hasFeedback && toggleExpand(globalIndex + 1)}
                  >
                    {/* Message Header */}
                    <div className="flex items-center gap-2 mb-1">
                      <Text className="text-xs font-medium text-primary">我</Text>
                      {record.feedback?.type && (
                        <Tag color={style.tagColor} icon={style.icon} className="!m-0 !text-xs">
                          {style.label}
                        </Tag>
                      )}
                      {hasFeedback && (
                        <span className="ml-auto">
                          {isExpanded ? (
                            <UpOutlined className="text-muted-foreground text-xs" />
                          ) : (
                            <DownOutlined className="text-muted-foreground text-xs" />
                          )}
                        </span>
                      )}
                    </div>
                    
                    {/* Message Content */}
                    <Text type="secondary" className={cn(
                      "text-sm",
                      !isExpanded && "line-clamp-3"
                    )}>
                      {record.content}
                    </Text>
                    
                    {/* Expanded Feedback */}
                    {isExpanded && hasFeedback && (
                      <div className="mt-3 space-y-2 animate-fade-in">
                        {record.feedback?.issue && (
                          <div className="bg-background/60 rounded-lg p-3 border border-border/50">
                            <p className="text-xs font-medium text-destructive flex items-center gap-1 mb-1">
                              <ExclamationCircleOutlined />
                              问题分析
                            </p>
                            <Text className="text-sm">{record.feedback.issue}</Text>
                          </div>
                        )}
                        {record.feedback?.suggestion && (
                          <div className="bg-background/60 rounded-lg p-3 border border-primary/20">
                            <p className="text-xs font-medium text-primary flex items-center gap-1 mb-1">
                              <BulbOutlined />
                              改进建议
                            </p>
                            <Text className="text-sm">{record.feedback.suggestion}</Text>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          );
        })}
      </div>
      
    </Card>
  );
};

export default ConversationWithFeedback;
