import { useParams } from 'react-router-dom';
import { Button, Card, Tabs, Tag, Typography } from 'antd';
import { BarChartOutlined, AimOutlined, LikeOutlined, DislikeOutlined, BulbOutlined, EnvironmentOutlined, RocketOutlined, ThunderboltOutlined } from '@ant-design/icons';
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import RadarChart from '@/components/RadarChart';
import ImprovementSection from '@/components/ImprovementSection';
import ConversationWithFeedback from '@/components/ConversationWithFeedback';
import { abilityScores, evaluationText, strengthsData, weaknessesData, historyRecords, scriptedConversationSegments } from '@/data/mockData';
import { ActResult } from '@/types';

const { Text } = Typography;

/** 单幕分析卡片 */
const ActAnalysis = ({ act }: { act: ActResult }) => (
  <div className="space-y-4">
    {/* 场景描述 */}
    <div className="glass-strong rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg gradient-ai-soft flex items-center justify-center">
          <EnvironmentOutlined className="text-primary text-sm" />
        </div>
        <Text strong>场景描述</Text>
      </div>
      <Text type="secondary" className="text-sm leading-relaxed block">
        {act.scene}
      </Text>
    </div>

    {/* 本幕评价 */}
    <div className="glass-strong rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg gradient-ai-soft flex items-center justify-center">
          <BarChartOutlined className="text-primary text-sm" />
        </div>
        <Text strong>本幕评价</Text>
      </div>
      <div className="flex items-baseline gap-1 mb-3">
        <span className="text-3xl font-bold bg-clip-text text-transparent" style={{ backgroundImage: 'var(--gradient-ai)' }}>
          {act.score}
        </span>
        <Text type="secondary" className="text-sm">/ 100分</Text>
      </div>
      <Text type="secondary" className="text-sm leading-relaxed block">
        {act.evaluation}
      </Text>
    </div>

    {/* 改进建议 */}
    <div className="glass-strong rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg gradient-ai-soft flex items-center justify-center">
          <BulbOutlined className="text-primary text-sm" />
        </div>
        <Text strong>改进建议</Text>
      </div>
      <Text type="secondary" className="text-sm leading-relaxed block">
        {act.suggestion}
      </Text>
    </div>

    {/* 本幕对话记录 */}
    <ConversationWithFeedback segments={scriptedConversationSegments.find(a => a.actNumber === act.actNumber)?.segments} />
  </div>
);

const HistoryDetail = () => {
  const { id } = useParams();
  const record = historyRecords.find(r => r.id === id);
  const isScripted = record?.mode === 'scripted';
  const score = record?.score || 82.7;

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="JoyLearning" rightAction="menu" backPath="/profile?tab=history" />

      {/* AI Hero Banner */}
      <div className="relative overflow-hidden">
        {/* Decorative orbs */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[hsl(var(--ai-purple)/0.15)] blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-[hsl(var(--ai-cyan)/0.12)] blur-3xl" />

        <div className="max-w-md mx-auto px-4 py-6 relative z-10">
          <div className="gradient-ai-soft rounded-2xl p-5 shadow-ai">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Tag color="blue" className="!m-0 !text-xs !rounded-full !px-3">
                    {record?.type === 'exam' ? '考试' : record?.type === 'practice' ? '练习' : '教学'}
                  </Tag>
                  <Tag className="!m-0 !text-xs !rounded-full !px-3 !border-0 !bg-[hsl(var(--ai-purple)/0.1)] !text-[hsl(var(--ai-purple))]">
                    {isScripted ? '固定剧本' : '自由对话'}
                  </Tag>
                </div>
                <h2 className="font-bold text-foreground text-lg leading-tight">
                  {record?.title || '多场景零售采销话术'}
                </h2>
                <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
                  <ThunderboltOutlined /> 时长 {record?.duration || '7min'}
                </p>
              </div>
              <Button
                type="primary"
                size="small"
                icon={<RocketOutlined />}
                className="!rounded-full !px-4 gradient-ai !border-0 shadow-glow"
              >
                再次练习
              </Button>
            </div>

            {/* Score highlight */}
            <div className="flex items-center gap-4 p-4 glass rounded-xl">
              <div className="relative">
                <div className="w-16 h-16 rounded-full gradient-ai flex items-center justify-center shadow-glow">
                  <span className="text-2xl font-bold text-primary-foreground">{score}</span>
                </div>
              </div>
              <div className="flex-1">
                <Text strong className="text-sm block mb-1">AI 综合评分</Text>
                <Text type="secondary" className="text-xs leading-relaxed block line-clamp-2">
                  沟通能力强，有团队领导力
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-md mx-auto px-4 space-y-4">
        {/* 综合评价 */}
        <Card className="!rounded-2xl shadow-card !border-0 overflow-hidden" styles={{ body: { padding: 0 } }}>
          <div className="gradient-ai-soft p-4 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl gradient-ai flex items-center justify-center shadow-glow">
                <BarChartOutlined className="text-primary-foreground text-sm" />
              </div>
              <Text strong className="text-base">本次练习评价</Text>
            </div>
          </div>
          <div className="p-4 pt-3">
            <Text type="secondary" className="text-sm leading-relaxed whitespace-pre-line block">
              {evaluationText}
            </Text>
          </div>
        </Card>

        {isScripted && record?.acts ? (
          <Card className="!rounded-2xl shadow-card !border-0 overflow-hidden" styles={{ body: { padding: 0 } }}>
            <div className="gradient-ai-soft p-4 pb-3">
              <Text strong className="text-base">各幕分析</Text>
            </div>
            <div className="p-4 pt-2">
              <Tabs
                items={record.acts.map(act => ({
                  key: String(act.actNumber),
                  label: (
                    <span>
                      第{act.actNumber}幕
                      <span className="text-xs text-muted-foreground ml-1">({act.score}分)</span>
                    </span>
                  ),
                  children: <ActAnalysis act={act} />,
                }))}
                className="act-tabs"
              />
            </div>
          </Card>
        ) : (
          <ImprovementSection />
        )}

        {/* 雷达图 */}
        <Card className="!rounded-2xl shadow-card !border-0 overflow-hidden" styles={{ body: { padding: 0 } }}>
          <div className="gradient-ai-soft p-4 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl gradient-ai flex items-center justify-center shadow-glow">
                <AimOutlined className="text-primary-foreground text-sm" />
              </div>
              <div>
                <Text strong className="text-base block">综合能力模型</Text>
                <Text type="secondary" className="text-xs">单维度统计满分100分</Text>
              </div>
            </div>
          </div>
          <div className="p-4 flex justify-center">
            <RadarChart data={abilityScores} size={200} />
          </div>
        </Card>

        {/* 优势 */}
        <Card className="!rounded-2xl shadow-card !border-0 overflow-hidden" styles={{ body: { padding: 0 } }}>
          <div className="p-4 pb-3 bg-[hsl(var(--status-complete)/0.06)]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[hsl(var(--status-complete))] flex items-center justify-center">
                <LikeOutlined className="text-primary-foreground text-sm" />
              </div>
              <Text strong className="!text-[hsl(var(--status-complete))] text-base">优势维度</Text>
            </div>
          </div>
          <div className="p-4 pt-3 space-y-3">
            {strengthsData.map((item, index) => (
              <div key={index} className="border-l-2 border-[hsl(var(--status-complete))] pl-3 py-1">
                <Text strong className="text-sm">{item.title}</Text>
                <Text type="secondary" className="text-xs block mt-1 line-clamp-2">{item.content}</Text>
              </div>
            ))}
          </div>
        </Card>

        {/* 劣势 */}
        <Card className="!rounded-2xl shadow-card !border-0 overflow-hidden" styles={{ body: { padding: 0 } }}>
          <div className="p-4 pb-3 bg-destructive/5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-destructive flex items-center justify-center">
                <DislikeOutlined className="text-primary-foreground text-sm" />
              </div>
              <Text strong className="!text-destructive text-base">劣势维度</Text>
            </div>
          </div>
          <div className="p-4 pt-3 space-y-3">
            {weaknessesData.map((item, index) => (
              <div key={index} className="border-l-2 border-destructive/50 pl-3 py-1">
                <Text strong className="text-sm">{item.title}</Text>
                <Text type="secondary" className="text-xs block mt-1 line-clamp-2">{item.content}</Text>
              </div>
            ))}
          </div>
        </Card>

        {/* 自由对话模式才显示整体对话记录 */}
        {!isScripted && <ConversationWithFeedback mode="free" />}
      </main>

      <TabBar />
    </div>
  );
};

export default HistoryDetail;
