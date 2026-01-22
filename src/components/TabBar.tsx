import { NavLink, useLocation } from 'react-router-dom';
import { PlaySquare, User } from 'lucide-react';
import avatarAi from '@/assets/avatar-ai.png';

const TabBar = () => {
  const location = useLocation();
  
  const tabs = [
    { path: '/', icon: PlaySquare, label: '课程中心' },
    { path: '/chat', icon: null, label: 'AI助手', isAvatar: true },
    { path: '/profile', icon: User, label: '我的' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border safe-bottom z-50">
      <div className="max-w-md mx-auto flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path || 
            (tab.path === '/' && location.pathname.startsWith('/plan')) ||
            (tab.path === '/profile' && (location.pathname.startsWith('/profile') || location.pathname.startsWith('/history')));
          
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all ${
                isActive 
                  ? 'bg-accent text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.isAvatar ? (
                <div className="w-6 h-6 rounded-full overflow-hidden">
                  <img src={avatarAi} alt="AI" className="w-full h-full object-cover" />
                </div>
              ) : tab.icon ? (
                <tab.icon className="w-5 h-5" strokeWidth={1.5} />
              ) : null}
              <span className="text-xs font-medium">{tab.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default TabBar;
