import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  FolderOpen,
  GraduationCap,
  PlayCircle,
  Sparkles,
} from 'lucide-react';
import { Alert, Button, Empty, Spin, Tag } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { colors } from '../../../theme/colors';
import { StatCard } from '../../../components/ui/StatCard';
import { appConfig } from '../../../config/appConfig';
import { useNavigate } from 'react-router-dom';
import { learningDataProvider } from '../../../data/providers';
import type { Announcement } from '../../../data/models/Announcement';
import type { DocumentItem } from '../../../data/models/Document';
import type { Recording } from '../../../data/models/Recording';
import type { ScheduleItem } from '../../../data/models/Schedule';
import type { Subject } from '../../../data/models/Subject';

const formatDate = (value: string) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
};

const formatRelativeTime = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  const diffMinutes = Math.max(0, Math.round((Date.now() - date.getTime()) / 60000));
  if (diffMinutes < 60) return `${Math.max(1, diffMinutes)} phút trước`;
  if (diffMinutes < 1440) return `${Math.round(diffMinutes / 60)} giờ trước`;
  return `${Math.round(diffMinutes / 1440)} ngày trước`;
};

const getSubjectColor = (subject?: Subject) => {
  const value = subject?.color?.trim();
  return value || colors.primary;
};

const getSubjectIcon = (subject?: Subject) => {
  const code = `${subject?.code ?? ''} ${subject?.name ?? ''}`.toLowerCase();
  if (code.includes('nghe') || code.includes('listening')) return PlayCircle;
  if (code.includes('đọc') || code.includes('reading')) return FileText;
  return BookOpen;
};

const getSoftColor = (color: string) => {
  const map: Record<string, string> = {
    '#2563EB': '#EFF6FF',
    '#6366F1': '#EEF2FF',
    '#8B5CF6': '#F5F3FF',
    '#16A34A': '#ECFDF3',
    '#F59E0B': '#FFF7ED',
  };
  return map[color.toUpperCase()] ?? '#F2F4F7';
};

const getAnnouncementColor = (type: string) => {
  const value = type.toLowerCase();
  if (value.includes('record')) return colors.success;
  if (value.includes('tài liệu') || value.includes('document')) return colors.primary;
  return colors.warning;
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [subjectData, documentData, recordingData, scheduleData, announcementData] =
          await Promise.all([
            learningDataProvider.getSubjects(),
            learningDataProvider.getDocuments(),
            learningDataProvider.getRecordings(),
            learningDataProvider.getSchedule(),
            learningDataProvider.getAnnouncements(),
          ]);

        if (!mounted) return;
        setSubjects(subjectData);
        setDocuments(documentData);
        setRecordings(recordingData);
        setSchedule(scheduleData);
        setAnnouncements(announcementData);
      } catch (cause) {
        if (!mounted) return;
        setError(cause instanceof Error ? cause.message : 'Không thể tải dữ liệu học tập.');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    void loadDashboardData();
    return () => { mounted = false; };
  }, []);

  const subjectStats = useMemo(() =>
    subjects.map((subject) => ({
      subject,
      documents: documents.filter((item) => item.subjectId === subject.id).length,
      recordings: recordings.filter((item) => item.subjectId === subject.id).length,
    })),
    [subjects, documents, recordings],
  );

  const recentDocuments = useMemo(() =>
    [...documents]
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 4),
    [documents],
  );

  const recentRecordings = useMemo(() =>
    [...recordings]
      .sort((a, b) => new Date(b.recordedAt).getTime() - new Date(a.recordedAt).getTime())
      .slice(0, 3),
    [recordings],
  );

  const upcomingSchedule = useMemo(() =>
    [...schedule]
      .sort((a, b) => `${a.date} ${a.startTime}`.localeCompare(`${b.date} ${b.startTime}`))
      .slice(0, 3),
    [schedule],
  );

  const recentAnnouncements = useMemo(() =>
    [...announcements]
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 3),
    [announcements],
  );

  if (loading) {
    return (
      <div className="dashboard-loading">
        <Spin size="large" />
        <span>Đang tải dữ liệu học tập...</span>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      {error && (
        <Alert
          className="dashboard-data-alert"
          type="error"
          showIcon
          message="Không thể tải dữ liệu từ nguồn hiện tại"
          description={error}
        />
      )}

      <section className="hero dashboard-hero">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="hero-content">
          <div className="hero-eyebrow">{appConfig.institution.shortName} · English Language · Distance Learning</div>
          <h1 className="hero-title">English opens doors.<br />Knowledge opens minds.</h1>
          <p className="hero-copy">Tập trung tài liệu, record buổi học và hành trình học tập của bạn trong một không gian duy nhất.</p>
          <div className="hero-actions">
            <Button type="primary" size="large" icon={<BookOpen size={17} />} onClick={() => navigate('/subjects')}>Tiếp tục học</Button>
            <Button className="hero-secondary-button" size="large" icon={<PlayCircle size={17} />} onClick={() => navigate('/recordings')}>Xem record</Button>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-orbit hero-orbit-one" />
          <div className="hero-orbit hero-orbit-two" />
          <div className="hero-art-card"><GraduationCap size={30} /><span>Keep learning</span></div>
        </div>
      </section>

      <section className="section">
        <div className="stat-grid">
          <StatCard icon={<BookOpen size={20} />} value={String(subjects.length).padStart(2, '0')} label="Môn học" note="Đang hiển thị" iconStyle={{ background: colors.primaryLight, color: colors.primary }} />
          <StatCard icon={<FileText size={20} />} value={String(documents.length)} label="Tài liệu" note="Từ Google Sheets" iconStyle={{ background: '#FFF7ED', color: '#EA580C' }} />
          <StatCard icon={<PlayCircle size={20} />} value={String(recordings.length)} label="Record buổi học" note="Từ Google Sheets" iconStyle={{ background: '#F5F3FF', color: colors.purple }} />
          <StatCard icon={<CalendarDays size={20} />} value={String(schedule.length)} label="Lịch học" note="Đã cập nhật" iconStyle={{ background: '#ECFDF3', color: colors.success }} />
        </div>
      </section>

      <section className="section">
        <div className="section-heading dashboard-section-heading">
          <div>
            <div className="eyebrow-label"><Sparkles size={14} /> Đang học</div>
            <h2 className="section-title dashboard-title">Môn học của tôi</h2>
          </div>
          <Button type="link" onClick={() => navigate('/subjects')}>Xem tất cả <ArrowRight size={15} /></Button>
        </div>
        {subjectStats.length ? (
          <div className="subject-grid">
            {subjectStats.map(({ subject, documents: documentCount, recordings: recordingCount }) => {
              const color = getSubjectColor(subject);
              const Icon = getSubjectIcon(subject);
              return (
                <button key={subject.id} type="button" className="subject-card" onClick={() => navigate(`/subjects/${subject.id}`)}>
                  <div className="subject-card-top">
                    <span className="subject-icon" style={{ color, background: getSoftColor(color) }}><Icon size={19} /></span>
                    <ChevronRight size={17} className="subject-arrow" />
                  </div>
                  <div className="subject-name">{subject.name}</div>
                  <div className="subject-code">{subject.code}</div>
                  <div className="subject-meta"><span>{documentCount} tài liệu</span><span>{recordingCount} record</span></div>
                  <div className="subject-progress-row"><span>Trạng thái</span><Tag bordered={false} style={{ marginInlineEnd: 0, color, background: getSoftColor(color) }}>Đang học</Tag></div>
                </button>
              );
            })}
          </div>
        ) : (
          <Empty description="Chưa có môn học trong Google Sheet." />
        )}
      </section>

      <section className="section">
        <div className="content-grid dashboard-content-grid">
          <div className="panel dashboard-panel">
            <div className="section-heading"><div><div className="eyebrow-label"><FileText size={14} /> Mới cập nhật</div><h2 className="section-title">Tài liệu mới</h2></div><Button type="link" onClick={() => navigate('/documents')}>Xem tất cả <ArrowRight size={15} /></Button></div>
            <div className="learning-list">
              {recentDocuments.length ? recentDocuments.map((item) => (
                <button type="button" className="learning-item learning-item-button" key={item.id} onClick={() => item.url && window.open(item.url, '_blank', 'noopener,noreferrer')}>
                  <div className="file-icon"><FileText size={18} /></div>
                  <div className="item-main"><div className="item-title">{item.title}</div><div className="item-meta">Tuần {item.week || '—'} · {formatDate(item.updatedAt)}</div></div>
                  <div className="item-date">{formatDate(item.updatedAt)}</div><span className="file-type">{item.type}</span>
                </button>
              )) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Chưa có tài liệu." />}
            </div>
          </div>

          <div className="panel dashboard-panel">
            <div className="section-heading"><div><div className="eyebrow-label"><PlayCircle size={14} /> Video learning</div><h2 className="section-title">Record gần đây</h2></div><Button type="link" onClick={() => navigate('/recordings')}>Xem tất cả <ArrowRight size={15} /></Button></div>
            <div className="learning-list">
              {recentRecordings.length ? recentRecordings.map((item) => (
                <button type="button" className="learning-item learning-item-button" key={item.id} onClick={() => item.url && window.open(item.url, '_blank', 'noopener,noreferrer')}>
                  <div className="record-thumb"><PlayCircle size={19} /><span>{item.duration || '--:--:--'}</span></div>
                  <div className="item-main"><div className="item-title">{item.title}</div><div className="item-meta">{item.description || 'Buổi học'} · {formatDate(item.recordedAt)}</div></div>
                </button>
              )) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Chưa có record." />}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="dashboard-lower-grid">
          <div className="panel dashboard-panel">
            <div className="section-heading"><div><div className="eyebrow-label"><CalendarDays size={14} /> Lịch học</div><h2 className="section-title">Lịch sắp tới</h2></div><Button type="link" onClick={() => navigate('/schedule')}>Xem lịch <ArrowRight size={15} /></Button></div>
            <div className="schedule-list">
              {upcomingSchedule.length ? upcomingSchedule.map((item, index) => {
                const subject = subjects.find((entry) => entry.id === item.subjectId);
                const color = getSubjectColor(subject);
                return (
                  <button type="button" className="schedule-row" key={item.id} onClick={() => navigate('/schedule')}>
                    <span className="schedule-marker" style={{ background: color }} />
                    <span className="schedule-clock"><Clock3 size={14} /> {item.startTime} – {item.endTime}</span>
                    <span className="schedule-info"><strong>{subject?.name || item.subjectId}</strong><small>{item.room || 'Online'} · {formatDate(item.date)}</small></span>
                    <ChevronRight size={16} className="muted-icon" />
                  </button>
                );
              }) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Chưa có lịch học." />}
            </div>
          </div>

          <div className="panel dashboard-panel">
            <div className="section-heading"><div><div className="eyebrow-label"><CheckCircle2 size={14} /> Cập nhật</div><h2 className="section-title">Thông báo</h2></div><Button type="link" onClick={() => navigate('/notifications')}>Xem tất cả <ArrowRight size={15} /></Button></div>
            <div className="announcement-list">
              {recentAnnouncements.length ? recentAnnouncements.map((item) => {
                const color = getAnnouncementColor(item.type);
                return (
                  <button type="button" className="announcement-row" key={item.id} onClick={() => navigate('/notifications')}>
                    <span className="announcement-dot" style={{ background: color }} />
                    <span className="announcement-content"><strong>{item.title}</strong><small>{formatRelativeTime(item.publishedAt)}</small></span>
                    <Tag bordered={false}>{item.type}</Tag>
                  </button>
                );
              }) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Chưa có thông báo." />}
            </div>
          </div>

          <div className="panel quick-panel">
            <div className="quick-panel-icon"><FolderOpen size={20} /></div>
            <div className="quick-panel-content"><div className="eyebrow-label">Google Drive</div><h2 className="section-title">Kho tài liệu của lớp</h2><p>Dữ liệu hiện được quản lý tập trung qua Google Sheets và liên kết tới Google Drive.</p><Button type="primary" ghost onClick={() => navigate('/documents')}>Mở tài liệu <ArrowRight size={15} /></Button></div>
          </div>
        </div>
      </section>
    </div>
  );
}
