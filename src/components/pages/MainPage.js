import { useState } from 'react';
import { Helmet } from 'react-helmet';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import decoration from '../../resources/img/vision.png';
import AppSearch from '../appSearch/AppSearch';

const MainPage = () => {
  const [selectedChar, setChar] = useState(null);

  const onChangeSelected = (id) => {
    setChar(id);
  };

  return (
    <>
      <Helmet>
        <meta name="description" content="Marvel information portal" />
        <title>Marvel information portal</title>
      </Helmet>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>
      <ErrorBoundary>
        <AppSearch />
      </ErrorBoundary>
      <div className="char__content">
        <ErrorBoundary>
          <CharList onChangeSelected={onChangeSelected} />
        </ErrorBoundary>
        <ErrorBoundary>
          <CharInfo charId={selectedChar} />
        </ErrorBoundary>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};

export default MainPage;
