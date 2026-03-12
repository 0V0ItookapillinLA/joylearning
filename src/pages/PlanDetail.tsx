import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Typography } from 'antd';
import { BulbOutlined, RightOutlined } from '@ant-design/icons';
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import ChapterTabs from '@/components/ChapterTabs';
import LearningItemCard from '@/components/LearningItemCard';
import AIAssistantFAB from '@/components/AIAssistantFAB';
import { plans, chapters, learningItems } from '@/data/mockData';
import avatarBusiness from '@/assets/avatar-business.png';

const { Text } = Typography;

const PlanDetail = () => {
  const { id } = useParams();
  const [activeChapter, setActiveChapter] = useState(2);

  const plan = plans.find(p => p.id === id) || plans[0];

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="JoyLearning" />

      {/* Banner */}
      <div className="max-w-md mx-auto px-4 mt-4">
        <div className="gradient-ai-soft rounded-2xl p-6 flex justify-between items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-ai-purple/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-ai-cyan/10 blur-3xl" />
          <h2 className="text-2xl font-bold text-foreground whitespace-pre-line leading-tight relative z-10">
            {plan.bannerTitle}
          </h2>
          <img src={avatarBusiness} alt="Training" className="w-28 h-28 object-contain relative z-10 float" />
        </div>
      </div>

      {/* Chapter Tabs */}
      <div className="max-w-md mx-auto px-4 border-b border-border/50">
        <ChapterTabs chapters={chapters} activeChapter={activeChapter} onSelect={setActiveChapter} />
      </div>

      {/* Learning Items */}
      <main className="max-w-md mx-auto px-4 py-4">
        <div className="space-y-3">
          {learningItems.map((item, index) => (
            <div
              key={item.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'both' }}
            >
              <LearningItemCard item={item} />
            </div>
          ))}
        </div>

        {/* AI推荐下一步 */}
        <div className="mt-6 gradient-ai-soft rounded-xl p-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-ai-purple/8 blur-2xl" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <BulbOutlined className="text-ai-purple" />
              <Text strong className="text-foreground text-sm">AI 推荐下一步</Text>
            </div>
            <Text className="text-xs text-muted-foreground block mb-3">
              完成本章后建议学习「客户异议处理进阶」，可以针对性提升你的薄弱项。
            </Text>
            <Button size="small" className="!rounded-lg !text-xs !h-7">
              查看推荐课程 <RightOutlined />
            </Button>
          </div>
        </div>
      </main>

      {/* AI Assistant FAB */}
      <AIAssistantFAB />

      <TabBar />
    </div>
  );
};

export default PlanDetail;
