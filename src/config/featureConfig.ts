import { env } from './env';

export const features = {
  documents: env.featureDocuments,
  recordings: env.featureRecordings,
  assignments: env.featureAssignments,
  schedule: env.featureSchedule,
};
