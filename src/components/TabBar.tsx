import { NavLink, useLocation } from 'react-router-dom';
import { Home, PlaySquare, User } from 'lucide-react';
import avatarAi from '@/assets/avatar-ai.png';

const TabBar = () => {
  const location = useLocation();
  
  const tabs = [
    { path: '/', icon: Home, label: '首页' },
    { path: '/courses', icon: PlaySquare, label: '课程中心' },
    { path: '/profile', icon: User, label: '我的' },
    { path: '/chat', icon: null, label: 'AI助手', isAvatar: true },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md">
      <div className="bg-card/70 backdrop-blur-xl border border-border/50 rounded-2xl shadow-lg flex items-center justify-around py-2 px-2">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path || 
            (tab.path === '/courses' && location.pathname.startsWith('/plan')) ||
            (tab.path === '/profile' && (location.pathname.startsWith('/profile') || location.pathname.startsWith('/history')));
          
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={`flex flex-col items-center gap-1 px-5 py-2 rounded-xl transition-all ${
                isActive 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.isAvatar ? (
                <div className="w-5 h-5 rounded-full overflow-hidden">
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
