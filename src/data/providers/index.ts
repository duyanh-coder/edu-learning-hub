import { dataConfig } from '../../config/dataConfig';
import { GoogleSheetsLearningDataProvider } from './GoogleSheetsLearningDataProvider';
import type { LearningDataProvider } from './LearningDataProvider';
import { MockLearningDataProvider } from './MockLearningDataProvider';

export const learningDataProvider: LearningDataProvider =
  dataConfig.provider === 'google-sheets'
    ? new GoogleSheetsLearningDataProvider()
    : new MockLearningDataProvider();
