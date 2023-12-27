import { createSlice } from "@reduxjs/toolkit";

const searchBarSlice = createSlice({
    name: 'searchBar',
    initialState: {
        showSearchBar: false,
    },
    reducers: {
        toggleSearchBar: (state) => {
            state.showSearchBar = !state.showSearchBar;
        }
    }
});

export const { toggleSearchBar } = searchBarSlice.actions;

export default searchBarSlice.reducer;