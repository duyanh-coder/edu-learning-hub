import { ConfigProvider } from 'antd';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { antdTheme } from './theme/antdTheme';
import { AcademicTermProvider } from './contexts/AcademicTermContext';

export default function App() {
  return (
    <ConfigProvider theme={antdTheme}>
      <AcademicTermProvider>
        <RouterProvider router={router} />
      </AcademicTermProvider>
    </ConfigProvider>
  );
}
