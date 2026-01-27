import { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, Play, Pause } from 'lucide-react';
import TabBar from '@/components/TabBar';

interface FeedItem {
  id: string;
  type: 'video' | 'text';
  title: string;
  content: string;
  author: string;
  likes: number;
  comments: number;
  thumbnail?: string;
}

const mockFeedData: FeedItem[] = [
  {
    id: '1',
    type: 'text',
    title: '销售技巧：如何快速建立客户信任',
    content: '建立客户信任的关键在于：\n\n1️⃣ 真诚倾听客户需求\n2️⃣ 专业地解答疑问\n3️⃣ 提供超出预期的服务\n4️⃣ 保持适度的跟进频率\n\n记住：信任是销售的基础，没有信任就没有成交。',
    author: '销售导师小王',
    likes: 1234,
    comments: 89,
  },
  {
    id: '2',
    type: 'text',
    title: '每日一学：SPIN销售法则',
    content: 'SPIN销售法则是什么？\n\n🔹 S - Situation（情境问题）\n了解客户的现状\n\n🔹 P - Problem（难点问题）\n发现客户的痛点\n\n🔹 I - Implication（暗示问题）\n扩大问题的影响\n\n🔹 N - Need-payoff（需求问题）\n引导解决方案\n\n掌握这个技巧，成单率提升50%！',
    author: '培训专家李老师',
    likes: 2156,
    comments: 156,
  },
  {
    id: '3',
    type: 'text',
    title: '话术分享：客户说"太贵了"怎么办？',
    content: '当客户说"太贵了"时，不要急于降价！\n\n✅ 正确回应：\n"我理解您的顾虑，价格确实是重要的考量因素。不过您看，我们的产品能帮您解决XXX问题，从长远来看，其实是在帮您省钱..."\n\n❌ 错误回应：\n"那我给您打个折吧"\n\n记住：价值先于价格！',
    author: '金牌销售张总',
    likes: 3421,
    comments: 234,
  },
  {
    id: '4',
    type: 'text',
    title: '新人必读：电话销售的黄金30秒',
    content: '电话销售的前30秒决定成败！\n\n⏱️ 0-10秒：自我介绍\n简洁明了，突出身份\n\n⏱️ 10-20秒：说明目的\n一句话说清打电话原因\n\n⏱️ 20-30秒：抛出价值\n给对方一个继续听的理由\n\n💡 小技巧：\n语速适中、语调自信、保持微笑',
    author: '电销冠军刘姐',
    likes: 1876,
    comments: 98,
  },
  {
    id: '5',
    type: 'text',
    title: '客户心理学：读懂购买信号',
    content: '这些信号说明客户想买了！\n\n🟢 语言信号：\n• "如果我买的话..."\n• "最快什么时候能到？"\n• "有没有其他颜色？"\n\n🟢 行为信号：\n• 反复查看产品细节\n• 询问售后服务\n• 开始讨价还价\n\n看到这些信号，抓紧促单！',
    author: '心理学博士陈老师',
    likes: 4532,
    comments: 312,
  },
  {
    id: '6',
    type: 'text',
    title: '谈判技巧：如何应对客户的"再考虑"',
    content: '客户说"我再考虑一下"时：\n\n🎯 第一步：认同情绪\n"理解，这确实需要慎重考虑"\n\n🎯 第二步：挖掘顾虑\n"方便说说您主要考虑哪些方面吗？"\n\n🎯 第三步：针对性解答\n根据客户顾虑提供解决方案\n\n🎯 第四步：创造紧迫感\n"这个优惠活动本周就结束了..."',
    author: '谈判大师周老师',
    likes: 2845,
    comments: 178,
  },
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set());
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
    const diff = touchStartY.current - touchEndY.current;
    const threshold = 50;

    if (diff > threshold && currentIndex < mockFeedData.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (diff < -threshold && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 0 && currentIndex < mockFeedData.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (e.deltaY < 0 && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
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

  const currentItem = mockFeedData[currentIndex];

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
            {mockFeedData.map((item, index) => (
              <div
                key={item.id}
                className="h-screen flex-shrink-0 relative bg-gradient-to-b from-primary/5 via-background to-primary/10"
              >
                {/* Content Area */}
                <div className="h-full flex flex-col justify-center px-6 pb-32 pt-16">
                  {/* Title */}
                  <h2 className="text-xl font-bold text-foreground mb-6 leading-tight">
                    {item.title}
                  </h2>
                  
                  {/* Main Content */}
                  <div className="flex-1 overflow-y-auto">
                    <p className="text-base text-foreground/90 whitespace-pre-line leading-relaxed">
                      {item.content}
                    </p>
                  </div>

                  {/* Author */}
                  <div className="mt-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {item.author.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">@{item.author}</span>
                  </div>
                </div>

                {/* Right Side Actions */}
                <div className="absolute right-4 bottom-40 flex flex-col items-center gap-6">
                  <button
                    onClick={() => toggleLike(item.id)}
                    className="flex flex-col items-center gap-1"
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                      likedItems.has(item.id) ? 'bg-red-500/20' : 'bg-card/50 backdrop-blur-sm'
                    }`}>
                      <Heart
                        className={`w-6 h-6 transition-colors ${
                          likedItems.has(item.id) ? 'text-red-500 fill-red-500' : 'text-foreground'
                        }`}
                      />
                    </div>
                    <span className="text-xs text-foreground/80">
                      {likedItems.has(item.id) ? item.likes + 1 : item.likes}
                    </span>
                  </button>

                  <button className="flex flex-col items-center gap-1">
                    <div className="w-12 h-12 rounded-full bg-card/50 backdrop-blur-sm flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-foreground" />
                    </div>
                    <span className="text-xs text-foreground/80">{item.comments}</span>
                  </button>

                  <button
                    onClick={() => toggleSave(item.id)}
                    className="flex flex-col items-center gap-1"
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                      savedItems.has(item.id) ? 'bg-yellow-500/20' : 'bg-card/50 backdrop-blur-sm'
                    }`}>
                      <Bookmark
                        className={`w-6 h-6 transition-colors ${
                          savedItems.has(item.id) ? 'text-yellow-500 fill-yellow-500' : 'text-foreground'
                        }`}
                      />
                    </div>
                    <span className="text-xs text-foreground/80">收藏</span>
                  </button>

                  <button className="flex flex-col items-center gap-1">
                    <div className="w-12 h-12 rounded-full bg-card/50 backdrop-blur-sm flex items-center justify-center">
                      <Share2 className="w-6 h-6 text-foreground" />
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
