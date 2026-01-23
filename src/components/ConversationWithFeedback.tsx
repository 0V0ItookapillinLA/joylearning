import { useState } from 'react';
import { MessageSquare, ChevronRight, AlertCircle, Lightbulb, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    content: '您好，我是来自XX公司的销售顾问小王。请问您最近有考虑过升级一下您公司的办公系统吗？' 
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
          badge: 'bg-destructive/10 text-destructive',
          icon: AlertCircle,
          label: '需要改进'
        };
      case 'improvement':
        return {
          border: 'border-l-status-pending',
          bg: 'bg-status-pending/5',
          badge: 'bg-status-pending/10 text-status-pending',
          icon: Lightbulb,
          label: '可以优化'
        };
      case 'good':
        return {
          border: 'border-l-status-complete',
          bg: 'bg-status-complete/5',
          badge: 'bg-status-complete/10 text-status-complete',
          icon: Sparkles,
          label: '表现良好'
        };
      default:
        return {
          border: 'border-l-primary/30',
          bg: '',
          badge: '',
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
    <div className="bg-card rounded-xl p-4 shadow-card">
      <div className="flex items-center gap-2 mb-3">
        <MessageSquare className="w-4 h-4 text-primary" />
        <h3 className="font-medium text-foreground">会话记录分析</h3>
      </div>
      
      {/* Summary Stats - Clickable Filters */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <button
          onClick={() => toggleFilter('error')}
          className={cn(
            "text-xs px-2 py-1 rounded-full transition-all",
            filterType === 'error'
              ? "bg-destructive text-destructive-foreground ring-2 ring-destructive/30"
              : "bg-destructive/10 text-destructive hover:bg-destructive/20"
          )}
        >
          {errorCount} 处错误
        </button>
        <button
          onClick={() => toggleFilter('improvement')}
          className={cn(
            "text-xs px-2 py-1 rounded-full transition-all",
            filterType === 'improvement'
              ? "bg-status-pending text-white ring-2 ring-status-pending/30"
              : "bg-status-pending/10 text-status-pending hover:bg-status-pending/20"
          )}
        >
          {improvementCount} 处可优化
        </button>
        <button
          onClick={() => toggleFilter('good')}
          className={cn(
            "text-xs px-2 py-1 rounded-full transition-all",
            filterType === 'good'
              ? "bg-status-complete text-white ring-2 ring-status-complete/30"
              : "bg-status-complete/10 text-status-complete hover:bg-status-complete/20"
          )}
        >
          {goodCount} 处表现良好
        </button>
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
                    <p className="text-xs font-medium text-primary">AI</p>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {round.ai.content}
                  </p>
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
                      <p className="text-xs font-medium text-primary">我</p>
                      {record.feedback?.type && (
                        <span className={cn("text-xs px-1.5 py-0.5 rounded-full flex items-center gap-1", style.badge)}>
                          {style.icon && <style.icon className="w-3 h-3" />}
                          <span>{style.label}</span>
                        </span>
                      )}
                      {hasFeedback && (
                        <span className="ml-auto">
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                          )}
                        </span>
                      )}
                    </div>
                    
                    {/* Message Content */}
                    <p className={cn(
                      "text-sm text-muted-foreground",
                      !isExpanded && "line-clamp-3"
                    )}>
                      {record.content}
                    </p>
                    
                    {/* Expanded Feedback */}
                    {isExpanded && hasFeedback && (
                      <div className="mt-3 space-y-2 animate-fade-in">
                        {record.feedback?.issue && (
                          <div className="bg-background/60 rounded-lg p-3 border border-border/50">
                            <p className="text-xs font-medium text-destructive flex items-center gap-1 mb-1">
                              <AlertCircle className="w-3 h-3" />
                              问题分析
                            </p>
                            <p className="text-sm text-foreground">{record.feedback.issue}</p>
                          </div>
                        )}
                        {record.feedback?.suggestion && (
                          <div className="bg-background/60 rounded-lg p-3 border border-primary/20">
                            <p className="text-xs font-medium text-primary flex items-center gap-1 mb-1">
                              <Lightbulb className="w-3 h-3" />
                              改进建议
                            </p>
                            <p className="text-sm text-foreground">{record.feedback.suggestion}</p>
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
      
    </div>
  );
};

export default ConversationWithFeedback;
