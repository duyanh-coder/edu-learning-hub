import type { CSSProperties, ReactNode } from 'react';

interface StatCardProps {
  icon: ReactNode;
  value: string;
  label: string;
  note?: string;
  iconStyle?: CSSProperties;
}

export function StatCard({ icon, value, label, note, iconStyle }: StatCardProps) {
  return (
    <article className="stat-card">
      <div className="stat-icon" style={iconStyle}>{icon}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      {note && <div className="stat-note">{note}</div>}
    </article>
  );
}
