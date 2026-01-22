import { AbilityScore } from '@/types';
import { useMemo } from 'react';

interface RadarChartProps {
  data: AbilityScore[];
  size?: number;
}

const RadarChart = ({ data, size = 220 }: RadarChartProps) => {
  const center = size / 2;
  const radius = size / 2 - 40;
  const levels = 5;

  const points = useMemo(() => {
    const angleStep = (2 * Math.PI) / data.length;
    return data.map((item, index) => {
      const angle = angleStep * index - Math.PI / 2;
      const r = (item.score / item.maxScore) * radius;
      return {
        x: center + r * Math.cos(angle),
        y: center + r * Math.sin(angle),
        labelX: center + (radius + 25) * Math.cos(angle),
        labelY: center + (radius + 25) * Math.sin(angle),
        name: item.name,
        score: item.score,
      };
    });
  }, [data, center, radius]);

  const polygonPoints = points.map(p => `${p.x},${p.y}`).join(' ');

  const gridPolygons = useMemo(() => {
    return Array.from({ length: levels }, (_, levelIndex) => {
      const levelRadius = (radius * (levelIndex + 1)) / levels;
      const angleStep = (2 * Math.PI) / data.length;
      return data.map((_, index) => {
        const angle = angleStep * index - Math.PI / 2;
        return `${center + levelRadius * Math.cos(angle)},${center + levelRadius * Math.sin(angle)}`;
      }).join(' ');
    });
  }, [data.length, center, radius, levels]);

  return (
    <div className="flex justify-center items-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* Grid lines */}
        {gridPolygons.map((points, index) => (
          <polygon
            key={index}
            points={points}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="1"
            opacity={0.5}
          />
        ))}
        
        {/* Axis lines */}
        {points.map((point, index) => (
          <line
            key={index}
            x1={center}
            y1={center}
            x2={center + radius * Math.cos((2 * Math.PI * index) / data.length - Math.PI / 2)}
            y2={center + radius * Math.sin((2 * Math.PI * index) / data.length - Math.PI / 2)}
            stroke="hsl(var(--border))"
            strokeWidth="1"
            opacity={0.5}
          />
        ))}
        
        {/* Data polygon */}
        <polygon
          points={polygonPoints}
          fill="hsl(var(--primary) / 0.2)"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
        />
        
        {/* Data points */}
        {points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="hsl(var(--primary))"
          />
        ))}
        
        {/* Labels */}
        {points.map((point, index) => (
          <g key={index}>
            <text
              x={point.labelX}
              y={point.labelY - 6}
              textAnchor="middle"
              className="text-xs fill-foreground font-medium"
            >
              {point.name}
            </text>
            <text
              x={point.labelX}
              y={point.labelY + 8}
              textAnchor="middle"
              className="text-xs fill-muted-foreground"
            >
              得分{point.score}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default RadarChart;
