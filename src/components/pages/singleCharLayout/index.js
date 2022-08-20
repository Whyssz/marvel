import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import './singleCharLayout.scss';

const singleCharLayout = ({ data }) => {
  const { name, thumbnail, comics, fulldesc } = data;

  return (
    <div className="character-info">
      <Helmet>
        <meta name={name} content={`${name} information`} />
        <title>{name}</title>
      </Helmet>
      <div className="character-info__wrapper">
        <img src={thumbnail} alt={`Character: ${name}`} />
        <div className="main-info">
          <div className="main-info__titel">{name}</div>
          <div className="main-info__desc">{fulldesc}</div>
          <div className="main-info__comics-topic"></div>
          <div className="main-info__comics-list">
            {comics.length > 0
              ? null
              : 'There is no comics with this character'}
            {comics.map((item, i) => {
              const way = item.resourceURI.indexOf('comics/');
              return (
                <Link
                  to={`/comics/${item.resourceURI.slice(way + 7)}`}
                  className="char__comics-item"
                  key={i}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
        <Link to="/" className="single-comic__back">
          Back to main page
        </Link>
      </div>
    </div>
  );
};

export default singleCharLayout;
