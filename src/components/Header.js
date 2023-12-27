import React, { useRef } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { addUser, removeUser } from '../utils/userSlice';
import { Logo } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { showProfileName } from '../utils/profileSlice';
import { toggleSearchBar } from '../utils/searchBarSlice';
import SearchBar from './SearchBar';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const showGptSearch = useSelector(store => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/");   
    }).catch((error) => {
      navigate("/error");
    });
  };

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) { //signin
          const { uid, email, displayName } = user;
          dispatch(addUser({uid:uid, email:email, displayName:displayName}));
          dispatch(showProfileName(displayName));
          navigate("/browse");
        } else { //signout
          dispatch(removeUser());
          navigate("/");
        }
      });
      return () => unsubscribe(); //for unmounting
}, []);

  const handleGptSearch = () => {
    dispatch(toggleGptSearchView());
  }

  const handleSearchBar = (e) => {
    e.preventDefault();
    dispatch(toggleSearchBar());
  }

  const handleCloseButton = () => {
    dispatch(toggleSearchBar());
    if (searchFavMovie.current) {
      searchFavMovie.current.value = '';
    }
  }

  const searchFavMovie = useRef(null);
  const profileName = useSelector(store => store.profile.profileName);
  const showSearchBar = useSelector(store => store.searchBar.showSearchBar);

  return (
    <div className='absolute w-screen px-2 md:px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between'>
      <div className='flex mx-auto md:mx-0'>
      <img className='w-16 h-16' src={Logo} alt='logo' />
      {user && <h2 className='bg-gradient-to-r from-purple-600 via-red-500 to-indigo-400 inline-block text-transparent bg-clip-text text-lg md:text-2xl font-bold mt-4 ml-4 italic whitespace-normal md:whitespace-nowrap'>Welcome to MovieStore {profileName}</h2>}
      </div>
      {user && <div className='flex mx-auto md:mx-0'>
      <form onSubmit={handleSearchBar}>
      <input ref={searchFavMovie} className='bg-gray-50 shadow-inner shadow-black text-gray-900 text-sm rounded-lg py-[9px] px-4 mx-4 my-3 w-80 justify-between flex' type='text' placeholder='Search your favourite movie here<3' />
      </form>
      {showSearchBar && <button className='text-white p-1 md:p-2 bg-red-500 hover:bg-opacity-80 rounded-lg my-3' onClick={handleCloseButton}>Close</button>} </div>}
      {showSearchBar && <SearchBar movieQuery={searchFavMovie.current.value} />}
      {user && <div className='flex'>
        {showGptSearch ? <button className='px-4 py-2 whitespace-nowrap bg-gray-500 hover:opacity-80 mx-4 my-3 text-white rounded-lg font-bold' onClick={handleGptSearch}>Welcome to GPT Search</button> : <button className='px-4 py-2 bg-blue-500 bg-gradient-to-r from-indigo-500 mx-4 my-3 hover:opacity-80 text-white rounded-lg font-bold whitespace-nowrap' onClick={handleGptSearch}>GPT Search</button>}
        <button className='py-2 px-4 bg-blue-500 bg-gradient-to-r from-indigo-500 my-3 mx-4 hover:opacity-80 text-white rounded-lg font-bold ml-auto' onClick={handleSignOut}>Sign out</button>
      </div>}
    </div>
  )
}

export default Header;