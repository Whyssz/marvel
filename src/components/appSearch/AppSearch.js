import * as Yup from 'yup';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Formik,
  Form,
  Field,
  ErrorMessage as FormikErrorMessage,
} from 'formik';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './appSearch.scss';
import Amerika from '../../resources/img/america.png';
import Spider from '../../resources/img/spider.png';
import Iron from '../../resources/img/iron.png';
import Wolver from '../../resources/img/ras.png';

const linksData = [
  { name: 'iron', link: 1009368 },
  { name: 'amerika', link: 1009220 },
  { name: 'wolver', link: 1009718 },
  { name: 'spider', link: false },
];

const AppSearch = () => {
  const [char, setChar] = useState(null);

  const { clearError, getCharacterByName, process, setProcess } = useMarvelService();

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = (name) => {
    clearError();

    getCharacterByName(name).then(onCharLoaded).then(() => setProcess('confirmed'));
  };

  const links = linksData.map((item, i) => {
    let name = '';

    switch (item.name) {
      case 'iron':
        name = Iron;
        break;
      case 'amerika':
        name = Amerika;
        break;
      case 'wolver':
        name = Wolver;
        break;
      case 'spider':
        name = Spider;
        break;
      default:
        name = false;
        break;
    }

    return item.link ? (
      <Link to={`characters/${item.link}`} className="bord-link__char" key={i}>
        <img src={name} alt={`Hero - ${item.name}`} />
      </Link>
    ) : (
      <div className="bord-link__char broken-link" key={i}>
        <img src={name} alt={`Hero - ${item.name}`} />
      </div>
    );
  });

  const errorMessage = process !== 'error' ? null : (
    <div className="char__search-critical-error">
      <ErrorMessage />
    </div>
  );

  const result = !char ? null : char.length > 0 ? (
    <div className="result-wrapper">
      <Link
        to={`/characters/${char[0].id}`}
        className="result-wrapper__search success-search"
      >
        {`There is! Visit ${char[0].name} page?`}
      </Link>
    </div>
  ) : (
    <div className="result-wrapper__search error-search">
      The character was not found. Check the name and try again
    </div>
  );

  return (
    <>
      <Formik
        initialValues={{
          charName: 'Hulk',
        }}
        validationSchema={Yup.object({
          charName: Yup.string().required('This field is required'),
        })}
        onSubmit={({ charName }) => {
          updateChar(charName);
        }}
      >
        <Form className="app__form-search">
          <div className="bord-link">{links}</div>
          <h2>Or find a character by name:</h2>
          <div className="app__wrapper-search">
            <Field
              id="charName"
              name="charName"
              type="text"
              placeholder="Enter name"
            />
            <button
              className="button button__main"
              type="submit"
              disabled={process === 'loading'}
            >
              <div className="inner">FIND</div>
            </button>
          </div>
          <FormikErrorMessage
            component="div"
            className="char__search-error"
            name="charName"
          />
          {result}
          {errorMessage}
        </Form>
      </Formik>
    </>
  );
};

export default AppSearch;
