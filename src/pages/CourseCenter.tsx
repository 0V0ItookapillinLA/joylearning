import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import PlanCard from '@/components/PlanCard';
import { plans } from '@/data/mockData';

const CourseCenter = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="JoyLearning" showBack={true} />
      
      <main className="max-w-md mx-auto px-4 py-4">
        <div className="space-y-4">
          {plans.map((plan, index) => (
            <div key={plan.id} style={{ animationDelay: `${index * 0.1}s` }}>
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
