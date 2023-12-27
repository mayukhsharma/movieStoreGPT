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
    <div className='p-4 m-4 bg-black text-sm md:text-md text-white rounded-lg'>
        <p className='mb-2'>Release Date: {release_date?release_date:"Not Found"}</p>
        <p className='mb-2'>Average Votes: {vote_average?vote_average:"Not Found"}</p>
        <p className='mb-2'>Status: {status?status:"Not Found"}</p>
        <p className='mb-2'>Genre: {genres?genres?.map((e) => e.name).join(', '):"Not Found"}</p>
    </div>
  )
};

export default MovieDetails;