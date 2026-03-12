import { useState } from 'react';
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import AIRecommendCard from '@/components/AIRecommendCard';
import CourseGridCard from '@/components/CourseGridCard';
import { plans } from '@/data/mockData';
import { PlanStatus } from '@/types';

type FilterKey = 'all' | PlanStatus;

const filters: { key: FilterKey; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'in_progress', label: '进行中' },
  { key: 'completed', label: '已完成' },
];

const CourseCenter = () => {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  const filteredPlans = activeFilter === 'all'
    ? plans
    : plans.filter(p => p.status === activeFilter);

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="JoyLearning" showBack={false} />

      <main className="max-w-md mx-auto px-4 py-4 space-y-4">
        {/* AI Recommendation */}
        <AIRecommendCard />

        {/* Filter tabs */}
        <div className="flex items-center gap-2">
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeFilter === f.key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-2 gap-3">
          {filteredPlans.map((plan, index) => (
            <div
              key={plan.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'both' }}
            >
              <CourseGridCard plan={plan} />
            </div>
          ))}
        </div>
      </main>

      <TabBar />
    </div>
  );
};

export default CourseCenter;
