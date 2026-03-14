import { useNavigate } from 'react-router-dom';
import { Tag } from 'antd';
import { FireOutlined, UserOutlined } from '@ant-design/icons';
import { PracticeScenario } from '@/types';

interface ScenarioCardProps {
  scenario: PracticeScenario;
}

const difficultyStars = (level: number) =>
  Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={i < level ? 'text-amber-400' : 'text-muted-foreground/30'}>★</span>
  ));

const formatCount = (n: number) => {
  if (n >= 10000) return `${(n / 10000).toFixed(1)}万`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return `${n}`;
};

const ScenarioCard = ({ scenario }: ScenarioCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/scenario/${scenario.id}`)}
      className="bg-card rounded-2xl p-4 shadow-card cursor-pointer hover:shadow-ai transition-all duration-300 relative overflow-hidden group"
    >
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-20 h-20 rounded-full gradient-ai-soft blur-2xl opacity-60 group-hover:opacity-100 transition-opacity" />

      <div className="relative">
        {/* Avatar */}
        <div className="text-4xl mb-3">{scenario.avatar}</div>

        {/* Name & Role */}
        <h4 className="font-semibold text-foreground text-sm leading-tight mb-0.5">
          {scenario.name}
        </h4>
        <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{scenario.role}</p>

        {/* Difficulty */}
        <div className="flex items-center gap-0.5 text-[10px] mb-2">
          {difficultyStars(scenario.difficulty)}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {scenario.tags.slice(0, 2).map(tag => (
            <Tag
              key={tag}
              className="!text-[10px] !px-1.5 !py-0 !m-0 !border-primary/20 !text-accent-foreground !bg-accent !rounded-full !leading-relaxed"
            >
              #{tag}
            </Tag>
          ))}
        </div>

        {/* Practice count */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <FireOutlined className="text-destructive" />
          <span>{formatCount(scenario.practiceCount)}人次练过</span>
        </div>
      </div>
    </div>
  );
};

export default ScenarioCard;
