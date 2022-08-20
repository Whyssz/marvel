import ErrorMessage from '../components/errorMessage/ErrorMessage';
import Spinner from '../components/spinner/Spinner';
import Skeleton from '../components/skeleton/Skeleton';

export const setContent = (process, Component, data) => {
  switch (process) {
    case 'waiting':
      return <Skeleton />;
    case 'loading':
      return <Spinner />;
    case 'error':
      return <ErrorMessage />;
    case 'confirmed':
      return <Component data={data} />;
    default:
      throw new Error('Unexpected process state');
  }
};

export const setContentUnic = (process, Component, newItemsLoading) => {
  switch (process) {
    case 'waiting':
      return <Spinner />;
    case 'loading':
      return newItemsLoading ? <Component /> : <Spinner />;
    case 'error':
      return <ErrorMessage />;
    case 'confirmed':
      return <Component />;
    default:
      throw new Error('Unexpected process state');
  }
};

// export default setContent;

// const { loading, error, getCharacter, clearError } = useMarvelServices();

// const skeleton = char || loading || error ? null : <Skeleton />;
// const errorMessage = error ? <ErrorMessage /> : null;
// const spinner = loading ? <Spinner /> : null;
// const content = !(loading || error || !char) ? <View char={char} /> : null;