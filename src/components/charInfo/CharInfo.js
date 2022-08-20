import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { setContent } from '../../utils/setContent';
import useMarvelServices from '../../services/MarvelService';
import './charInfo.scss';

const CharInfo = (props) => {
  const [char, setChar] = useState(null);

  const { getCharacter, clearError, process, setProcess } = useMarvelServices();

  useEffect(() => {
    updateChar();
  }, [props.charId]);

  const updateChar = () => {
    const { charId } = props;
    if (!charId) return;

    clearError();

    getCharacter(charId)
      .then(onCharLoaded)
      .then(() => setProcess('confirmed'));
  };

  const onCharLoaded = (char) => {
    setChar(char);
  };

  return <div className="char__info">{setContent(process, View, char)}</div>;
};

const View = ({ data }) => {
  const { name, description, thumbnail, wiki, homepage, comics } = data;
  const filterImg = thumbnail.indexOf('image_not_available') > 0;
  const stylez = filterImg ? { objectFit: 'fill' } : null;
  const styelList = comics.length > 5 ? { height: '340px' } : null;

  return (
    <>
      <div className="char__basics">
        <img style={stylez} src={thumbnail} alt={name} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list" style={styelList}>
        {comics.length > 0 ? null : 'There is no comics with this character'}
        {comics.map((item, i) => {
          return (
            <Link
              to={`comics/${item.resourceURI.slice(-5)}`}
              className="char__comics-item"
              key={i}
            >
              {item.name}
            </Link>
          );
        })}
      </ul>
    </>
  );
};

export default CharInfo;
