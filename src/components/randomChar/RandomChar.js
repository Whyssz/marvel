import { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

import useMarvelService from '../../services/MarvelService';
import mjolnir from '../../resources/img/mjolnir.png';
import { setContent } from '../../utils/setContent';

import './randomChar.scss';
import '../../style/style.scss';

const RandomChar = () => {
  const [char, setChar] = useState(null);
  const { getCharacter, clearError, process, setProcess } = useMarvelService();

  useEffect(() => {
    updateChar();

    const timerId = setInterval(updateChar, 60000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = () => {
    clearError();
    const id = Math.floor(Math.random() * (1011400 - 1011000)) + 1011000;
    getCharacter(id).then(onCharLoaded).then(() => setProcess('confirmed'));
  };


  return (
    <div className="randomchar">
      {setContent(process, View, char)}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button onClick={updateChar} className="button button__main">
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

const View = ({ data }) => {
  const { name, description, thumbnail, wiki, homepage } = data;
  const filterImg = thumbnail.indexOf('image_not_available') > 0;
  const stylez = filterImg ? { objectFit: 'fill' } : null;

  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, [data]);

  return (
    <CSSTransition
      in={show}
      timeout={600}
      classNames="randomize"
      mountOnEnter
      unmountOnExit
    >
      <div className="randomchar__block">
        <img
          style={stylez}
          src={thumbnail}
          alt="Random character"
          className="randomchar__img"
        />
        <div className="randomchar__info">
          <p className="randomchar__name">{name}</p>
          <p className="randomchar__descr">{description}</p>
          <div className="randomchar__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default RandomChar;
