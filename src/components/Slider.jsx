import { useEffect, useRef, useState } from 'react';
import MovieApi from '../services/movieapi';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
const screenWidth = window.innerWidth;

function Slider() {
  const [movieList, setMovieList] = useState([]);
  const [error, setError] = useState(false);
  const elementRef = useRef();
  const maxRetries = 5;

  useEffect(() => {
    getTrendingMovies(0);
  }, []);

  const getTrendingMovies = async (retryCount) => {
    try {
      const resp = await MovieApi.getTrendingVideos();
      if (resp.status === 500) {
        if (retryCount < maxRetries) {
          setTimeout(() => getTrendingMovies(retryCount + 1), 2000); // retry after 2 seconds
        } else {
          setError(true);
        }
      } else {
        setMovieList(resp.data.results);
        setError(false);
      }
    } catch (error) {
      if (retryCount < maxRetries) {
        setTimeout(() => getTrendingMovies(retryCount + 1), 2000); // retry after 2 seconds
      } else {
        setError(true);
      }
    }
  };

  const sliderRight = (element) => {
    element.scrollLeft += screenWidth - 110;
  };

  const sliderLeft = (element) => {
    element.scrollLeft -= screenWidth - 110;
  };

  return (
    <div>
      {error ? (
        <div className="flex items-center justify-center h-full">
          <div className="bg-red-500 text-white p-4 rounded-md">
            Error fetching trending movies. TMDB Server Error.
          </div>
        </div>
      ) : (
        <div>
          <HiChevronLeft
            className="hidden md:block text-white text-[30px] absolute
          mx-8 mt-[150px] cursor-pointer"
            onClick={() => sliderLeft(elementRef.current)} />
          <HiChevronRight
            className='hidden md:block text-white text-[30px] absolute
          mx-8 mt-[150px] cursor-pointer right-0'
            onClick={() => sliderRight(elementRef.current)} />

          <div className='flex overflow-x-auto w-full px-16 py-4
          scroll-smooth no-scrollbar' ref={elementRef}>
            {movieList.map((item, index) => (
              <img key={index} src={IMAGE_BASE_URL + item.backdrop_path}
                className='min-w-full md:h-[310px] object-cover
                object-left-top mr-5 rounded-md hover:border-[4px]
                border-gray-400 transition-all duration-100 ease-in' />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Slider;
