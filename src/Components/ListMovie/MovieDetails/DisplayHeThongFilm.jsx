import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieServ } from "../../../services/movieServices";
import { Tabs } from "antd";
import { useParams } from "react-router-dom";
import { getInfoScheduleFilmApi } from "../../../redux/slices/controlMovieSlice";
import DisplayItem from "./DisplayItem";

const DisplayHeThongFilm = () => {
  const { scheduleMovie } = useSelector((state) => state.schedule);
  // console.log(scheduleMovie);
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    // thấy thông tin params từ url
    // let { maPhim } = params;
    // console.log("mã phim : ",maPhim);
    dispatch(getInfoScheduleFilmApi(params.maPhim));
  }, []);
  const renderSchedule = () => {
    return scheduleMovie.heThongRapChieu?.map((item, index) => {
      return {
        label: (
          <div>
            <img className="w-10 h-10" src={item.logo} alt="" />
            <p>{item.tenHeThongRap}</p>
          </div>
        ),
        key: index,
        children: <DisplayItem cumRapChieu={item.cumRapChieu} />,
      };
    });
  };
  return (
    <div className="max-w-screen-xl mx-auto m-7 my-10 bg-orange-950 text-white px-2">
      <Tabs
        className="text-white"
        // defaultActiveKey="1"
        items={[
          {
            label: "Lịch Chiếu",
            key: "1",
            children: (
              <Tabs
                className="text-white"
                tabPosition="left"
                items={renderSchedule()}
              />
            ),
          },
          {
            label: "Thông Tin",
            key: "2",
            children: "Tab 2",
          },
          {
            label: "Đánh Giá",
            key: "3",
            children: "Tab 3",
          },
        ]}
      />
    </div>
  );
};

export default DisplayHeThongFilm;
