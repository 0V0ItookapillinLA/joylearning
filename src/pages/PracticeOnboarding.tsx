import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Checkbox } from 'antd';
import { CloseOutlined, BulbOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import avatarInterviewer from '@/assets/avatar-interviewer.png';

const ONBOARDING_DISABLED_KEY = 'practice_onboarding_disabled';

interface GuideStep {
  title: string;
  description: string;
  highlight: 'hint' | 'talk' | 'end' | 'back';
}

const guideSteps: GuideStep[] = [
  {
    title: '遇到难题?',
    description: '点此获取提示',
    highlight: 'hint',
  },
  {
    title: '如何说话?',
    description: '点击说话 → 说完了发送语音',
    highlight: 'talk',
  },
  {
    title: '想提前结束?',
    description: '点击此处完成练习',
    highlight: 'end',
  },
  {
    title: '需要返回?',
    description: '点击此处退出，练习进度会保留哦',
    highlight: 'back',
  },
];

const PracticeOnboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  // Check if onboarding is disabled
  useEffect(() => {
    const isDisabled = localStorage.getItem(ONBOARDING_DISABLED_KEY) === 'true';
    if (isDisabled) {
      navigate('/practice', { replace: true });
    }
  }, [navigate]);

  const handleNext = () => {
    if (currentStep < guideSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    if (dontShowAgain) {
      localStorage.setItem(ONBOARDING_DISABLED_KEY, 'true');
    }
    navigate('/practice', { replace: true });
  };

  const handleSkip = () => {
    if (dontShowAgain) {
      localStorage.setItem(ONBOARDING_DISABLED_KEY, 'true');
    }
    navigate('/practice', { replace: true });
  };

  const handleCloseStep = () => {
    if (currentStep < guideSteps.length - 1) {
      handleNext();
    } else {
      handleComplete();
    }
  };

  const step = guideSteps[currentStep];
  const isLastStep = currentStep === guideSteps.length - 1;
  const isFirstStep = currentStep === 0;

  const getHighlightStyles = (element: string) => {
    if (step.highlight === element) {
      return 'ring-4 ring-primary ring-offset-2 ring-offset-background z-20 relative bg-background';
    }
    return '';
  };

  return (
    <div className="fixed inset-0 bg-background flex justify-center">
      <div className="w-full max-w-md flex flex-col relative">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-foreground/60 z-10" />

      {/* Background / Avatar Area */}
      <div className="flex-1 relative overflow-hidden bg-muted">
        <img 
          src={avatarInterviewer} 
          alt="AI面试官" 
          className="absolute inset-0 w-full h-full object-contain object-top bg-muted"
        />
        
        {/* Back Button */}
        <div className={`absolute top-4 left-4 z-20 ${step.highlight === 'back' ? '' : 'opacity-30'}`}>
          <Button 
            type="text"
            shape="circle"
            icon={<LeftOutlined />}
            className={`!w-10 !h-10 !bg-card ${getHighlightStyles('back')}`}
          />
        </div>

        <div className="absolute top-4 right-4 z-30">
          <Button
            type="text"
            onClick={handleSkip}
            className="!bg-card/80 backdrop-blur"
          >
            跳过
          </Button>
        </div>

        {/* Tooltip for 'back' step - positioned below back button */}
        {step.highlight === 'back' && (
          <div className="absolute top-16 left-4 z-30 w-[calc(100%-2rem)] max-w-[280px]">
            <Card className="!rounded-xl shadow-xl" styles={{ body: { padding: 16 } }}>
              {/* Arrow pointing up */}
              <div className="absolute -top-2 left-6 w-3 h-3 bg-card rotate-45 border-t border-l" />
              
              {/* Close button */}
              <Button 
                type="text"
                size="small"
                icon={<CloseOutlined />}
                onClick={handleCloseStep}
                className="absolute top-2 right-2"
              />

              {/* Content */}
              <div className="pr-6 mb-3">
                <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>

              {/* Step indicator */}
              <div className="flex items-center justify-center gap-1.5 mb-3">
                {guideSteps.map((_, index) => (
                  <div 
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      index === currentStep ? 'bg-primary' : 'bg-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center gap-2">
                {!isFirstStep && (
                  <Button
                    onClick={handlePrev}
                    className="flex-1"
                    icon={<LeftOutlined />}
                  >
                    上一步
                  </Button>
                )}
                <Button
                  type="primary"
                  onClick={handleComplete}
                  className="flex-1"
                >
                  完成
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="bg-background p-4 pb-6 safe-bottom relative z-20">
        {/* Tooltip for bottom controls - positioned above buttons */}
        {step.highlight !== 'back' && (
          <div className="absolute bottom-full left-4 right-4 mb-3 z-30 flex justify-center">
            <Card className="!rounded-xl shadow-xl w-full max-w-[300px]" styles={{ body: { padding: 16 } }}>
              {/* Arrow pointing down */}
              <div 
                className={`absolute -bottom-2 w-3 h-3 bg-card rotate-45 border-b border-r ${
                  step.highlight === 'hint' ? 'left-8' : 
                  step.highlight === 'end' ? 'left-1/2 -translate-x-1/2' : 
                  'right-8'
                }`} 
              />
              
              {/* Close button */}
              <Button 
                type="text"
                size="small"
                icon={<CloseOutlined />}
                onClick={handleCloseStep}
                className="absolute top-2 right-2"
              />

              {/* Content */}
              <div className="pr-6 mb-3">
                <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>

              {/* Step indicator */}
              <div className="flex items-center justify-center gap-1.5 mb-3">
                {guideSteps.map((_, index) => (
                  <div 
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      index === currentStep ? 'bg-primary' : 'bg-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center gap-2">
                {!isFirstStep && (
                  <Button
                    onClick={handlePrev}
                    className="flex-1"
                    icon={<LeftOutlined />}
                  >
                    上一步
                  </Button>
                )}
                
                {isLastStep ? (
                  <Button
                    type="primary"
                    onClick={handleComplete}
                    className="flex-1"
                  >
                    完成
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    onClick={handleNext}
                    className="flex-1"
                  >
                    下一步
                    <RightOutlined />
                  </Button>
                )}
              </div>
            </Card>
          </div>
        )}

        <div className="flex items-center justify-center gap-3">
          {/* Hint Button */}
          <div className={step.highlight === 'hint' ? '' : 'opacity-30'}>
            <Button 
              type="text"
              shape="circle"
              size="large"
              icon={<BulbOutlined />}
              className={`!w-12 !h-12 !bg-muted ${getHighlightStyles('hint')}`}
            />
          </div>
          
          {/* End Button */}
          <div className={step.highlight === 'end' ? '' : 'opacity-30'}>
            <Button
              danger
              ghost
              className={`!h-12 !px-6 !rounded-full ${getHighlightStyles('end')}`}
            >
              结束
            </Button>
          </div>
          
          {/* Talk Button */}
          <div className={step.highlight === 'talk' ? '' : 'opacity-30'}>
            <Button
              type="primary"
              className={`!h-12 !px-8 !rounded-full ${getHighlightStyles('talk')}`}
            >
              点击说话
            </Button>
          </div>
        </div>

        {/* Don't show again checkbox */}
        <div className="flex justify-center mt-4">
          <Checkbox 
            checked={dontShowAgain} 
            onChange={(e) => setDontShowAgain(e.target.checked)}
          >
            <span className="text-sm text-muted-foreground">不再显示新手引导</span>
          </Checkbox>
        </div>
      </div>
      </div>
    </div>
  );
};

export default PracticeOnboarding;
