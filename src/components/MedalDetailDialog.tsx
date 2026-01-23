import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { Medal } from './MedalWall';

interface MedalDetailDialogProps {
  medal: Medal | null;
  onClose: () => void;
}

const MedalDetailDialog = ({ medal, onClose }: MedalDetailDialogProps) => {
  if (!medal) return null;

  const getMedalColor = (category: string) => {
    const colorMap: Record<string, string> = {
      '坚持达人': 'bg-gradient-to-br from-amber-400 to-amber-600',
      '求知达人': 'bg-gradient-to-br from-violet-500 to-purple-700',
      '高水平选手': 'bg-gradient-to-br from-sky-400 to-blue-600',
      '练习狂魔': 'bg-gradient-to-br from-emerald-400 to-green-600',
    };
    return colorMap[category] || 'bg-gradient-to-br from-gray-400 to-gray-600';
  };

  return (
    <Dialog open={!!medal} onOpenChange={() => onClose()}>
      <DialogContent className="bg-slate-800/95 backdrop-blur-lg border-slate-700 max-w-sm mx-auto p-0 rounded-2xl overflow-hidden">
        <div className="p-6 pt-8">
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Medal Display */}
          <div className="flex flex-col items-center">
            {/* Medal Icon */}
            <div className={`w-28 h-28 ${getMedalColor(medal.category)} rounded-full flex items-center justify-center shadow-xl mb-6 relative`}>
              <div className="absolute inset-2 rounded-full bg-white/10" />
              <div className="text-center relative z-10">
                <div className="text-4xl font-bold text-white">{medal.level}</div>
                <div className="text-white text-xs uppercase tracking-wider">
                  {medal.category === '练习狂魔' ? 'CPRS' : 'DAYS'}
                </div>
              </div>
              {/* Star decoration */}
              <div className="absolute -top-2 -right-2 text-yellow-300 text-2xl">✦</div>
            </div>

            {/* Medal Name */}
            <h2 className="text-2xl font-bold text-white mb-4">{medal.name}</h2>

            {/* Description */}
            <p className="text-slate-300 text-center mb-4 whitespace-pre-line leading-relaxed">
              恭喜您获得【{medal.name}】徽章！{medal.description}
            </p>

            {/* Earned Date */}
            {medal.earnedDate && (
              <p className="text-slate-400 text-sm">
                于{medal.earnedDate}获得
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MedalDetailDialog;
