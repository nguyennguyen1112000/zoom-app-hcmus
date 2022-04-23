import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userLoginSuccess } from "../../actions/auth";
import { useHistory } from "react-router";
import { Link, useLocation } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
function SignUp() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [input, setInput] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [errors, setErrors] = useState({
    email: null,
    password: null,
    firstName: null,
    lastName: null,
  });
  const search = useLocation().search;
  const redirectTo = new URLSearchParams(search).get("redirectTo");
  let history = useHistory();
  function handleChange(event) {
    switch (event.target.name) {
      case "email":
        setInput({
          ...input,
          email: event.target.value,
        });
        break;
      case "password":
        setInput({
          ...input,
          password: event.target.value,
        });
        break;
      case "confirmPassword":
          setInput({
            ...input,
            confirmPassword: event.target.value,
          });
          break;
      case "firstName":
        setInput({
          ...input,
          firstName: event.target.value,
        });
        break;
      default:
        setInput({
          ...input,
          lastName: event.target.value,
        });
        break;
    }
  }
  function validate() {
    let isValid = true;
    var errs = {};
    if (!input.email) {
      isValid = false;
      errs.email = "Email không được để trống";
    }

    if (input.email) {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(input["email"])) {
        isValid = false;
        errs.email = "Địa chỉ email không hợp lệ";
      }
    }

    if (!input.password) {
      isValid = false;
      errs.password = "Password không được để trống";
    }

    if (input.password) {
      if (input.password.length < 6) {
        isValid = false;
        errs.password = "Phải chứa ít nhất 6 kí tự";
      }
    }

    if (!input.confirmPassword)     {       
       isValid = false;
        errs.confirmPassword = "Confirm Password không được để trống";
    } 

    if  (input.confirmPassword !== input.password) {
      isValid = false;
      errs.confirmPassword = "Confirm Password không giống password";
    }

    if (!input.firstName) {
      isValid = false;
      errs.firstName = "Họ và tên lót không được để trống";
    }

    if (!input.lastName) {
      isValid = false;
      errs.lastName = "Tên không được để trống";
    }

    setErrors(errs);

    return isValid;
  }

  function handleSignUp(event) {
    event.preventDefault();

    if (validate()) {
      axios
        .post(`${API_URL}/users`, input)
        .then((res) => {
          console.log("Register successfully", res);
          history.push("/verify");
          //login(input.email, input.password);
          let newInput = {};
          newInput.email = "";
          newInput.password = "";
          newInput.firstName = "";
          newInput.lastName = "";
          setInput(newInput);
        })
        .catch((err) => {
          if (err.response.data.message)
            setErrors({ email: err.response.data.message });
        });
    }
  }

  return (
    <>
      <div className="wrapper pa-0">
        <header className="sp-header">
          <div className="sp-logo-wrap pull-left">
            <a href="index.html">
              <img
                className="brand-img mr-10"
                src="../img/logo.png"
                alt="brand"
              />
              <span className="brand-text">Protoring Zoom</span>
            </a>
          </div>
          <div className="form-group mb-0 pull-right">
            <span className="inline-block pr-10">Already have an account?</span>
            <a
              className="inline-block btn btn-info btn-success btn-rounded btn-outline"
              href="login.html"
            >
              Sign In
            </a>
          </div>
          <div className="clearfix" />
        </header>
        {/* Main Content */}
        <div className="page-wrapper pa-0 ma-0 auth-page">
          <div className="container-fluid">
            {/* Row */}
            <div className="table-struct full-width full-height">
              <div className="table-cell vertical-align-middle auth-form-wrap">
                <div className="auth-form  ml-auto mr-auto no-float">
                  <div className="row">
                    <div className="col-sm-12 col-xs-12">
                      <div className="mb-30">
                        <h3 className="text-center txt-dark mb-10">
                          Đăng ký tài khoản
                        </h3>
                        <h6 className="text-center nonecase-font txt-grey">
                          Nhập thông tin chi tiết bên dưới
                        </h6>
                      </div>
                      {errors.firstName && (
                        <div
                          className="alert bg-danger text-white px-4 py-2 mt-10"
                          role="alert"
                        >
                          {errors.firstName}
                        </div>
                      )}
                      <div className="form-wrap">
                        <form action="#">
                          <div className="form-group">
                            <label
                              className="control-label mb-10"
                              htmlFor="exampleInputName_1"
                            >
                              Họ và chữ lót
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              required
                              name="firstName"
                              id="id_firstName"
                              value={input.firstName}
                              placeholder="Nguyễn Văn"
                              onChange={handleChange}
                            />
                          </div>

                          {errors.lastName && (
                            <div
                              className="alert bg-danger text-white px-4 py-2 mt-10"
                              role="alert"
                            >
                              {errors.lastName}
                            </div>
                          )}
                          <div className="form-group">
                            <label
                              className="control-label mb-10"
                              htmlFor="exampleInputName_1"
                            >
                              Tên
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              required
                              name="lastName"
                              id="id_lastName"
                              value={input.lastName}
                              placeholder="A"
                              onChange={handleChange}
                            />
                          </div>

                          {errors.email && (
                            <div
                              className="alert bg-danger text-white px-4 py-2 mt-10"
                              role="alert"
                            >
                              {errors.email}
                            </div>
                          )}
                          <div className="form-group">
                            <label
                              className="control-label mb-10"
                              htmlFor="exampleInputEmail_2"
                            >
                              Địa chỉ email
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              required
                              id="id_email"
                              name="email"
                              value={input.email}
                              placeholder="example@gmail.com"
                              onChange={handleChange}
                            />
                          </div>
                          {errors.password && (
                            <div
                              className="alert bg-danger text-white px-4 py-2 mt-10"
                              role="alert"
                            >
                              {errors.password}
                            </div>
                          )}
                          <div className="form-group">
                            <label
                              className="pull-left control-label mb-10"
                              htmlFor="exampleInputpwd_2"
                            >
                              Mật khẩu
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              required
                              name="password"
                              value={input.password}
                              id="id_password"
                              placeholder="Nhập mật khẩu"
                              onChange={handleChange}

                            />
                          </div>

                          {errors.confirmPassword && (
                            <div
                              className="alert bg-danger text-white px-4 py-2 mt-10"
                              role="alert"
                            >
                              {errors.confirmPassword}
                            </div>
                          )}
                          <div className="form-group">
                            <label
                              className="pull-left control-label mb-10"
                              htmlFor="exampleInputpwd_3"
                            >
                              Nhập lại mật khẩu
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              required
                              name="confirmPassword"
                              value={input.confirmPassword}
                              id="id_password_confirm"
                              placeholder="Nhập lại mật khẩu"
                              onChange={handleChange}
                            />
                          </div>
                          <div className="form-group">
                            <div className="checkbox checkbox-primary pr-10 pull-left">
                              <input id="checkbox_2" required type="checkbox" />
                              <label htmlFor="checkbox_2">
                                {" "}
                                Tôi đồng ý với các{" "}
                                <span className="txt-primary">Điều khoản</span>
                              </label>
                            </div>
                            <div className="clearfix" />
                          </div>

                          <div className="form-group text-center">
                            <button
                              type="submit"
                              className="btn btn-info btn-success btn-rounded"
                              onClick={handleSignUp}
                            >
                              Sign Up
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Row */}
          </div>
        </div>
        {/* /Main Content */}
      </div>
    </>
  );
}

export default SignUp
