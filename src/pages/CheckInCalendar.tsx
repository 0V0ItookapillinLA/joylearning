import { useState } from 'react';
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CalendarTab from '@/components/CalendarTab';
import MedalWall from '@/components/MedalWall';

const CheckInCalendar = () => {
  const [activeTab, setActiveTab] = useState('calendar');

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Joylearning" showBack={true} />
      
      <div className="max-w-md mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-4 pt-4">
            <TabsList className="w-full h-12 bg-muted rounded-xl p-1">
              <TabsTrigger 
                value="calendar" 
                className="flex-1 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm"
              >
                打卡日历
              </TabsTrigger>
              <TabsTrigger 
                value="medals" 
                className="flex-1 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm"
              >
                勋章墙
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="calendar" className="mt-4 px-4">
            <CalendarTab />
          </TabsContent>
          
          <TabsContent value="medals" className="mt-4 px-4">
            <MedalWall />
          </TabsContent>
        </Tabs>
      </div>
      
      <TabBar />
    </div>
  );
};

export default CheckInCalendar;
