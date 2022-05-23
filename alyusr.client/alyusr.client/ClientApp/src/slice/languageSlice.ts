import { createSlice } from "@reduxjs/toolkit";
import { LanguageState } from "../models/languages/iLanguageTypes";

const initialState: LanguageState = {
    language: "ar-AE",
};

const slice = createSlice({
    name: "language",
    initialState: initialState,
    reducers: {
        changeLanguage: (state, action) => {
            return {
                ...state,
                language: action.payload
            };
        }
    },
});

export default slice.reducer;

const { changeLanguage } = slice.actions;

export const setLanguage = (language: string) => async (dispatch: any, getstate: any) => {
    await dispatch(changeLanguage(language));
};
