import { useState } from 'react';
import { Card, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import avatarAi from '@/assets/avatar-ai.png';

const { Text } = Typography;

interface AIAssistantFABProps {
  suggestion?: string;
}

const AIAssistantFAB = ({ 
  suggestion = '建议先完成第1章的练习再看教学视频，这样学习效果更好哦！' 
}: AIAssistantFABProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed right-4 bottom-28 z-50">
      {/* Panel */}
      {open && (
        <Card
          className="!rounded-xl shadow-ai !border-0 mb-3 animate-scale-in w-64"
          styles={{ body: { padding: 14 } }}
        >
          <div className="flex items-start gap-2">
            <img src={avatarAi} alt="AI" className="w-8 h-8 rounded-full flex-shrink-0" />
            <div className="flex-1">
              <Text strong className="text-sm text-foreground block mb-1">AI 学习助手</Text>
              <Text className="text-xs text-muted-foreground leading-relaxed">{suggestion}</Text>
            </div>
            <CloseOutlined 
              className="text-muted-foreground text-xs cursor-pointer" 
              onClick={(e) => { e.stopPropagation(); setOpen(false); }} 
            />
          </div>
        </Card>
      )}

      {/* FAB button */}
      <div
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full gradient-ai flex items-center justify-center cursor-pointer shadow-ai relative"
      >
        {/* Pulse ring */}
        {!open && (
          <div className="absolute inset-0 rounded-full border-2 border-ai-purple/30 animate-ping" 
               style={{ animationDuration: '2s' }} />
        )}
        <span className="text-2xl relative">🤖</span>
      </div>
    </div>
  );
};

export default AIAssistantFAB;
