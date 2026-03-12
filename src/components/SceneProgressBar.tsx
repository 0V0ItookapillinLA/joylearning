import { Typography } from 'antd';

const { Text } = Typography;

interface Props {
  currentScene: number;
  totalScenes: number;
  /** Rough progress within current scene (0-100) */
  sceneProgress?: number;
}

const SceneProgressBar = ({ currentScene, totalScenes, sceneProgress = 0 }: Props) => {
  return (
    <div className="flex items-center gap-2 px-1">
      {Array.from({ length: totalScenes }).map((_, i) => {
        const isCompleted = i < currentScene;
        const isCurrent = i === currentScene;

        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isCompleted
                    ? 'bg-[hsl(var(--status-complete))]'
                    : isCurrent
                      ? 'gradient-ai'
                      : 'bg-transparent'
                }`}
                style={{ width: isCompleted ? '100%' : isCurrent ? `${Math.max(sceneProgress, 5)}%` : '0%' }}
              />
            </div>
            <Text className={`!text-[10px] ${isCurrent ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
              第{i + 1}幕
            </Text>
          </div>
        );
      })}
    </div>
  );
};

export default SceneProgressBar;
