import { HistoryRecord } from '@/types';
import { FileText, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface HistoryCardProps {
  record: HistoryRecord;
}

const HistoryCard = ({ record }: HistoryCardProps) => {
  const navigate = useNavigate();
  
  const typeConfig = {
    learning: { icon: FileText, label: '教学', color: 'text-foreground', bgColor: 'bg-muted' },
    practice: { icon: Users, label: '练习', color: 'text-primary', bgColor: 'bg-accent' },
    exam: { icon: FileText, label: '考试', color: 'text-primary', bgColor: 'bg-accent' },
  };

  const config = typeConfig[record.type];
  const IconComponent = config.icon;

  return (
    <div className="bg-card rounded-xl p-4 shadow-card border-l-4 border-l-primary animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className={`p-2 rounded-lg ${config.bgColor}`}>
            <IconComponent className={`w-4 h-4 ${config.color}`} />
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-foreground text-sm mb-1 truncate">{record.title}</h4>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className={`px-2 py-0.5 rounded ${config.bgColor} ${config.color}`}>
                {config.label}
              </span>
              <span>{record.duration}</span>
              <span>|</span>
              <span>{record.date}</span>
            </div>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(`/history/${record.id}`)}
          className="ml-3 text-xs h-8 px-4 rounded-lg"
        >
          查看
        </Button>
      </div>
    </div>
  );
};

export default HistoryCard;
