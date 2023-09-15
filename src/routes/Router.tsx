import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/Home';
import NotFoundPage from '../pages/NotFound';
import Layout from '../components/Layout/Layout';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default Router;
