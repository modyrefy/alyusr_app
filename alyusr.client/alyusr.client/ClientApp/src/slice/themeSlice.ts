import { createSlice } from "@reduxjs/toolkit";
import { IThemeState } from "../models/languages/iLanguageTypes";

const initialState: IThemeState = {
    isRtl: false,
};

const slice = createSlice({
    name: "theme",
    initialState: initialState,
    reducers: {
        changeDir: (state, action) => {
            return {
                ...state,
                isRtl: action.payload
            };
        }
    },
});

export default slice.reducer;

const { changeDir } = slice.actions;

export const setRtl = (isRtl: boolean) => async (dispatch: any, getstate: any) => {
    await dispatch(changeDir(isRtl));
};
