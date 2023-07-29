import React, { Fragment } from "react";
import BookTickets from "../../pages/BookTickets/BookTickets";
import { layDuLieuLocal } from "../../util/localStore";
import { useNavigate } from "react-router-dom";

// import { NavLink } from "react-router-dom";

const CheckoutTemplate = () => {
  const navigate = useNavigate();
  if (layDuLieuLocal("user") == null) {
    return navigate("/login");
  }
  return (
    <Fragment>
      <BookTickets />
    </Fragment>
  );
};

export default CheckoutTemplate;
