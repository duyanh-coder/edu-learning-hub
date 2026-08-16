import type { LearningDataProvider } from './LearningDataProvider';
import type { AcademicTerm, AcademicTermFilter } from '../models/AcademicTerm';
import type { Announcement } from '../models/Announcement';
import type { DocumentItem } from '../models/Document';
import type { Recording } from '../models/Recording';
import type { ScheduleItem } from '../models/Schedule';
import type { Subject } from '../models/Subject';
import { dataConfig } from '../../config/dataConfig';
import { fetchGoogleSheetRows } from '../googleSheets/googleSheetsClient';
import {
  mapAcademicTerm,
  mapAnnouncement,
  mapDocument,
  mapRecording,
  mapSchedule,
  mapSubject,
} from '../googleSheets/googleSheetsMappers';

const matchesTerm = (item: { academicYear?: string; semester?: string }, term?: AcademicTermFilter) => {
  if (!term) return true;
  // Backward compatible: rows without term columns remain visible until the Sheet is migrated.
  if (!item.academicYear && !item.semester) return true;
  return item.academicYear === term.academicYear && item.semester === term.semester;
};

export class GoogleSheetsLearningDataProvider implements LearningDataProvider {
  private async read(sheetName: string) {
    return fetchGoogleSheetRows({
      sheetName,
      spreadsheetId: dataConfig.googleSheetId,
      spreadsheetUrl: dataConfig.googleSheetUrl,
    });
  }

  async getAcademicTerms(): Promise<AcademicTerm[]> {
    const rows = await this.read(dataConfig.googleSheetNames.academicTerms);
    return rows.map(mapAcademicTerm).filter((item) => item.active);
  }

  async getSubjects(term?: AcademicTermFilter): Promise<Subject[]> {
    const rows = await this.read(dataConfig.googleSheetNames.subjects);
    return rows.map(mapSubject).filter((item) => item.active && matchesTerm(item, term));
  }

  async getDocuments(term?: AcademicTermFilter): Promise<DocumentItem[]> {
    const rows = await this.read(dataConfig.googleSheetNames.documents);
    return rows.map(mapDocument).filter((item) => item.active && matchesTerm(item, term));
  }

  async getRecordings(term?: AcademicTermFilter): Promise<Recording[]> {
    const rows = await this.read(dataConfig.googleSheetNames.recordings);
    return rows.map(mapRecording).filter((item) => item.active && matchesTerm(item, term));
  }

  async getSchedule(term?: AcademicTermFilter): Promise<ScheduleItem[]> {
    const rows = await this.read(dataConfig.googleSheetNames.schedule);
    return rows.map(mapSchedule).filter((item) => item.active && matchesTerm(item, term));
  }

  async getAnnouncements(term?: AcademicTermFilter): Promise<Announcement[]> {
    const rows = await this.read(dataConfig.googleSheetNames.announcements);
    return rows.map(mapAnnouncement).filter((item) => item.active && matchesTerm(item, term));
  }
}
