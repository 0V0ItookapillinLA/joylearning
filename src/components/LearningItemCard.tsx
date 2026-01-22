import { LearningItem } from '@/types';
import { Play, Users, FileText, Clock, CheckCircle, Loader2, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface LearningItemCardProps {
  item: LearningItem;
}

const LearningItemCard = ({ item }: LearningItemCardProps) => {
  const navigate = useNavigate();
  
  const typeConfig = {
    learning: {
      icon: Play,
      label: '教学',
      color: 'text-foreground',
      bgColor: 'bg-muted',
    },
    practice: {
      icon: Users,
      label: '练习',
      color: 'text-primary',
      bgColor: 'bg-accent',
    },
    exam: {
      icon: FileText,
      label: '考试',
      color: 'text-primary',
      bgColor: 'bg-accent',
    },
  };

  const statusConfig = {
    not_started: { icon: Clock, label: '未开始', btnLabel: item.type === 'learning' ? '开始学习' : item.type === 'practice' ? '开始练习' : '开始考试' },
    in_progress: { icon: Loader2, label: '进行中', btnLabel: item.type === 'learning' ? '继续学习' : item.type === 'practice' ? '继续练习' : '继续考试' },
    completed: { icon: CheckCircle, label: '已完成', btnLabel: item.type === 'learning' ? '再次学习' : item.type === 'practice' ? '再次练习' : '再次考试' },
    locked: { icon: Lock, label: '暂未开始', btnLabel: '暂未开始' },
  };

  const config = typeConfig[item.type];
  const status = statusConfig[item.status];
  const IconComponent = config.icon;
  const StatusIcon = status.icon;

  const handleClick = () => {
    if (item.status === 'locked') return;
    if (item.type === 'practice') {
      navigate('/practice/detail');
    }
  };

  return (
    <div className="bg-card rounded-xl p-4 shadow-card flex items-center justify-between animate-fade-in">
      <div className="flex items-start gap-3 flex-1">
        <div className={`p-2 rounded-lg ${config.bgColor}`}>
          <IconComponent className={`w-4 h-4 ${config.color}`} />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-foreground text-sm mb-1 truncate">{item.title}</h4>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className={`px-2 py-0.5 rounded ${config.bgColor} ${config.color}`}>
              {config.label}
            </span>
            <span>{item.duration}</span>
            <span className="flex items-center gap-1">
              <StatusIcon className={`w-3 h-3 ${item.status === 'in_progress' ? 'animate-spin' : ''}`} />
              {status.label}
            </span>
          </div>
        </div>
      </div>
      
      <Button
        variant={item.status === 'locked' ? 'ghost' : 'outline'}
        size="sm"
        disabled={item.status === 'locked'}
        onClick={handleClick}
        className="ml-3 text-xs h-8 px-3 rounded-lg whitespace-nowrap"
      >
        {status.btnLabel}
      </Button>
    </div>
  );
};

export default LearningItemCard;
