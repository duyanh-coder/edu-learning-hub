import type { LearningDataProvider } from './LearningDataProvider';
import type { Announcement } from '../models/Announcement';
import type { DocumentItem } from '../models/Document';
import type { Recording } from '../models/Recording';
import type { ScheduleItem } from '../models/Schedule';
import type { Subject } from '../models/Subject';
import { dataConfig } from '../../config/dataConfig';
import { fetchGoogleSheetRows } from '../googleSheets/googleSheetsClient';
import {
  mapAnnouncement,
  mapDocument,
  mapRecording,
  mapSchedule,
  mapSubject,
} from '../googleSheets/googleSheetsMappers';

export class GoogleSheetsLearningDataProvider implements LearningDataProvider {
  private async read(sheetName: string) {
    return fetchGoogleSheetRows({
      sheetName,
      spreadsheetId: dataConfig.googleSheetId,
      spreadsheetUrl: dataConfig.googleSheetUrl,
    });
  }

  async getSubjects(): Promise<Subject[]> {
    const rows = await this.read(dataConfig.googleSheetNames.subjects);
    return rows.map(mapSubject).filter((item) => item.active);
  }

  async getDocuments(): Promise<DocumentItem[]> {
    const rows = await this.read(dataConfig.googleSheetNames.documents);
    return rows.map(mapDocument).filter((item) => item.active);
  }

  async getRecordings(): Promise<Recording[]> {
    const rows = await this.read(dataConfig.googleSheetNames.recordings);
    return rows.map(mapRecording).filter((item) => item.active);
  }

  async getSchedule(): Promise<ScheduleItem[]> {
    const rows = await this.read(dataConfig.googleSheetNames.schedule);
    return rows.map(mapSchedule).filter((item) => item.active);
  }

  async getAnnouncements(): Promise<Announcement[]> {
    const rows = await this.read(dataConfig.googleSheetNames.announcements);
    return rows.map(mapAnnouncement).filter((item) => item.active);
  }
}
