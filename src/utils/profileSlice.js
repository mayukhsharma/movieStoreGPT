import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profileName: null,
    },
    reducers: {
        showProfileName: (state, action) => {
            state.profileName = action.payload;
        }
    }
});

export const { showProfileName } = profileSlice.actions;

export default profileSlice.reducer;