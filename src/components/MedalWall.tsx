import { useState } from 'react';
import { Card, Tag, Typography, Modal } from 'antd';

const { Text } = Typography;

export interface Medal {
  id: string;
  name: string;
  category: string;
  level: number;
  description: string;
  unlockCondition: string;
  earnedDate?: string;
  isUnlocked: boolean;
}

// Mock medal data
const medalCategories = [
  {
    name: '坚持达人',
    medals: [
      { id: '1', name: '坚持达人', category: '坚持达人', level: 3, description: '连续3天保持登录\n迈出养成习惯的第一步', unlockCondition: '连续登录3天', earnedDate: '2025-12-28', isUnlocked: true },
      { id: '2', name: '坚持达人', category: '坚持达人', level: 7, description: '坚持一周\n学习节奏初步建立', unlockCondition: '连续登录7天', earnedDate: '2025-12-31', isUnlocked: true },
      { id: '3', name: '坚持达人', category: '坚持达人', level: 14, description: '两周不间断\n专注力显著提升', unlockCondition: '连续登录14天', isUnlocked: false },
      { id: '4', name: '坚持达人', category: '坚持达人', level: 30, description: '明确定量的月度投入\n形成稳定学习习惯', unlockCondition: '连续登录30天', isUnlocked: false },
      { id: '5', name: '坚持达人', category: '坚持达人', level: 50, description: '跨越50日，纪律性与自\n驱力同步增强', unlockCondition: '连续登录50天', isUnlocked: false },
      { id: '6', name: '坚持达人', category: '坚持达人', level: 75, description: '75日连贯积累\n耐力与韧性可见', unlockCondition: '连续登录75天', isUnlocked: false },
    ]
  },
  {
    name: '求知达人',
    medals: [
      { id: '7', name: '求知达人', category: '求知达人', level: 10, description: '完成10门课程\n构建基础知识图谱', unlockCondition: '完成10门课程', earnedDate: '2025-11-15', isUnlocked: true },
      { id: '8', name: '求知达人', category: '求知达人', level: 20, description: '扩展至20门\n跨域认知逐步成形', unlockCondition: '完成20门课程', earnedDate: '2025-12-20', isUnlocked: true },
      { id: '9', name: '求知达人', category: '求知达人', level: 30, description: '30门体系化学习\n能力结构更完整', unlockCondition: '完成30门课程', isUnlocked: false },
      { id: '10', name: '求知达人', category: '求知达人', level: 40, description: '四十门深化\n知识网络开始互联', unlockCondition: '完成40门课程', isUnlocked: false },
      { id: '11', name: '求知达人', category: '求知达人', level: 50, description: '五十门追光\n形成可迁移的洞察能力', unlockCondition: '完成50门课程', isUnlocked: false },
    ]
  },
  {
    name: '高水平选手',
    medals: [
      { id: '12', name: '高水平选手', category: '高水平选手', level: 1, description: '达成一次90+\n能力边界与正确方法', unlockCondition: '单次得分90+', earnedDate: '2025-10-08', isUnlocked: true },
      { id: '13', name: '高水平选手', category: '高水平选手', level: 5, description: '稳定5次90+\n质量与稳定性持续', unlockCondition: '5次得分90+', isUnlocked: false },
      { id: '14', name: '高水平选手', category: '高水平选手', level: 10, description: '十次高分，输出水准\n入可复用阶段', unlockCondition: '10次得分90+', isUnlocked: false },
      { id: '15', name: '高水平选手', category: '高水平选手', level: 20, description: '二十次高分，在高标准\n下保持一致发挥', unlockCondition: '20次得分90+', isUnlocked: false },
      { id: '16', name: '高水平选手', category: '高水平选手', level: 30, description: '三十次90+，相互串联\n基准与团队标杆', unlockCondition: '30次得分90+', isUnlocked: false },
    ]
  },
  {
    name: '练习狂魔',
    medals: [
      { id: '17', name: '练习狂魔', category: '练习狂魔', level: 1, description: '完成1次陪练\n打下基本功', unlockCondition: '完成1次练习', earnedDate: '2025-09-01', isUnlocked: true },
      { id: '18', name: '练习狂魔', category: '练习狂魔', level: 10, description: '累计10次\n节奏与耐力间显增强', unlockCondition: '完成10次练习', earnedDate: '2025-10-15', isUnlocked: true },
      { id: '19', name: '练习狂魔', category: '练习狂魔', level: 30, description: '达到30次\n进入高频高效训练期', unlockCondition: '完成30次练习', isUnlocked: false },
      { id: '20', name: '练习狂魔', category: '练习狂魔', level: 50, description: '累计50次\n技能熟练习持续打磨', unlockCondition: '完成50次练习', isUnlocked: false },
      { id: '21', name: '练习狂魔', category: '练习狂魔', level: 100, description: '跨越100次\n形成深知的实践途径', unlockCondition: '完成100次练习', isUnlocked: false },
    ]
  }
];

const MedalWall = () => {
  const [selectedMedal, setSelectedMedal] = useState<Medal | null>(null);

  const getMedalColor = (category: string, isUnlocked: boolean) => {
    if (!isUnlocked) return 'bg-muted';
    
    const colorMap: Record<string, string> = {
      '坚持达人': 'bg-gradient-to-br from-amber-400 to-amber-600',
      '求知达人': 'bg-gradient-to-br from-violet-500 to-purple-700',
      '高水平选手': 'bg-gradient-to-br from-sky-400 to-blue-600',
      '练习狂魔': 'bg-gradient-to-br from-emerald-400 to-green-600',
    };
    return colorMap[category] || 'bg-gradient-to-br from-gray-400 to-gray-600';
  };

  const getMedalShape = (category: string) => {
    const shapeMap: Record<string, string> = {
      '坚持达人': 'rounded-full',
      '求知达人': 'clip-hexagon',
      '高水平选手': 'clip-pentagon',
      '练习狂魔': 'rounded-lg',
    };
    return shapeMap[category] || 'rounded-full';
  };

  return (
    <div className="space-y-6">
      {medalCategories.map((category) => (
        <Card key={category.name} className="!rounded-xl shadow-card" styles={{ body: { padding: 16 } }}>
          <Text strong className="block mb-4">{category.name}</Text>
          
          <div className="grid grid-cols-3 gap-4">
            {category.medals.map((medal) => (
              <div 
                key={medal.id} 
                className="flex flex-col items-center"
                onClick={() => medal.isUnlocked && setSelectedMedal(medal)}
              >
                <div 
                  className={`w-16 h-16 ${getMedalColor(medal.category, medal.isUnlocked)} ${getMedalShape(medal.category)} flex items-center justify-center mb-2 ${medal.isUnlocked ? 'cursor-pointer hover:scale-105 transition-transform shadow-md' : 'opacity-50'}`}
                >
                  <div className="text-center">
                    <div className="text-white text-lg font-bold">{medal.level}</div>
                    <div className="text-white text-[8px] uppercase tracking-wider">
                      {medal.category === '练习狂魔' ? 'CPRS' : 'DAYS'}
                    </div>
                  </div>
                </div>
                <Text className={`text-xs text-center ${medal.isUnlocked ? 'text-primary' : 'text-muted-foreground'}`}>
                  {medal.name}
                </Text>
                <Text type="secondary" className="text-[10px] text-center mt-1 line-clamp-2 px-1">
                  {medal.description.split('\n')[0]}
                </Text>
                {!medal.isUnlocked && (
                  <Tag color="blue" className="!mt-1 !text-[10px] !px-2 !py-0">
                    {medal.unlockCondition}
                  </Tag>
                )}
              </div>
            ))}
          </div>
        </Card>
      ))}

      <Modal
        open={!!selectedMedal}
        onCancel={() => setSelectedMedal(null)}
        footer={null}
        centered
        title={selectedMedal?.name}
      >
        {selectedMedal && (
          <div className="text-center py-4">
            <div 
              className={`w-24 h-24 ${getMedalColor(selectedMedal.category, selectedMedal.isUnlocked)} ${getMedalShape(selectedMedal.category)} flex items-center justify-center mx-auto mb-4 shadow-lg`}
            >
              <div className="text-center">
                <div className="text-white text-2xl font-bold">{selectedMedal.level}</div>
                <div className="text-white text-xs uppercase tracking-wider">
                  {selectedMedal.category === '练习狂魔' ? 'CPRS' : 'DAYS'}
                </div>
              </div>
            </div>
            <Text className="block whitespace-pre-line mb-4">{selectedMedal.description}</Text>
            {selectedMedal.earnedDate && (
              <Tag color="success">获得时间：{selectedMedal.earnedDate}</Tag>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MedalWall;
