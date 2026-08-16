import type { ReactNode } from 'react';

interface AppCardProps {
  children: ReactNode;
  className?: string;
  title?: ReactNode;
  extra?: ReactNode;
}

export function AppCard({ children, className = '', title, extra }: AppCardProps) {
  return (
    <div className={`app-card ${className}`.trim()}>
      {(title || extra) && (
        <div className="app-card-heading">
          <div className="app-card-title">{title}</div>
          <div className="app-card-extra">{extra}</div>
        </div>
      )}
      {children}
    </div>
  );
}

export default AppCard;
