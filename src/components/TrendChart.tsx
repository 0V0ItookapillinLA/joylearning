import { useMemo } from 'react';
import { TrendingUp, Calendar } from 'lucide-react';

interface TrendChartProps {
  className?: string;
}

const TrendChart = ({ className }: TrendChartProps) => {
  const data = useMemo(() => [
    { x: 0, y: 65 },
    { x: 1, y: 70 },
    { x: 2, y: 68 },
    { x: 3, y: 75 },
    { x: 4, y: 72 },
    { x: 5, y: 80 },
    { x: 6, y: 85 },
    { x: 7, y: 82 },
    { x: 8, y: 88 },
  ], []);

  const width = 320;
  const height = 150;
  const padding = { top: 20, right: 20, bottom: 30, left: 40 };
  
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  
  const maxY = Math.max(...data.map(d => d.y));
  const minY = Math.min(...data.map(d => d.y));
  
  const points = data.map((d, i) => ({
    x: padding.left + (i / (data.length - 1)) * chartWidth,
    y: padding.top + chartHeight - ((d.y - minY) / (maxY - minY)) * chartHeight,
  }));
  
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padding.bottom} L ${padding.left} ${height - padding.bottom} Z`;

  return (
    <div className={`bg-card rounded-xl p-4 shadow-card ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-4 h-4 text-primary" />
        <h3 className="font-medium text-foreground">变化趋势图</h3>
      </div>
      
      <div className="flex gap-3 mb-4">
        <button className="flex items-center gap-1 px-3 py-1.5 bg-muted rounded-lg text-sm">
          陪练 <span className="text-xs">▼</span>
        </button>
        <button className="flex items-center gap-1 px-3 py-1.5 bg-muted rounded-lg text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          选择时间 <span className="text-xs">▼</span>
        </button>
      </div>
      
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((val, i) => {
          const y = padding.top + chartHeight - (chartHeight * i) / 4;
          return (
            <line
              key={val}
              x1={padding.left}
              y1={y}
              x2={width - padding.right}
              y2={y}
              stroke="hsl(var(--border))"
              strokeDasharray="4 4"
              opacity={0.5}
            />
          );
        })}
        
        {/* Area */}
        <path d={areaPath} fill="url(#areaGradient)" />
        
        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Points */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="3"
            fill="hsl(var(--card))"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
          />
        ))}
      </svg>
    </div>
  );
};

export default TrendChart;
