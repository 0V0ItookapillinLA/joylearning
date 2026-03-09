import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import PlanCard from '@/components/PlanCard';
import { plans } from '@/data/mockData';

const CourseCenter = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="JoyLearning" showBack={false} />
      
      {/* AI-themed hero section */}
      <div className="max-w-md mx-auto px-4 pt-4 pb-2">
        <div className="gradient-ai-soft rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-ai-purple/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-ai-cyan/10 blur-3xl" />
          <div className="relative">
            <h2 className="text-lg font-bold text-foreground mb-1">🤖 AI 赋能学习</h2>
            <p className="text-sm text-muted-foreground">智能陪练 · 实时点评 · 个性化提升</p>
          </div>
        </div>
      </div>

      <main className="max-w-md mx-auto px-4 py-3">
        <div className="space-y-4">
          {plans.map((plan, index) => (
            <div 
              key={plan.id} 
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
            >
              <PlanCard plan={plan} />
            </div>
          ))}
        </div>
      </main>
      
      <TabBar />
    </div>
  );
};

export default CourseCenter;
