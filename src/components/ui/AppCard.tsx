import type { ReactNode } from 'react';

interface AppCardProps {
  children: ReactNode;
  className?: string;
}

export function AppCard({ children, className = '' }: AppCardProps) {
  return <div className={`app-card ${className}`.trim()}>{children}</div>;
}
