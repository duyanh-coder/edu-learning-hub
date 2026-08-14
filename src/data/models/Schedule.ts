export interface ScheduleItem {
  id: string;
  subjectId: string;
  date: string;
  startTime: string;
  endTime: string;
  room?: string;
  active: boolean;
}
