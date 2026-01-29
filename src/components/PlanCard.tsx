import { Card, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Plan } from '@/types';
import avatarBusiness from '@/assets/avatar-business.png';

interface PlanCardProps {
  plan: Plan;
}

const PlanCard = ({ plan }: PlanCardProps) => {
  const navigate = useNavigate();
  
  const getStatusConfig = (status: Plan['status']) => {
    switch (status) {
      case 'completed':
        return { text: '已完成', color: 'success' as const };
      case 'in_progress':
        return { text: '进行中', color: 'processing' as const };
      default:
        return { text: '未开始', color: 'default' as const };
    }
  };
  
  const statusConfig = getStatusConfig(plan.status);

  return (
    <Card
      hoverable
      className="!rounded-2xl border-border/50 shadow-card"
      styles={{ body: { padding: 20 } }}
      onClick={() => navigate(`/plan/${plan.id}`)}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-foreground">{plan.title}</h3>
        <Tag color={statusConfig.color} className="!m-0">
          {statusConfig.text}
        </Tag>
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
    </Card>
  );
};

export default PlanCard;
