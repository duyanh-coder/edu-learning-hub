const booleanEnv = (value: string | undefined, fallback = false) => {
  if (value == null || value === '') return fallback;
  return value.toLowerCase() === 'true';
};

export const env = {
  appName: import.meta.env.VITE_APP_NAME || 'EDU Learning Hub',
  appVersion: import.meta.env.VITE_APP_VERSION || '0.1.0',
  institutionName: import.meta.env.VITE_INSTITUTION_NAME || 'Trường Đại học Cửu Long',
  institutionShortName: import.meta.env.VITE_INSTITUTION_SHORT_NAME || 'MKU',
  institutionLogoUrl: import.meta.env.VITE_INSTITUTION_LOGO_URL || '/branding/logo-placeholder.svg',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
  dataProvider: import.meta.env.VITE_DATA_PROVIDER || 'mock',
  googleSheetUrl: import.meta.env.VITE_GOOGLE_SHEET_URL || '',
  googleSheetId: import.meta.env.VITE_GOOGLE_SHEET_ID || '',
  primaryColor: import.meta.env.VITE_PRIMARY_COLOR || '#2563EB',
  secondaryColor: import.meta.env.VITE_SECONDARY_COLOR || '#6366F1',
  googleDriveEnabled: booleanEnv(import.meta.env.VITE_GOOGLE_DRIVE_ENABLED),
  featureRecordings: booleanEnv(import.meta.env.VITE_FEATURE_RECORDINGS, true),
  featureDocuments: booleanEnv(import.meta.env.VITE_FEATURE_DOCUMENTS, true),
  featureAssignments: booleanEnv(import.meta.env.VITE_FEATURE_ASSIGNMENTS, true),
  featureSchedule: booleanEnv(import.meta.env.VITE_FEATURE_SCHEDULE, true),
} as const;
