import { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, Play, Music2, Plus } from 'lucide-react';
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
  tags?: string[];
  videoUrl?: string;
}

const mockFeedData: FeedItem[] = [
  {
    id: '1',
    type: 'video',
    title: '【必看】采销核心工作解析',
    content: '零售采销的核心在于：选品精准、成本把控、库存管理、供应商谈判。本视频将带你系统了解零售采销的完整流程和关键技巧。',
    author: '采销导师小王',
    likes: 2341,
    comments: 156,
    duration: '02:45',
    tags: ['新人必看', '采销基础'],
    videoUrl: '/videos/采销核心工作.mp4',
  },
  {
    id: '2',
    type: 'text',
    title: '采销技巧：如何快速建立供应商信任',
    content: '建立供应商信任的关键在于：\n\n1️⃣ 付款及时不拖欠\n2️⃣ 订单量保持稳定\n3️⃣ 沟通专业有效率\n4️⃣ 长期合作共赢思维\n\n记住：好的供应商关系是零售采销成功的基础！',
    author: '采销专家李老师',
    likes: 1234,
    comments: 89,
    tags: ['供应商管理', '信任建立'],
  },
  {
    id: '3',
    type: 'video',
    title: '【实战】BOM成本分析详解',
    content: '跟着资深采销经理学习如何进行BOM成本分析，了解成本构成和优化策略。实战案例分析，干货满满！',
    author: '谈判大师周老师',
    likes: 3156,
    comments: 234,
    duration: '03:20',
    tags: ['成本分析', 'BOM'],
    videoUrl: '/videos/BOM成本.mp4',
  },
  {
    id: '4',
    type: 'text',
    title: '每日一学：SPIN采销法则',
    content: 'SPIN采销法则是什么？\n\n🔹 S - Situation（情境分析）\n了解供应商的现状\n\n🔹 P - Problem（问题发现）\n发现采购痛点\n\n🔹 I - Implication（影响评估）\n评估问题的影响\n\n🔹 N - Need-payoff（需求满足）\n找到最优解决方案\n\n掌握这个技巧，采购效率提升50%！',
    author: '培训专家李老师',
    likes: 2156,
    comments: 156,
    tags: ['SPIN法则', '方法论'],
  },
  {
    id: '5',
    type: 'text',
    title: '话术分享：供应商说"没货了"怎么办？',
    content: '当供应商说"没货了"时，不要轻易放弃！\n\n✅ 正确回应：\n"我理解目前库存紧张，不过我们是长期合作伙伴，能否优先给我们调配一批？我们可以适当提高采购价..."\n\n❌ 错误回应：\n"那算了，我找别家"\n\n记住：关系维护比单次交易更重要！',
    author: '金牌采销张总',
    likes: 3421,
    comments: 234,
    tags: ['话术技巧', '异议处理'],
  },
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set());
  const [isScrolling, setIsScrolling] = useState(false);
  const [playingVideos, setPlayingVideos] = useState<Set<number>>(new Set());
  // 当 play() 在某些手机/内置浏览器中被拒绝时，强制展示原生 controls 让用户用系统播放器控件启动播放
  const [forceNativeControls, setForceNativeControls] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);
  const touchMoved = useRef(false);

  // 切换视频播放/暂停
  const toggleVideoPlay = (index: number, e?: React.MouseEvent | React.TouchEvent) => {
    // 如果是滑动操作，不处理点击
    if (touchMoved.current) {
      return;
    }
    
    // 阻止事件冒泡
    if (e) {
      e.stopPropagation();
    }
    
    const video = videoRefs.current[index];
    if (video) {
      if (video.paused) {
        video.play().then(() => {
          setPlayingVideos(prev => new Set(prev).add(index));
        }).catch((err) => {
          // 某些移动端/内置 WebView 会拒绝非原生控件触发的播放，这里兜底切到 controls
          console.warn('[Home] video.play() failed, falling back to native controls', err);
          setForceNativeControls(prev => {
            const next = new Set(prev);
            next.add(index);
            return next;
          });
        });
      } else {
        video.pause();
        setPlayingVideos(prev => {
          const newSet = new Set(prev);
          newSet.delete(index);
          return newSet;
        });
      }
    }
  };

  // 控制视频播放
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex) {
          video.play().then(() => {
            setPlayingVideos(prev => new Set(prev).add(index));
          }).catch(() => {
            // 自动播放被阻止时静默处理，用户可点击播放
            setPlayingVideos(prev => {
              const newSet = new Set(prev);
              newSet.delete(index);
              return newSet;
            });
          });
        } else {
          video.pause();
          video.currentTime = 0;
          setPlayingVideos(prev => {
            const newSet = new Set(prev);
            newSet.delete(index);
            return newSet;
          });
        }
      }
    });
  }, [currentIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchMoved.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndY.current = e.touches[0].clientY;
    const diff = Math.abs(touchStartY.current - touchEndY.current);
    if (diff > 10) {
      touchMoved.current = true;
    }
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

  const formatNumber = (num: number) => {
    if (num >= 10000) {
      return (num / 10000).toFixed(1) + 'w';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
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
            className="absolute inset-0 flex flex-col transition-transform duration-300 ease-out"
            style={{ transform: `translateY(-${currentIndex * 100}%)` }}
          >
            {mockFeedData.map((item, index) => (
              <div
                key={item.id}
                className="h-screen flex-shrink-0 relative overflow-hidden"
              >
                {/* Background Layer */}
                <div className="absolute inset-0">
                  {item.type === 'video' ? (
                    <>
                      {/* Video Background with gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-background" />
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent" />
                    </>
                  ) : (
                    <>
                      {/* Text Content Background */}
                      <div className="absolute inset-0 bg-gradient-to-b from-primary/8 via-background to-primary/12" />
                      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-primary/10 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-primary/15 to-transparent" />
                    </>
                  )}
                  {/* Decorative elements */}
                  <div className="absolute top-20 -left-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl" />
                  <div className="absolute bottom-40 -right-20 w-80 h-80 bg-primary/8 rounded-full blur-3xl" />
                </div>

                {/* Video Content */}
                {item.type === 'video' && (
                  <div
                    className="absolute inset-0 flex items-center justify-center cursor-pointer z-20"
                    // 移动端/内置 WebView 下，touchend + preventDefault 可能导致 play() 不被视为“用户手势”
                    // 这里改用 pointer 事件，且不调用 preventDefault，提高可播放率
                    onPointerUp={(e) => {
                      if (!touchMoved.current) toggleVideoPlay(index, e);
                    }}
                    // 兜底：部分环境 pointer 事件不稳定，补回 touchend，但不调用 preventDefault
                    onTouchEnd={(e) => {
                      if (!touchMoved.current) toggleVideoPlay(index, e);
                    }}
                    onClick={(e) => toggleVideoPlay(index, e)}
                  >
                    {item.videoUrl ? (
                      <>
                        <video
                          ref={(el) => { videoRefs.current[index] = el; }}
                          className="absolute inset-0 w-full h-full object-cover"
                          src={item.videoUrl}
                          loop
                          muted
                          playsInline
                          controls={forceNativeControls.has(index)}
                            // 兜底：有些 WebView 会更依赖这些属性组合
                            preload="metadata"
                            onPlay={() => {
                              setPlayingVideos(prev => new Set(prev).add(index));
                            }}
                            onPause={() => {
                              setPlayingVideos(prev => {
                                const next = new Set(prev);
                                next.delete(index);
                                return next;
                              });
                            }}
                        />
                        {/* 播放/暂停按钮 */}
                        {!playingVideos.has(index) && (
                          <div className="relative z-10">
                            <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl scale-150 animate-pulse-soft" />
                            <div className="relative w-20 h-20 rounded-full bg-background/30 backdrop-blur-md flex items-center justify-center border border-border/30 shadow-2xl">
                              <Play className="w-8 h-8 text-foreground ml-1" fill="currentColor" />
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {/* Play Button Placeholder */}
                        <div className="relative">
                          <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl scale-150 animate-pulse-soft" />
                          <div className="relative w-20 h-20 rounded-full bg-background/20 backdrop-blur-md flex items-center justify-center border border-border/30 shadow-2xl">
                            <Play className="w-8 h-8 text-foreground ml-1" fill="currentColor" />
                          </div>
                        </div>
                      </>
                    )}
                    {/* Duration Badge */}
                    {item.duration && (
                      <span className="absolute top-20 right-4 bg-foreground/50 backdrop-blur-sm text-background text-xs px-2.5 py-1 rounded-full font-medium z-10">
                        {item.duration}
                      </span>
                    )}
                  </div>
                )}
                {/* Text Content - Centered with beautiful styling */}
                {item.type === 'text' && (
                  <div className="absolute inset-0 flex items-center justify-center px-6 pb-48 pt-24">
                    <div className="relative">
                      {/* Glow effect behind text */}
                      <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-2xl" />
                      <div className="relative bg-white/60 dark:bg-card/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/50 dark:border-border/50 max-w-sm">
                        <p className="text-base text-foreground leading-relaxed whitespace-pre-line font-medium">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bottom Info Area */}
                <div className="absolute bottom-28 left-4 right-20 z-10">
                  {/* Tags */}
                  {item.tags && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {item.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs px-2.5 py-1 rounded-full bg-primary/15 text-primary font-medium backdrop-blur-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* Title */}
                  <h2 className="text-base font-bold text-foreground mb-4 leading-snug drop-shadow-sm">
                    {item.title}
                  </h2>
                  
                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
                        <span className="text-sm font-bold text-primary-foreground">
                          {item.author.charAt(0)}
                        </span>
                      </div>
                      {/* Online indicator */}
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-status-complete rounded-full border-2 border-background" />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-semibold text-foreground">@{item.author}</span>
                      <p className="text-xs text-muted-foreground mt-0.5">零售采销专家</p>
                    </div>
                    <button className="px-4 py-1.5 text-xs font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg shadow-primary/25 transition-all active:scale-95">
                      <Plus className="w-3 h-3 inline mr-1" />
                      关注
                    </button>
                  </div>

                  {/* Music/Audio info bar - for video only */}
                  {item.type === 'video' && (
                    <div className="mt-4 flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-3 py-2 w-fit">
                      <Music2 className="w-3.5 h-3.5 text-white animate-pulse-soft" />
                      <span className="text-xs text-white/90 font-medium truncate max-w-48">
                        原声 - {item.author}
                      </span>
                    </div>
                  )}
                </div>

                {/* Right Side Actions */}
                <div className="absolute right-3 bottom-36 flex flex-col items-center gap-5 z-30">
                  {/* Like Button */}
                  <button
                    onClick={() => toggleLike(item.id)}
                    className="flex flex-col items-center gap-1 group"
                  >
                    <div className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                      likedItems.has(item.id) 
                        ? 'bg-red-500/20 scale-110' 
                        : 'bg-white/10 backdrop-blur-md group-hover:bg-white/20'
                    }`}>
                      {likedItems.has(item.id) && (
                        <div className="absolute inset-0 bg-red-500/30 rounded-full blur-md" />
                      )}
                      <Heart
                        className={`w-7 h-7 relative transition-all ${
                          likedItems.has(item.id) 
                            ? 'text-red-500 fill-red-500 scale-110' 
                            : 'text-foreground group-hover:scale-110'
                        }`}
                      />
                    </div>
                    <span className="text-xs font-semibold text-foreground/90">
                      {formatNumber(likedItems.has(item.id) ? item.likes + 1 : item.likes)}
                    </span>
                  </button>

                  {/* Comment Button */}
                  <button className="flex flex-col items-center gap-1 group">
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-white/20 transition-all">
                      <MessageCircle className="w-7 h-7 text-foreground group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-xs font-semibold text-foreground/90">{formatNumber(item.comments)}</span>
                  </button>

                  {/* Save Button */}
                  <button
                    onClick={() => toggleSave(item.id)}
                    className="flex flex-col items-center gap-1 group"
                  >
                    <div className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                      savedItems.has(item.id) 
                        ? 'bg-yellow-500/20 scale-110' 
                        : 'bg-white/10 backdrop-blur-md group-hover:bg-white/20'
                    }`}>
                      {savedItems.has(item.id) && (
                        <div className="absolute inset-0 bg-yellow-500/30 rounded-full blur-md" />
                      )}
                      <Bookmark
                        className={`w-7 h-7 relative transition-all ${
                          savedItems.has(item.id) 
                            ? 'text-yellow-500 fill-yellow-500 scale-110' 
                            : 'text-foreground group-hover:scale-110'
                        }`}
                      />
                    </div>
                    <span className="text-xs font-semibold text-foreground/90">收藏</span>
                  </button>

                  {/* Share Button */}
                  <button className="flex flex-col items-center gap-1 group">
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-white/20 transition-all">
                      <Share2 className="w-7 h-7 text-foreground group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-xs font-semibold text-foreground/90">分享</span>
                  </button>

                  {/* Author Avatar - Rotating */}
                  <div className="mt-2 relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 p-0.5 animate-spin" style={{ animationDuration: '3s' }}>
                      <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">{item.author.charAt(0)}</span>
                      </div>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <Plus className="w-3 h-3 text-primary-foreground" />
                    </div>
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 z-10">
                  {mockFeedData.map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-full transition-all duration-300 ${
                        i === currentIndex
                          ? 'w-1.5 h-6 bg-primary shadow-lg shadow-primary/50'
                          : i < currentIndex
                            ? 'w-1 h-2 bg-primary/40'
                            : 'w-1 h-2 bg-muted-foreground/20'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Top Header */}
          <div className="absolute top-0 left-0 right-0 z-10 pt-safe">
            <div className="flex items-center justify-center py-4 bg-gradient-to-b from-background/80 to-transparent backdrop-blur-sm">
              <h1 className="text-lg font-bold text-foreground tracking-wide">
                <span className="text-primary">Joy</span>Learning
              </h1>
            </div>
          </div>
        </div>

        <TabBar />
      </div>
    </div>
  );
};

export default Home;
