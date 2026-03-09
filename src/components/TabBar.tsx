import { NavLink, useLocation } from 'react-router-dom';
import { VideoCameraOutlined, UserOutlined } from '@ant-design/icons';
import avatarAi from '@/assets/avatar-ai.png';

const TabBar = () => {
  const location = useLocation();

  const tabs = [
    { path: '/courses', icon: VideoCameraOutlined, label: '课程中心' },
    { path: '/profile', icon: UserOutlined, label: '我的' },
  ];

  return (
    <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md">
      <div className="flex items-center gap-3">
        {/* Main pill – glassmorphism */}
        <div className="flex-1 glass-strong rounded-full shadow-ai flex items-center justify-around py-2 px-2">
          {tabs.map((tab) => {
            const isActive =
              location.pathname === tab.path ||
              (tab.path === '/courses' && (location.pathname.startsWith('/plan') || location.pathname === '/')) ||
              (tab.path === '/profile' && (location.pathname.startsWith('/profile') || location.pathname.startsWith('/history')));

            const Icon = tab.icon;

            return (
              <NavLink
                key={tab.path}
                to={tab.path}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all ${
                  isActive
                    ? 'bg-foreground text-background'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon style={{ fontSize: 18 }} />
                <span className="text-sm font-medium">{tab.label}</span>
              </NavLink>
            );
          })}
        </div>

        {/* AI avatar – separate circle */}
        <NavLink to="/chat" className="shrink-0">
          <div
            className={`w-12 h-12 rounded-full overflow-hidden shadow-ai ring-2 transition-all ${
              location.pathname === '/chat'
                ? 'ring-primary shadow-glow scale-110'
                : 'ring-border/50'
            }`}
          >
            <img src={avatarAi} alt="AI" className="w-full h-full object-cover" />
          </div>
        </NavLink>
      </div>
    </nav>
  );
};

export default TabBar;
