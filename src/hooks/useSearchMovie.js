import { addSearchMovie } from '../utils/movieSlice';
import { API_OPTIONS } from '../utils/constants';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useSearchMovie = (movieQuery) => {
    const dispatch = useDispatch();

    const getSearchMovie = async() => {
      const data = await fetch("https://api.themoviedb.org/3/search/movie?query="+movieQuery+"&include_adult=false&language=en-US&page=1", API_OPTIONS);
      const json = await data.json();
      dispatch(addSearchMovie(json.results[0]));
      console.log(json.results)
    };
  
    useEffect(() => {
      getSearchMovie();
    }, []);
  
};

export default useSearchMovie;