import { Avatar, Badge, Button, Dropdown, Input } from 'antd';
import { Bell, ChevronDown, Menu as MenuIcon, Search } from 'lucide-react';
import { colors } from '../../theme/colors';
import { appConfig } from '../../config/appConfig';
import { useLocation, useNavigate } from 'react-router-dom';

interface AppHeaderProps {
  onMenuClick?: () => void;
}

const pageTitles: Record<string, string> = {
  '/': 'Tổng quan',
  '/subjects': 'Môn học',
  '/documents': 'Tài liệu',
  '/recordings': 'Record buổi học',
  '/schedule': 'Lịch học',
  '/notifications': 'Thông báo',
  '/profile': 'Cá nhân',
};

export function AppHeader({ onMenuClick }: AppHeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const title = pageTitles[location.pathname] ?? 'EDU Learning Hub';

  return (
    <header className="app-header">
      <div className="header-greeting">
        <Button
          className="mobile-menu-button"
          type="text"
          icon={<MenuIcon size={20} />}
          aria-label="Mở menu"
          onClick={onMenuClick}
        />
        <div>
          <div className="greeting-title">Xin chào, Duy Anh 👋</div>
          <div className="caption">{title} · {appConfig.institution.shortName}</div>
        </div>
      </div>

      <div className="header-actions">
        <Input
          className="desktop-search"
          prefix={<Search size={17} color={colors.textTertiary} />}
          placeholder="Tìm tài liệu, môn học, buổi học..."
          aria-label="Tìm kiếm"
          onPressEnter={(event) => {
            if (event.currentTarget.value.trim()) navigate('/documents');
          }}
        />
        <Badge count={3} size="small">
          <Button
            type="text"
            shape="circle"
            icon={<Bell size={19} />}
            aria-label="Thông báo"
            onClick={() => navigate('/notifications')}
          />
        </Badge>
        <Dropdown
          menu={{
            items: [
              { key: 'profile', label: 'Hồ sơ cá nhân', onClick: () => navigate('/profile') },
              { key: 'logout', label: 'Đăng xuất' },
            ],
          }}
          trigger={['click']}
        >
          <Button type="text" className="profile-button" aria-label="Tài khoản">
            <Avatar size={30} style={{ background: colors.primary }}>DA</Avatar>
            <ChevronDown size={15} />
          </Button>
        </Dropdown>
      </div>
    </header>
  );
}
