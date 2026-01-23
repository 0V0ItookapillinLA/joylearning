import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import RadarChart from '@/components/RadarChart';
import TrendChart from '@/components/TrendChart';
import HistoryCard from '@/components/HistoryCard';
import RecommendedCourses from '@/components/RecommendedCourses';
import { userProfile, abilityScores, evaluationText, historyRecords } from '@/data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileBarChart, Target, ChevronRight } from 'lucide-react';
import avatarUser from '@/assets/avatar-user.png';

const Profile = () => {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'report';
  const [activeTab, setActiveTab] = useState(defaultTab);
  const navigate = useNavigate();

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'history' || tab === 'report') {
      setActiveTab(tab);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="JoyLearning" showBack={false} rightAction="menu" />
      
      {/* User Info */}
      <div className="max-w-md mx-auto px-4 py-5">
        <div className="flex items-center gap-4">
          <img 
            src={avatarUser} 
            alt={userProfile.name} 
            className="w-14 h-14 rounded-full object-cover"
          />
          <div className="flex-1">
            <h2 className="font-semibold text-foreground">
              {userProfile.name}
              <span className="text-muted-foreground font-normal ml-1">
                (账号：{userProfile.account})
              </span>
            </h2>
            <div 
              className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigate('/checkin')}
            >
              <p className="text-sm text-primary">
                学习时长 <span className="font-semibold">{userProfile.studyHours}</span> 小时
              </p>
              <ChevronRight className="w-4 h-4 text-primary" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="max-w-md mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-4">
            <TabsList className="w-full h-12 bg-muted rounded-xl p-1">
              <TabsTrigger 
                value="report" 
                className="flex-1 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm"
              >
                综合报告
              </TabsTrigger>
              <TabsTrigger 
                value="history" 
                className="flex-1 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm"
              >
                历史记录
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="report" className="mt-4 px-4 space-y-4">
            {/* Overall Evaluation */}
            <div className="bg-card rounded-xl p-4 shadow-card">
              <div className="flex items-center gap-2 mb-3">
                <FileBarChart className="w-4 h-4 text-primary" />
                <h3 className="font-medium text-foreground">综合评价</h3>
              </div>
              <p className="text-sm mb-3">
                得分：<span className="text-2xl font-bold text-primary">{userProfile.overallScore}</span>
                <span className="text-muted-foreground">分/100分</span>
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {evaluationText}
              </p>
            </div>
            
            {/* Radar Chart */}
            <div className="bg-card rounded-xl p-4 shadow-card">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-4 h-4 text-primary" />
                <h3 className="font-medium text-foreground">综合能力模型</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-4">单维度统计满分100分</p>
              <RadarChart data={abilityScores} />
            </div>
            
            {/* Recommended Courses */}
            <RecommendedCourses />
            
            {/* Trend Chart */}
            <TrendChart />
          </TabsContent>
          
          <TabsContent value="history" className="mt-4 px-4">
            <div className="space-y-3">
              {historyRecords.map((record, index) => (
                <div key={record.id} style={{ animationDelay: `${index * 0.05}s` }}>
                  <HistoryCard record={record} />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <TabBar />
    </div>
  );
};

export default Profile;
