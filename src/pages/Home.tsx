import { useState, useRef } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, Play } from 'lucide-react';
import TabBar from '@/components/TabBar';

interface FeedItem {
  id: string;
  type: 'video' | 'text';
  title: string;
  content: string;
  author: string;
  likes: number;
  comments: number;
  duration?: string;
}

const mockFeedData: FeedItem[] = [
  {
    id: '1',
    type: 'video',
    title: '【必看】零售采销新人必修课',
    content: '零售采销的核心在于：选品精准、成本把控、库存管理、供应商谈判。本视频将带你系统了解零售采销的完整流程和关键技巧。',
    author: '采销导师小王',
    likes: 2341,
    comments: 156,
    duration: '05:32',
  },
  {
    id: '2',
    type: 'text',
    title: '采销技巧：如何快速建立供应商信任',
    content: '建立供应商信任的关键在于：\n\n1️⃣ 付款及时不拖欠\n2️⃣ 订单量保持稳定\n3️⃣ 沟通专业有效率\n4️⃣ 长期合作共赢思维\n\n记住：好的供应商关系是零售采销成功的基础！',
    author: '采销专家李老师',
    likes: 1234,
    comments: 89,
  },
  {
    id: '3',
    type: 'video',
    title: '实战演示：供应商谈判技巧',
    content: '跟着资深采销经理学习如何在保证质量的前提下，争取到最优的采购价格和账期。实战案例分析，干货满满！',
    author: '谈判大师周老师',
    likes: 3156,
    comments: 234,
    duration: '08:15',
  },
  {
    id: '4',
    type: 'text',
    title: '每日一学：SPIN采销法则',
    content: 'SPIN采销法则是什么？\n\n🔹 S - Situation（情境分析）\n了解供应商的现状\n\n🔹 P - Problem（问题发现）\n发现采购痛点\n\n🔹 I - Implication（影响评估）\n评估问题的影响\n\n🔹 N - Need-payoff（需求满足）\n找到最优解决方案\n\n掌握这个技巧，采购效率提升50%！',
    author: '培训专家李老师',
    likes: 2156,
    comments: 156,
  },
  {
    id: '5',
    type: 'text',
    title: '话术分享：供应商说"没货了"怎么办？',
    content: '当供应商说"没货了"时，不要轻易放弃！\n\n✅ 正确回应：\n"我理解目前库存紧张，不过我们是长期合作伙伴，能否优先给我们调配一批？我们可以适当提高采购价..."\n\n❌ 错误回应：\n"那算了，我找别家"\n\n记住：关系维护比单次交易更重要！',
    author: '金牌采销张总',
    likes: 3421,
    comments: 234,
  },
  {
    id: '6',
    type: 'video',
    title: '库存管理：避免断货与积压',
    content: '科学的库存管理是零售采销的核心能力。本视频详解安全库存设定、周转率优化、滞销品处理等关键知识点。',
    author: '库存专家陈老师',
    likes: 1845,
    comments: 123,
    duration: '06:48',
  },
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set());
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (isScrolling) return;
    
    const diff = touchStartY.current - touchEndY.current;
    const threshold = 50;

    if (diff > threshold && currentIndex < mockFeedData.length - 1) {
      setIsScrolling(true);
      setCurrentIndex(prev => prev + 1);
      setTimeout(() => setIsScrolling(false), 400);
    } else if (diff < -threshold && currentIndex > 0) {
      setIsScrolling(true);
      setCurrentIndex(prev => prev - 1);
      setTimeout(() => setIsScrolling(false), 400);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (isScrolling) return;
    
    if (e.deltaY > 0 && currentIndex < mockFeedData.length - 1) {
      setIsScrolling(true);
      setCurrentIndex(prev => prev + 1);
      setTimeout(() => setIsScrolling(false), 400);
    } else if (e.deltaY < 0 && currentIndex > 0) {
      setIsScrolling(true);
      setCurrentIndex(prev => prev - 1);
      setTimeout(() => setIsScrolling(false), 400);
    }
  };

  const toggleLike = (id: string) => {
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleSave = (id: string) => {
    setSavedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-md h-screen overflow-hidden relative">
        {/* Feed Container */}
        <div
          ref={containerRef}
          className="h-full relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
        >
          {/* Current Feed Item */}
          <div
            className="absolute inset-0 flex flex-col transition-transform duration-300"
            style={{ transform: `translateY(-${currentIndex * 100}%)` }}
          >
            {mockFeedData.map((item) => (
              <div
                key={item.id}
                className="h-screen flex-shrink-0 relative bg-gradient-to-b from-primary/5 via-background to-primary/10"
              >
                {/* Content Area */}
                <div className="h-full flex flex-col justify-center px-4 pb-32 pt-16">
                  {/* Content Card */}
                  <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-border/50">
                    {/* Video Thumbnail */}
                    {item.type === 'video' && (
                      <div className="relative mb-4 rounded-xl overflow-hidden bg-muted aspect-video flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
                        <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-lg">
                          <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
                        </div>
                        {item.duration && (
                          <span className="absolute bottom-2 right-2 bg-foreground/80 text-background text-xs px-2 py-1 rounded">
                            {item.duration}
                          </span>
                        )}
                      </div>
                    )}
                    
                    {/* Type Badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.type === 'video' 
                          ? 'bg-primary/10 text-primary' 
                          : 'bg-accent text-accent-foreground'
                      }`}>
                        {item.type === 'video' ? '📹 视频' : '📝 图文'}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h2 className="text-lg font-bold text-foreground mb-3 leading-tight">
                      {item.title}
                    </h2>
                    
                    {/* Main Content */}
                    <div className="max-h-40 overflow-y-auto">
                      <p className="text-sm text-foreground/80 whitespace-pre-line leading-relaxed">
                        {item.content}
                      </p>
                    </div>

                    {/* Author */}
                    <div className="mt-4 pt-4 border-t border-border/50 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {item.author.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">@{item.author}</span>
                    </div>
                  </div>
                </div>

                {/* Right Side Actions */}
                <div className="absolute right-4 bottom-40 flex flex-col items-center gap-5">
                  <button
                    onClick={() => toggleLike(item.id)}
                    className="flex flex-col items-center gap-1"
                  >
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${
                      likedItems.has(item.id) ? 'bg-red-500/20' : 'bg-card/70 backdrop-blur-sm'
                    }`}>
                      <Heart
                        className={`w-5 h-5 transition-colors ${
                          likedItems.has(item.id) ? 'text-red-500 fill-red-500' : 'text-foreground'
                        }`}
                      />
                    </div>
                    <span className="text-xs text-foreground/80">
                      {likedItems.has(item.id) ? item.likes + 1 : item.likes}
                    </span>
                  </button>

                  <button className="flex flex-col items-center gap-1">
                    <div className="w-11 h-11 rounded-full bg-card/70 backdrop-blur-sm flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-foreground" />
                    </div>
                    <span className="text-xs text-foreground/80">{item.comments}</span>
                  </button>

                  <button
                    onClick={() => toggleSave(item.id)}
                    className="flex flex-col items-center gap-1"
                  >
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${
                      savedItems.has(item.id) ? 'bg-yellow-500/20' : 'bg-card/70 backdrop-blur-sm'
                    }`}>
                      <Bookmark
                        className={`w-5 h-5 transition-colors ${
                          savedItems.has(item.id) ? 'text-yellow-500 fill-yellow-500' : 'text-foreground'
                        }`}
                      />
                    </div>
                    <span className="text-xs text-foreground/80">收藏</span>
                  </button>

                  <button className="flex flex-col items-center gap-1">
                    <div className="w-11 h-11 rounded-full bg-card/70 backdrop-blur-sm flex items-center justify-center">
                      <Share2 className="w-5 h-5 text-foreground" />
                    </div>
                    <span className="text-xs text-foreground/80">分享</span>
                  </button>
                </div>

                {/* Progress Indicator */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-1">
                  {mockFeedData.map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 rounded-full transition-all duration-300 ${
                        i === currentIndex
                          ? 'h-6 bg-primary'
                          : 'h-2 bg-muted-foreground/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Top Header */}
          <div className="absolute top-0 left-0 right-0 z-10 pt-safe">
            <div className="flex items-center justify-center py-4">
              <h1 className="text-lg font-semibold text-foreground">JoyLearning</h1>
            </div>
          </div>
        </div>

        <TabBar />
      </div>
    </div>
  );
};

export default Home;
