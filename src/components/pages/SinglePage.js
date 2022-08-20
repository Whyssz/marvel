import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import AppBanner from '../appBanner/AppBanner';
import { setContent } from '../../utils/setContent';

const SinglePage = ({ Component, dataType }) => {
  
  const { id } = useParams();
  const [data, setData] = useState(null);

  const { clearError, getCharacter, getComic, process, setProcess } =
    useMarvelService();

  useEffect(() => {
    updateData();
  }, [id]);

  const updateData = () => {
    clearError();

    // eslint-disable-next-line default-case
    switch (dataType) {
      case 'character':
        getCharacter(id).then(onDataLoaded).then(() => setProcess('confirmed'));
        break;
      case 'comic':
        getComic(id).then(onDataLoaded).then(() => setProcess('confirmed'));
        break;
    }
  };

  const onDataLoaded = (data) => {
    setData(data);
  };


  return (
    <>
      <AppBanner />
      {setContent(process, Component, data)}
    </>
  );
};

export default SinglePage;
