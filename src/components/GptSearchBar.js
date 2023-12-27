import React, { useRef } from 'react';
import openai from '../utils/openAi';

const GptSearchBar = () => {
  const searchText = useRef(null);

  const handleGptSearchClick = async() => {
      const gptQuery = "Act as a movie recommendation system and suggest some movies for the query: " + searchText.current.value + " and only give me names of 5 movies in a list comma separated.";
      const gptResults = await openai.chat.completions.create({
        messages: [{ role: 'user', content: gptQuery }],
        model: 'gpt-3.5-turbo',
      });
      // console.log(gptResults.choices)
  };

  return (
    <div className='pt-[10%] flex justify-center'>
        <form className='w-1/2 bg-black grid grid-cols-12' onSubmit={(e) => e.preventDefault()}>
            <input ref={searchText} type='text' className='p-4 m-4 col-span-9' placeholder='What would you like to watch today?' />
            <button onClick={handleGptSearchClick} className='py-2 px-4 m-4 bg-red-700 text-white rounded-lg col-span-3'>Search</button>
        </form>
    </div>
  )
};

export default GptSearchBar;