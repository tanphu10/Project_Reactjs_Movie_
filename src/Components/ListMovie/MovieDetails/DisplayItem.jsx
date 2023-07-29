import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import moment from "moment";
const DisplayItem = (props) => {
  //   const [lichChieu, setLichChieu] = useState([]);
  console.log(props.cumRapChieu);
  //   const cumRapChieuPhim = props.cumRapChieu;
  const renderCumRapChieu = () => {
    return props.cumRapChieu.map((item, index) => {
      return {
        label: (
          <div>
            <div className="flex flex-cols items-center">
              <img
                style={{ width: "50px" }}
                src={
                  "https://img.pikbest.com/03/04/50/396pIkbEsTzN9.jpg!f305cw"
                }
                alt=""
              />
              <div>
                <h4 className=" font-semibold text-white text-left">
                  {item.tenCumRap}
                </h4>
                <p className="text-xs text-white">{item.diaChi}</p>
              </div>
            </div>
            <div className="my-5">
              {item.lichChieuPhim.map((lichChieu, index) => {
                return (
                  <NavLink
                    to={`/Checkout/${lichChieu.maLichChieu}`}
                    className="outline-double outline-3 outline-offset-2 text-green-600 px-5 py-2 mr-3"
                    key={index}
                  >
                    {moment(lichChieu.ngayChieuGioChieu).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ),
        key: index,
        children: "",
      };
    });
  };
  return <Tabs id="tab" tabPosition="left" items={renderCumRapChieu()} />;
};

export default DisplayItem;
