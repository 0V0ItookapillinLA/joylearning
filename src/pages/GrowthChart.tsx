import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography } from 'antd';
import { ArrowLeftOutlined, TrophyOutlined, ClockCircleOutlined, AimOutlined } from '@ant-design/icons';
import TabBar from '@/components/TabBar';
import RadarChart from '@/components/RadarChart';
import { abilityScores } from '@/data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

const { Text } = Typography;

const trendData = [
  { week: '第1周', score: 62 },
  { week: '第2周', score: 68 },
  { week: '第3周', score: 65 },
  { week: '第4周', score: 72 },
  { week: '第5周', score: 75 },
  { week: '第6周', score: 78 },
];

const hoursData = [
  { day: '周一', hours: 1.2 },
  { day: '周二', hours: 0.8 },
  { day: '周三', hours: 1.5 },
  { day: '周四', hours: 0.5 },
  { day: '周五', hours: 2.0 },
  { day: '周六', hours: 0 },
  { day: '周日', hours: 1.2 },
];

const timeRanges = ['本周', '本月', '全部'] as const;

const GrowthChart = () => {
  const navigate = useNavigate();
  const [range, setRange] = useState<typeof timeRanges[number]>('本周');

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 glass-strong z-40">
        <div className="flex items-center h-14 px-4 max-w-md mx-auto gap-3">
          <ArrowLeftOutlined onClick={() => navigate(-1)} className="text-foreground cursor-pointer" />
          <h1 className="text-base font-semibold text-foreground">📈 我的成长曲线</h1>
          <div className="flex-1" />
          <div className="flex gap-1">
            {timeRanges.map(t => (
              <button
                key={t}
                onClick={() => setRange(t)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                  range === t ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-4 space-y-4">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: <TrophyOutlined className="text-ai-purple" />, value: '78', label: '综合得分', change: '↑ 12%' },
            { icon: <ClockCircleOutlined className="text-primary" />, value: '32h', label: '学习时长', change: '' },
            { icon: <AimOutlined className="text-status-complete" />, value: '15', label: '完成练习', change: '' },
          ].map((stat, i) => (
            <Card key={i} className="!rounded-xl !border-0 shadow-card" styles={{ body: { padding: 12, textAlign: 'center' } }}>
              <div className="mb-1">{stat.icon}</div>
              <Text strong className="text-xl text-foreground block animate-count-up">{stat.value}</Text>
              <Text type="secondary" className="text-xs">{stat.label}</Text>
              {stat.change && <Text className="text-xs text-status-complete block">{stat.change}</Text>}
            </Card>
          ))}
        </div>

        {/* Radar */}
        <Card className="!rounded-xl !border-0 shadow-card" styles={{ body: { padding: 16 } }}>
          <Text strong className="text-foreground block mb-3">🎯 能力雷达图</Text>
          <RadarChart data={abilityScores} />
        </Card>

        {/* Growth Trend */}
        <Card className="!rounded-xl !border-0 shadow-card" styles={{ body: { padding: 16 } }}>
          <Text strong className="text-foreground block mb-3">📈 成长曲线</Text>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} domain={[50, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: 'hsl(var(--primary))' }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Learning Hours */}
        <Card className="!rounded-xl !border-0 shadow-card" styles={{ body: { padding: 16 } }}>
          <Text strong className="text-foreground block mb-3">⏰ 学习时长统计</Text>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={hoursData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip />
              <Bar dataKey="hours" radius={[4, 4, 0, 0]}>
                {hoursData.map((_, i) => (
                  <Cell key={i} fill={`hsl(var(--primary) / ${0.5 + (i * 0.07)})`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>本周: 7.2h</span>
            <span>上周: 5.8h</span>
          </div>
        </Card>

      </main>

      <TabBar />
    </div>
  );
};

export default GrowthChart;
