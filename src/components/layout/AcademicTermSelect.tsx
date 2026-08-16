import { CalendarDays } from 'lucide-react';
import { Select, Spin } from 'antd';
import { useAcademicTerm } from '../../contexts/AcademicTermContext';

export function AcademicTermSelect() {
  const { terms, selectedTerm, loading, error, setSelectedTerm } = useAcademicTerm();

  if (error) return <div className="academic-term-error" title={error}>Không tải được kỳ học</div>;

  return (
    <div className="academic-term-select" title="Chọn năm học và học kỳ">
      <CalendarDays size={15} />
      <div className="academic-term-label">Năm học · Học kỳ</div>
      {loading ? (
        <Spin size="small" />
      ) : (
        <Select
          value={selectedTerm?.id}
          onChange={setSelectedTerm}
          variant="borderless"
          size="small"
          className="academic-term-dropdown"
          popupMatchSelectWidth={false}
          options={terms.map((term) => ({
            value: term.id,
            label: `${term.label}${term.isCurrent ? ' · Hiện hành' : ''}`,
          }))}
          placeholder="Chọn kỳ học"
          aria-label="Năm học và học kỳ"
        />
      )}
    </div>
  );
}
