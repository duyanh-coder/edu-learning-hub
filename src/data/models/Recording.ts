export interface Recording {
  id: string;
  subjectId: string;
  title: string;
  description?: string;
  week?: string;
  duration?: string;
  url: string;
  recordedAt: string;
  active: boolean;
  academicYear?: string;
  semester?: string;
}
