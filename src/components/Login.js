import { useRef, useState } from "react";
import { checkValidData, checkValidDataSignIn } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import Header from "./Header";
import { Background } from "../utils/constants";

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch();

    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);

    const handleSignInButton = () => {
        const message = isSignInForm?checkValidDataSignIn(email.current.value, password.current.value):checkValidData(email.current.value, password.current.value, name.current.value);
        setErrorMessage(message);

        if(message)
            return;

        if(!isSignInForm) //signup
        {
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
              const user = userCredential.user;
              updateProfile(user, {
                displayName: name.current.value
              }).then(() => {
                const { uid, email, displayName } = auth.currentUser;
                dispatch(addUser({uid:uid, email:email, displayName:displayName}));
              }).catch((error) => {
                setErrorMessage(error.message);
              });      
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setErrorMessage("Email Already Registered");
            //   setErrorMessage(errorMessage);
            });
        }
        else //signin
        {
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
              const user = userCredential.user;
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setErrorMessage("Invalid Credentials");
            //   setErrorMessage(errorMessage);
            });
        }

    };

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    };
    
    return (
        <div>  
            <Header />
            <img className="absolute w-full h-full brightness-50" src={Background} alt="background image" />
            <form onSubmit={(e)=>e.preventDefault()} className="absolute w-[30%] py-8 px-8 my-14 mx-auto left-0 right-0 bg-black text-white rounded-lg bg-opacity-80 shadow-inner shadow-white">
                <h1 className="font-bold text-3xl py-4">{isSignInForm?'Sign In':'Sign Up'}</h1>
                {!isSignInForm && <input ref={name} type="text" placeholder="Full Name" className="p-4 my-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg" />}
                <input ref={email} type="text" placeholder="Email Address" className="p-4 my-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg" />
                <input ref={password} type="password" placeholder="Password" className="p-4 my-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg" />
                <p className="text-red-500 text-sm">{errorMessage}</p>
                <button className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleSignInButton}>{isSignInForm?'Sign In':'Sign Up'}</button>
                <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm?'New to MovieStoreGPT? Sign Up Now':'Already Registered! Sign In Now'}</p>
            </form>
        </div>
    )
}

export default Login;