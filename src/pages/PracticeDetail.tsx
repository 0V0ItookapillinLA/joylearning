import { useNavigate } from 'react-router-dom';
import { Button, Card, Typography } from 'antd';
import { LeftOutlined, MoreOutlined, TeamOutlined } from '@ant-design/icons';
import avatarInterviewer from '@/assets/avatar-interviewer.png';

const { Text } = Typography;

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
          <Button type="text" icon={<LeftOutlined />} onClick={handleBack} />
          <h1 className="text-base font-semibold text-foreground">陪练详情</h1>
          <Button type="text" icon={<MoreOutlined />} />
        </div>

        {/* Content */}
        <div className="flex-1 px-4 pb-24 overflow-auto">
          {/* Practice Card */}
          <Card className="!rounded-xl shadow-sm !mt-2" styles={{ body: { padding: 16 } }}>
            {/* Title */}
            <div className="flex items-center gap-2 mb-4">
              <TeamOutlined className="text-primary text-lg" />
              <Text strong>零售采销练习 白酒仓储方向</Text>
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
              <Text strong className="block mb-2">客户角色</Text>
              <Text type="secondary">白酒品牌方/经销商负责人</Text>
            </div>

            {/* Goal */}
            <div className="mb-4">
              <Text strong className="block mb-2">本次目标</Text>
              <Text type="secondary">
                推动客户同意进入下一步（例如：预约方案评估/确认需求清单/约见）
              </Text>
            </div>

            {/* Script Goals */}
            <div className="mb-4">
              <Text strong className="block mb-2">剧本目标</Text>
              <div className="space-y-3">
                {scenes.map((scene, index) => (
                  <div key={index} className="text-sm">
                    <Text className="text-primary font-medium">{scene.title}</Text>
                    <Text type="secondary" className="block">目标：{scene.goal}</Text>
                  </div>
                ))}
              </div>
            </div>

            {/* Pain Points */}
            <div className="mb-4">
              <Text strong className="block mb-2">客户当前痛点</Text>
              <ul className="space-y-2">
                {painPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-primary mt-1">•</span>
                    <Text type="secondary">{point}</Text>
                  </li>
                ))}
              </ul>
            </div>

            {/* Scoring Criteria */}
            <div>
              <Text strong className="block mb-2">评分标准</Text>
              <div className="space-y-3">
                {scoringCriteria.map((criteria, index) => (
                  <div key={index} className="text-sm">
                    <div className="flex items-center gap-2 mb-0.5">
                      <Text strong>{criteria.name}</Text>
                      <Text type="secondary" className="text-xs">({criteria.percentage}%)</Text>
                    </div>
                    <Text type="secondary">{criteria.description}</Text>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Bottom Buttons */}
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 safe-bottom flex justify-center">
          <div className="w-full max-w-md flex gap-3">
            <Button
              size="large"
              onClick={handleCancel}
              className="flex-1 !h-12 !rounded-full"
            >
              取消
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={handleStart}
              className="flex-1 !h-12 !rounded-full"
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
