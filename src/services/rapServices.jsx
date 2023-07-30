import { https } from "./config";

export const rapServ = {
  // lấy thông tin hệ thống rạp
  getAllHeThongRap: () => {
    return https.get("api/QuanLyRap/LayThongTinHeThongRap");
  },
  //   lấy thông tin lịch chiếu hệ thống rap
  getAllLichChieuHethong: (maHeThongRap) => {
    return https.get(
      `api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=GP08`
    );
  },
  getInfoScheduleFilm: (maPhim) => {
    return https.get(
      `/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`
    );
  },
  getListTicketRoom: (maLichChieu) => {
    return https.get(
      `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
    );
  },
  getControlTicket: (data) => {
    return https.post("/api/QuanLyDatVe/DatVe", data);
  },
};
