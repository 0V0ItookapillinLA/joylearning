import { Chapter } from '@/types';

interface ChapterTabsProps {
  chapters: Chapter[];
  activeChapter: number;
  onSelect: (index: number) => void;
}

const ChapterTabs = ({ chapters, activeChapter, onSelect }: ChapterTabsProps) => {
  const statusConfig = {
    completed: { label: '已完成', color: 'text-status-complete' },
    in_progress: { label: '进行中', color: 'text-primary' },
    locked: { label: '待开启', color: 'text-muted-foreground' },
    not_started: { label: '待开启', color: 'text-muted-foreground' },
  };

  return (
    <div className="overflow-x-auto hide-scrollbar">
      <div className="flex gap-1 px-4 py-3 min-w-max">
        {chapters.map((chapter, index) => {
          const isActive = index === activeChapter;
          const status = statusConfig[chapter.status];
          
          return (
            <button
              key={chapter.id}
              onClick={() => chapter.status !== 'locked' && onSelect(index)}
              className={`flex flex-col items-center px-4 py-2 rounded-lg transition-all ${
                isActive 
                  ? 'bg-transparent' 
                  : 'hover:bg-accent'
              } ${chapter.status === 'locked' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <span className={`text-sm font-medium ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                章节{chapter.number}
              </span>
              <span className={`text-xs ${status.color}`}>{status.label}</span>
              {isActive && (
                <div className="w-8 h-0.5 bg-primary rounded-full mt-2" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ChapterTabs;
