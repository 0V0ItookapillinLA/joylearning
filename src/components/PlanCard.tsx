import { Card, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Plan } from '@/types';
import avatarBusiness from '@/assets/avatar-business.png';
import { RightOutlined } from '@ant-design/icons';

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
    <div
      onClick={() => navigate(`/plan/${plan.id}`)}
      className="rounded-2xl overflow-hidden shadow-card hover:shadow-ai transition-shadow duration-300 cursor-pointer"
    >
      {/* Banner area */}
      <div className="gradient-ai-soft relative p-5 pb-3">
        {/* Decorative orbs */}
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-ai-purple/10 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-ai-cyan/10 blur-2xl" />
        
        <div className="relative flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Tag color={statusConfig.color} className="!m-0 !text-xs !rounded-full !px-2.5">
                {statusConfig.text}
              </Tag>
            </div>
            <h3 className="text-lg font-bold text-foreground leading-tight mb-1">{plan.title}</h3>
            <p className="text-xs text-muted-foreground">
              {plan.chapters} 章节 · 预计 {plan.estimatedHours} 小时
            </p>
          </div>
          <img 
            src={avatarBusiness} 
            alt="Training" 
            className="w-20 h-20 object-contain float"
          />
        </div>
      </div>

      {/* Bottom area */}
      <div className="bg-card px-5 py-3 flex items-center justify-between">
        <p className="text-sm text-muted-foreground line-clamp-1 flex-1">{plan.description}</p>
        <RightOutlined className="text-muted-foreground text-xs ml-2" />
      </div>
    </div>
  );
};

export default PlanCard;
