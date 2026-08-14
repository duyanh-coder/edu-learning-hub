export interface Announcement {
  id: string;
  title: string;
  content?: string;
  type: string;
  publishedAt: string;
  active: boolean;
}
