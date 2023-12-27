import React from 'react';
import useSearchMovie from '../hooks/useSearchMovie';
import { useSelector } from "react-redux";
import { IMG_CDN } from '../utils/constants';

const SearchBar = ({movieQuery}) => {
    const searchMovie = useSelector(store => store.movies?.searchMovie);
    useSearchMovie(movieQuery);
    if(!searchMovie)
    return <div className='absolute mt-[5%] ml-[28%] p-12 pt-6 bg-white bg-gradient-to-t from-slate-400 w-1/2 text-black font-bold text-2xl'>OOPS! Movie Not Found :(</div>

    const {release_date, vote_average, genres, status, poster_path, original_title} = searchMovie;

  return (
    <div className='absolute mt-[5%] ml-[28%] text-black rounded-lg p-12 pt-6 bg-white bg-gradient-to-t from-slate-400 w-1/2'>
      <div className='flex text-lg align-middle text-center'>
      <img className='h-52 w-52 mr-6' src={IMG_CDN+poster_path} />
      <div className='flex-col'>
      <h2 className='text-2xl mt-4 font-bold'>{original_title}</h2>
      <p className='mt-4'>Release Date: {release_date?release_date:"Not Found"}</p>
      <p>Average Votes: {vote_average?vote_average:"Not Found"}</p>
      <p>Status: {status?status:"Not Found"}</p>
      <p>Genre: {genres?genres?.map((e) => e.name).join(', '):"Not Found"}</p>
      </div>
      </div>
    </div>
  )
};

export default SearchBar;