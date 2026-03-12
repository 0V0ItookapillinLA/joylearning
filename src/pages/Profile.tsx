import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Tabs, Card, Avatar, Typography, Space } from 'antd';
import { BarChartOutlined, AimOutlined, RightOutlined } from '@ant-design/icons';
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import RadarChart from '@/components/RadarChart';
import HistoryCard from '@/components/HistoryCard';
import RecommendedCourses from '@/components/RecommendedCourses';
import { userProfile, abilityScores, evaluationText, historyRecords } from '@/data/mockData';
import avatarUser from '@/assets/avatar-user.png';

const { Text } = Typography;

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

  const tabItems = [
    {
      key: 'report',
      label: '综合报告',
      children: (
        <div className="space-y-4">
          {/* Overall Evaluation */}
          <Card className="!rounded-xl shadow-card !border-0" styles={{ body: { padding: 16 } }}>
            <Space align="center" className="mb-3">
              <BarChartOutlined className="text-primary" />
              <Text strong>综合评价</Text>
            </Space>
            <div className="mb-3">
              <Text>得分：</Text>
              <Text className="text-2xl font-bold text-primary">{userProfile.overallScore}</Text>
              <Text type="secondary">分/100分</Text>
            </div>
            <Text type="secondary" className="text-sm leading-relaxed whitespace-pre-line block">
              {evaluationText}
            </Text>
          </Card>
          
          {/* Radar Chart */}
          <Card className="!rounded-xl shadow-card !border-0" styles={{ body: { padding: 16 } }}>
            <Space align="center" className="mb-4">
              <AimOutlined className="text-primary" />
              <Text strong>综合能力模型</Text>
            </Space>
            <Text type="secondary" className="text-xs block mb-4">单维度统计满分100分</Text>
            <RadarChart data={abilityScores} />
          </Card>
          
          <RecommendedCourses />
          
          {/* Growth Chart Entry */}
          <div
            className="gradient-ai-soft rounded-xl p-4 flex items-center justify-between cursor-pointer hover:shadow-ai transition-shadow"
            onClick={() => navigate('/growth')}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">📈</span>
              <Text strong className="text-foreground text-sm">查看我的成长曲线</Text>
            </div>
            <RightOutlined className="text-muted-foreground text-xs" />
          </div>
        </div>
      ),
    },
    {
      key: 'history',
      label: '历史记录',
      children: (
        <div className="space-y-3">
          {historyRecords.map((record, index) => (
            <div 
              key={record.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'both' }}
            >
              <HistoryCard record={record} />
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="JoyLearning" showBack={false} rightAction="menu" />
      
      {/* User Info - AI themed */}
      <div className="max-w-md mx-auto px-4 pt-4 pb-2">
        <div className="gradient-ai-soft rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-ai-purple/8 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-ai-cyan/8 blur-3xl" />
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full opacity-50" style={{ background: 'var(--gradient-ai)' }} />
              <Avatar 
                src={avatarUser} 
                size={56}
                alt={userProfile.name}
                className="relative"
              />
            </div>
            <div className="flex-1">
              <Text strong className="text-foreground text-base">
                {userProfile.name}
                <Text type="secondary" className="font-normal ml-1 text-sm">
                  ({userProfile.account})
                </Text>
              </Text>
              <div 
                className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity mt-0.5"
                onClick={() => navigate('/checkin')}
              >
                <Text className="text-sm text-primary">
                  学习时长 <Text strong className="text-primary">{userProfile.studyHours}</Text> 小时
                </Text>
                <RightOutlined className="text-primary text-xs" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="max-w-md mx-auto px-4">
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          items={tabItems}
          className="profile-tabs"
          centered
        />
      </div>
      
      <TabBar />
    </div>
  );
};

export default Profile;
