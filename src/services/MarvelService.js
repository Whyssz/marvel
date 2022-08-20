import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
  const { request, clearError, process, setProcess } = useHttp();

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _apiKey = 'apikey=6580aaf3f7ebb7dd34e71091f73f8943';
  const _baseOfSet = 210;

  const getAllCharacters = async (offset = _baseOfSet) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformCharacter);
  };

  const getAllComics = async (offset = _baseOfSet) => {
    const res = await request(
      `${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformComics);
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const getComic = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComics(res.data.results[0]);
  };

  const getCharacterByName = async (name) => {
    const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
    return res.data.results.map(_transformCharacter);
  };

  const _transformComics = (comics) => {
    return {
      id: comics.id,
      title: comics.title,
      description: comics.description
        ? `${comics.description.slice(0, 150)}...`
        : "The charecter doesn't have a description",
      thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
      language: comics.textObjects.language || 'en-us',
      price: comics.prices.price ? `${comics.prices.price}$` : 'not available',
    };
  };

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      fulldesc: char.description,
      description: char.description
        ? `${char.description.slice(0, 150)}...`
        : "The charecter doesn't have a description",
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };

  return {
    process,
    setProcess,
    clearError,
    getAllCharacters,
    getCharacter,
    getAllComics,
    getComic,
    getCharacterByName,
  };
};

export default useMarvelService;
