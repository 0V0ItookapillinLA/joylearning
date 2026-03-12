import { useNavigate } from 'react-router-dom';
import { Progress } from 'antd';
import { CheckCircleOutlined, LoadingOutlined, BookOutlined } from '@ant-design/icons';
import { Plan } from '@/types';

interface CourseGridCardProps {
  plan: Plan;
}

const CourseGridCard = ({ plan }: CourseGridCardProps) => {
  const navigate = useNavigate();

  const statusIcon = () => {
    switch (plan.status) {
      case 'completed':
        return <CheckCircleOutlined className="text-status-complete" />;
      case 'in_progress':
        return <LoadingOutlined spin className="text-primary" />;
      default:
        return <BookOutlined className="text-muted-foreground" />;
    }
  };

  return (
    <div
      onClick={() => navigate(`/plan/${plan.id}`)}
      className="bg-card rounded-xl p-4 shadow-card cursor-pointer hover:shadow-ai transition-shadow duration-300 relative overflow-hidden"
    >
      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-16 h-16 rounded-full bg-ai-purple/5 blur-2xl" />

      {/* Status icon */}
      <div className="flex items-center justify-between mb-2">
        {statusIcon()}
        {plan.aiMatchScore && (
          <span className="text-xs text-ai-purple font-medium">
            AI匹配 {plan.aiMatchScore}%
          </span>
        )}
      </div>

      {/* Title */}
      <h4 className="font-semibold text-foreground text-sm mb-1 line-clamp-2 leading-tight">
        {plan.title}
      </h4>

      {/* Meta */}
      <p className="text-xs text-muted-foreground mb-3">
        {plan.chapters}章 · {plan.estimatedHours}h
      </p>

      {/* Progress bar */}
      {(plan.progress ?? 0) > 0 && (
        <Progress
          percent={plan.progress}
          size="small"
          strokeColor="hsl(var(--primary))"
          trailColor="hsl(var(--muted))"
          showInfo={false}
          className="!mb-0"
        />
      )}
    </div>
  );
};

export default CourseGridCard;
