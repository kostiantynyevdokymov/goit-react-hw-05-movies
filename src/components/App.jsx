import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// const createAsyncComponent = path => lazy(() => import(path));
// const SharedLayout = createAsyncComponent(
//   '../components/SharedLayout/SharedLayout'
// );
// const Home = createAsyncComponent('../pages/Home');
// const Movies = createAsyncComponent('../pages/Movies');
const SharedLayout = lazy(() => import('./SharedLayout/SharedLayout'));
const Home = lazy(() => import('../pages/Home'));
const Movies = lazy(() => import('../pages/Movies'));
export const App = () => {
  return (
    <BrowserRouter basename="/goit-react-hw-05-movies/">
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
