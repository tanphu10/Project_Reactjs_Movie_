import React, { Fragment, useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import {
  getControlTicketApi,
  getListTicketRoomApi,
  layInfoGhe,
} from "../../redux/slices/bookingSlice.jsx";
import {
  CheckOutlined,
  CloseSquareOutlined,
  DoubleLeftOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { InfoBooking } from "../../_model/InfoBooking";

import { Tabs } from "antd";
import { layThongTinTaiKhoanApi } from "../../redux/slices/userSlice";
import _ from "lodash";
import moment from "moment";

const DatVeXemPhim = (props) => {
  return (
    <div
      className="max-w-screen-xl mx-auto ps-5 mb-0"
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        backgroundImage: `url(/img/film.jpg)`,
        backgroundSize: "cover",
      }}
    >
      <Tabs
        className="text-white"
        defaultActiveKey="1"
        items={[
          {
            label: "Thông Tin Đặt Vé",
            key: "1",
            children: <BookTickets />,
          },
          {
            label: "Kết Quả Đặt Vé",
            key: "2",
            children: <KetQuaDatVe />,
          },
        ]}
      />
    </div>
  );
};
export default DatVeXemPhim;

const BookTickets = (props) => {
  const { hoTen } = useSelector((state) => state.user);
  // console.log(hoTen.taiKhoan);
  const { rapPhim, danhSachGheDangDat } = useSelector((state) => state.booking);
  // console.log("rapPhim: ", rapPhim);
  const { danhSachGhe, thongTinPhim } = rapPhim;
  const { diaChi, tenPhim, ngayChieu, gioChieu } = thongTinPhim;
  console.log("danh sách ghê đang đặt :", danhSachGheDangDat);
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListTicketRoomApi(params.id));
  }, []);
  // console.log(params.id);
  // console.log(danhSachGhe);
  const renderGhe = () => {
    return danhSachGhe.map((ghe, index) => {
      // console.log(ghe);
      // const sttGhe = ghe;
      let cssGheVip = ghe.loaiGhe == "Vip" ? "gheVip" : "";
      let cssGheDaDat = ghe.daDat == true ? "gheDaDat" : "";
      let cssGheDangDat = "";
      //  kiêm tra từng cái ghế render xem có trong mảng ghế đang đặt hay không
      let indexGheDD = danhSachGheDangDat.findIndex(
        (gheDD) => gheDD.maGhe === ghe.maGhe
      );
      // tìm kiếm để hiển thị ghế của bản thân mình đã đặt hiển thì lên screen
      let cssGheBanDat = "";
      if (hoTen.taiKhoan === ghe.taiKhoanNguoiDat) {
        cssGheBanDat = "yourdesk";
      }
      if (indexGheDD != -1) {
        cssGheDangDat = "gheDangDat";
      }
      return (
        <Fragment>
          <button
            onClick={() => {
              dispatch(layInfoGhe(ghe));
            }}
            disabled={ghe.daDat}
            className={`ghe ${cssGheDaDat} ${cssGheVip} ${cssGheDangDat} ${cssGheBanDat}`}
            key={index}
          >
            {ghe.daDat ? (
              cssGheBanDat != "" ? (
                <UserOutlined style={{ display: "block", color: "red" }} />
              ) : (
                <CloseSquareOutlined
                  style={{ display: "block", color: "white" }}
                />
              )
            ) : (
              ghe.stt
            )}
          </button>
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };
  return (
    <div className="bg-cover bg-center">
      <div
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.2",
        }}
      >
        <div className="container ">
          <div
            className="flex "
            style={{ maxHeight: "600px", overflowY: "scroll" }}
          >
            <div className="w-9/12 text-center">
              <div className="my-2 d-flex justify-content-center relative">
                <div className="bg-yellow-700 h-3 w-full"></div>
                <div className="screen text-center">
                  <h3 className="text-center text-white absolute  right-1/2">
                    Màn Hình
                  </h3>
                </div>
                <div className=" flex justify-center">
                  <table className="min-w-full w-2/3">
                    <thead>
                      <tr className="text-white">
                        <th>Ghế Chưa Đặt</th>
                        <th>Ghế Đang Đặt</th>
                        <th>Ghế Vip</th>
                        <th>Ghế Đã Đặt</th>
                        <th>Ghế Đang Chọn</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <button className="ghe text-center">
                            <CheckOutlined style={{ display: "block" }} />
                          </button>
                        </td>
                        <td>
                          <button className="ghe gheDangDat text-center">
                            <CheckOutlined style={{ display: "block" }} />
                          </button>
                        </td>
                        <td>
                          <button className="ghe gheVip text-center">
                            <CheckOutlined style={{ display: "block" }} />
                          </button>
                        </td>
                        <td>
                          <button className="ghe gheDaDat text-center">
                            <CloseSquareOutlined
                              style={{ display: "block", color: "white" }}
                            />
                          </button>
                        </td>
                        <td>
                          <button className="ghe yourdesk text-center">
                            <UserOutlined
                              style={{ display: "block", color: "red" }}
                            />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>{renderGhe()}</div>
              </div>
            </div>
            <div className="w-3/12 mr-7">
              <h3 className="text-center text-white text-lg font-bold">
                Tổng Tiền:{" "}
                <span className="text-blue-800 text-bold">
                  {danhSachGheDangDat
                    .reduce((tongTien, ghe, index) => {
                      return (tongTien += ghe.giaVe);
                    }, 0)
                    .toLocaleString()}
                  VND
                </span>
              </h3>
              <hr />
              <h3 className="text-xl text-center text-red-800 my-2 font-bold ">
                {tenPhim}
              </h3>
              <p className=" text-white my-3 ">
                Địa Điểm : <span className="text-red-600 my-2">{diaChi}</span>
              </p>
              <p className=" text-white ">
                Ngày Chiếu :
                <span className="text-red-600 my-2">{ngayChieu} </span>
              </p>
              <p className="  text-white my-3">
                Giờ Chiếu :{" "}
                <span className="text-red-600 my-2">{gioChieu}</span>{" "}
              </p>
              <hr />
              <div className="grid grid-cols-2 ">
                <div>
                  <span className=" text-white">Ghế:</span>
                  {danhSachGheDangDat.map((gheDD, index) => {
                    return (
                      <span key={index} className="text-green-600 text-xl mx-1">
                        {gheDD.stt}
                      </span>
                    );
                  })}
                </div>
              </div>
              <hr />
              <div className="my-5 mr-4 ">
                <i className="mr-3  text-white">Email :</i>
                <span className=" text-red-600 ">{hoTen?.email}</span>
              </div>
              <hr />
              <div className="my-5 mr-4 flex ">
                <i className="mr-3  text-white">Số Điện Thoại :</i>
                <span className=" text-red-600 ">{hoTen?.soDT}</span>
              </div>
              <hr />
              <div className="flex flex-col justify-end items-center">
                <button
                  className="w-full py-2 bg-green-500  hover:bg-yellow-400 rounded-xl text-white text-center my-5 "
                  onClick={() => {
                    const infoBooking = new InfoBooking();
                    infoBooking.maLichChieu = params.id;
                    infoBooking.danhSachVe = danhSachGheDangDat;
                    // console.log(params.id);
                    // console.log(danhSachGheDangDat);
                    console.log(infoBooking);
                    dispatch(getControlTicketApi(infoBooking));
                  }}
                >
                  ĐẶT VÉ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const KetQuaDatVe = (props) => {
  const dispatch = useDispatch();
  const { thongTinTaiKhoan } = useSelector((state) => state.thongTinTaiKhoan);
  // const {}=useSelector((state)=>state.booking)
  useEffect(() => {
    dispatch(layThongTinTaiKhoanApi());
  }, []);
  console.log("thongTinTaiKhoan :", thongTinTaiKhoan);
  // const { tenPhim, ngayDat, thoiLuongPhim } = thongTinTaiKhoan.thongTinDatVe;
  // console.log("tenPhim", tenPhim);
  return (
    <div>
      <section
        className="text-gray-600 body-font min-h-screen"
        style={{ maxHeight: "400px", overflowY: "scroll" }}
      >
        <div className="container px-5 py-24 mx-auto ">
          <div className="flex flex-wrap m-4 justify-center">
            {thongTinTaiKhoan.thongTinDatVe?.map((ticket, index) => {
              console.log("ticket", ticket);
              const seats = _.first(ticket.danhSachGhe);
              console.log("seats", seats);
              return (
                <div className="p-4 xl:w-1/4 md:w-1/2 w-full" key={index}>
                  <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative ">
                    <h2 className="text-sm tracking-widest title-font mb-1 font-medium  text-yellow-200">
                      {seats.tenRap}-{seats.maHeThongRap}
                    </h2>
                    <h1 className="text-lg font-bold text-yellow-400 pb-4 mb-4 border-b border-gray-200 leading-none">
                      {ticket.tenPhim}
                    </h1>
                    <div className="my-5">
                      <p className="flex items-center text-white mb-3">
                        <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            className="w-3 h-3"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        </span>
                        Thời Lượng Phim :{" "}
                        <span className="text-yellow-500 mx-2">
                          {ticket.thoiLuongPhim} phút
                        </span>
                      </p>
                      <p className="flex items-center text-white mb-3">
                        <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            className="w-3 h-3"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        </span>
                        Ngày Chiếu:
                        <span className="text-yellow-500 mx-2">
                          {moment(ticket.ngayDat).format(" MMMM Do YYYY")}
                        </span>
                      </p>
                      <p className="flex items-center text-white mb-3">
                        <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            className="w-3 h-3"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        </span>
                        Giờ Khởi Chiêú :{" "}
                        <span className="text-yellow-500 mx-2">
                          {moment(ticket.ngayDat).format(" h:mm:ss a")}
                        </span>
                      </p>
                      <p className="flex items-center text-white mb-3">
                        <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            className="w-3 h-3"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        </span>
                        Giá Vé :{" "}
                        <span className="text-yellow-500 mx-2">
                          {ticket.giaVe} VNĐ
                        </span>
                      </p>
                      <p className="flex items-center text-white mb-3">
                        <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            className="w-3 h-3"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        </span>
                        Địa Chỉ :{" "}
                        <span className="text-yellow-500 mx-2">
                          {seats.tenHeThongRap}
                        </span>
                      </p>
                      <p className="flex items-center text-white mb-3">
                        <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            className="w-3 h-3"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        </span>
                        Tên Ghế :{" "}
                        {ticket.danhSachGhe?.map((itemGhe, index) => {
                          console.log(itemGhe);
                          return (
                            <span className="text-yellow-500 mx-2" key={index}>
                              {itemGhe.tenGhe}
                            </span>
                          );
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            ;
          </div>

          <div className="flex justify-center mb-5">
            <NavLink
              to="/"
              className=" outline outline-green-600 outline-offset-2 px-4 py-2 text-center font-bold text-white"
            >
              <DoubleLeftOutlined
                style={{ display: "inline", alignItems: "center" }}
              />{" "}
              Quay về trang chủ
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};
