import type { AcademicTerm, AcademicTermFilter } from '../models/AcademicTerm';
import type { Announcement } from '../models/Announcement';
import type { DocumentItem } from '../models/Document';
import type { Recording } from '../models/Recording';
import type { ScheduleItem } from '../models/Schedule';
import type { Subject } from '../models/Subject';
import type { LearningDataProvider } from './LearningDataProvider';

const term = { academicYear: '2025-2026', semester: 'HK02' };

const subjects: Subject[] = [
  { id: 'grammar-2', code: 'GRAMMAR-2', name: 'Ngữ pháp 2', description: 'Grammar 2', color: '#2563EB', active: true, ...term },
  { id: 'reading-2', code: 'READING-2', name: 'Đọc 2', description: 'Reading 2', color: '#6366F1', active: true, ...term },
  { id: 'listening-2', code: 'LISTENING-2', name: 'Nghe nói 2', description: 'Listening & Speaking 2', color: '#8B5CF6', active: true, ...term },
];

const documents: DocumentItem[] = [
  { id: 'DOC001', subjectId: 'grammar-2', title: 'Grammar in Use - Unit 5.pdf', type: 'PDF', week: '05', url: '#', updatedAt: '2026-08-10', active: true, ...term },
  { id: 'DOC002', subjectId: 'reading-2', title: 'Reading Practice - Unit 4.pdf', type: 'PDF', week: '05', url: '#', updatedAt: '2026-08-09', active: true, ...term },
  { id: 'DOC003', subjectId: 'listening-2', title: 'Listening Practice - Unit 3.mp3', type: 'MP3', week: '03', url: '#', updatedAt: '2026-08-07', active: true, ...term },
];

const recordings: Recording[] = [
  { id: 'REC001', subjectId: 'grammar-2', title: 'Week 05 - Grammar 2', description: 'Conditional Sentences', week: '05', duration: '01:42:18', url: '#', recordedAt: '2026-08-10', active: true, ...term },
  { id: 'REC002', subjectId: 'listening-2', title: 'Week 04 - Listening & Speaking 2', description: 'Jobs and Career', week: '04', duration: '01:35:42', url: '#', recordedAt: '2026-08-03', active: true, ...term },
];

const schedule: ScheduleItem[] = [
  { id: 'SCH001', subjectId: 'grammar-2', date: '2026-08-13', startTime: '08:00', endTime: '09:30', room: 'Phòng học online 01', active: true, ...term },
  { id: 'SCH002', subjectId: 'listening-2', date: '2026-08-13', startTime: '10:00', endTime: '11:30', room: 'Phòng học online 02', active: true, ...term },
];

const announcements: Announcement[] = [
  { id: 'ANN001', title: 'Tài liệu Grammar in Use - Unit 5.pdf đã được cập nhật', type: 'Tài liệu', publishedAt: '2026-08-13T10:00:00+07:00', active: true, ...term },
  { id: 'ANN002', title: 'Thông báo lịch thi giữa kỳ', type: 'Thông báo', publishedAt: '2026-08-13T08:00:00+07:00', active: true, ...term },
];

const terms: AcademicTerm[] = [
  { id: '2025-2026-HK01', academicYear: '2025-2026', semester: 'HK01', label: '2025-2026 · HK01', isCurrent: false, active: true },
  { id: '2025-2026-HK02', academicYear: '2025-2026', semester: 'HK02', label: '2025-2026 · HK02', isCurrent: true, active: true },
];

const matches = (item: { academicYear?: string; semester?: string }, filter?: AcademicTermFilter) =>
  !filter || (item.academicYear === filter.academicYear && item.semester === filter.semester);

export class MockLearningDataProvider implements LearningDataProvider {
  async getAcademicTerms() { return terms; }
  async getSubjects(filter?: AcademicTermFilter) { return subjects.filter((item) => matches(item, filter)); }
  async getDocuments(filter?: AcademicTermFilter) { return documents.filter((item) => matches(item, filter)); }
  async getRecordings(filter?: AcademicTermFilter) { return recordings.filter((item) => matches(item, filter)); }
  async getSchedule(filter?: AcademicTermFilter) { return schedule.filter((item) => matches(item, filter)); }
  async getAnnouncements(filter?: AcademicTermFilter) { return announcements.filter((item) => matches(item, filter)); }
}
