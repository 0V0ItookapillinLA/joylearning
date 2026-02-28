import { useParams } from 'react-router-dom';
import { Button, Card, Tabs, Typography } from 'antd';
import { BarChartOutlined, AimOutlined, LikeOutlined, DislikeOutlined, BulbOutlined, EnvironmentOutlined } from '@ant-design/icons';
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import RadarChart from '@/components/RadarChart';
import ImprovementSection from '@/components/ImprovementSection';
import ConversationWithFeedback from '@/components/ConversationWithFeedback';
import { abilityScores, evaluationText, strengthsData, weaknessesData, historyRecords } from '@/data/mockData';
import { ActResult } from '@/types';

const { Text } = Typography;

/** 单幕分析卡片 */
const ActAnalysis = ({ act }: { act: ActResult }) => (
  <div className="space-y-4">
    {/* 场景描述 */}
    <Card className="!rounded-xl shadow-card" styles={{ body: { padding: 16 } }}>
      <div className="flex items-center gap-2 mb-3">
        <EnvironmentOutlined className="text-primary" />
        <Text strong>场景描述</Text>
      </div>
      <Text type="secondary" className="text-sm leading-relaxed block">
        {act.scene}
      </Text>
    </Card>

    {/* 本幕评价 */}
    <Card className="!rounded-xl shadow-card" styles={{ body: { padding: 16 } }}>
      <div className="flex items-center gap-2 mb-3">
        <BarChartOutlined className="text-primary" />
        <Text strong>本幕评价</Text>
      </div>
      <p className="text-sm mb-3">
        得分：<span className="text-2xl font-bold text-primary">{act.score}</span>
        <Text type="secondary">分/100分</Text>
      </p>
      <Text type="secondary" className="text-sm leading-relaxed block">
        {act.evaluation}
      </Text>
    </Card>

    {/* 改进建议 */}
    <Card className="!rounded-xl shadow-card" styles={{ body: { padding: 16 } }}>
      <div className="flex items-center gap-2 mb-3">
        <BulbOutlined className="text-primary" />
        <Text strong>改进建议</Text>
      </div>
      <Text type="secondary" className="text-sm leading-relaxed block">
        {act.suggestion}
      </Text>
    </Card>

    {/* 本幕对话记录 */}
    <ConversationWithFeedback mode="scripted" />
  </div>
);

const HistoryDetail = () => {
  const { id } = useParams();
  const record = historyRecords.find(r => r.id === id);
  const isScripted = record?.mode === 'scripted';

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="JoyLearning" rightAction="menu" backPath="/profile?tab=history" />
      
      {/* Title Bar */}
      <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <BarChartOutlined className="text-primary" />
            {record?.title || '多场景零售采销话术'}
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            {record?.type === 'exam' ? '考试' : record?.type === 'practice' ? '练习' : '教学'} | 时长 {record?.duration || '7min'}
          </p>
        </div>
        <Button size="small" className="!rounded-lg">
          再次练习
        </Button>
      </div>
      
      <main className="max-w-md mx-auto px-4 space-y-4">
        {/* 综合评价 - 两种模式都有 */}
        <Card className="!rounded-xl shadow-card" styles={{ body: { padding: 16 } }}>
          <div className="flex items-center gap-2 mb-3">
            <BarChartOutlined className="text-primary" />
            <Text strong>本次练习评价</Text>
          </div>
          <p className="text-sm mb-3">
            得分：<span className="text-2xl font-bold text-primary">{record?.score || 82.7}</span>
            <Text type="secondary">分/100分</Text>
          </p>
          <Text type="secondary" className="text-sm leading-relaxed whitespace-pre-line block">
            {evaluationText}
          </Text>
          <div className="mt-4 p-3 bg-accent rounded-lg">
            <Text strong className="text-sm">
              沟通能力强，有团队领导力
            </Text>
          </div>
        </Card>

        {isScripted && record?.acts ? (
          <>
            {/* 固定剧本：各幕 Tabs */}
            <Card className="!rounded-xl shadow-card" styles={{ body: { padding: 16 } }}>
              <Text strong className="block mb-3">各幕分析</Text>
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
            </Card>
          </>
        ) : (
          <>
            {/* 自由对话：原有布局 */}
            <ImprovementSection />
          </>
        )}

        {/* 雷达图 - 两种模式都有 */}
        <Card className="!rounded-xl shadow-card" styles={{ body: { padding: 16 } }}>
          <div className="flex items-center gap-2 mb-4">
            <AimOutlined className="text-primary" />
            <Text strong>综合能力模型</Text>
          </div>
          <Text type="secondary" className="text-xs block mb-4">单维度统计满分100分</Text>
          <RadarChart data={abilityScores} size={200} />
        </Card>
        
        {/* 优势 */}
        <Card className="!rounded-xl shadow-card" styles={{ body: { padding: 16 } }}>
          <div className="flex items-center gap-2 mb-3 text-[hsl(var(--status-complete))]">
            <LikeOutlined />
            <Text strong className="!text-[hsl(var(--status-complete))]">优势维度</Text>
          </div>
          <div className="space-y-3">
            {strengthsData.map((item, index) => (
              <div key={index} className="border-l-2 border-[hsl(var(--status-complete))] pl-3">
                <Text strong className="text-sm">{item.title}</Text>
                <Text type="secondary" className="text-xs block mt-1 line-clamp-2">{item.content}</Text>
              </div>
            ))}
          </div>
        </Card>
        
        {/* 劣势 */}
        <Card className="!rounded-xl shadow-card" styles={{ body: { padding: 16 } }}>
          <div className="flex items-center gap-2 mb-3 text-destructive">
            <DislikeOutlined />
            <Text strong className="!text-destructive">劣势维度</Text>
          </div>
          <div className="space-y-3">
            {weaknessesData.map((item, index) => (
              <div key={index} className="border-l-2 border-destructive/50 pl-3">
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
