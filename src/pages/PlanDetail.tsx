import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import ChapterTabs from '@/components/ChapterTabs';
import LearningItemCard from '@/components/LearningItemCard';
import { plans, chapters, learningItems } from '@/data/mockData';
import avatarBusiness from '@/assets/avatar-business.png';

const PlanDetail = () => {
  const { id } = useParams();
  const [activeChapter, setActiveChapter] = useState(2);
  
  const plan = plans.find(p => p.id === id) || plans[0];

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header 
        title="JoyLearning" 
        rightAction="dropdown" 
        rightLabel="新人训"
      />
      
      {/* Banner */}
      <div className="max-w-md mx-auto px-4 mt-4">
        <div className="gradient-banner rounded-2xl p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-foreground whitespace-pre-line leading-tight">
            {plan.bannerTitle}
          </h2>
          <img 
            src={avatarBusiness} 
            alt="Training" 
            className="w-28 h-28 object-contain"
          />
        </div>
      </div>
      
      {/* Chapter Tabs */}
      <div className="max-w-md mx-auto px-4 border-b border-border">
        <ChapterTabs 
          chapters={chapters}
          activeChapter={activeChapter}
          onSelect={setActiveChapter}
        />
      </div>
      
      {/* Learning Items */}
      <main className="max-w-md mx-auto px-4 py-4">
        <div className="space-y-3">
          {learningItems.map((item, index) => (
            <div key={item.id} style={{ animationDelay: `${index * 0.05}s` }}>
              <LearningItemCard item={item} />
            </div>
          ))}
        </div>
      </main>
      
      <TabBar />
    </div>
  );
};

export default PlanDetail;
