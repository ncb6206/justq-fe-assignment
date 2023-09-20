import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/Home';
import NotFoundPage from '../pages/NotFound';
import Layout from '../components/Layout/Layout';

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default Router;
