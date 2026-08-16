import { createBrowserRouter } from 'react-router-dom';
import UserLayout from '../layouts/UserLayout/UserLayout';
import Dashboard from '../pages/user/Dashboard/Dashboard';
import Subjects from '../pages/user/Subjects/Subjects';
import SubjectDetail from '../pages/user/SubjectDetail/SubjectDetail';
import Documents from '../pages/user/Documents/Documents';
import Recordings from '../pages/user/Recordings/Recordings';
import Schedule from '../pages/user/Schedule/Schedule';
import Notifications from '../pages/user/Notifications/Notifications';
import Profile from '../pages/user/Profile/Profile';
import Assignments from '../pages/user/Assignments';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <UserLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'subjects', element: <Subjects /> },
      { path: 'subjects/:subjectId', element: <SubjectDetail /> },
      { path: 'documents', element: <Documents /> },
      { path: 'recordings', element: <Recordings /> },
      { path: 'schedule', element: <Schedule /> },
      { path: 'notifications', element: <Notifications /> },
      { path: 'profile', element: <Profile /> },
      { path: 'assignments', element: <Assignments /> },
    ],
  },
]);
