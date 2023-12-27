import React from 'react';
import { IMG_CDN } from '../utils/constants';
import { useState } from 'react';
import VideoBackground from './VideoBackground';
import MovieDetails from './MovieDetails';

const MovieCard = ({posterPath, original_title, movie_id}) => {
  const [onHover, setOnHover] = useState(false);
  const handleOnEnter = () => {
    setOnHover(true);
  };
  const handleOnLeave = () => {
    setOnHover(false);
  };
  return (
    <div onMouseEnter={handleOnEnter} onMouseLeave={handleOnLeave} className='w-36 md:w-56 mr-8 cursor-pointer hover:border-blue-500 hover:border-2 bg-gray-700 rounded-lg'>
       {onHover ? <><VideoBackground movie_id={movie_id} /> <h1 className='mt-8 mb-4 text-white font-bold text-md md:text-lg text-center'>{original_title}</h1> <MovieDetails movie_id={movie_id} /></> : <><img className='rounded-lg' src={IMG_CDN+posterPath} alt='movie card' />
        <p className='ml-4 mr-4 text-white text-lg font-bold mt-4'>{original_title}</p></>}
    </div>
  )
};

export default MovieCard;