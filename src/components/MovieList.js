import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({title, movies}) => {
  return (
    <div className='px-6'>
        <h1 className='text-lg md:text-3xl py-10 text-white'>{title}</h1>
        <div className='flex overflow-x-scroll'>
            <div className='flex'>
                {movies?.map((movie) => (
                    <MovieCard key={movie?.id} posterPath={movie?.poster_path} original_title={movie?.original_title} movie_id={movie?.id} />
                ))}
            </div>
        </div>
    </div>
  )
};

export default MovieList;