import { Tabs, Tag } from 'antd';
import { Chapter } from '@/types';

interface ChapterTabsProps {
  chapters: Chapter[];
  activeChapter: number;
  onSelect: (index: number) => void;
}

const ChapterTabs = ({ chapters, activeChapter, onSelect }: ChapterTabsProps) => {
  const getStatusConfig = (status: Chapter['status']) => {
    switch (status) {
      case 'completed':
        return { label: '已完成', color: 'success' as const };
      case 'in_progress':
        return { label: '进行中', color: 'processing' as const };
      default:
        return { label: '待开启', color: 'default' as const };
    }
  };

  const items = chapters.map((chapter, index) => {
    const statusConfig = getStatusConfig(chapter.status);
    const isLocked = chapter.status === 'locked';
    
    return {
      key: String(index),
      label: (
        <div className={`flex flex-col items-center ${isLocked ? 'opacity-50' : ''}`}>
          <span>章节{chapter.number}</span>
          <Tag color={statusConfig.color} className="!m-0 !mt-1 !text-xs !px-1.5 !py-0">
            {statusConfig.label}
          </Tag>
        </div>
      ),
      disabled: isLocked,
    };
  });

  return (
    <div className="chapter-tabs px-4">
      <Tabs
        activeKey={String(activeChapter)}
        onChange={(key) => onSelect(Number(key))}
        items={items}
        className="chapter-tab-nav"
        tabBarStyle={{ marginBottom: 0 }}
      />
    </div>
  );
};

export default ChapterTabs;
