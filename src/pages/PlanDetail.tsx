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
      <Header title="JoyLearning" />
      
      {/* Banner - AI themed */}
      <div className="max-w-md mx-auto px-4 mt-4">
        <div className="gradient-ai-soft rounded-2xl p-6 flex justify-between items-center relative overflow-hidden">
          {/* Decorative orbs */}
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-ai-purple/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-ai-cyan/10 blur-3xl" />
          
          <h2 className="text-2xl font-bold text-foreground whitespace-pre-line leading-tight relative z-10">
            {plan.bannerTitle}
          </h2>
          <img 
            src={avatarBusiness} 
            alt="Training" 
            className="w-28 h-28 object-contain relative z-10 float"
          />
        </div>
      </div>
      
      {/* Chapter Tabs */}
      <div className="max-w-md mx-auto px-4 border-b border-border/50">
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
            <div 
              key={item.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'both' }}
            >
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
