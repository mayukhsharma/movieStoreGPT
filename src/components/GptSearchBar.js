import React, { useRef } from 'react';
import openai from '../utils/openAi';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';
import { useDispatch } from "react-redux";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const searchText = useRef(null);
  const searchMovieTMDB = async(movie) => {
    const data = await fetch("https://api.themoviedb.org/3/search/movie?query"+movie+"&include_adult=false&language=en-US&page=1", API_OPTIONS)
    const json = await data.json();
    return json.results;
  }

  const handleGptSearchClick = async() => {
      const gptQuery = "Act as a movie recommendation system and suggest some movies for the query: " + searchText.current.value + " and only give me names of 5 movies in a list comma separated.";
      const gptResults = await openai.chat.completions.create({
        messages: [{ role: 'user', content: gptQuery }],
        model: 'gpt-3.5-turbo',
      });
      if(!gptResults.choices){
        return;
      }
      const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
      const promiseArray = gptMovies.map(movie => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);
      dispatch(addGptMovieResult({movieNames: gptMovies, movieResults: tmdbResults}));
  };

  return (
    <div className='pt-[60%] md:pt-[10%] flex justify-center'>
        <form className='w-auto md:w-1/2 bg-black grid grid-cols-12' onSubmit={(e) => e.preventDefault()}>
            <input ref={searchText} type='text' className='p-4 m-4 col-span-9' placeholder='What would you like to watch today?' />
            <button onClick={handleGptSearchClick} className='py-2 px-4 m-4 bg-red-700 text-white rounded-lg col-span-3'>Search</button>
        </form>
    </div>
  )
};

export default GptSearchBar;