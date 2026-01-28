import { useMemo, useState } from "react";
import { Play } from "lucide-react";

type FeedVideoProps = {
  index: number;
  src: string;
  duration?: string;
  isPlaying: boolean;
  forceNativeControls: boolean;
  setForceNativeControls: (updater: (prev: Set<number>) => Set<number>) => void;
  setPlayingVideos: (updater: (prev: Set<number>) => Set<number>) => void;
  setVideoRef: (el: HTMLVideoElement | null) => void;
  onTogglePlay: (e?: React.MouseEvent | React.TouchEvent) => void;
  touchMovedRef: React.MutableRefObject<boolean>;
};

export default function FeedVideo({
  index,
  src,
  duration,
  isPlaying,
  forceNativeControls,
  setForceNativeControls,
  setPlayingVideos,
  setVideoRef,
  onTogglePlay,
  touchMovedRef,
}: FeedVideoProps) {
  const [hasFatalError, setHasFatalError] = useState(false);

  const normalizedSrc = useMemo(() => {
    // 内置 WebView 对中文路径兼容性不一致，统一做 URI 编码
    try {
      return encodeURI(src);
    } catch {
      return src;
    }
  }, [src]);

  const hint =
    "当前环境不支持该视频源/编码（常见于内置 WebView 或 HEVC/H.265 编码）。请用系统浏览器打开，或将视频重新编码为 H.264(AAC) 后替换。";

  return (
    <div
      className="absolute inset-0 flex items-center justify-center cursor-pointer z-20"
      onPointerUp={(e) => {
        if (!touchMovedRef.current) onTogglePlay(e);
      }}
      onTouchEnd={(e) => {
        if (!touchMovedRef.current) onTogglePlay(e);
      }}
      onClick={(e) => onTogglePlay(e)}
    >
      {/* 背景封面：避免未加载/不支持时黑屏 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 40%, hsl(var(--primary) / 0.18), transparent 70%), linear-gradient(180deg, hsl(var(--background)), hsl(var(--background)))",
        }}
      />

      <video
        ref={setVideoRef}
        className="absolute inset-0 w-full h-full object-cover"
        // 关键：显式写 type（某些内置 WebView 更挑），并对路径做编码
        src={normalizedSrc}
        loop
        muted
        playsInline
        preload="metadata"
        poster="/placeholder.svg"
        controls={forceNativeControls}
        onPlay={() => {
          setPlayingVideos((prev) => {
            const next = new Set(prev);
            next.add(index);
            return next;
          });
        }}
        onPause={() => {
          setPlayingVideos((prev) => {
            const next = new Set(prev);
            next.delete(index);
            return next;
          });
        }}
        onError={() => {
          setHasFatalError(true);
          setForceNativeControls((prev) => {
            const next = new Set(prev);
            next.add(index);
            return next;
          });
        }}
      />

      {/* 播放/暂停按钮 */}
      {!isPlaying && !hasFatalError && (
        <div className="relative z-10">
          <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl scale-150 animate-pulse-soft" />
          <div className="relative w-20 h-20 rounded-full bg-background/30 backdrop-blur-md flex items-center justify-center border border-border/30 shadow-2xl">
            <Play className="w-8 h-8 text-foreground ml-1" fill="currentColor" />
          </div>
        </div>
      )}

      {/* 不支持/加载失败提示：不再黑屏 */}
      {hasFatalError && (
        <div className="relative z-10 max-w-[18rem] px-4 py-3 rounded-2xl bg-card/70 backdrop-blur border border-border shadow-xl">
          <p className="text-sm text-foreground leading-relaxed">{hint}</p>
          <a
            className="mt-3 inline-flex items-center justify-center w-full h-11 rounded-xl bg-primary text-primary-foreground text-sm font-semibold"
            href={normalizedSrc}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            在新窗口打开视频
          </a>
        </div>
      )}

      {/* Duration Badge */}
      {duration && (
        <span className="absolute top-20 right-4 bg-foreground/50 backdrop-blur-sm text-background text-xs px-2.5 py-1 rounded-full font-medium z-10">
          {duration}
        </span>
      )}
    </div>
  );
}
