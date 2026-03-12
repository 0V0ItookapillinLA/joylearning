import { useState } from 'react';
import { Card, Button, Typography } from 'antd';
import { CloseOutlined, BulbOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface Props {
  sceneId: number;
  visible: boolean;
  onClose: () => void;
}

// Mock example answers per scene at different difficulty levels
const exampleAnswers: Record<number, { basic: string; advanced: string }> = {
  1: {
    basic: '"李姐您好！上次聊得特别愉快。我看您朋友圈最近在关注冷链物流，咱们正好有这方面的新方案，想跟您聊聊。"',
    advanced: '"李总，好久不见！上次咱们谈的合作我一直在推进。注意到您在关注冷链领域的动态，正好我们最近推出了一套针对生鲜品类的全链路冷链解决方案，在成本和时效上有很大突破，想第一时间跟您分享。"',
  },
  2: {
    basic: '"我理解您的顾虑。我们的价格虽然不是最低的，但我们在运输时效和破损率上有明确的保障承诺。"',
    advanced: '"您提到的价格、时效和售后这三点确实是核心考量。我给您对比一下：我们的破损率控制在0.3%以下，行业平均是1.2%；时效方面，我们承诺48小时必达，延迟双倍赔付。综合算下来，隐性成本其实更低。"',
  },
  3: {
    basic: '"针对老客户，我们可以提供阶梯式优惠，量越大折扣越多，长期合作还有年度返利。"',
    advanced: '"李总，作为我们的战略级合作伙伴，我可以为您申请三个层面的优惠：首先是首年价格直降8%；其次是月均发货量超过500件后启动阶梯返利；最后是免费提供仓储管理系统对接。这套方案目前只开放给前三位签约的老客户。"',
  },
};

const StuckHelper = ({ sceneId, visible, onClose }: Props) => {
  const [level, setLevel] = useState<'basic' | 'advanced'>('basic');
  const answers = exampleAnswers[sceneId] || exampleAnswers[1];

  if (!visible) return null;

  return (
    <div className="animate-fade-in">
      <Card
        className="!rounded-xl shadow-ai border-[hsl(var(--ai-purple)/0.2)]"
        styles={{ body: { padding: 16 } }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md gradient-ai flex items-center justify-center">
              <BulbOutlined className="text-primary-foreground text-xs" />
            </div>
            <Text strong className="text-sm">AI 示范回答</Text>
          </div>
          <Button type="text" size="small" icon={<CloseOutlined />} onClick={onClose} />
        </div>

        {/* Level tabs */}
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setLevel('basic')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
              level === 'basic'
                ? 'bg-primary/10 text-primary border border-primary/30'
                : 'bg-muted text-muted-foreground border border-transparent'
            }`}
          >
            🟢 基础版
          </button>
          <button
            onClick={() => setLevel('advanced')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
              level === 'advanced'
                ? 'bg-[hsl(var(--ai-purple)/0.1)] text-[hsl(var(--ai-purple))] border border-[hsl(var(--ai-purple)/0.3)]'
                : 'bg-muted text-muted-foreground border border-transparent'
            }`}
          >
            🔵 进阶版
          </button>
        </div>

        {/* Answer */}
        <div className="bg-muted/50 rounded-lg p-3">
          <Text className="text-sm leading-relaxed text-foreground/90">
            {level === 'basic' ? answers.basic : answers.advanced}
          </Text>
        </div>

        <p className="text-[10px] text-muted-foreground mt-2 text-center">
          参考示范，建议用自己的话表达 ✨
        </p>
      </Card>
    </div>
  );
};

export default StuckHelper;
