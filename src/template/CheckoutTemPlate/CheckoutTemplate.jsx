import React, { Fragment, useEffect } from "react";
import BookTickets from "../../pages/BookTickets/BookTickets";
import { layDuLieuLocal } from "../../util/localStore";
import { NavLink, useNavigate } from "react-router-dom";

// import { NavLink } from "react-router-dom";

const CheckoutTemplate = () => {
  useEffect(() => {
    // gọi dữ liệu từ local lên
    const user = layDuLieuLocal("user");
    // lấy lên sẽ có những trường hợp : 1) là null, 2 ko phải là admin
    if (user) {
      console.log(user);
    } else {
      window.location.href = "http://localhost:3000/login";
    }
  }, []);

  return (
    <Fragment>
      <BookTickets />
    </Fragment>
  );
};

export default CheckoutTemplate;
