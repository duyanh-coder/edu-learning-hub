import type { Announcement } from '../models/Announcement';
import type { DocumentItem } from '../models/Document';
import type { Recording } from '../models/Recording';
import type { ScheduleItem } from '../models/Schedule';
import type { Subject } from '../models/Subject';
import type { LearningDataProvider } from './LearningDataProvider';

const subjects: Subject[] = [
  { id: 'grammar-2', code: 'GRAMMAR-2', name: 'Ngữ pháp 2', description: 'Grammar 2', color: '#2563EB', active: true },
  { id: 'reading-2', code: 'READING-2', name: 'Đọc 2', description: 'Reading 2', color: '#6366F1', active: true },
  { id: 'listening-2', code: 'LISTENING-2', name: 'Nghe nói 2', description: 'Listening & Speaking 2', color: '#8B5CF6', active: true },
];

const documents: DocumentItem[] = [
  { id: 'DOC001', subjectId: 'grammar-2', title: 'Grammar in Use - Unit 5.pdf', type: 'PDF', week: '05', url: '#', updatedAt: '2026-08-10', active: true },
  { id: 'DOC002', subjectId: 'reading-2', title: 'Reading Practice - Unit 4.pdf', type: 'PDF', week: '05', url: '#', updatedAt: '2026-08-09', active: true },
  { id: 'DOC003', subjectId: 'writing-2', title: 'Essay Writing Guide.docx', type: 'DOCX', week: '04', url: '#', updatedAt: '2026-08-08', active: true },
  { id: 'DOC004', subjectId: 'listening-2', title: 'Listening Practice - Unit 3.mp3', type: 'MP3', week: '03', url: '#', updatedAt: '2026-08-07', active: true },
];

const recordings: Recording[] = [
  { id: 'REC001', subjectId: 'grammar-2', title: 'Week 05 - Grammar 2', description: 'Conditional Sentences', week: '05', duration: '01:42:18', url: '#', recordedAt: '2026-08-10', active: true },
  { id: 'REC002', subjectId: 'listening-2', title: 'Week 04 - Listening & Speaking 2', description: 'Jobs and Career', week: '04', duration: '01:35:42', url: '#', recordedAt: '2026-08-03', active: true },
  { id: 'REC003', subjectId: 'reading-2', title: 'Week 03 - Reading 2', description: 'Global Warming', week: '03', duration: '01:28:31', url: '#', recordedAt: '2026-07-27', active: true },
];

const schedule: ScheduleItem[] = [
  { id: 'SCH001', subjectId: 'grammar-2', date: '2026-08-13', startTime: '08:00', endTime: '09:30', room: 'Phòng học online 01', active: true },
  { id: 'SCH002', subjectId: 'listening-2', date: '2026-08-13', startTime: '10:00', endTime: '11:30', room: 'Phòng học online 02', active: true },
  { id: 'SCH003', subjectId: 'reading-2', date: '2026-08-13', startTime: '13:30', endTime: '15:00', room: 'Phòng học online 01', active: true },
];

const announcements: Announcement[] = [
  { id: 'ANN001', title: 'Tài liệu Grammar in Use - Unit 5.pdf đã được cập nhật', type: 'Tài liệu', publishedAt: '2026-08-13T10:00:00+07:00', active: true },
  { id: 'ANN002', title: 'Thông báo lịch thi giữa kỳ', type: 'Thông báo', publishedAt: '2026-08-13T08:00:00+07:00', active: true },
  { id: 'ANN003', title: 'Record buổi học Week 04 đã được cập nhật', type: 'Record', publishedAt: '2026-08-12T10:00:00+07:00', active: true },
];

export class MockLearningDataProvider implements LearningDataProvider {
  async getSubjects() { return subjects; }
  async getDocuments() { return documents; }
  async getRecordings() { return recordings; }
  async getSchedule() { return schedule; }
  async getAnnouncements() { return announcements; }
}
