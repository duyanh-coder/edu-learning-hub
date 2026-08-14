import type { Announcement } from '../models/Announcement';
import type { DocumentItem } from '../models/Document';
import type { Recording } from '../models/Recording';
import type { ScheduleItem } from '../models/Schedule';
import type { Subject } from '../models/Subject';
import type { GoogleSheetRow } from './googleSheetsClient';

const required = (row: GoogleSheetRow, key: string, sheetName: string) => {
  const value = row[key]?.trim();
  if (!value) {
    throw new Error(`Sheet "${sheetName}": missing required field "${key}".`);
  }
  return value;
};

const optional = (row: GoogleSheetRow, key: string) => row[key]?.trim() || undefined;

const booleanValue = (value: string | undefined, fallback = true) => {
  if (!value) return fallback;
  return value.toLowerCase() === 'true' || value === '1' || value.toLowerCase() === 'yes';
};

export const mapSubject = (row: GoogleSheetRow): Subject => ({
  id: required(row, 'id', 'Subjects'),
  code: required(row, 'code', 'Subjects'),
  name: required(row, 'name', 'Subjects'),
  description: optional(row, 'description'),
  color: optional(row, 'color'),
  active: booleanValue(row.active),
});

export const mapDocument = (row: GoogleSheetRow): DocumentItem => ({
  id: required(row, 'id', 'Documents'),
  subjectId: required(row, 'subject_id', 'Documents'),
  title: required(row, 'title', 'Documents'),
  type: required(row, 'type', 'Documents'),
  week: optional(row, 'week'),
  url: required(row, 'url', 'Documents'),
  updatedAt: required(row, 'updated_at', 'Documents'),
  active: booleanValue(row.active),
});

export const mapRecording = (row: GoogleSheetRow): Recording => ({
  id: required(row, 'id', 'Recordings'),
  subjectId: required(row, 'subject_id', 'Recordings'),
  title: required(row, 'title', 'Recordings'),
  description: optional(row, 'description'),
  week: optional(row, 'week'),
  duration: optional(row, 'duration'),
  url: required(row, 'url', 'Recordings'),
  recordedAt: required(row, 'recorded_at', 'Recordings'),
  active: booleanValue(row.active),
});

export const mapSchedule = (row: GoogleSheetRow): ScheduleItem => ({
  id: required(row, 'id', 'Schedule'),
  subjectId: required(row, 'subject_id', 'Schedule'),
  date: required(row, 'date', 'Schedule'),
  startTime: required(row, 'start_time', 'Schedule'),
  endTime: required(row, 'end_time', 'Schedule'),
  room: optional(row, 'room'),
  active: booleanValue(row.active),
});

export const mapAnnouncement = (row: GoogleSheetRow): Announcement => ({
  id: required(row, 'id', 'Announcements'),
  title: required(row, 'title', 'Announcements'),
  content: optional(row, 'content'),
  type: required(row, 'type', 'Announcements'),
  publishedAt: required(row, 'published_at', 'Announcements'),
  active: booleanValue(row.active),
});
