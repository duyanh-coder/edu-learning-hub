import { Empty } from 'antd';

interface PlaceholderProps { title: string; description?: string; }

export function Placeholder({ title, description = 'Module sẽ được triển khai ở prototype tiếp theo.' }: PlaceholderProps) {
  return (
    <div className="page-placeholder">
      <h1>{title}</h1>
      <Empty description={description} />
    </div>
  );
}
