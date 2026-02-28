import { useState } from 'react';
import { Card, Tag, Typography } from 'antd';
import { MessageOutlined, ExclamationCircleOutlined, BulbOutlined, StarOutlined, UpOutlined, DownOutlined, NumberOutlined } from '@ant-design/icons';
import { ConversationMessage, ActConversation, FeedbackType } from '@/types';
import { freeConversation, scriptedConversation } from '@/data/mockData';

const { Text } = Typography;

const getFeedbackStyle = (type: FeedbackType) => {
  switch (type) {
    case 'error':
      return { border: 'border-l-destructive', bg: 'bg-destructive/5', tagColor: 'error' as const, icon: <ExclamationCircleOutlined />, label: '需要改进' };
    case 'improvement':
      return { border: 'border-l-[hsl(var(--status-pending))]', bg: 'bg-[hsl(var(--status-pending))]/5', tagColor: 'warning' as const, icon: <BulbOutlined />, label: '可以优化' };
    case 'good':
      return { border: 'border-l-[hsl(var(--status-complete))]', bg: 'bg-[hsl(var(--status-complete))]/5', tagColor: 'success' as const, icon: <StarOutlined />, label: '表现良好' };
    default:
      return { border: 'border-l-primary/30', bg: '', tagColor: 'default' as const, icon: null, label: '' };
  }
};

/** Single round: AI message + user response with expandable feedback */
const ConversationRound = ({
  ai,
  user,
  globalKey,
  expandedKey,
  onToggle,
}: {
  ai: ConversationMessage | null;
  user: ConversationMessage | null;
  globalKey: string;
  expandedKey: string | null;
  onToggle: (key: string) => void;
}) => {
  if (!user) return null;
  const style = getFeedbackStyle(user.feedback?.type || null);
  const isExpanded = expandedKey === globalKey;
  const hasFeedback = user.feedback && user.feedback.type !== 'good' && (user.feedback.issue || user.feedback.suggestion);

  return (
    <div className="space-y-2">
      {ai && (
        <div className="border-l-2 border-l-primary/30 pl-3">
          <div className="flex items-center gap-2 mb-1">
            <Text type="secondary" className="text-xs font-medium">AI</Text>
          </div>
          <Text type="secondary" className="text-sm line-clamp-3">{ai.content}</Text>
        </div>
      )}
      <div
        className={`border-l-2 pl-3 transition-all duration-200 ${style.border} ${user.feedback ? style.bg : ''} ${hasFeedback ? 'cursor-pointer hover:bg-accent/50 rounded-r-lg -ml-0.5 pl-3.5' : ''}`}
        onClick={() => hasFeedback && onToggle(globalKey)}
      >
        <div className="flex items-center gap-2 mb-1">
          <Text className="text-xs font-medium text-primary">我</Text>
          {user.feedback?.type && (
            <Tag color={style.tagColor} icon={style.icon} className="!m-0 !text-xs">{style.label}</Tag>
          )}
          {hasFeedback && (
            <span className="ml-auto">
              {isExpanded ? <UpOutlined className="text-muted-foreground text-xs" /> : <DownOutlined className="text-muted-foreground text-xs" />}
            </span>
          )}
        </div>
        <Text type="secondary" className={`text-sm ${!isExpanded ? 'line-clamp-3' : ''}`}>{user.content}</Text>
        {isExpanded && hasFeedback && (
          <div className="mt-3 space-y-2 animate-fade-in">
            {user.feedback?.issue && (
              <div className="bg-background/60 rounded-lg p-3 border border-border/50">
                <p className="text-xs font-medium text-destructive flex items-center gap-1 mb-1"><ExclamationCircleOutlined />问题分析</p>
                <Text className="text-sm">{user.feedback.issue}</Text>
              </div>
            )}
            {user.feedback?.suggestion && (
              <div className="bg-background/60 rounded-lg p-3 border border-primary/20">
                <p className="text-xs font-medium text-primary flex items-center gap-1 mb-1"><BulbOutlined />改进建议</p>
                <Text className="text-sm">{user.feedback.suggestion}</Text>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

/** Build rounds from flat message array */
const buildRounds = (messages: ConversationMessage[]) => {
  const rounds: { ai: ConversationMessage | null; user: ConversationMessage | null }[] = [];
  for (let i = 0; i < messages.length; i += 2) {
    const ai = messages[i]?.role === 'AI' ? messages[i] : null;
    const user = messages[i + 1]?.role === 'user' ? messages[i + 1] : null;
    rounds.push({ ai, user });
  }
  return rounds;
};

/** Count feedback types across messages */
const countFeedback = (messages: ConversationMessage[]) => {
  const userMsgs = messages.filter(m => m.role === 'user');
  return {
    error: userMsgs.filter(m => m.feedback?.type === 'error').length,
    improvement: userMsgs.filter(m => m.feedback?.type === 'improvement').length,
    good: userMsgs.filter(m => m.feedback?.type === 'good').length,
  };
};

interface Props {
  mode?: 'free' | 'scripted';
}

const ConversationWithFeedback = ({ mode = 'free' }: Props) => {
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<FeedbackType>(null);

  const toggleExpand = (key: string) => setExpandedKey(expandedKey === key ? null : key);
  const toggleFilter = (type: FeedbackType) => { setFilterType(filterType === type ? null : type); setExpandedKey(null); };

  // Gather all messages for counting
  const allMessages = mode === 'scripted'
    ? scriptedConversation.flatMap(a => a.messages)
    : freeConversation;
  const counts = countFeedback(allMessages);

  // Free mode: flat rounds
  const freeRounds = mode === 'free' ? buildRounds(freeConversation) : [];
  const filteredFreeRounds = filterType
    ? freeRounds.filter(r => r.user?.feedback?.type === filterType)
    : freeRounds;

  // Scripted mode: rounds per act, with filter
  const filteredActs = mode === 'scripted'
    ? scriptedConversation.map(act => {
        const rounds = buildRounds(act.messages);
        const filtered = filterType ? rounds.filter(r => r.user?.feedback?.type === filterType) : rounds;
        return { ...act, rounds: filtered };
      }).filter(act => act.rounds.length > 0)
    : [];

  return (
    <Card className="!rounded-xl shadow-card" styles={{ body: { padding: 16 } }}>
      <div className="flex items-center gap-2 mb-3">
        <MessageOutlined className="text-primary" />
        <Text strong>会话记录分析</Text>
      </div>

      {/* Summary Stats - Clickable Filters */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <Tag color={filterType === 'error' ? 'error' : undefined} onClick={() => toggleFilter('error')} className="cursor-pointer">
          {counts.error} 处错误
        </Tag>
        <Tag color={filterType === 'improvement' ? 'warning' : undefined} onClick={() => toggleFilter('improvement')} className="cursor-pointer">
          {counts.improvement} 处可优化
        </Tag>
        <Tag color={filterType === 'good' ? 'success' : undefined} onClick={() => toggleFilter('good')} className="cursor-pointer">
          {counts.good} 处表现良好
        </Tag>
      </div>

      {mode === 'free' ? (
        /* Free mode: flat list */
        <div className="space-y-4">
          {filteredFreeRounds.map((round, idx) => (
            <ConversationRound
              key={idx}
              ai={round.ai}
              user={round.user}
              globalKey={`free-${idx}`}
              expandedKey={expandedKey}
              onToggle={toggleExpand}
            />
          ))}
        </div>
      ) : (
        /* Scripted mode: grouped by act */
        <div className="space-y-5">
          {filteredActs.map(act => (
            <div key={act.actNumber} className="relative">
              {/* Act header */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/10">
                  <NumberOutlined className="text-primary text-xs" />
                </div>
                <Text strong className="text-sm">第{act.actNumber}幕 · {act.title}</Text>
              </div>
              {/* Act wrapper */}
              <div className="border border-border/60 rounded-xl bg-accent/20 p-3 space-y-4">
                {act.rounds.map((round, idx) => (
                  <ConversationRound
                    key={idx}
                    ai={round.ai}
                    user={round.user}
                    globalKey={`act${act.actNumber}-${idx}`}
                    expandedKey={expandedKey}
                    onToggle={toggleExpand}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default ConversationWithFeedback;
