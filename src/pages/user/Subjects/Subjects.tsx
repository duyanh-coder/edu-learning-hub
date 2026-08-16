import { useEffect, useMemo, useState } from 'react';
import { Empty, Input, Spin, Tag } from 'antd';
import { ArrowRight, BookOpen, FileText, Mic2, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Subject } from '../../../data/models/Subject';
import type { DocumentItem } from '../../../data/models/Document';
import type { Recording } from '../../../data/models/Recording';
import { learningDataProvider } from '../../../data/providers';
import { useAcademicTerm } from '../../../contexts/AcademicTermContext';
import AppCard from '../../../components/ui/AppCard';

const subjectColors: Record<string, { bg: string; fg: string }> = {
  blue: { bg: '#EFF6FF', fg: '#2563EB' },
  indigo: { bg: '#EEF2FF', fg: '#4F46E5' },
  purple: { bg: '#F5F3FF', fg: '#7C3AED' },
  green: { bg: '#ECFDF3', fg: '#16A34A' },
  orange: { bg: '#FFF7ED', fg: '#EA580C' },
};

export default function Subjects() {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { selectedTerm, loading: termLoading } = useAcademicTerm();

  useEffect(() => {
    let mounted = true;

    if (termLoading || !selectedTerm) return;

    Promise.all([
      learningDataProvider.getSubjects(selectedTerm ?? undefined),
      learningDataProvider.getDocuments(selectedTerm ?? undefined),
      learningDataProvider.getRecordings(selectedTerm ?? undefined),
    ])
      .then(([subjectData, documentData, recordingData]) => {
        if (!mounted) return;
        setSubjects(subjectData.filter((item) => item.active));
        setDocuments(documentData.filter((item) => item.active));
        setRecordings(recordingData.filter((item) => item.active));
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
  }, [selectedTerm, termLoading]);

  const filteredSubjects = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return subjects;

    return subjects.filter((subject) =>
      [subject.code, subject.name, subject.description]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(normalized)),
    );
  }, [query, subjects]);

  return (
    <div className="page-shell subjects-page">
      <div className="page-heading-row">
        <div>
          <div className="eyebrow-label"><BookOpen size={13} /> Học tập</div>
          <h1 className="page-title">Môn học của tôi</h1>
          <p className="page-description">Tập trung toàn bộ tài liệu và record theo từng môn học.</p>
        </div>
        <div className="subject-count-pill">{subjects.length} môn học</div>
      </div>

      <div className="subjects-toolbar">
        <Input
          allowClear
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          prefix={<Search size={16} className="muted-icon" />}
          placeholder="Tìm theo tên hoặc mã môn học..."
          className="subjects-search"
        />
      </div>

      {loading ? (
        <div className="page-state"><Spin size="large" /><span>Đang tải danh sách môn học...</span></div>
      ) : error ? (
        <AppCard className="data-error-card">
          <strong>Không thể tải dữ liệu</strong>
          <p>{error}</p>
        </AppCard>
      ) : filteredSubjects.length === 0 ? (
        <AppCard className="empty-card">
          <Empty description={query ? 'Không tìm thấy môn học phù hợp.' : 'Chưa có môn học.'} />
        </AppCard>
      ) : (
        <div className="subjects-list-grid">
          {filteredSubjects.map((subject) => {
            const palette = subjectColors[subject.color || 'blue'] || subjectColors.blue;
            const documentCount = documents.filter((item) => item.subjectId === subject.id).length;
            const recordingCount = recordings.filter((item) => item.subjectId === subject.id).length;

            return (
              <button
                key={subject.id}
                type="button"
                className="subject-detail-card"
                onClick={() => navigate(`/subjects/${subject.id}`)}
              >
                <div className="subject-detail-top">
                  <div className="subject-detail-icon" style={{ background: palette.bg, color: palette.fg }}>
                    <BookOpen size={20} />
                  </div>
                  <ArrowRight size={18} className="subject-detail-arrow" />
                </div>

                <div className="subject-detail-code">{subject.code}</div>
                <div className="subject-detail-name">{subject.name}</div>
                <p className="subject-detail-description">
                  {subject.description || 'Xem tài liệu, record và nội dung học tập của môn.'}
                </p>

                <div className="subject-detail-meta">
                  <Tag icon={<FileText size={11} />}>
                    {documentCount} tài liệu
                  </Tag>
                  <Tag icon={<Mic2 size={11} />}>
                    {recordingCount} record
                  </Tag>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
