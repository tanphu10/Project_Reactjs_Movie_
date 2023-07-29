import { configureStore } from "@reduxjs/toolkit";
import btnSlice from "./slices/btnSlice";
import detailsMovieSlice from "./slices/detailsMovieSlice";
import loadingSlice from "./slices/loadingSlice";
import userSlice from "./slices/userSlice";
import bookingSlice from "./slices/bookingSlice";
import controlMovieSlice from "./slices/controlMovieSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    loading: loadingSlice,
    btnReadOnly: btnSlice,
    movie: detailsMovieSlice,
    schedule: controlMovieSlice,
    booking: bookingSlice,
    thongTinTaiKhoan: userSlice,
    // controlBooking:
  },
});
