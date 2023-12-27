import React from 'react';
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestions from './GptMovieSuggestions';
import { Background } from "../utils/constants";

const GptSearch = () => {
  return (
    <div>
       <img className="absolute w-full h-full object-cover brightness-50 -z-10" src={Background} alt="background image" />       
       <GptSearchBar />
       <GptMovieSuggestions /> 
    </div>
  )
};

export default GptSearch;