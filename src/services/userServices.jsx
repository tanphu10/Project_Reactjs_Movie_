import { https } from "./config";
export const userServ = {
  login: (data) => {
    console.log("data: ", data);
    return https.post("/api/QuanLyNguoiDung/DangNhap", data);
  },
  getAllUser: () => {
    return https.get("/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP03 ");
  },
  deleteUser: (taiKhoan) => {
    return https.delete(
      `/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`
    );
  },
  addUser: (data) => {
    return https.post("/api/QuanLyNguoiDung/ThemNguoiDung", data);
  },
  updateUser: (data) => {
    return https.post("/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung", data);
  },
  regisUser: (data) => {
    return https.post("/api/QuanLyNguoiDung/DangKy", data);
  },
  // lấy thông tin tài khoản để trả về các giá trị của các vé người dùng đã đặt
  layThongTinTaiKhoan: () => {
    return https.post("/api/QuanLyNguoiDung/ThongTinTaiKhoan");
  },
};
