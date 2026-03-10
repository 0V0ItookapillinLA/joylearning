import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from 'antd';
import { LeftOutlined, PlayCircleOutlined, EnvironmentOutlined, CheckSquareOutlined, FireOutlined } from '@ant-design/icons';

const { Text } = Typography;

const PracticeDetail = () => {
  const navigate = useNavigate();
  const [showText, setShowText] = useState(false);
  const [showGuidance, setShowGuidance] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Auto-play video on mount
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const handleBack = () => {
    if (showGuidance) {
      setShowGuidance(false);
    } else if (showText) {
      setShowText(false);
    } else {
      navigate(-1);
    }
  };

  const handleStart = () => {
    navigate('/practice/onboarding');
  };

  // Pre-practice guidance content
  if (showGuidance) {
    return (
      <div className="min-h-screen bg-background flex justify-center">
        <div className="w-full max-w-md flex flex-col">
          {/* Header */}
          <div className="flex items-center px-4 py-3 sticky top-0 z-10 bg-background/80 backdrop-blur">
            <Button type="text" icon={<LeftOutlined />} onClick={handleBack} className="!-ml-2" />
          </div>

          {/* Content */}
          <div className="flex-1 px-5 pb-28 overflow-auto">
            <h1 className="text-xl font-bold text-foreground mb-2">零售采销练习 白酒仓储方向</h1>
            <Text type="secondary" className="text-sm block mb-6">上传时间：2026-03-01 10:00</Text>

            {/* Description Card */}
            <div className="bg-card rounded-xl p-5 mb-6 border border-border/50">
              <p className="text-sm text-foreground leading-relaxed mb-4">
                一句话说明：与白酒品牌方/经销商负责人沟通，推动客户同意进入下一步合作。
              </p>
              <p className="text-sm text-foreground leading-relaxed font-medium mb-3">
                作为销售，你是否遇到这些情况
              </p>
              <ol className="space-y-3 text-sm text-foreground list-decimal list-inside">
                <li>客户对价格敏感，反复压价但不明确需求</li>
                <li>客户对现有供应商满意，难以找到切入点</li>
                <li>客户提出异议时不知如何回应，导致谈判僵局</li>
              </ol>

              <p className="text-sm text-foreground mt-5 mb-3 flex items-center gap-1">
                🌟 <span className="font-medium">练习对你的价值</span>
              </p>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>面对价格异议场景，训练结构化应对技巧</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>训练掌握用客户痛点打破竞争壁垒的方法</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>提升将客户模糊需求推动为具体合作意向的能力</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Button */}
          <div className="fixed bottom-0 left-0 right-0 bg-background p-4 safe-bottom flex justify-center">
            <div className="w-full max-w-md">
              <Button
                type="primary"
                size="large"
                onClick={handleStart}
                className="w-full !h-12 !rounded-full !text-base !font-medium"
              >
                进入场景练习
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-md flex flex-col relative" style={{ minHeight: '100dvh' }}>
        {/* Back Button - floating over video */}
        <div className="absolute top-0 left-0 right-0 z-20 px-4 py-3">
          <Button
            type="text"
            icon={<LeftOutlined className="!text-white" />}
            onClick={handleBack}
            className="!-ml-2"
          />
        </div>

        {/* Video Section */}
        <div
          className={`relative overflow-hidden transition-all duration-500 ease-in-out ${
            showText ? 'h-[30vh]' : 'h-[60vh]'
          }`}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-primary/30 z-10" />

          <video
            ref={videoRef}
            src="/videos/采销核心工作.mp4"
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
            preload="auto"
          />

          {/* Title overlay on video */}
          {!showText && (
            <div className="absolute bottom-16 left-0 right-0 z-10 px-6">
              <div className="inline-block bg-primary/20 backdrop-blur-sm rounded-full px-3 py-1 mb-3">
                <Text className="text-sm !text-primary-foreground">练习主题</Text>
              </div>
              <h1 className="text-2xl font-bold text-white leading-tight">
                零售采销练习{'\n'}白酒仓储方向
              </h1>
            </div>
          )}

          {/* Subtitle at bottom of video */}
          {!showText && (
            <div className="absolute bottom-4 left-0 right-0 z-10 text-center">
              <Text className="text-sm !text-white/80">零售采销练习 白酒仓储方向</Text>
            </div>
          )}
        </div>

        {/* Slide-up Text Panel */}
        <div
          className={`relative bg-background rounded-t-3xl -mt-6 z-10 flex flex-col transition-all duration-500 ease-in-out ${
            showText ? 'flex-1' : ''
          }`}
        >
          {/* Toggle Button */}
          <button
            onClick={() => setShowText(!showText)}
            className="w-full py-3 flex items-center justify-center gap-1 text-primary text-sm font-medium"
          >
            {showText ? '返回视频' : '展开文字'}
            <span className={`transition-transform duration-300 ${showText ? 'rotate-180' : ''}`}>
              ∧
            </span>
          </button>

          {/* Text Content */}
          <div className={`overflow-auto px-5 pb-28 ${showText ? 'flex-1' : 'max-h-0 overflow-hidden'}`}>
            <h2 className="text-lg font-bold text-foreground mb-1">零售采销练习 白酒仓储方向</h2>
            <Text type="secondary" className="text-sm block mb-5">
              建议练习时间：15分钟 ｜ 剩余机会：30次
            </Text>

            {/* Scene Description */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <EnvironmentOutlined className="text-muted-foreground" />
                <Text strong>场景说明</Text>
              </div>
              <div className="bg-card rounded-xl p-4 border border-border/50">
                <Text className="text-sm leading-relaxed block">
                  客户是白酒品牌方/经销商负责人，当前面临促销波峰波谷明显、仓配弹性不足、破损丢损等问题。你需要通过三幕对话（寒暄→需求挖掘→方案推荐），推动客户同意进入下一步合作。
                </Text>
              </div>
            </div>

            {/* Task Description */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <CheckSquareOutlined className="text-muted-foreground" />
                <Text strong>任务说明</Text>
              </div>
              <div className="bg-card rounded-xl p-4 border border-border/50">
                <Text className="text-sm leading-relaxed block">
                  推动客户同意进入下一步（例如：预约方案评估/确认需求清单/约见），需要完成客户寒暄、需求挖掘、方案推荐三个环节。
                </Text>
              </div>
            </div>

            {/* Practice Focus */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <FireOutlined className="text-muted-foreground" />
                <Text strong>练习重点</Text>
              </div>
              <div className="bg-card rounded-xl p-4 border border-border/50 space-y-2">
                {[
                  { name: '需求澄清', desc: '问到关键数据，能复述确认客户诉求', pct: '20%' },
                  { name: '方案匹配', desc: '能把痛点映射到能力点，表达清晰', pct: '20%' },
                  { name: '异议处理', desc: '不硬怼，先理解再回应，有证据/方案', pct: '20%' },
                  { name: '推进结果', desc: '能提出下一步并获得客户明确态度', pct: '20%' },
                  { name: '沟通表达', desc: '语气专业、结构清晰、控制节奏', pct: '20%' },
                ].map((item, i) => (
                  <div key={i} className="text-sm">
                    <div className="flex items-center gap-2">
                      <Text strong>{item.name}</Text>
                      <Text type="secondary" className="text-xs">({item.pct})</Text>
                    </div>
                    <Text type="secondary" className="text-xs">{item.desc}</Text>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Buttons - always visible */}
          <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border/50 p-4 safe-bottom flex justify-center z-20">
            <div className="w-full max-w-md flex gap-3">
              <Button
                size="large"
                onClick={() => setShowGuidance(true)}
                className="flex-1 !h-12 !rounded-full !border-primary !text-primary"
              >
                练前指导
              </Button>
              <Button
                type="primary"
                size="large"
                onClick={handleStart}
                className="flex-1 !h-12 !rounded-full"
              >
                进入场景练习
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeDetail;
