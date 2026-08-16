import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { Button, Empty, Spin, Tag } from 'antd';
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  ExternalLink,
  FileText,
  Mic2,
  Play,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Subject } from '../../../data/models/Subject';
import type { DocumentItem } from '../../../data/models/Document';
import type { Recording } from '../../../data/models/Recording';
import { learningDataProvider } from '../../../data/providers';
import { useAcademicTerm } from '../../../contexts/AcademicTermContext';
import AppCard from '../../../components/ui/AppCard';

const subjectColors: Record<string, { bg: string; fg: string; soft: string }> = {
  blue: { bg: '#2563EB', fg: '#2563EB', soft: '#EFF6FF' },
  indigo: { bg: '#4F46E5', fg: '#4F46E5', soft: '#EEF2FF' },
  purple: { bg: '#7C3AED', fg: '#7C3AED', soft: '#F5F3FF' },
  green: { bg: '#16A34A', fg: '#16A34A', soft: '#ECFDF3' },
  orange: { bg: '#EA580C', fg: '#EA580C', soft: '#FFF7ED' },
};

export default function SubjectDetail() {
  const navigate = useNavigate();
  const { subjectId } = useParams();
  const [subject, setSubject] = useState<Subject | null>(null);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { selectedTerm, loading: termLoading } = useAcademicTerm();

  useEffect(() => {
    let mounted = true;

    if (termLoading || !selectedTerm) return;

    Promise.all([
      learningDataProvider.getSubjects(selectedTerm),
      learningDataProvider.getDocuments(selectedTerm),
      learningDataProvider.getRecordings(selectedTerm),
    ])
      .then(([subjectData, documentData, recordingData]) => {
        if (!mounted) return;
        setSubject(subjectData.find((item) => item.id === subjectId && item.active) || null);
        setDocuments(documentData.filter((item) => item.subjectId === subjectId && item.active));
        setRecordings(recordingData.filter((item) => item.subjectId === subjectId && item.active));
      })
      .catch((err: unknown) => {
        if (!mounted) return;
        setError(err instanceof Error ? err.message : 'Không thể tải dữ liệu môn học.');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [subjectId, selectedTerm, termLoading]);

  const palette = subjectColors[subject?.color || 'blue'] || subjectColors.blue;

  const latestDocuments = useMemo(
    () => [...documents].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
    [documents],
  );

  const latestRecordings = useMemo(
    () => [...recordings].sort((a, b) => b.recordedAt.localeCompare(a.recordedAt)),
    [recordings],
  );

  if (loading) {
    return <div className="page-state"><Spin size="large" /><span>Đang tải môn học...</span></div>;
  }

  if (error) {
    return (
      <div className="page-shell">
        <AppCard className="data-error-card">
          <strong>Không thể tải dữ liệu</strong>
          <p>{error}</p>
          <Button onClick={() => navigate('/subjects')}>Quay lại môn học</Button>
        </AppCard>
      </div>
    );
  }

  if (!subject) {
    return (
      <div className="page-shell">
        <AppCard className="empty-card">
          <Empty description="Không tìm thấy môn học." />
          <Button onClick={() => navigate('/subjects')}>Quay lại môn học</Button>
        </AppCard>
      </div>
    );
  }

  return (
    <div className="page-shell subject-detail-page">
      <button type="button" className="back-link" onClick={() => navigate('/subjects')}>
        <ArrowLeft size={16} /> Môn học
      </button>

      <section className="subject-detail-hero" style={{ '--subject-color': palette.bg, '--subject-soft': palette.soft } as CSSProperties}>
        <div className="subject-detail-hero-icon">
          <BookOpen size={30} />
        </div>
        <div className="subject-detail-hero-content">
          <span className="subject-detail-hero-code">{subject.code}</span>
          <h1>{subject.name}</h1>
          <p>{subject.description || 'Không có mô tả cho môn học này.'}</p>
          <div className="subject-detail-hero-stats">
            <span><FileText size={14} /> {documents.length} tài liệu</span>
            <span><Mic2 size={14} /> {recordings.length} record</span>
          </div>
        </div>
      </section>

      <div className="subject-detail-content-grid">
        <AppCard title="Tài liệu học tập" extra={<Tag>{documents.length}</Tag>}>
          {latestDocuments.length === 0 ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Chưa có tài liệu." />
          ) : (
            <div className="resource-list">
              {latestDocuments.map((item) => (
                <div className="resource-row" key={item.id}>
                  <div className="resource-icon document-resource-icon"><FileText size={18} /></div>
                  <div className="resource-info">
                    <strong>{item.title}</strong>
                    <span>
                      {item.type || 'File'}{item.week ? ` · Tuần ${item.week}` : ''}
                      {item.updatedAt ? ` · ${item.updatedAt}` : ''}
                    </span>
                  </div>
                  <Button
                    type="text"
                    icon={<ExternalLink size={16} />}
                    aria-label={`Mở ${item.title}`}
                    onClick={() => window.open(item.url, '_blank', 'noopener,noreferrer')}
                  />
                </div>
              ))}
            </div>
          )}
        </AppCard>

        <AppCard title="Record buổi học" extra={<Tag>{recordings.length}</Tag>}>
          {latestRecordings.length === 0 ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Chưa có record." />
          ) : (
            <div className="resource-list">
              {latestRecordings.map((item) => (
                <div className="resource-row" key={item.id}>
                  <div className="resource-icon recording-resource-icon"><Play size={17} /></div>
                  <div className="resource-info">
                    <strong>{item.title}</strong>
                    <span>
                      {item.duration || 'Record'}{item.week ? ` · Tuần ${item.week}` : ''}
                      {item.recordedAt ? ` · ${item.recordedAt}` : ''}
                    </span>
                  </div>
                  <Button
                    type="text"
                    icon={<ExternalLink size={16} />}
                    aria-label={`Mở ${item.title}`}
                    onClick={() => window.open(item.url, '_blank', 'noopener,noreferrer')}
                  />
                </div>
              ))}
            </div>
          )}
        </AppCard>
      </div>

      <AppCard className="subject-detail-tip">
        <CalendarDays size={18} />
        <div>
          <strong>Kho học tập tập trung</strong>
          <p>Tài liệu và record được cập nhật từ nguồn dữ liệu của lớp. Khi nội dung trên Google Drive được thay đổi, danh sách có thể được cập nhật mà không cần sửa giao diện.</p>
        </div>
      </AppCard>
    </div>
  );
}
