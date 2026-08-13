import { BookOpen, FileText, GraduationCap, PlayCircle } from 'lucide-react';
import { Button } from 'antd';
import { colors } from '../../../theme/colors';
import { StatCard } from '../../../components/ui/StatCard';
import { appConfig } from '../../../config/appConfig';

const documents = [
  ['Grammar in Use - Unit 5.pdf', 'Ngữ pháp 2 · Tuần 05', '10/08/2026', 'PDF'],
  ['Reading Practice - Unit 4.pdf', 'Đọc 2 · Tuần 05', '09/08/2026', 'PDF'],
  ['Essay Writing Guide.docx', 'Viết 2 · Tuần 04', '08/08/2026', 'DOCX'],
];

const recordings = [
  ['Week 05 - Grammar 2', 'Conditional Sentences', '10/08/2026', '01:42:18'],
  ['Week 04 - Listening & Speaking 2', 'Jobs and Career', '03/08/2026', '01:35:42'],
  ['Week 03 - Reading 2', 'Global Warming', '27/07/2026', '01:28:31'],
];

export default function Dashboard() {
  return (
    <>
      <section className="hero">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="hero-content">
          <div className="hero-eyebrow">{appConfig.institution.shortName} · English Language · Distance Learning</div>
          <h1 className="hero-title">English opens doors.<br />Knowledge opens minds.</h1>
          <p className="hero-copy">Tập trung tài liệu, record buổi học và hành trình học tập của bạn trong một không gian duy nhất.</p>
        </div>
      </section>

      <section className="section">
        <div className="stat-grid">
          <StatCard icon={<BookOpen size={20} />} value="06" label="Môn học" note="Đang theo học" iconStyle={{ background: colors.primaryLight, color: colors.primary }} />
          <StatCard icon={<FileText size={20} />} value="128" label="Tài liệu" note="Tổng số tài liệu" iconStyle={{ background: '#fff7ed', color: '#ea580c' }} />
          <StatCard icon={<PlayCircle size={20} />} value="18" label="Record buổi học" note="Tổng số buổi" iconStyle={{ background: '#f5f3ff', color: colors.purple }} />
          <StatCard icon={<GraduationCap size={20} />} value="85%" label="Tiến độ học tập" note="Tuyệt vời!" iconStyle={{ background: '#ecfdf3', color: colors.success }} />
        </div>
      </section>

      <section className="section">
        <div className="content-grid">
          <div className="panel">
            <div className="section-heading"><h2 className="section-title">Tài liệu mới cập nhật</h2><Button type="link">Xem tất cả →</Button></div>
            <div className="learning-list">
              {documents.map(([title, meta, date, type]) => (
                <div className="learning-item" key={title}>
                  <div className="file-icon"><FileText size={18} /></div>
                  <div className="item-main"><div className="item-title">{title}</div><div className="item-meta">{meta}</div></div>
                  <div className="item-date">{date}</div><span className="file-type">{type}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="panel">
            <div className="section-heading"><h2 className="section-title">Record gần đây</h2><Button type="link">Xem tất cả →</Button></div>
            <div className="learning-list">
              {recordings.map(([title, meta, date, duration]) => (
                <div className="learning-item" key={title}>
                  <div className="record-thumb"><PlayCircle size={19} /><span>{duration}</span></div>
                  <div className="item-main"><div className="item-title">{title}</div><div className="item-meta">{meta} · {date}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="panel">
          <div className="section-heading"><h2 className="section-title">Lịch học hôm nay</h2><Button type="link">Xem lịch →</Button></div>
          <div className="schedule-grid">
            {[
              ['08:00 – 09:30', 'Ngữ pháp 2', 'Phòng học online 01'],
              ['10:00 – 11:30', 'Nghe nói 2', 'Phòng học online 02'],
              ['13:30 – 15:00', 'Đọc 2', 'Phòng học online 01'],
            ].map(([time, title, room]) => (
              <div className="schedule-item" key={time}>
                <div className="schedule-time">{time}</div><div className="schedule-title">{title}</div><div className="caption">{room}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
