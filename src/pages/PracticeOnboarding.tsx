import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
    <div className="fixed inset-0 bg-background flex flex-col">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-foreground/60 z-10" />

      {/* Background / Avatar Area */}
      <div className="flex-1 relative overflow-hidden">
        <img 
          src={avatarInterviewer} 
          alt="AI面试官" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Back Button */}
        <div className={`absolute top-4 left-4 z-20 ${step.highlight === 'back' ? '' : 'opacity-30'}`}>
          <button className={`w-10 h-10 rounded-full bg-card backdrop-blur flex items-center justify-center shadow-lg ${getHighlightStyles('back')}`}>
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Skip button */}
        <div className="absolute top-4 right-4 z-30">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSkip}
            className="text-card bg-card/80 backdrop-blur hover:bg-card/90 px-4"
          >
            跳过
          </Button>
        </div>

        {/* Tooltip for 'back' step - positioned below back button */}
        {step.highlight === 'back' && (
          <div className="absolute top-16 left-4 z-30 w-[calc(100%-2rem)] max-w-[280px]">
            <div className="bg-card rounded-xl shadow-xl p-4 border relative">
              {/* Arrow pointing up */}
              <div className="absolute -top-2 left-6 w-3 h-3 bg-card rotate-45 border-t border-l" />
              
              {/* Close button */}
              <button 
                onClick={handleCloseStep}
                className="absolute top-3 right-3 p-1 hover:bg-muted rounded-full"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>

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
                    variant="outline"
                    size="sm"
                    onClick={handlePrev}
                    className="flex-1 h-9"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    上一步
                  </Button>
                )}
                <Button
                  size="sm"
                  onClick={handleComplete}
                  className="flex-1 h-9"
                >
                  完成
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="bg-background p-4 pb-6 safe-bottom relative z-20">
        {/* Tooltip for bottom controls - positioned above buttons */}
        {step.highlight !== 'back' && (
          <div className="absolute bottom-full left-4 right-4 mb-3 z-30 flex justify-center">
            <div className="bg-card rounded-xl shadow-xl p-4 border relative w-full max-w-[300px]">
              {/* Arrow pointing down */}
              <div 
                className={`absolute -bottom-2 w-3 h-3 bg-card rotate-45 border-b border-r ${
                  step.highlight === 'hint' ? 'left-8' : 
                  step.highlight === 'end' ? 'left-1/2 -translate-x-1/2' : 
                  'right-8'
                }`} 
              />
              
              {/* Close button */}
              <button 
                onClick={handleCloseStep}
                className="absolute top-3 right-3 p-1 hover:bg-muted rounded-full"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>

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
                    variant="outline"
                    size="sm"
                    onClick={handlePrev}
                    className="flex-1 h-9"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    上一步
                  </Button>
                )}
                
                {isLastStep ? (
                  <Button
                    size="sm"
                    onClick={handleComplete}
                    className="flex-1 h-9"
                  >
                    完成
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={handleNext}
                    className="flex-1 h-9"
                  >
                    下一步
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-center gap-3">
          {/* Hint Button */}
          <div className={step.highlight === 'hint' ? '' : 'opacity-30'}>
            <button className={`w-12 h-12 rounded-full bg-muted flex items-center justify-center ${getHighlightStyles('hint')}`}>
              <MapPin className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
          
          {/* End Button */}
          <div className={step.highlight === 'end' ? '' : 'opacity-30'}>
            <Button
              variant="outline"
              className={`h-12 px-6 rounded-full border-destructive text-destructive hover:bg-destructive/5 ${getHighlightStyles('end')}`}
            >
              结束
            </Button>
          </div>
          
          {/* Talk Button */}
          <div className={step.highlight === 'talk' ? '' : 'opacity-30'}>
            <Button
              className={`h-12 px-8 rounded-full bg-primary hover:bg-primary/90 ${getHighlightStyles('talk')}`}
            >
              点击说话
            </Button>
          </div>
        </div>

        {/* Don't show again checkbox */}
        <div className="flex justify-center mt-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox 
              checked={dontShowAgain} 
              onCheckedChange={(checked) => setDontShowAgain(checked === true)}
              className="border-muted-foreground data-[state=checked]:bg-primary"
            />
            <span className="text-sm text-muted-foreground">不再显示新手引导</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PracticeOnboarding;
