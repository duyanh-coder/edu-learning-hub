import { env } from './env';

export type DataProviderType = 'mock' | 'google-sheets';

export const dataConfig = {
  provider: (env.dataProvider || 'mock') as DataProviderType,
  googleSheetUrl: env.googleSheetUrl,
  googleSheetId: env.googleSheetId,
  googleSheetNames: {
    subjects: 'Subjects',
    documents: 'Documents',
    recordings: 'Recordings',
    schedule: 'Schedule',
    announcements: 'Announcements',
  },
};
