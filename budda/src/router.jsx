import { createBrowserRouter } from 'react-router-dom';
import { DetailProvider } from './context/DetailContext';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';
import StartPage from './pages/StartPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <StartPage />,
  },
  {
    path: '/all-list',
    element: <ListPage />,
  },
  {
    path: '/detail/:id',
    element: (
      <DetailProvider>
        <DetailPage />,
      </DetailProvider>
    ),
  },
]);

export default router;
