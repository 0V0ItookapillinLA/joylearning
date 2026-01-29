import { Card, Button, Tag } from 'antd';
import { FileTextOutlined, TeamOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { HistoryRecord } from '@/types';

interface HistoryCardProps {
  record: HistoryRecord;
}

const HistoryCard = ({ record }: HistoryCardProps) => {
  const navigate = useNavigate();
  
  const typeConfig = {
    learning: { icon: <FileTextOutlined />, label: '教学', color: 'default' as const },
    practice: { icon: <TeamOutlined />, label: '练习', color: 'processing' as const },
    exam: { icon: <FileTextOutlined />, label: '考试', color: 'processing' as const },
  };

  const config = typeConfig[record.type];

  return (
    <Card 
      className="!rounded-xl shadow-card border-l-4 !border-l-primary relative"
      styles={{ body: { padding: 16 } }}
    >
      {/* Plan Badge */}
      {record.planName && (
        <div className="absolute -top-1 -right-1 bg-primary/10 text-primary text-xs px-2 py-1 rounded-bl-lg rounded-tr-xl font-medium">
          {record.planName}
        </div>
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className="p-2 rounded-lg bg-muted flex items-center justify-center">
            {config.icon}
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-foreground text-sm mb-1 truncate pr-20">{record.title}</h4>
            <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
              <Tag color={config.color} className="!m-0 !text-xs">
                {config.label}
              </Tag>
              <span>{record.duration}</span>
              <span>|</span>
              <span>{record.date}</span>
            </div>
          </div>
        </div>
        
        <Button
          type="default"
          size="small"
          onClick={() => navigate(`/history/${record.id}`)}
          className="ml-3 !text-xs !h-8 !px-4 !rounded-lg"
        >
          查看
        </Button>
      </div>
    </Card>
  );
};

export default HistoryCard;
