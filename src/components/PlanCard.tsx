import { useNavigate } from 'react-router-dom';
import { Plan } from '@/types';
import avatarBusiness from '@/assets/avatar-business.png';

interface PlanCardProps {
  plan: Plan;
}

const PlanCard = ({ plan }: PlanCardProps) => {
  const navigate = useNavigate();
  
  const statusLabel = {
    not_started: '未开始',
    in_progress: '进行中',
    completed: '已完成',
  };

  const statusColor = {
    not_started: 'text-muted-foreground',
    in_progress: 'text-primary',
    completed: 'text-status-complete',
  };

  return (
    <div 
      onClick={() => navigate(`/plan/${plan.id}`)}
      className="bg-card rounded-2xl p-5 shadow-card animate-fade-in cursor-pointer hover:shadow-soft transition-shadow"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-foreground">{plan.title}</h3>
        <span className={`text-sm ${statusColor[plan.status]}`}>
          {statusLabel[plan.status]}
        </span>
      </div>
      
      <p className="text-sm text-muted-foreground mb-1">
        本计划共含章节 {plan.chapters} 节 · 预计练习时间 {plan.estimatedHours} 小时
      </p>
      
      <p className="text-sm text-muted-foreground mb-4 line-clamp-1">
        {plan.description}
      </p>
      
      <div className="gradient-primary rounded-xl p-5 flex justify-between items-center">
        <h4 className="text-xl font-bold text-primary whitespace-pre-line leading-tight">
          {plan.bannerTitle}
        </h4>
        <div className="relative">
          <img 
            src={avatarBusiness} 
            alt="Training" 
            className="w-24 h-24 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
