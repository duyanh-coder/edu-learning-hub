import type { Announcement } from '../models/Announcement';
import type { DocumentItem } from '../models/Document';
import type { Recording } from '../models/Recording';
import type { ScheduleItem } from '../models/Schedule';
import type { Subject } from '../models/Subject';

export interface LearningDataProvider {
  getSubjects(): Promise<Subject[]>;
  getDocuments(): Promise<DocumentItem[]>;
  getRecordings(): Promise<Recording[]>;
  getSchedule(): Promise<ScheduleItem[]>;
  getAnnouncements(): Promise<Announcement[]>;
}
