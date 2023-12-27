import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import movieReducer from "./movieSlice";
import gptReducer from "./gptSlice";
import profileReducer from "./profileSlice";
import searchBarReducer from "./searchBarSlice";

const appStore = () => configureStore({
    reducer: {
        user: userReducer,
        movies: movieReducer,
        gpt: gptReducer,
        profile: profileReducer,
        searchBar: searchBarReducer
    },
});

export default appStore;