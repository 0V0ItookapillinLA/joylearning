import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, MapPin, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import avatarBusiness from '@/assets/avatar-business.png';

interface GuideStep {
  title: string;
  description: string;
  highlight: 'hint' | 'end' | 'talk' | 'back';
}

const guideSteps: GuideStep[] = [
  {
    title: '遇到难题?',
    description: '点此获取提示',
    highlight: 'hint',
  },
  {
    title: '想提前结束?',
    description: '点击此处完成练习',
    highlight: 'end',
  },
  {
    title: '如何说话?',
    description: '点击说话 → 说完了发送语音',
    highlight: 'talk',
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

  const handleNext = () => {
    if (currentStep < guideSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Finish onboarding, go to practice
      navigate('/practice');
    }
  };

  const handleSkip = () => {
    navigate('/practice');
  };

  const step = guideSteps[currentStep];

  const getTooltipPosition = () => {
    switch (step.highlight) {
      case 'hint':
        return 'bottom-28 left-4';
      case 'end':
        return 'bottom-28 left-16';
      case 'talk':
        return 'bottom-28 right-4';
      case 'back':
        return 'top-16 right-4';
      default:
        return 'bottom-28 left-4';
    }
  };

  const getHighlightStyles = (element: string) => {
    if (step.highlight === element) {
      return 'ring-4 ring-primary ring-offset-2 ring-offset-transparent z-20 relative';
    }
    return 'opacity-50';
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <div className="max-w-md mx-auto w-full flex flex-col flex-1 relative">
        {/* Blurred Background / Avatar Area */}
        <div className="flex-1 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <img 
              src={avatarBusiness} 
              alt="Avatar" 
              className="w-full h-full object-cover blur-sm scale-110"
            />
          </div>
          
          {/* Back Button */}
          <div className={`absolute top-4 left-4 ${getHighlightStyles('back')}`}>
            <button className="w-10 h-10 rounded-full bg-card/80 backdrop-blur flex items-center justify-center shadow-lg">
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="bg-background p-4 pb-8 safe-bottom">
          <div className="flex items-center justify-center gap-3">
            {/* Hint Button */}
            <button className={`w-12 h-12 rounded-full bg-muted flex items-center justify-center ${getHighlightStyles('hint')}`}>
              <MapPin className="w-5 h-5 text-muted-foreground" />
            </button>
            
            {/* End Button */}
            <Button
              variant="outline"
              className={`h-12 px-6 rounded-full border-destructive text-destructive hover:bg-destructive/5 ${getHighlightStyles('end')}`}
            >
              结束
            </Button>
            
            {/* Talk Button */}
            <Button
              className={`h-12 px-10 rounded-full bg-primary hover:bg-primary/90 ${getHighlightStyles('talk')}`}
            >
              点击说话
            </Button>
          </div>
        </div>

        {/* Guide Tooltip */}
        <div className={`absolute ${getTooltipPosition()} z-30`}>
          <div className="bg-card rounded-xl shadow-xl p-4 min-w-[200px] max-w-[280px] border">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
              <button 
                onClick={handleNext}
                className="p-1 hover:bg-muted rounded-full flex-shrink-0"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>
          {/* Arrow pointer based on position */}
          {step.highlight !== 'back' && (
            <div className="absolute -bottom-2 left-6 w-4 h-4 bg-card border-b border-r rotate-45 transform" />
          )}
          {step.highlight === 'back' && (
            <div className="absolute -top-2 right-6 w-4 h-4 bg-card border-t border-l rotate-45 transform" />
          )}
        </div>

        {/* Step Indicators */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {guideSteps.map((_, index) => (
            <div 
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentStep ? 'bg-primary' : 'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>

        {/* Skip Button */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 text-sm text-card-foreground/70 bg-card/50 backdrop-blur px-3 py-1 rounded-full z-30"
        >
          跳过
        </button>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-foreground/40 pointer-events-none z-10" />
      </div>
    </div>
  );
};

export default PracticeOnboarding;
