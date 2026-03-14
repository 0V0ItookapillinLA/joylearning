import { useParams, useNavigate } from 'react-router-dom';
import { Button, Tag, Tabs } from 'antd';
import { FireOutlined, ThunderboltOutlined } from '@ant-design/icons';
import Header from '@/components/Header';
import PublicPracticeCard from '@/components/PublicPracticeCard';
import { practiceScenarios, publicPracticeRecords } from '@/data/scenarioData';

const formatCount = (n: number) => {
  if (n >= 10000) return `${(n / 10000).toFixed(1)}万`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return `${n}`;
};

const difficultyLabel = (d: number) => {
  if (d <= 2) return '入门';
  if (d <= 3) return '进阶';
  if (d <= 4) return '高级';
  return '专家';
};

const ScenarioDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const scenario = practiceScenarios.find(s => s.id === id);

  if (!scenario) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">场景未找到</p>
      </div>
    );
  }

  const relatedRecords = publicPracticeRecords.filter(r => r.scenarioId === id);

  const tabItems = [
    {
      key: 'intro',
      label: '简介',
      children: (
        <div className="space-y-4">
          <p className="text-sm text-foreground leading-relaxed">{scenario.description}</p>

          <div className="bg-accent/50 rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-semibold text-accent-foreground">场景信息</h4>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">角色</span>
              <span className="text-foreground">{scenario.role}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">难度</span>
              <span className="text-foreground">{difficultyLabel(scenario.difficulty)} {'★'.repeat(scenario.difficulty)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">练习人次</span>
              <span className="text-foreground">{formatCount(scenario.practiceCount)}+</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-foreground mb-2">训练技能</h4>
            <div className="flex flex-wrap gap-2">
              {scenario.tags.map(tag => (
                <Tag
                  key={tag}
                  className="!rounded-full !px-3 !py-0.5 !bg-accent !text-accent-foreground !border-primary/20"
                >
                  #{tag}
                </Tag>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'public',
      label: `公开对练 (${relatedRecords.length})`,
      children: (
        <div className="space-y-3">
          {relatedRecords.length > 0 ? (
            relatedRecords.map(record => (
              <PublicPracticeCard key={record.id} record={record} />
            ))
          ) : (
            <p className="text-center text-muted-foreground text-sm py-8">暂无公开对练记录</p>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-28">
      <Header title="场景详情" />

      <main className="max-w-md mx-auto px-4 py-4 space-y-4">
        {/* Hero */}
        <div className="gradient-ai-soft rounded-2xl p-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 gradient-ai-glow opacity-30" />
          <div className="relative">
            <div className="text-6xl mb-3">{scenario.avatar}</div>
            <h2 className="text-lg font-bold text-foreground mb-1">{scenario.name}</h2>
            <p className="text-xs text-muted-foreground">{scenario.role}</p>
            <div className="flex items-center justify-center gap-1 mt-2 text-xs text-muted-foreground">
              <FireOutlined className="text-destructive" />
              <span>{formatCount(scenario.practiceCount)}人次练过</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs items={tabItems} defaultActiveKey="intro" size="small" />
      </main>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-lg border-t border-border p-4 safe-bottom">
        <div className="max-w-md mx-auto">
          <Button
            type="primary"
            block
            size="large"
            icon={<ThunderboltOutlined />}
            className="!rounded-xl !h-12 !font-semibold"
            onClick={() => navigate('/practice/onboarding')}
          >
            开始对练
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ScenarioDetail;
