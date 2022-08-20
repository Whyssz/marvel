import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { setContentUnic } from '../../utils/setContent';
import useMarvelService from '../../services/MarvelService';

import './comicsList.scss';

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [offset, setOffset] = useState(200);
  const [newItemsLoading, setNewItemLoadng] = useState(false);
  const [comicsEnded, setComicsEnded] = useState(false);

  const { process, setProcess, getAllComics } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  },[]);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoadng(false) : setNewItemLoadng(true);

    getAllComics(offset).then(onLoadedComics).then(() => setProcess('confirmed'));
  };

  const onLoadedComics = (newComics) => {
    let ended = false;
    if (newComics.length < 8) {
      ended = true;
    }

    setComicsList((comicsList) => [...comicsList, ...newComics]);
    setNewItemLoadng(false);
    setOffset((offset) => offset + 8);
    setComicsEnded(ended);
  };

	function renderItems(arr) {
    const items = arr.map((item, i) => {
      return (
        <li className="comics__item" key={i}>
          <Link to={`/comics/${item.id}`}>
            <img
              src={item.thumbnail}
              alt={item.title}
              className="comics__item-img"
            />
            <div className="comics__item-name">{item.title}</div>
            <div className="comics__item-price">{item.price}</div>
          </Link>
        </li>
      );
    });

    return <ul className="comics__grid">{items}</ul>;
  }

  return (
    <div className="comics__list">
      {setContentUnic(process, () => renderItems(comicsList), newItemsLoading)}
      <button
        disabled={newItemsLoading}
        style={{ display: comicsEnded ? 'none' : 'block' }}
        className="button button__main button__long"
        onClick={() => onRequest(offset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
