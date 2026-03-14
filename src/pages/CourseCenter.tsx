import { useState } from 'react';
import { Tabs } from 'antd';
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import AIRecommendCard from '@/components/AIRecommendCard';
import CourseGridCard from '@/components/CourseGridCard';
import ScenarioCard from '@/components/ScenarioCard';
import PublicPracticeCard from '@/components/PublicPracticeCard';
import { plans } from '@/data/mockData';
import { practiceScenarios, publicPracticeRecords } from '@/data/scenarioData';
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

  const tabItems = [
    {
      key: 'scenarios',
      label: 'AI练习场景',
      children: (
        <div className="space-y-4">
          {/* AI Recommendation */}
          <AIRecommendCard />

          {/* Scenario Grid */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">🔥 热门场景</h3>
            <div className="grid grid-cols-2 gap-3">
              {practiceScenarios.map((scenario, index) => (
                <div
                  key={scenario.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'both' }}
                >
                  <ScenarioCard scenario={scenario} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'public',
      label: '公开对练',
      children: (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">看看其他同学是怎么练的，学习他们的优秀话术 💬</p>
          {publicPracticeRecords.map((record, index) => (
            <div
              key={record.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'both' }}
            >
              <PublicPracticeCard record={record} />
            </div>
          ))}
        </div>
      ),
    },
    {
      key: 'plans',
      label: '学习计划',
      children: (
        <div className="space-y-4">
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
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="发现" showBack={false} />

      <main className="max-w-md mx-auto px-4 py-4">
        <Tabs
          items={tabItems}
          defaultActiveKey="scenarios"
          className="discovery-tabs"
          size="small"
        />
      </main>

      <TabBar />
    </div>
  );
};

export default CourseCenter;
