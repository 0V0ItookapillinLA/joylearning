import { useParams } from 'react-router-dom';
import { Button, Card, Typography } from 'antd';
import { BarChartOutlined, AimOutlined, LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import RadarChart from '@/components/RadarChart';
import ImprovementSection from '@/components/ImprovementSection';
import ConversationWithFeedback from '@/components/ConversationWithFeedback';
import { abilityScores, evaluationText, strengthsData, weaknessesData } from '@/data/mockData';

const { Text } = Typography;

const HistoryDetail = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="JoyLearning" rightAction="menu" backPath="/profile?tab=history" />
      
      {/* Title Bar */}
      <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <BarChartOutlined className="text-primary" />
            多场景零售采销话术
          </h2>
          <p className="text-xs text-muted-foreground mt-1">考试 | 时长 7min</p>
        </div>
        <Button size="small" className="!rounded-lg">
          再次练习
        </Button>
      </div>
      
      <main className="max-w-md mx-auto px-4 space-y-4">
        {/* Practice Evaluation */}
        <Card className="!rounded-xl shadow-card" styles={{ body: { padding: 16 } }}>
          <div className="flex items-center gap-2 mb-3">
            <BarChartOutlined className="text-primary" />
            <Text strong>本次练习评价</Text>
          </div>
          <p className="text-sm mb-3">
            得分：<span className="text-2xl font-bold text-primary">82.7</span>
            <Text type="secondary">分/100分</Text>
          </p>
          <Text type="secondary" className="text-sm leading-relaxed whitespace-pre-line block">
            {evaluationText}
          </Text>
          
          {/* Summary */}
          <div className="mt-4 p-3 bg-accent rounded-lg">
            <Text strong className="text-sm">
              沟通能力强，有团队领导力
            </Text>
          </div>
        </Card>
        
        {/* Improvement Suggestions & Related Knowledge */}
        <ImprovementSection />
        
        {/* Radar Chart */}
        <Card className="!rounded-xl shadow-card" styles={{ body: { padding: 16 } }}>
          <div className="flex items-center gap-2 mb-4">
            <AimOutlined className="text-primary" />
            <Text strong>综合能力模型</Text>
          </div>
          <Text type="secondary" className="text-xs block mb-4">单维度统计满分100分</Text>
          <RadarChart data={abilityScores} size={200} />
        </Card>
        
        {/* Strengths */}
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
        
        {/* Weaknesses */}
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
        
        {/* Conversation Records with Feedback */}
        <ConversationWithFeedback />
      </main>
      
      <TabBar />
    </div>
  );
};

export default HistoryDetail;
