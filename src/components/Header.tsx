import { Button } from 'antd';
import { LeftOutlined, MoreOutlined } from '@ant-design/icons';
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
  
  return (
    <header className="sticky top-0 bg-background/80 backdrop-blur-lg z-40 border-b border-border/50">
      <div className="flex items-center justify-between h-14 px-4 max-w-md mx-auto">
        <div className="w-12">
          {showBack && (
            <Button 
              type="text" 
              icon={<LeftOutlined />} 
              onClick={handleBack}
              className="!p-2 !-ml-2"
            />
          )}
        </div>
        
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
        
        <div className="w-12 flex justify-end">
          {rightAction === 'menu' && (
            <Button 
              type="text" 
              icon={<MoreOutlined />} 
              onClick={onRightClick}
              className="!p-2 !-mr-2"
            />
          )}
          {rightAction === 'dropdown' && rightLabel}
        </div>
      </div>
    </header>
  );
};

export default Header;
