import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { API_OPTIONS } from '../utils/constants';
import { addMovieDetails } from '../utils/movieSlice';

const useDetails = (movie_id) => {
  const dispatch = useDispatch();

  const getMovieDetails = async() => {
    const data = await fetch("https://api.themoviedb.org/3/movie/"+movie_id+"?language=en-US", API_OPTIONS);
    const json = await data.json();
    dispatch(addMovieDetails(json));
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

};

export default useDetails;