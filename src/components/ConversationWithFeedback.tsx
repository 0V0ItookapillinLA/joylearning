import { useState } from 'react';
import { Card, Tag, Typography } from 'antd';
import { MessageOutlined, ExclamationCircleOutlined, BulbOutlined, StarOutlined, UpOutlined, DownOutlined, NumberOutlined } from '@ant-design/icons';
import { ConversationSegment, ActConversation, FeedbackType } from '@/types';
import { freeConversationSegments, scriptedConversationSegments } from '@/data/mockData';

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

/** A single segment: multiple rounds of dialogue + one overall feedback */
const SegmentBlock = ({
  segment,
  segmentIndex,
  globalKey,
  expandedKey,
  onToggle,
}: {
  segment: ConversationSegment;
  segmentIndex: number;
  globalKey: string;
  expandedKey: string | null;
  onToggle: (key: string) => void;
}) => {
  const style = getFeedbackStyle(segment.feedback?.type || null);
  const isExpanded = expandedKey === globalKey;
  const hasFeedback = segment.feedback && segment.feedback.type !== 'good' && (segment.feedback.issue || segment.feedback.suggestion);

  return (
    <div
      className={`border-l-2 rounded-r-lg transition-all duration-200 ${style.border} ${segment.feedback ? style.bg : ''}`}
    >
      {/* Segment header */}
      <div
        className={`flex items-center justify-between px-3 pt-2.5 pb-1 ${hasFeedback ? 'cursor-pointer' : ''}`}
        onClick={() => hasFeedback && onToggle(globalKey)}
      >
        <div className="flex items-center gap-2">
          <Text type="secondary" className="text-xs font-medium">片段 {segmentIndex + 1}</Text>
          {segment.feedback?.type && (
            <Tag color={style.tagColor} icon={style.icon} className="!m-0 !text-xs">{style.label}</Tag>
          )}
        </div>
        {hasFeedback && (
          <span>
            {isExpanded ? <UpOutlined className="text-muted-foreground text-xs" /> : <DownOutlined className="text-muted-foreground text-xs" />}
          </span>
        )}
      </div>

      {/* Messages within the segment */}
      <div className="px-3 pb-2.5 space-y-1.5">
        {segment.messages.map((msg, idx) => (
          <div key={idx} className="flex gap-2">
            <Text className={`text-xs font-medium shrink-0 mt-0.5 ${msg.role === 'AI' ? 'text-muted-foreground' : 'text-primary'}`}>
              {msg.role === 'AI' ? 'AI' : '我'}
            </Text>
            <Text type="secondary" className="text-sm leading-relaxed">{msg.content}</Text>
          </div>
        ))}
      </div>

      {/* Expandable feedback area */}
      {isExpanded && hasFeedback && (
        <div className="px-3 pb-3 space-y-2 animate-fade-in">
          {segment.feedback?.issue && (
            <div className="bg-background/60 rounded-lg p-3 border border-border/50">
              <p className="text-xs font-medium text-destructive flex items-center gap-1 mb-1"><ExclamationCircleOutlined />问题分析</p>
              <Text className="text-sm">{segment.feedback.issue}</Text>
            </div>
          )}
          {segment.feedback?.suggestion && (
            <div className="bg-background/60 rounded-lg p-3 border border-primary/20">
              <p className="text-xs font-medium text-primary flex items-center gap-1 mb-1"><BulbOutlined />改进建议</p>
              <Text className="text-sm">{segment.feedback.suggestion}</Text>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/** Count feedback types across segments */
const countSegmentFeedback = (segments: ConversationSegment[]) => ({
  error: segments.filter(s => s.feedback?.type === 'error').length,
  improvement: segments.filter(s => s.feedback?.type === 'improvement').length,
  good: segments.filter(s => s.feedback?.type === 'good').length,
});

interface Props {
  mode?: 'free' | 'scripted';
  /** Pass segments directly to render a flat list (used inside act tabs) */
  segments?: ConversationSegment[];
}

const ConversationWithFeedback = ({ mode = 'free', segments: propSegments }: Props) => {
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<FeedbackType>(null);

  const toggleExpand = (key: string) => setExpandedKey(expandedKey === key ? null : key);
  const toggleFilter = (type: FeedbackType) => { setFilterType(filterType === type ? null : type); setExpandedKey(null); };

  // If segments passed directly, use flat mode
  const baseSegments: ConversationSegment[] = propSegments
    ? propSegments
    : mode === 'scripted'
      ? scriptedConversationSegments.flatMap(a => a.segments)
      : freeConversationSegments;
  const counts = countSegmentFeedback(baseSegments);

  const filteredSegments = filterType
    ? baseSegments.filter(s => s.feedback?.type === filterType)
    : baseSegments;

  // Scripted mode without propSegments: group by act
  const useActGrouping = mode === 'scripted' && !propSegments;
  const filteredActs = useActGrouping
    ? scriptedConversationSegments.map(act => {
        const filtered = filterType ? act.segments.filter(s => s.feedback?.type === filterType) : act.segments;
        return { ...act, segments: filtered };
      }).filter(act => act.segments.length > 0)
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

      {useActGrouping ? (
        <div className="space-y-5">
          {filteredActs.map(act => (
            <div key={act.actNumber}>
              {/* Act header */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center justify-center w-5 h-5 rounded bg-primary/10">
                  <NumberOutlined className="text-primary text-[10px]" />
                </div>
                <Text strong className="text-sm">第{act.actNumber}幕 · {act.title}</Text>
              </div>
              {/* Segments within this act */}
              <div className="space-y-3 ml-1">
                {act.segments.map((segment, idx) => (
                  <SegmentBlock
                    key={idx}
                    segment={segment}
                    segmentIndex={idx}
                    globalKey={`act${act.actNumber}-${idx}`}
                    expandedKey={expandedKey}
                    onToggle={toggleExpand}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredSegments.map((segment, idx) => (
            <SegmentBlock
              key={idx}
              segment={segment}
              segmentIndex={idx}
              globalKey={`seg-${idx}`}
              expandedKey={expandedKey}
              onToggle={toggleExpand}
            />
          ))}
        </div>
      )}
    </Card>
  );
};

export default ConversationWithFeedback;
