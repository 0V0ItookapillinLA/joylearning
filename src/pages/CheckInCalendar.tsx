import { useState } from 'react';
import { Tabs, Calendar as AntCalendar, Badge, Card, Typography } from 'antd';
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import MedalWall from '@/components/MedalWall';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

const { Text } = Typography;

// Mock check-in data
const checkedInDates = [
  '2025-01-15', '2025-01-16', '2025-01-17', '2025-01-20', 
  '2025-01-21', '2025-01-22', '2025-01-23', '2025-01-27', '2025-01-28'
];

const CheckInCalendar = () => {
  const [activeTab, setActiveTab] = useState('calendar');

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

  const tabItems = [
    {
      key: 'calendar',
      label: '打卡日历',
      children: (
        <div className="space-y-4">
          <Card className="!rounded-xl shadow-card" styles={{ body: { padding: 16 } }}>
            <AntCalendar 
              fullscreen={false}
              cellRender={(current, info) => {
                if (info.type === 'date') {
                  return dateCellRender(current);
                }
                return info.originNode;
              }}
            />
          </Card>
          
          <Card className="!rounded-xl shadow-card" styles={{ body: { padding: 16 } }}>
            <div className="flex justify-between items-center">
              <div>
                <Text type="secondary" className="text-sm">本月打卡</Text>
                <div className="text-2xl font-bold text-primary">{checkedInDates.length} <Text type="secondary" className="text-sm font-normal">天</Text></div>
              </div>
              <div>
                <Text type="secondary" className="text-sm">连续打卡</Text>
                <div className="text-2xl font-bold text-primary">5 <Text type="secondary" className="text-sm font-normal">天</Text></div>
              </div>
              <div>
                <Text type="secondary" className="text-sm">累计学习</Text>
                <div className="text-2xl font-bold text-primary">100 <Text type="secondary" className="text-sm font-normal">小时</Text></div>
              </div>
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
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Joylearning" showBack={true} />
      
      <div className="max-w-md mx-auto px-4 pt-4">
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

export default CheckInCalendar;
