import { GraduationCap } from 'lucide-react';
import { appConfig } from '../../config/appConfig';

interface AppLogoProps {
  collapsed?: boolean;
}

export function AppLogo({ collapsed = false }: AppLogoProps) {
  return (
    <div className={`app-logo${collapsed ? ' app-logo--collapsed' : ''}`} title={appConfig.app.name}>
      <div className="app-logo__mark" aria-hidden="true">
        <GraduationCap size={22} />
      </div>
      {!collapsed && (
        <div className="app-logo__text">
          <strong>{appConfig.app.name}</strong>
          <span>{appConfig.institution.shortName}</span>
        </div>
      )}
    </div>
  );
}
