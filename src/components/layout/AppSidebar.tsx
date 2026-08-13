import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Bell,
  BookOpen,
  CalendarDays,
  Cloud,
  FileText,
  LayoutDashboard,
  PenLine,
  PlayCircle,
  User,
} from 'lucide-react';
import { features } from '../../config/featureConfig';
import { appConfig } from '../../config/appConfig';
import { AppLogo } from './AppLogo';

interface AppSidebarProps {
  collapsed?: boolean;
  onNavigate?: () => void;
}

const createItems = (): MenuProps['items'] => [
  { key: '/', icon: <LayoutDashboard size={18} />, label: 'Tổng quan' },
  { key: '/subjects', icon: <BookOpen size={18} />, label: 'Môn học' },
  ...(features.documents ? [{ key: '/documents', icon: <FileText size={18} />, label: 'Tài liệu' }] : []),
  ...(features.recordings ? [{ key: '/recordings', icon: <PlayCircle size={18} />, label: 'Record buổi học' }] : []),
  ...(features.schedule ? [{ key: '/schedule', icon: <CalendarDays size={18} />, label: 'Lịch học' }] : []),
  ...(features.assignments ? [{ key: '/assignments', icon: <PenLine size={18} />, label: 'Bài tập' }] : []),
  { key: '/notifications', icon: <Bell size={18} />, label: 'Thông báo' },
  { key: '/drive', icon: <Cloud size={18} />, label: 'Google Drive' },
];

export function AppSidebar({ collapsed = false, onNavigate }: AppSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedKey = location.pathname === '/' ? '/' : `/${location.pathname.split('/')[1]}`;

  return (
    <aside className={`app-sidebar${collapsed ? ' app-sidebar--collapsed' : ''}`}>
      <AppLogo collapsed={collapsed} />
      <Menu
        mode="inline"
        inlineCollapsed={collapsed}
        selectedKeys={[selectedKey]}
        items={createItems()}
        onClick={({ key }) => {
          navigate(key);
          onNavigate?.();
        }}
        style={{ border: 0, background: 'transparent' }}
      />
      {!collapsed && (
        <>
          <div className="sidebar-quote">
            <div className="quote-title">“Study today, lead tomorrow.”</div>
            <div className="caption">Keep learning · Keep growing</div>
          </div>
          <div className="sidebar-user">
            <div className="sidebar-user__avatar"><User size={17} /></div>
            <div className="sidebar-user-info">
              <div className="user-name">Duy Anh</div>
              <div className="caption">Sinh viên</div>
            </div>
          </div>
        </>
      )}
      {collapsed && (
        <div className="sidebar-collapsed-institution" title={appConfig.institution.name}>
          {appConfig.institution.shortName}
        </div>
      )}
    </aside>
  );
}
