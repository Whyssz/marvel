import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
import Spinner from '../spinner/Spinner';

const Page404 = lazy(() => import('../pages/Page404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SinglePage = lazy(() => import('../pages/SinglePage'));
const SingleCharLayout = lazy(() => import('../pages/singleCharLayout'));
const SingleComicLayout = lazy(() => import('../pages/singleComicLayout'));

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route exact path="/" element={<MainPage />} />
              <Route exact path="comics" element={<ComicsPage />} />
              <Route
                exact
                path="comics/:id"
                element={
                  <SinglePage Component={SingleComicLayout} dataType="comic" />
                }
              />
              <Route
                exact
                path="characters/:id"
                element={
                  <SinglePage
                    Component={SingleCharLayout}
                    dataType="character"
                  />
                }
              />
              <Route exact path="*" element={<Page404 />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
