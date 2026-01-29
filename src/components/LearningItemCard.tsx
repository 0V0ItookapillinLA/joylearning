import { Card, Button, Tag } from 'antd';
import { PlayCircleOutlined, TeamOutlined, FileTextOutlined, ClockCircleOutlined, CheckCircleOutlined, LoadingOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { LearningItem } from '@/types';

interface LearningItemCardProps {
  item: LearningItem;
}

const LearningItemCard = ({ item }: LearningItemCardProps) => {
  const navigate = useNavigate();
  
  const typeConfig = {
    learning: {
      icon: <PlayCircleOutlined className="text-foreground" />,
      label: '教学',
      color: 'default' as const,
    },
    practice: {
      icon: <TeamOutlined className="text-primary" />,
      label: '练习',
      color: 'processing' as const,
    },
    exam: {
      icon: <FileTextOutlined className="text-primary" />,
      label: '考试',
      color: 'processing' as const,
    },
  };

  const statusConfig = {
    not_started: { 
      icon: <ClockCircleOutlined />, 
      label: '未开始', 
      btnLabel: item.type === 'learning' ? '开始学习' : item.type === 'practice' ? '开始练习' : '开始考试',
      tagColor: 'default' as const,
    },
    in_progress: { 
      icon: <LoadingOutlined spin />, 
      label: '进行中', 
      btnLabel: item.type === 'learning' ? '继续学习' : item.type === 'practice' ? '继续练习' : '继续考试',
      tagColor: 'processing' as const,
    },
    completed: { 
      icon: <CheckCircleOutlined />, 
      label: '已完成', 
      btnLabel: item.type === 'learning' ? '再次学习' : item.type === 'practice' ? '再次练习' : '再次考试',
      tagColor: 'success' as const,
    },
    locked: { 
      icon: <LockOutlined />, 
      label: '暂未开始', 
      btnLabel: '暂未开始',
      tagColor: 'default' as const,
    },
  };

  const config = typeConfig[item.type];
  const status = statusConfig[item.status];

  const handleClick = () => {
    if (item.status === 'locked') return;
    if (item.type === 'practice') {
      navigate('/practice/detail');
    }
  };

  return (
    <Card
      hoverable={item.status !== 'locked'}
      className={`!rounded-xl border-border/50 ${item.status === 'locked' ? 'opacity-60' : ''}`}
      styles={{ body: { padding: 16 } }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className="p-2 rounded-lg bg-muted flex items-center justify-center">
            {config.icon}
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-foreground text-sm mb-1 truncate">{item.title}</h4>
            <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
              <Tag color={config.color} className="!m-0 !text-xs">
                {config.label}
              </Tag>
              <span>{item.duration}</span>
              <Tag 
                icon={status.icon} 
                color={status.tagColor} 
                className="!m-0 !text-xs"
              >
                {status.label}
              </Tag>
            </div>
          </div>
        </div>
        
        <Button
          type={item.status === 'locked' ? 'text' : 'default'}
          size="small"
          disabled={item.status === 'locked'}
          onClick={handleClick}
          className="ml-3 !text-xs !h-8 !px-3 !rounded-lg whitespace-nowrap"
        >
          {status.btnLabel}
        </Button>
      </div>
    </Card>
  );
};

export default LearningItemCard;
