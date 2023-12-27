import React from 'react';
import { useSelector } from "react-redux";
import useDetails from '../hooks/useDetails';

const MovieDetails = ({movie_id}) => {
    const movieDetails = useSelector(store => store.movies?.movieDetails);
    useDetails(movie_id);
    if(!movieDetails)
    return;
    const {release_date, vote_average, genres, status} = movieDetails;

  return (
    <div className='p-4 m-4 bg-gray-500 bg-gradient-to-b from indigo-500 rounded-lg '>
        <p className='text-md text-white mb-2'>Release Date: {release_date}</p>
        <p className='text-md text-white mb-2'>Average Votes: {vote_average}</p>
        <p className='text-md text-white mb-2'>Status: {status}</p>
        <p className='text-md text-white mb-2'>Genre: {genres.map((e) => e.name).join(', ')}</p>
    </div>
  )
};

export default MovieDetails;