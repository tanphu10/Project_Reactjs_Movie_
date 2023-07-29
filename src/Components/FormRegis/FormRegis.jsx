import { useFormik } from "formik";
import React from "react";
import * as yub from "yup";

import { useNavigate } from "react-router-dom";
import { userServ } from "../../services/userServices";
const FormRegis = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      email: "",
      matKhau: "",
      repassword: "",
      soDt: "",
      hoTen: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      const res = await userServ.regisUser(values);
      alert("Đăng Kí Thành Công");
      setTimeout(navigate("/login"), 3000);
      console.log(res);
    },
    validationSchema: yub.object({
      taiKhoan: yub.string().required("Vui Lòng Không Để Trống!!!"),
      email: yub
        .string()
        .email("Phải là email!")
        .required("Vui Lòng Không Để Trống!!!"),
      matKhau: yub
        .string()
        .required("Vui Lòng Không Để Trống!!!")
        .min(6, "Nhập ít nhất 6 kí tự"),
      repassword: yub
        .string()
        .oneOf([yub.ref("matKhau"), null], "Chưa trùng mật khẩu")
        .required("Vui Lòng Không Để Trống!!!"),
      soDt: yub
        .string()
        .matches(/^[0-9]*$/, "vui lòng chỉ nhập số")
        .required("Vui Lòng Không Để Trống!!!")
        .min(10, "Nhập đúng số điện thoại!")
        .max(10, "Nhập đúng số điện thoại!"),
      hoTen: yub
        .string()
        .matches(/^[\p{L} ]+$/u, "vui lòng chỉ nhập chữ")
        .required("Vui Lòng Không Để Trống!!!"),
    }),

    // .min(10, "Nhập đúng số điện thoại")
    // .required("Vui Lòng Không Để Trống!!!")
  });
  let { handleSubmit, handleChange, handleBlur } = formik;
  return (
    <div className="w-1/2 mr-20">
      <form className="w-80 h-auto" onSubmit={handleSubmit}>
        <div className="mb-2">
          <label
            htmlFor="taiKhoan"
            className="block mb-2 text-sm font-medium  "
          >
            Tài Khoản
          </label>
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            id="taiKhoan"
            className="shadow-sm bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
          {formik.errors.taiKhoan && formik.touched.taiKhoan ? (
            <p className="text-red-600">{formik.errors.taiKhoan}</p>
          ) : (
            ""
          )}
        </div>
        <div className="mb-2">
          <label htmlFor="hoTen" className="block mb-2 text-sm font-medium  ">
            Họ Tên
          </label>
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            id="hoTen"
            className="shadow-sm bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
          {formik.errors.hoTen && formik.touched.hoTen ? (
            <p className="text-red-600">{formik.errors.hoTen}</p>
          ) : (
            ""
          )}
        </div>
        <div className="mb-2">
          <label htmlFor="soDt" className="block mb-2 text-sm font-medium  ">
            Số Điện Thoại
          </label>
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            id="soDt"
            className="shadow-sm bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
          {formik.errors.soDt && formik.touched.soDt ? (
            <p className="text-red-600">{formik.errors.soDt}</p>
          ) : (
            ""
          )}
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="block mb-2 text-sm font-medium  ">
            Email
          </label>
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            id="email"
            className="shadow-sm bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
          {formik.errors.email && formik.touched.email ? (
            <p className="text-red-600">{formik.errors.email}</p>
          ) : (
            ""
          )}
        </div>
        <div className="mb-2">
          <label htmlFor="matKhau" className="block mb-2 text-sm font-medium  ">
            Mật Khẩu
          </label>
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            type="password"
            id="matKhau"
            className="shadow-sm bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
          {formik.errors.matKhau && formik.touched.matKhau ? (
            <p className="text-red-600">{formik.errors.matKhau}</p>
          ) : (
            ""
          )}
        </div>
        <div className="mb-2">
          <label
            htmlFor="repassword"
            className="block mb-2 text-sm font-medium  "
          >
            Nhập lại mật khẩu
          </label>
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            type="password"
            id="repassword"
            className="shadow-sm bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
          {formik.errors.repassword && formik.touched.repassword ? (
            <p className="text-red-600">{formik.errors.repassword}</p>
          ) : (
            ""
          )}
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Đăng Ký
        </button>
      </form>
    </div>
  );
};

export default FormRegis;
