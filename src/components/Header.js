import React from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { addUser, removeUser } from '../utils/userSlice';
import { Logo } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { showProfileName } from '../utils/profileSlice';

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

  const profileName = useSelector(store => store.profile.profileName);

  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
      <div className='flex'>
      <img className='w-16 h-16' src={Logo} alt='logo' />
      {user && <h2 className='bg-gradient-to-r from-purple-600 via-red-500 to-indigo-400 inline-block text-transparent bg-clip-text text-2xl font-bold mt-5 ml-4 italic'>Welcome to MovieStore {profileName}</h2>}
      </div>
      {user && <div className='flex p-2'>
      {showGptSearch ? <button className='px-4 py-2 whitespace-nowrap bg-gray-500 hover:opacity-80 mx-4 my-2 text-white rounded-lg font-bold' onClick={handleGptSearch}>Welcome to GPT Search</button> : <button className='px-4 py-2 bg-blue-500 bg-gradient-to-r from-indigo-500 mx-4 my-2 hover:opacity-80 text-white rounded-lg font-bold whitespace-nowrap' onClick={handleGptSearch}>GPT Search</button>}
        {/* <img onClick={handleProfileClick} className='h-[80%] mt-1 cursor-pointer' src={Profile} alt='profile logo' /> */}
        <button className='py-2 px-4 bg-blue-500 bg-gradient-to-r from-indigo-500 my-2 mx-4 hover:opacity-80 text-white rounded-lg font-bold' onClick={handleSignOut}>Sign out</button>
      </div>}
    </div>
  )
}

export default Header;