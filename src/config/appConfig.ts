import { env } from './env';

export const appConfig = {
  app: {
    name: env.appName,
    version: env.appVersion,
  },
  institution: {
    name: env.institutionName,
    shortName: env.institutionShortName,
    logoUrl: env.institutionLogoUrl,
  },
  api: {
    baseUrl: env.apiBaseUrl,
  },
  integrations: {
    googleDrive: env.googleDriveEnabled,
  },
} as const;
