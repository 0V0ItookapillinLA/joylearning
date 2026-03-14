import { useNavigate } from 'react-router-dom';
import { Card, Typography, Badge } from 'antd';
import { 
  PlayCircleOutlined, 
  RobotOutlined, 
  ReadOutlined, 
  TrophyOutlined,
  SearchOutlined,
  BellOutlined,
  RightOutlined,
  FireOutlined,
  ThunderboltOutlined,
  BookOutlined
} from '@ant-design/icons';
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import { plans } from '@/data/mockData';

const { Text } = Typography;

const banners = [
  { id: 1, title: '零售采销AI陪练', subtitle: '沉浸式场景模拟，快速提升实战能力', gradient: 'from-primary to-primary/70' },
  { id: 2, title: '新人必修课上线', subtitle: '10节精品课程，助你快速上手', gradient: 'from-[hsl(250,80%,60%)] to-[hsl(220,90%,56%)]' },
];

const quickFunctions = [
  { icon: <ReadOutlined style={{ fontSize: 22 }} />, label: '课程库', path: '/courses', color: 'bg-primary/10 text-primary' },
  { icon: <RobotOutlined style={{ fontSize: 22 }} />, label: 'AI对练', path: '/courses', color: 'bg-[hsl(var(--ai-purple))]/10 text-[hsl(var(--ai-purple))]' },
  { icon: <PlayCircleOutlined style={{ fontSize: 22 }} />, label: '短视频', path: '/videos', color: 'bg-[hsl(var(--status-complete))]/10 text-[hsl(var(--status-complete))]' },
  { icon: <TrophyOutlined style={{ fontSize: 22 }} />, label: '排行榜', path: '/community', color: 'bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]' },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header with search + notification */}
      <header className="sticky top-0 glass-strong z-40">
        <div className="flex items-center h-14 px-4 max-w-md mx-auto gap-3">
          <h1 className="text-base font-semibold text-foreground tracking-wide">
            <span className="text-primary">Joy</span>Learning
          </h1>
          <div className="flex-1" />
          <SearchOutlined className="text-muted-foreground text-lg cursor-pointer hover:text-foreground transition-colors" />
          <Badge count={3} size="small">
            <BellOutlined className="text-muted-foreground text-lg cursor-pointer hover:text-foreground transition-colors" />
          </Badge>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-4 space-y-5">
        {/* Banner Carousel */}
        <div className="rounded-2xl overflow-hidden">
          <div className={`bg-gradient-to-r ${banners[0].gradient} p-5 relative`}>
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
            <div className="relative z-10">
              <Text className="text-primary-foreground text-xl font-bold block">{banners[0].title}</Text>
              <Text className="text-primary-foreground/80 text-sm block mt-1">{banners[0].subtitle}</Text>
              <button className="mt-3 px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-primary-foreground text-xs font-medium">
                立即体验 →
              </button>
            </div>
          </div>
        </div>

        {/* 碎片化学习入口 - Video Feed */}
        <div 
          onClick={() => navigate('/videos')}
          className="gradient-ai-soft rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:shadow-ai transition-all active:scale-[0.98]"
        >
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/20">
            <ThunderboltOutlined className="text-primary-foreground text-2xl" />
          </div>
          <div className="flex-1">
            <Text strong className="text-foreground block">碎片化学习</Text>
            <Text type="secondary" className="text-xs">3分钟短视频，随时随地学采销技巧</Text>
          </div>
          <RightOutlined className="text-muted-foreground" />
        </div>

        {/* Quick Function Grid */}
        <div className="grid grid-cols-4 gap-3">
          {quickFunctions.map((func) => (
            <div
              key={func.label}
              onClick={() => navigate(func.path)}
              className="flex flex-col items-center gap-2 cursor-pointer group"
            >
              <div className={`w-12 h-12 rounded-xl ${func.color} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                {func.icon}
              </div>
              <Text className="text-xs text-foreground">{func.label}</Text>
            </div>
          ))}
        </div>

        {/* Recommended Courses */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <FireOutlined className="text-primary" />
              <Text strong className="text-foreground text-sm">推荐课程</Text>
            </div>
            <Text 
              className="text-xs text-primary cursor-pointer"
              onClick={() => navigate('/courses')}
            >
              查看全部 <RightOutlined className="text-[10px]" />
            </Text>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
            {plans.slice(0, 3).map((plan) => (
              <Card
                key={plan.id}
                className="!rounded-xl !border-0 shadow-card flex-shrink-0 cursor-pointer hover:shadow-ai transition-shadow"
                style={{ width: 200 }}
                styles={{ body: { padding: 0 } }}
                onClick={() => navigate(`/plan/${plan.id}`)}
              >
                <div className="gradient-ai-soft p-3 pb-2">
                  <Text strong className="text-foreground text-sm line-clamp-1 block">{plan.title}</Text>
                  <div className="flex items-center gap-1 mt-1">
                    <BookOutlined className="text-muted-foreground text-[10px]" />
                    <Text type="secondary" className="text-[10px]">{plan.chapters}章节 · {plan.estimatedHours}h</Text>
                  </div>
                </div>
                <div className="px-3 py-2">
                  <Text type="secondary" className="text-xs line-clamp-2">{plan.description}</Text>
                  {plan.aiMatchScore && (
                    <div className="flex items-center gap-1 mt-1.5">
                      <RobotOutlined className="text-primary text-[10px]" />
                      <Text className="text-[10px] text-primary">AI匹配度 {plan.aiMatchScore}%</Text>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* AI Practice Quick Entry */}
        <Card 
          className="!rounded-xl !border-0 shadow-card cursor-pointer hover:shadow-ai transition-shadow"
          styles={{ body: { padding: 16 } }}
          onClick={() => navigate('/courses')}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full gradient-ai flex items-center justify-center">
              <RobotOutlined className="text-primary-foreground text-lg" />
            </div>
            <div className="flex-1">
              <Text strong className="text-foreground text-sm block">AI智能对练</Text>
              <Text type="secondary" className="text-xs">8个实战场景，1200+人次练习</Text>
            </div>
            <RightOutlined className="text-muted-foreground" />
          </div>
        </Card>
      </main>

      <TabBar />
    </div>
  );
};

export default Home;
