import type { AcademicTerm, AcademicTermFilter } from '../models/AcademicTerm';
import type { Announcement } from '../models/Announcement';
import type { DocumentItem } from '../models/Document';
import type { Recording } from '../models/Recording';
import type { ScheduleItem } from '../models/Schedule';
import type { Subject } from '../models/Subject';

export interface LearningDataProvider {
  getAcademicTerms(): Promise<AcademicTerm[]>;
  getSubjects(term?: AcademicTermFilter): Promise<Subject[]>;
  getDocuments(term?: AcademicTermFilter): Promise<DocumentItem[]>;
  getRecordings(term?: AcademicTermFilter): Promise<Recording[]>;
  getSchedule(term?: AcademicTermFilter): Promise<ScheduleItem[]>;
  getAnnouncements(term?: AcademicTermFilter): Promise<Announcement[]>;
}
