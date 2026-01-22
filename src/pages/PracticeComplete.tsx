import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Star, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

const PracticeComplete = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

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
    setDrawerOpen(false);
  };

  const handleViewReport = () => {
    // Navigate to the latest practice history detail
    navigate('/history/1');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b max-w-md mx-auto w-full">
        <button onClick={() => navigate('/profile')} className="p-1">
          <X className="w-5 h-5" />
        </button>
        <h1 className="text-base font-medium">京东物流AI陪练</h1>
        <div className="w-6" />
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 max-w-md mx-auto w-full">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full bg-[hsl(var(--status-complete))] flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-primary-foreground" strokeWidth={2.5} />
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
          <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
            <DrawerTrigger asChild>
              <Button
                variant="outline"
                className="flex-1 h-11 border-primary text-primary hover:bg-primary/5"
              >
                评价反馈
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-w-md mx-auto">
              <DrawerHeader className="text-center pb-2">
                <DrawerTitle className="text-lg">打分评价</DrawerTitle>
              </DrawerHeader>

              <div className="px-6 pb-4">
                {/* Greeting */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-1">Hello</h3>
                  <p className="text-sm text-muted-foreground">
                    请为本次面试体验打分吧~
                  </p>
                </div>

                {/* Star Rating */}
                <div className="flex flex-col items-center mb-6">
                  <div className="flex gap-2 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= (hoverRating || rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {getRatingText(hoverRating || rating)}
                  </span>
                </div>

                {/* Feedback Input */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">我要反馈</h4>
                  <div className="relative">
                    <Textarea
                      placeholder="告诉我们您的其他想法？（选填）"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value.slice(0, 200))}
                      className="min-h-[100px] resize-none"
                    />
                    <span className="absolute bottom-2 right-3 text-xs text-muted-foreground">
                      {feedback.length}/200
                    </span>
                  </div>
                </div>
              </div>

              <DrawerFooter className="pt-2">
                <Button
                  onClick={handleSubmitFeedback}
                  className="w-full h-12 bg-[#E53935] hover:bg-[#D32F2F] text-white"
                >
                  提交
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          <Button
            onClick={handleViewReport}
            className="flex-1 h-11 bg-primary hover:bg-primary/90"
          >
            查看报告
          </Button>
        </div>
      </main>
    </div>
  );
};

export default PracticeComplete;
