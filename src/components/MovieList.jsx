import { useEffect, useRef, useState } from 'react';
import GlobalApi from '../services/movieapi';
import MovieCard from './MovieCard';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import HrMovieCard from './VerticalMovideCard';

function MovieList({ genreId, index_ }) {
  const [movieList, setMovieList] = useState([]);
  const [error, setError] = useState(false);
  const elementRef = useRef(null);
  const maxRetries = 5;

  useEffect(() => {
    getMovieByGenreId(0);
  }, []);

  const getMovieByGenreId = async (retryCount) => {
    try {
      const resp = await GlobalApi.getMovieByGenreId(genreId);
      if (resp.status === 500) {
        if (retryCount < maxRetries) {
          setTimeout(() => getMovieByGenreId(retryCount + 1), 2000); // retry after 2 seconds
        } else {
          setError(true);
        }
      } else {
        setMovieList(resp.data.results);
        setError(false);
      }
    } catch (error) {
      if (retryCount < maxRetries) {
        setTimeout(() => getMovieByGenreId(retryCount + 1), 2000); // retry after 2 seconds
      } else {
        setError(true);
      }
    }
  };

  const slideRight = (element) => {
    element.scrollLeft += 500;
  };

  const slideLeft = (element) => {
    element.scrollLeft -= 500;
  };

  return (
    <div className='relative'>
      {error ? (
        <div className="flex items-center justify-center h-full">
          <div className="bg-red-500 text-white p-4 rounded-md">
            Error fetching movies by genre. TMDB Server Error.
          </div>
        </div>
      ) : (
        <>
          <IoChevronBackOutline
            onClick={() => slideLeft(elementRef.current)}
            className={`text-[50px] text-white p-2 z-10 cursor-pointer hidden md:block absolute ${index_ % 3 === 0 ? 'mt-[80px]' : 'mt-[150px]'}`}
          />
          <div ref={elementRef} className='flex overflow-x-auto gap-8 no-scrollbar scroll-smooth pt-4 px-3 pb-4'>
            {movieList.map((item, index) => (
              <>
                {index_ % 3 === 0 ? <HrMovieCard movie={item} /> : <MovieCard movie={item} />}
              </>
            ))}
          </div>
          <IoChevronForwardOutline
            onClick={() => slideRight(elementRef.current)}
            className={`text-[50px] text-white hidden md:block p-2 cursor-pointer z-10 top-0 absolute right-0 ${index_ % 3 === 0 ? 'mt-[80px]' : 'mt-[150px]'}`}
          />
        </>
      )}
    </div>
  );
}

export default MovieList;
