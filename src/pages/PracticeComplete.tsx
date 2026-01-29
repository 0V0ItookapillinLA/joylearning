import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Rate, Input } from 'antd';
import { CheckCircleOutlined, CloseOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const PracticeComplete = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const getRatingText = (score: number) => {
    if (score === 0) return '';
    if (score === 1) return '很差';
    if (score === 2) return '较差';
    if (score === 3) return '一般';
    if (score === 4) return '满意';
    return '非常满意';
  };

  const handleSubmitFeedback = () => {
    // TODO: Submit feedback to backend
    console.log('Submitted:', { rating, feedback });
    setModalOpen(false);
  };

  const handleViewReport = () => {
    // Navigate to the latest practice history detail
    navigate('/history/1');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b max-w-md mx-auto w-full">
        <Button 
          type="text" 
          icon={<CloseOutlined />} 
          onClick={() => navigate('/profile')}
        />
        <h1 className="text-base font-medium">京东物流AI陪练</h1>
        <div className="w-8" />
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 max-w-md mx-auto w-full">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full bg-[hsl(var(--status-complete))] flex items-center justify-center">
            <CheckCircleOutlined className="text-4xl text-primary-foreground" />
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold text-foreground mt-6">
            恭喜您完成本次练习
          </h2>

          {/* Subtitle */}
          <p className="text-sm text-muted-foreground">
            请前往在我的-历史记录中
            <br />
            查看本次练习报告
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-12 w-full">
          <Button
            size="large"
            onClick={() => setModalOpen(true)}
            className="flex-1 !h-11 !border-primary !text-primary"
          >
            评价反馈
          </Button>

          <Button
            type="primary"
            size="large"
            onClick={handleViewReport}
            className="flex-1 !h-11"
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
          {/* Greeting */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-1">Hello</h3>
            <p className="text-sm text-muted-foreground">
              请为本次面试体验打分吧~
            </p>
          </div>

          {/* Star Rating */}
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

          {/* Feedback Input */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">我要反馈</h4>
            <div className="relative">
              <TextArea
                placeholder="告诉我们您的其他想法？（选填）"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value.slice(0, 200))}
                rows={4}
                showCount
                maxLength={200}
              />
            </div>
          </div>

          <Button
            type="primary"
            danger
            size="large"
            onClick={handleSubmitFeedback}
            className="w-full !h-12 mt-6"
          >
            提交
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default PracticeComplete;
