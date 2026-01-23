import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import RadarChart from '@/components/RadarChart';
import ImprovementSection from '@/components/ImprovementSection';
import ConversationWithFeedback from '@/components/ConversationWithFeedback';
import { Button } from '@/components/ui/button';
import { abilityScores, evaluationText, strengthsData, weaknessesData } from '@/data/mockData';
import { FileBarChart, Target, ThumbsUp, ThumbsDown } from 'lucide-react';

const HistoryDetail = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="JoyLearning" rightAction="menu" backPath="/history" />
      
      {/* Title Bar */}
      <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <FileBarChart className="w-4 h-4 text-primary" />
            多场景销售话术
          </h2>
          <p className="text-xs text-muted-foreground mt-1">考试 | 时长 7min</p>
        </div>
        <Button variant="outline" size="sm" className="rounded-lg">
          再次练习
        </Button>
      </div>
      
      <main className="max-w-md mx-auto px-4 space-y-4">
        {/* Practice Evaluation */}
        <div className="bg-card rounded-xl p-4 shadow-card">
          <div className="flex items-center gap-2 mb-3">
            <FileBarChart className="w-4 h-4 text-primary" />
            <h3 className="font-medium text-foreground">本次练习评价</h3>
          </div>
          <p className="text-sm mb-3">
            得分：<span className="text-2xl font-bold text-primary">82.7</span>
            <span className="text-muted-foreground">分/100分</span>
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
            {evaluationText}
          </p>
          
          {/* Summary */}
          <div className="mt-4 p-3 bg-accent rounded-lg">
            <p className="text-sm font-medium text-foreground">
              沟通能力强，有团队领导力
            </p>
          </div>
        </div>
        
        {/* Improvement Suggestions & Related Knowledge */}
        <ImprovementSection />
        
        {/* Radar Chart */}
        <div className="bg-card rounded-xl p-4 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-4 h-4 text-primary" />
            <h3 className="font-medium text-foreground">综合能力模型</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-4">单维度统计满分100分</p>
          <RadarChart data={abilityScores} size={200} />
        </div>
        
        {/* Strengths */}
        <div className="bg-card rounded-xl p-4 shadow-card">
          <div className="flex items-center gap-2 mb-3 text-status-complete">
            <ThumbsUp className="w-4 h-4" />
            <h3 className="font-medium">优势维度</h3>
          </div>
          <div className="space-y-3">
            {strengthsData.map((item, index) => (
              <div key={index} className="border-l-2 border-status-complete pl-3">
                <h4 className="font-medium text-sm text-foreground">{item.title}</h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Weaknesses */}
        <div className="bg-card rounded-xl p-4 shadow-card">
          <div className="flex items-center gap-2 mb-3 text-destructive">
            <ThumbsDown className="w-4 h-4" />
            <h3 className="font-medium">劣势维度</h3>
          </div>
          <div className="space-y-3">
            {weaknessesData.map((item, index) => (
              <div key={index} className="border-l-2 border-destructive/50 pl-3">
                <h4 className="font-medium text-sm text-foreground">{item.title}</h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Conversation Records with Feedback */}
        <ConversationWithFeedback />
      </main>
      
      <TabBar />
    </div>
  );
};

export default HistoryDetail;
