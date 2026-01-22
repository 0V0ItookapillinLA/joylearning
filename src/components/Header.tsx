import { ChevronLeft, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
interface HeaderProps {
  title: string;
  showBack?: boolean;
  backPath?: string;
  rightAction?: 'menu' | 'dropdown';
  rightLabel?: string;
  onRightClick?: () => void;
}
const Header = ({
  title,
  showBack = true,
  backPath,
  rightAction,
  rightLabel,
  onRightClick
}: HeaderProps) => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    if (backPath) {
      navigate(backPath);
    } else {
      navigate(-1);
    }
  };
  
  return <header className="sticky top-0 bg-background/80 backdrop-blur-lg z-40 border-b border-border/50">
      <div className="flex items-center justify-between h-14 px-4 max-w-md mx-auto">
        <div className="w-12">
          {showBack && <button onClick={handleBack} className="p-2 -ml-2 rounded-full hover:bg-accent transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>}
        </div>
        
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
        
        <div className="w-12 flex justify-end">
          {rightAction === 'menu' && <button onClick={onRightClick} className="p-2 -mr-2 rounded-full hover:bg-accent transition-colors">
              <MoreHorizontal className="w-5 h-5" />
            </button>}
          {rightAction === 'dropdown' && rightLabel}
        </div>
      </div>
    </header>;
};
export default Header;