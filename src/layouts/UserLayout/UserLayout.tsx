import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Bell, BookOpen, FileText, LayoutDashboard, PlayCircle, User } from 'lucide-react';
import { AppHeader } from '../../components/layout/AppHeader';
import { AppSidebar } from '../../components/layout/AppSidebar';

const mobileItems = [
  { label: 'Tổng quan', path: '/', icon: LayoutDashboard },
  { label: 'Môn học', path: '/subjects', icon: BookOpen },
  { label: 'Tài liệu', path: '/documents', icon: FileText },
  { label: 'Record', path: '/recordings', icon: PlayCircle },
  { label: 'Thông báo', path: '/notifications', icon: Bell },
];

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleChange = () => setMatches(mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
}

export default function UserLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1100px)');

  return (
    <div className={`app-shell${isTablet ? ' app-shell--tablet' : ''}`}>
      <AppSidebar collapsed={isTablet} />

      <main className="app-content">
        <AppHeader onMenuClick={() => setMobileMenuOpen(true)} />

        {mobileMenuOpen && (
          <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
            <div className="mobile-menu-drawer" onClick={(event) => event.stopPropagation()}>
              <AppSidebar onNavigate={() => setMobileMenuOpen(false)} />
            </div>
          </div>
        )}

        <div className="main-content">
          <Outlet />
        </div>

        <nav className="mobile-bottom-nav" aria-label="Điều hướng chính">
          {mobileItems.map(({ label, path, icon: Icon }) => {
            const active = location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
            return (
              <button
                key={path}
                className={`mobile-nav-item ${active ? 'active' : ''}`}
                onClick={() => navigate(path)}
                type="button"
              >
                <Icon size={19} />
                <span>{label}</span>
              </button>
            );
          })}
        </nav>
      </main>
    </div>
  );
}
