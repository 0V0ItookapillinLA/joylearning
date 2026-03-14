import { useNavigate } from 'react-router-dom';
import { HeartOutlined, RightOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import { PublicPracticeRecord } from '@/types';

interface PublicPracticeCardProps {
  record: PublicPracticeRecord;
}

const PublicPracticeCard = ({ record }: PublicPracticeCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/scenario/${record.scenarioId}`)}
      className="bg-card rounded-2xl p-4 shadow-card cursor-pointer hover:shadow-soft transition-all duration-300"
    >
      {/* User row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{record.userAvatar}</span>
          <span className="text-sm font-medium text-foreground">{record.userName}</span>
        </div>
        <span className="text-xs text-muted-foreground">{record.date}</span>
      </div>

      {/* Scenario ref */}
      <div className="flex items-center gap-2 mb-2">
        <Tag className="!text-[10px] !px-2 !py-0 !m-0 !rounded-full !bg-accent !text-accent-foreground !border-accent">
          和「{record.scenarioName}」对练
        </Tag>
        <Tag className="!text-[10px] !px-2 !py-0 !m-0 !rounded-full !bg-muted !text-muted-foreground !border-muted">
          {record.practiceMode === 'scripted' ? '剧本模式' : '自由模式'}
        </Tag>
      </div>

      {/* Highlight quote */}
      <p className="text-sm text-foreground leading-relaxed mb-3">
        "{record.highlight}"
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <HeartOutlined />
            <span>{record.likes}</span>
          </div>
          <span className="text-xs font-medium text-primary">
            得分 {record.score}
          </span>
        </div>
        <RightOutlined className="text-xs text-muted-foreground" />
      </div>
    </div>
  );
};

export default PublicPracticeCard;
