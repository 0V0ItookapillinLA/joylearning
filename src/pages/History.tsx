import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import HistoryCard from '@/components/HistoryCard';
import { historyRecords } from '@/data/mockData';

const History = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Joylearning" rightAction="menu" />
      
      <main className="max-w-md mx-auto px-4 py-4">
        <h2 className="text-lg font-semibold text-foreground mb-4">历史记录</h2>
        
        <div className="space-y-3">
          {historyRecords.map((record) => (
            <HistoryCard key={record.id} record={record} />
          ))}
        </div>
      </main>
      
      <TabBar />
    </div>
  );
};

export default History;
