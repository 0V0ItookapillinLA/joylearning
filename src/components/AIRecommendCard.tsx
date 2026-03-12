import { useNavigate } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';

interface AIRecommendCardProps {
  weakness?: string;
  courseTitle?: string;
  courseId?: string;
}

const AIRecommendCard = ({ 
  weakness = '异议处理', 
  courseTitle = '客户异议处理进阶', 
  courseId = '3' 
}: AIRecommendCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="gradient-ai rounded-2xl p-4 cursor-pointer relative overflow-hidden"
      onClick={() => navigate(`/plan/${courseId}`)}
    >
      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-primary-foreground/10 blur-3xl" />
      
      <div className="relative">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">✨</span>
          <span className="text-sm font-semibold text-primary-foreground">AI 为你推荐</span>
        </div>
        <p className="text-xs text-primary-foreground/80 mb-1">
          📈 基于你的薄弱项：<span className="font-semibold text-primary-foreground">{weakness}</span>
        </p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm font-medium text-primary-foreground">{courseTitle}</span>
          <RightOutlined className="text-primary-foreground/60 text-xs" />
        </div>
      </div>
    </div>
  );
};

export default AIRecommendCard;
