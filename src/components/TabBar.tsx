import { NavLink, useLocation } from 'react-router-dom';
import { HomeOutlined, PlaySquareOutlined, UserOutlined } from '@ant-design/icons';
import avatarAi from '@/assets/avatar-ai.png';

const TabBar = () => {
  const location = useLocation();
  
  const tabs = [
    { path: '/', icon: HomeOutlined, label: '首页' },
    { path: '/courses', icon: PlaySquareOutlined, label: '课程' },
    { path: '/chat', icon: null, label: 'AI', isAI: true },
    { path: '/profile', icon: UserOutlined, label: '我的' },
  ];

  return (
    <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md">
      <div className="glass-strong rounded-2xl shadow-ai flex items-center justify-around py-1.5 px-1">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path || 
            (tab.path === '/courses' && location.pathname.startsWith('/plan')) ||
            (tab.path === '/profile' && (location.pathname.startsWith('/profile') || location.pathname.startsWith('/history')));
          
          const Icon = tab.icon;

          if (tab.isAI) {
            return (
              <NavLink
                key={tab.path}
                to={tab.path}
                className="flex flex-col items-center gap-0.5 -mt-5 relative"
              >
                {/* Glow ring */}
                <div className={`absolute inset-0 -top-1 rounded-full blur-md transition-opacity ${
                  isActive ? 'opacity-100' : 'opacity-40'
                }`} style={{ background: 'var(--gradient-ai)', filter: 'blur(12px)' }} />
                {/* AI button */}
                <div className={`relative w-12 h-12 rounded-full flex items-center justify-center shadow-glow transition-all ${
                  isActive ? 'animate-pulse-glow scale-110' : ''
                }`} style={{ background: 'var(--gradient-ai)' }}>
                  <img src={avatarAi} alt="AI" className="w-8 h-8 rounded-full object-cover" />
                </div>
                <span className={`text-[10px] font-semibold relative ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}>{tab.label}</span>
              </NavLink>
            );
          }
          
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={`flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl transition-all ${
                isActive 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {Icon && (
                <div className="relative">
                  <Icon style={{ fontSize: 20 }} />
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                  )}
                </div>
              )}
              <span className="text-[10px] font-medium">{tab.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default TabBar;
