import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, MoreHorizontal, Users } from 'lucide-react';
import avatarInterviewer from '@/assets/avatar-interviewer.png';

const PracticeDetail = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleStart = () => {
    navigate('/practice/onboarding');
  };

  const scenes = [
    {
      title: '第一幕：客户寒暄',
      goal: '建立信任关系，了解客户基本情况和当前业务状态',
    },
    {
      title: '第二幕：需求挖掘',
      goal: '深入了解客户痛点，挖掘仓配需求和期望',
    },
    {
      title: '第三幕：方案推荐',
      goal: '针对痛点匹配解决方案，处理客户异议并推进下一步',
    },
  ];

  const painPoints = [
    '促销波峰波谷明显，仓配弹性不足导致爆仓/断货',
    '破损/丢损/签收争议影响经销商满意度',
    '高峰期时效不稳定，平台罚款/退货率上升',
    '成本压力大，想降本但不敢牺牲服务体验',
    '系统协同差，库存/订单/配送信息不透明',
  ];

  const scoringCriteria = [
    { name: '需求澄清', percentage: 20, description: '问到关键数据，能复述确认客户诉求' },
    { name: '方案匹配', percentage: 20, description: '能把痛点映射到能力点，表达清晰不泛泛' },
    { name: '异议处理', percentage: 20, description: '不硬怼，先理解再回应，有证据/方案' },
    { name: '推进结果', percentage: 20, description: '能提出下一步并获得客户明确态度' },
    { name: '沟通表达', percentage: 20, description: '语气专业、结构清晰、控制节奏' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex justify-center">
      <div className="w-full max-w-md flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-background/80 backdrop-blur sticky top-0 z-10">
          <button onClick={handleBack} className="p-2 -ml-2">
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-base font-semibold text-foreground">陪练详情</h1>
          <button className="p-2 -mr-2">
            <MoreHorizontal className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 px-4 pb-24 overflow-auto">
          {/* Practice Card */}
          <div className="bg-card rounded-xl p-4 shadow-sm border mt-2">
            {/* Title */}
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">销售练习 白酒仓储方向</span>
            </div>

            {/* Banner Image */}
            <div className="rounded-lg overflow-hidden mb-4 aspect-video bg-muted">
              <img 
                src={avatarInterviewer} 
                alt="练习场景" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Customer Role */}
            <div className="mb-4">
              <h3 className="font-semibold text-foreground mb-2">客户角色</h3>
              <p className="text-sm text-muted-foreground">白酒品牌方/经销商负责人</p>
            </div>

            {/* Goal */}
            <div className="mb-4">
              <h3 className="font-semibold text-foreground mb-2">本次目标</h3>
              <p className="text-sm text-muted-foreground">
                推动客户同意进入下一步（例如：预约方案评估/确认需求清单/约见）
              </p>
            </div>

            {/* Script Goals */}
            <div className="mb-4">
              <h3 className="font-semibold text-foreground mb-2">剧本目标</h3>
              <div className="space-y-3">
                {scenes.map((scene, index) => (
                  <div key={index} className="text-sm">
                    <p className="text-primary font-medium">{scene.title}</p>
                    <p className="text-muted-foreground">目标：{scene.goal}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pain Points */}
            <div className="mb-4">
              <h3 className="font-semibold text-foreground mb-2">客户当前痛点</h3>
              <ul className="space-y-2">
                {painPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-1">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Scoring Criteria */}
            <div>
              <h3 className="font-semibold text-foreground mb-2">评分标准</h3>
              <div className="space-y-3">
                {scoringCriteria.map((criteria, index) => (
                  <div key={index} className="text-sm">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-medium text-foreground">{criteria.name}</span>
                      <span className="text-xs text-primary">({criteria.percentage}%)</span>
                    </div>
                    <p className="text-muted-foreground">{criteria.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 safe-bottom flex justify-center">
          <div className="w-full max-w-md flex gap-3">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="flex-1 h-12 rounded-full text-base"
            >
              取消
            </Button>
            <Button
              onClick={handleStart}
              className="flex-1 h-12 rounded-full bg-primary hover:bg-primary/90 text-base"
            >
              开始练习
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeDetail;
