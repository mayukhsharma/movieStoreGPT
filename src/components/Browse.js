import React from 'react';
import Header from './Header';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import GptSearch from './GptSearch';
import { useSelector } from "react-redux";

const Browse = () => {
  const showGptSearch = useSelector(store => store.gpt.showGptSearch);
  // const showProfileDropDown = useSelector(store => store.profile.showProfileDropDown);
  useNowPlayingMovies();
  usePopularMovies();
  useUpcomingMovies();
  useTopRatedMovies();
  
  return (
    <div>
      <Header />
      {/* {showProfileDropDown ? <div className='bg-red-500 p-4 w-1/4 ml-auto text-white'>drop down</div> : <></>} */}
      {showGptSearch ? <GptSearch /> : <><MainContainer /><SecondaryContainer /></>}
    </div>
  )
}

export default Browse;