import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Tabs, Card, Avatar, Typography, Space } from 'antd';
import { BarChartOutlined, AimOutlined, RightOutlined } from '@ant-design/icons';
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import RadarChart from '@/components/RadarChart';
import TrendChart from '@/components/TrendChart';
import HistoryCard from '@/components/HistoryCard';
import RecommendedCourses from '@/components/RecommendedCourses';
import { userProfile, abilityScores, evaluationText, historyRecords } from '@/data/mockData';
import avatarUser from '@/assets/avatar-user.png';

const { Text, Title } = Typography;

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
          <Card className="!rounded-xl shadow-card" styles={{ body: { padding: 16 } }}>
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
          <Card className="!rounded-xl shadow-card" styles={{ body: { padding: 16 } }}>
            <Space align="center" className="mb-4">
              <AimOutlined className="text-primary" />
              <Text strong>综合能力模型</Text>
            </Space>
            <Text type="secondary" className="text-xs block mb-4">单维度统计满分100分</Text>
            <RadarChart data={abilityScores} />
          </Card>
          
          {/* Recommended Courses */}
          <RecommendedCourses />
          
          {/* Trend Chart */}
          <TrendChart />
        </div>
      ),
    },
    {
      key: 'history',
      label: '历史记录',
      children: (
        <div className="space-y-3">
          {historyRecords.map((record, index) => (
            <div key={record.id} style={{ animationDelay: `${index * 0.05}s` }}>
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
      
      {/* User Info */}
      <div className="max-w-md mx-auto px-4 py-5">
        <div className="flex items-center gap-4">
          <Avatar 
            src={avatarUser} 
            size={56}
            alt={userProfile.name}
          />
          <div className="flex-1">
            <Text strong className="text-foreground">
              {userProfile.name}
              <Text type="secondary" className="font-normal ml-1">
                (账号：{userProfile.account})
              </Text>
            </Text>
            <div 
              className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
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
