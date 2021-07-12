import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import db from "../firebase";

export const addFavoritesAction =
    createAsyncThunk("favoritesSlice/addFavoritesAction", async (id) => {
        try {
            const arr = []
            const res = await db.collection("user")
                .doc(id)
                .collection("preferiti").get().then((result) => result.docs.forEach(el => arr.push(el.data())))

            return arr;
        }
        catch (error) {
            throw Error(error);
        }
    })
const favoritesSlice = createSlice({
    name: "favoritesSlice",
    initialState: {
        list: null,
        status: null,
        errorMessage: null
    },
    reducers: {
        logOutAction: (state, action) => {
            state.list = null;
            state.status = null;
        },
        removeFromList: (state, { id_anime }) => {
            state.list = state.list.filter(el => el.id === id_anime)
        }
    },
    extraReducers: {
        [addFavoritesAction.pending]: (state, action) => {
            state.status = "loading"
        },
        [addFavoritesAction.fulfilled]: (state, { payload }) => {
            state.status = "success"
            state.list = payload;

        },
        [addFavoritesAction.rejected]: (state, { error }) => {
            state.errorMessage = error.message;
            state.status = "failed"
        },

    }
})


export default favoritesSlice.reducer;
export const { logOutAction, removeFromList } = favoritesSlice.actions