import React from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { addUser, removeUser } from '../utils/userSlice';
import { Logo, Profile } from '../utils/constants';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);

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
          navigate("/browse");
        } else { //signout
          dispatch(removeUser());
          navigate("/");
        }
      });
      return () => unsubscribe(); //for unmounting
}, []);

  return (
    <div className='absolute bg-black w-full flex'>
      <img className='relative w-16 h-16 z-10' src={Logo} alt='logo' />
      {user && <div className='flex ml-auto'>
        <img className='py-4' src={Profile} alt='profile logo' />
        <button className='text-white mx-4' onClick={handleSignOut}>Sign out</button>
      </div>}
    </div>
  )
}

export default Header;