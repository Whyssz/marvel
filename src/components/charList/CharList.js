import { useState, useEffect, useRef, useMemo } from 'react';
import { useScrollBy } from 'react-use-window-scroll';
import PropTypes from 'prop-types';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import useMarvelService from '../../services/MarvelService';
import { setContentUnic } from '../../utils/setContent';
import './charList.scss';
import '../../style/style.scss';

const CharList = (props) => {
  const [chars, setChars] = useState([]);
  const [offset, setOffset] = useState(1041);
  const [newItemsLoading, setNewItemLoadng] = useState(false);
  const [charEnded, setCharEnded] = useState(false);
  const scrollBy = useScrollBy();

  const { process, setProcess, getAllCharacters } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    if (initial) {
      setNewItemLoadng(false);
    } else {
      setNewItemLoadng(true);
      setTimeout(
        () => scrollBy({ top: 800, left: 0, behavior: 'smooth' }),
        600
      );
    }
    getAllCharacters(offset)
      .then(onLoadedChars)
      .then(() => setProcess('confirmed'));
  };

  const onLoadedChars = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }

    setChars((chars) => [...chars, ...newCharList]);
    setNewItemLoadng(false);
    setOffset((offset) => offset + 9);
    setCharEnded(ended);
  };

  const itemsRefs = useRef([]);

  const onChoiseItem = (id) => {
    itemsRefs.current.forEach((item) =>
      item.classList.remove('char__item_selected')
    );
    itemsRefs.current[id].classList.add('char__item_selected');
    itemsRefs.current[id].focus();
  };

  function renderList(chars) {
    const list = chars.map(({ name, id, thumbnail }, index) => {
      const filterImg = thumbnail.indexOf('image_not_available') > 0;
      const stylez = filterImg ? { objectFit: 'fill' } : null;

      return (
        <CSSTransition key={id} timeout={600} classNames="char__item">
          <li
            className="char__item"
            tabIndex={0}
            ref={(el) => (itemsRefs.current[index] = el)}
            onClick={() => {
              props.onChangeSelected(id);
              onChoiseItem(index);
            }}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                props.onChangeSelected(id);
                onChoiseItem(index);
              }
            }}
          >
            <img src={thumbnail} alt={name} style={stylez} />
            <div className="char__name">{name}</div>
          </li>
        </CSSTransition>
      );
    });

    return (
      <ul className="char__grid">
        <TransitionGroup component={null}>{list}</TransitionGroup>
      </ul>
    );
  }

  const result = useMemo(() => {
    return setContentUnic(process, () => renderList(chars), newItemsLoading);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [process]);

  return (
    <div className="char__list">
      {result}
      <button
        disabled={newItemsLoading}
        style={{ display: charEnded ? 'none' : 'block' }}
        onClick={() => onRequest(offset)}
        className="button button__main button__long"
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  onChangeSelected: PropTypes.func.isRequired,
};

export default CharList;
