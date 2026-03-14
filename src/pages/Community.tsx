import { useState } from 'react';
import { Tabs, Card, Typography, Avatar, Tag } from 'antd';
import { CrownOutlined, RiseOutlined } from '@ant-design/icons';
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import MedalWall from '@/components/MedalWall';
import type { Dayjs } from 'dayjs';
import { Calendar as AntCalendar, Badge } from 'antd';

const { Text } = Typography;

// Mock check-in data
const checkedInDates = [
  '2025-01-15', '2025-01-16', '2025-01-17', '2025-01-20',
  '2025-01-21', '2025-01-22', '2025-01-23', '2025-01-27', '2025-01-28'
];

// Leaderboard data
const leaderboardData = [
  { rank: 1, name: '李明', score: 96.5, medals: 12, avatar: '李' },
  { rank: 2, name: '王芳', score: 94.2, medals: 10, avatar: '王' },
  { rank: 3, name: '张伟', score: 91.8, medals: 9, avatar: '张' },
  { rank: 4, name: '刘洋', score: 89.3, medals: 8, avatar: '刘' },
  { rank: 5, name: '陈静', score: 87.1, medals: 7, avatar: '陈' },
  { rank: 6, name: '张清', score: 82.7, medals: 6, avatar: '清', isMe: true },
  { rank: 7, name: '赵磊', score: 80.5, medals: 5, avatar: '赵' },
  { rank: 8, name: '孙丽', score: 78.2, medals: 4, avatar: '孙' },
];

const leaderTabs = ['总榜', '同岗位', '周榜'] as const;

const Community = () => {
  const [activeTab, setActiveTab] = useState('checkin');
  const [leaderTab, setLeaderTab] = useState<typeof leaderTabs[number]>('总榜');

  const dateCellRender = (value: Dayjs) => {
    const dateStr = value.format('YYYY-MM-DD');
    const isCheckedIn = checkedInDates.includes(dateStr);
    if (isCheckedIn) {
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <Badge status="success" />
        </div>
      );
    }
    return null;
  };

  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-amber-400 to-amber-500 text-white';
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-400 text-white';
    if (rank === 3) return 'bg-gradient-to-r from-amber-600 to-amber-700 text-white';
    return 'bg-muted text-muted-foreground';
  };

  const tabItems = [
    {
      key: 'checkin',
      label: '打卡日历',
      children: (
        <div className="space-y-4">
          {/* Today check-in CTA */}
          <div className="gradient-ai-soft rounded-xl p-4 flex items-center justify-between">
            <div>
              <Text strong className="text-foreground block">今日打卡</Text>
              <Text type="secondary" className="text-xs">坚持学习，养成好习惯 ✨</Text>
            </div>
            <button className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium shadow-lg shadow-primary/20 active:scale-95 transition-transform">
              打卡
            </button>
          </div>

          <Card className="!rounded-xl shadow-card !border-0" styles={{ body: { padding: 16 } }}>
            <AntCalendar
              fullscreen={false}
              cellRender={(current, info) => {
                if (info.type === 'date') return dateCellRender(current);
                return info.originNode;
              }}
            />
          </Card>

          <Card className="!rounded-xl shadow-card !border-0" styles={{ body: { padding: 16 } }}>
            <div className="flex justify-between items-center">
              {[
                { label: '本月打卡', value: checkedInDates.length, unit: '天' },
                { label: '连续打卡', value: 5, unit: '天' },
                { label: '累计学习', value: 100, unit: '小时' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <Text type="secondary" className="text-sm">{stat.label}</Text>
                  <div className="text-2xl font-bold text-primary">
                    {stat.value} <Text type="secondary" className="text-sm font-normal">{stat.unit}</Text>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      ),
    },
    {
      key: 'medals',
      label: '勋章墙',
      children: <MedalWall />,
    },
    {
      key: 'leaderboard',
      label: '排行榜',
      children: (
        <div className="space-y-3">
          {/* Sub-tabs */}
          <div className="flex gap-2">
            {leaderTabs.map(t => (
              <button
                key={t}
                onClick={() => setLeaderTab(t)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  leaderTab === t ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Top 3 podium */}
          <div className="flex items-end justify-center gap-4 py-4">
            {[leaderboardData[1], leaderboardData[0], leaderboardData[2]].map((user, i) => {
              const heights = ['h-16', 'h-20', 'h-12'];
              const sizes = [44, 52, 40];
              return (
                <div key={user.rank} className="flex flex-col items-center gap-2">
                  <div className="relative">
                    {user.rank === 1 && <CrownOutlined className="absolute -top-4 left-1/2 -translate-x-1/2 text-amber-400 text-lg" />}
                    <Avatar size={sizes[i]} className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground font-bold">
                      {user.avatar}
                    </Avatar>
                  </div>
                  <Text className="text-xs font-medium text-foreground">{user.name}</Text>
                  <div className={`w-16 ${heights[i]} rounded-t-lg ${getRankStyle(user.rank)} flex items-center justify-center`}>
                    <Text className="text-white font-bold">{user.rank}</Text>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Full list */}
          <div className="space-y-2">
            {leaderboardData.slice(3).map((user) => (
              <Card 
                key={user.rank} 
                className={`!rounded-xl !border-0 shadow-card ${user.isMe ? '!border-2 !border-primary' : ''}`}
                styles={{ body: { padding: 12 } }}
              >
                <div className="flex items-center gap-3">
                  <Text className="w-6 text-center font-bold text-muted-foreground">{user.rank}</Text>
                  <Avatar size={36} className="bg-gradient-to-br from-primary/60 to-primary/40 text-primary-foreground font-medium">
                    {user.avatar}
                  </Avatar>
                  <div className="flex-1">
                    <Text className={`text-sm ${user.isMe ? 'text-primary font-bold' : 'text-foreground'}`}>
                      {user.name} {user.isMe && <Tag color="blue" className="!text-[10px] !ml-1">我</Tag>}
                    </Text>
                  </div>
                  <div className="text-right">
                    <Text strong className="text-foreground">{user.score}</Text>
                    <Text type="secondary" className="text-[10px] block">
                      <RiseOutlined /> {user.medals}枚勋章
                    </Text>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="社区" showBack={false} />

      <div className="max-w-md mx-auto px-4 pt-2">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          centered
        />
      </div>

      <TabBar />
    </div>
  );
};

export default Community;
