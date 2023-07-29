import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { rapServ } from "../../services/rapServices";

export const getInfoScheduleFilmApi = createAsyncThunk(
  "schedule/getInfoScheduleFilmApi",
  async (maPhim) => {
    const res = await rapServ.getInfoScheduleFilm(maPhim);
    console.log("res: ", res);
    return res.data.content;
  }
);

const initialState = {
  scheduleMovie: {},
};

const controlMovieSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getInfoScheduleFilmApi.fulfilled, (state, action) => {
      console.log("action: ", action);
      state.scheduleMovie = action.payload;
      console.log("state.scheduleMovie", state.scheduleMovie);
    });
    builder.addCase(getInfoScheduleFilmApi.rejected, (state, action) => {
      console.log("action: ", action);
    });
  },
});

export const {} = controlMovieSlice.actions;

export default controlMovieSlice.reducer;
