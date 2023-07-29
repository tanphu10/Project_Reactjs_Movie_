import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { rapServ } from "../../services/rapServices";
import { ThongTinLichchieu } from "../../_model/InfoPhongVe";

export const getListTicketRoomApi = createAsyncThunk(
  "ticket/getListTicketRoomApi",
  async (maLichChieu) => {
    const res = await rapServ.getListTicketRoom(maLichChieu);
    // console.log("res: ", res);
    // if(res){}
    return res.data.content;
  }
);
export const getControlTicketApi = createAsyncThunk(
  "ticket/getControlTicketApi",
  async (infoBooking) => {
    try {
      const res = await rapServ.getControlTicket(infoBooking);
      // console.log("res:", res);

      alert("Đặt vé thành công");
      return res.data.content;
    } catch (error) {
      alert("Đặt vé thất bại");
      console.log("error", error);
    }
  }
);

const initialState = {
  rapPhim: new ThongTinLichchieu(),
  danhSachGheDangDat: [],
  // Ý e là ghế đã đặt cho vào 1 array r để lên redux, xong mang xuống check ở dưới dạch sách ghế đã render, nếu trùng gì mình css cho nó là đã đặt
  controlBooking: {},
};
export const bookingSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    layInfoGhe: (state, action) => {
      // console.log(state);
      // console.log("ghế được chọn : ", action.payload);
      // cập nhập xem thử bên trong mảng danhSSachGheDangDgDat có ghế gửi lên ko
      let index = state.danhSachGheDangDat.findIndex(
        (gheDD) => gheDD.tenGhe == action.payload.tenGhe
      );
      if (index != -1) {
        // nếu tìm thấy ghế được chọn trong mảng thì click vào xóa mảng còn nếu chưa thì add vào
        state.danhSachGheDangDat.splice(index, 1);
      } else {
        state.danhSachGheDangDat.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getListTicketRoomApi.fulfilled, (state, action) => {
      // console.log("state:", state);
      // console.log("action:", action.payload);
      state.rapPhim = action.payload;
    });
    // builder.addCase(getListTicketRoomApi.rejected, (state, action) => {
    //   // console.log("action: ", action);
    // });
    builder.addCase(getControlTicketApi.fulfilled, (state, action) => {
    
      console.log("state:", state);
      console.log("action:", action.payload);
      if (state.controlBooking == null) {
        state.controlBooking = action.payload;
      } else if (state.controlBooking) {
        state.controlBooking = action.payload;
      }
    });
  },
});
export const { layInfoGhe } = bookingSlice.actions;
// để sử dụng trong component

export default bookingSlice.reducer;
// import trong store của redux
