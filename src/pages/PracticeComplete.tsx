import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Rate, Input } from 'antd';
import { CheckCircleOutlined, CloseOutlined, TrophyOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const PracticeComplete = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);

  // Animate score counting up
  useEffect(() => {
    const timer = setTimeout(() => setShowScore(true), 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showScore) return;
    const target = 85;
    let current = 0;
    const interval = setInterval(() => {
      current += 2;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      setAnimatedScore(current);
    }, 20);
    return () => clearInterval(interval);
  }, [showScore]);

  const getRatingText = (score: number) => {
    if (score === 0) return '';
    if (score === 1) return '很差';
    if (score === 2) return '较差';
    if (score === 3) return '一般';
    if (score === 4) return '满意';
    return '非常满意';
  };

  const handleSubmitFeedback = () => {
    console.log('Submitted:', { rating, feedback });
    setModalOpen(false);
  };

  const handleViewReport = () => {
    navigate('/history/1');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 max-w-md mx-auto w-full glass-strong">
        <Button 
          type="text" 
          icon={<CloseOutlined />} 
          onClick={() => navigate('/profile')}
        />
        <h1 className="text-base font-medium">AI陪练完成</h1>
        <div className="w-8" />
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 max-w-md mx-auto w-full">
        <div className="flex flex-col items-center text-center space-y-5">
          {/* Celebration Icon with glow */}
          <div className="relative animate-bounce-in">
            <div className="absolute inset-0 rounded-full blur-2xl opacity-30" style={{ background: 'var(--gradient-ai)' }} />
            <div className="relative w-24 h-24 rounded-full flex items-center justify-center" style={{ background: 'var(--gradient-ai)' }}>
              <TrophyOutlined className="text-4xl text-primary-foreground" />
            </div>
          </div>

          {/* Animated Score */}
          {showScore && (
            <div className="animate-count-up">
              <span className="text-5xl font-bold text-primary">{animatedScore}</span>
              <span className="text-lg text-muted-foreground ml-1">分</span>
            </div>
          )}

          {/* Title */}
          <h2 className="text-xl font-semibold text-foreground animate-fade-in" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
            🎉 恭喜您完成本次练习
          </h2>

          {/* Subtitle */}
          <p className="text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.7s', animationFillMode: 'both' }}>
            AI已为您生成了详细的练习报告
            <br />
            包含会话分析和改进建议
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-12 w-full animate-fade-in" style={{ animationDelay: '0.9s', animationFillMode: 'both' }}>
          <Button
            size="large"
            onClick={() => setModalOpen(true)}
            className="flex-1 !h-12 !rounded-full !border-primary !text-primary"
          >
            评价反馈
          </Button>

          <Button
            type="primary"
            size="large"
            onClick={handleViewReport}
            className="flex-1 !h-12 !rounded-full"
            style={{ background: 'var(--gradient-ai)' }}
          >
            查看报告
          </Button>
        </div>
      </main>

      {/* Feedback Modal */}
      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        title="打分评价"
        centered
      >
        <div className="py-4">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-1">Hello</h3>
            <p className="text-sm text-muted-foreground">
              请为本次练习体验打分吧~
            </p>
          </div>

          <div className="flex flex-col items-center mb-6">
            <Rate 
              value={rating} 
              onChange={setRating}
              className="text-3xl"
            />
            <span className="text-sm text-muted-foreground mt-2">
              {getRatingText(rating)}
            </span>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">我要反馈</h4>
            <TextArea
              placeholder="告诉我们您的其他想法？（选填）"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value.slice(0, 200))}
              rows={4}
              showCount
              maxLength={200}
            />
          </div>

          <Button
            type="primary"
            size="large"
            onClick={handleSubmitFeedback}
            className="w-full !h-12 mt-6"
            style={{ background: 'var(--gradient-ai)' }}
          >
            提交
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default PracticeComplete;
