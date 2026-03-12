import { useNavigate } from 'react-router-dom';
import { RocketOutlined, ThunderboltOutlined, ClockCircleOutlined } from '@ant-design/icons';

const tasks = [
  { label: '跟读话术', duration: '5min', done: true },
  { label: '场景对练', duration: '8min', done: false },
  { label: '即兴应答', duration: '2min', done: false },
];

const AITrainingCard = () => {
  const navigate = useNavigate();
  const completedCount = tasks.filter(t => t.done).length;
  const totalMinutes = 15;
  const progress = (completedCount / tasks.length) * 100;

  return (
    <div className="relative overflow-hidden rounded-2xl gradient-ai-soft border border-border/30 shadow-ai p-5">
      {/* Decorative glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[hsl(var(--ai-purple)/0.15)] rounded-full blur-3xl" />
      <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-[hsl(var(--ai-cyan)/0.1)] rounded-full blur-2xl" />

      {/* Header */}
      <div className="relative flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-ai flex items-center justify-center shadow-glow">
            <ThunderboltOutlined className="text-primary-foreground text-sm" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">今日 AI 训练计划</p>
            <p className="text-[10px] text-muted-foreground flex items-center gap-1">
              <ClockCircleOutlined /> 预计 {totalMinutes} 分钟
            </p>
          </div>
        </div>
        {/* Progress ring */}
        <div className="relative w-11 h-11">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15" fill="none" stroke="hsl(var(--border))" strokeWidth="3" />
            <circle
              cx="18" cy="18" r="15" fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="3"
              strokeDasharray={`${progress * 0.94} 94.2`}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-primary">
            {completedCount}/{tasks.length}
          </span>
        </div>
      </div>

      {/* AI reason */}
      <p className="relative text-xs text-muted-foreground mb-3 leading-relaxed">
        基于你在<span className="text-primary font-medium">「异议处理」</span>维度的薄弱表现，今日重点强化应答技巧 🎯
      </p>

      {/* Task list */}
      <div className="relative flex gap-2 mb-4">
        {tasks.map((task, i) => (
          <div
            key={i}
            className={`flex-1 rounded-lg px-3 py-2 text-center border transition-all ${
              task.done
                ? 'bg-[hsl(var(--status-complete)/0.1)] border-[hsl(var(--status-complete)/0.3)]'
                : 'bg-card/60 border-border/40'
            }`}
          >
            <p className={`text-xs font-medium ${task.done ? 'text-[hsl(var(--status-complete))]' : 'text-foreground'}`}>
              {task.done ? '✓ ' : ''}{task.label}
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{task.duration}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={() => navigate('/practice')}
        className="relative w-full h-11 rounded-xl gradient-ai text-primary-foreground text-sm font-semibold shadow-glow active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
      >
        <RocketOutlined /> 开始训练
      </button>
    </div>
  );
};

export default AITrainingCard;
