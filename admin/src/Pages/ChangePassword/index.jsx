import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CgLogIn } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { MyContext } from "../../App.jsx";
import { postData } from "../../utils/api.js";

const ChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isPasswordShow2, setIsPasswordShow2] = useState(false);
  const [formFields, setFormFields] = useState({
    email: localStorage.getItem("userEmail"),
    oldPassword: "", // ✅ ADD THIS
    newPassword: "",
    confirmPassword: "",
  });

  const context = useContext(MyContext);
  const history = useNavigate();
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };

  const ValideValue = Object.values(formFields).every((el) => el);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!formFields.oldPassword) {
      context.openAlertBox("error", "Please enter old password");
      setIsLoading(false);
      return;
    }

    if (formFields.newPassword === "") {
      context.openAlertBox("error", "please enter new Password");
      setIsLoading(false);
      return false;
    }

    if (formFields.confirmPassword === "") {
      context.openAlertBox("error", "please enter confirm password");
      setIsLoading(false);
      return false;
    }

    if (formFields.confirmPassword !== formFields.newPassword) {
      context.openAlertBox(
        "error",
        "Password and Confirm Password do not match"
      );
      setIsLoading(false);
      return false;
    }

    postData(`/api/user/reset-password`, formFields)
      .then((res) => {
        console.log(res);

        if (res?.error === false) {
          localStorage.removeItem("userEmail");
          localStorage.removeItem("actionType");
          setIsLoading(false);
          context.openAlertBox("success", "Password reset successfully");
          history("/login"); // navigate to login page if needed
        } else {
          context.openAlertBox("error", res?.message);
        }
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
        context.openAlertBox(
          "error",
          "Something went wrong while resetting password"
        );
      });
  };
const isGoogleUser = localStorage.getItem("signUpWithGoogle") === "true";

  return (
    <section className="min-h-screen w-full top-0 left-0 ">
      <header className="w-full z-50 static lg:fixed  top-0 left-0 px-4 py-3 flex items-center justify-center sm:justify-between">
        <Link to="/">
             <img
            className="object-contain w-[300px] flex items-center"
            src="/mainBanner.png"
            alt="logo"
          />
        </Link>

        <div className="hidden sm:flex items-center gap-0 ">
          <NavLink
            to="/login"
            end
            className={({ isActive }) => (isActive ? "isActive" : "")}
          >
            <Button className="!rounded-full !text-[rgba(0,0,0,0.8)] flex gap-1 !px-5">
              <CgLogIn className="text-[18px]" />
              Login
            </Button>
          </NavLink>
          <NavLink
            to="/sign-up"
            end
            className={({ isActive }) => (isActive ? "isActive" : "")}
          >
            <Button className="!rounded-full !text-[rgba(0,0,0,0.8)] flex gap-1 !px-5">
              <FaRegUser className="text-[15px]" /> Sign Up
            </Button>
          </NavLink>
        </div>
      </header>

      <img
        src="/pattern.webp"
        className="w-full opacity-10 fixed top-0 left-0"
        alt="pattern"
      />

      <div className="loginBox px-3 card md:w-[600px] w-full h-[auto] pb-24 relative z-50 mx-auto pt-5 lg:pt-24">
        <div className="text-center">
          <img src="/icon.svg" className="m-auto" alt="icon" />
        </div>

        <h1 className="text-center font-[800] mt-4 text-[18px] sm:text-[37px]">
          Welcome back! <br />
          <span className="!text-primary">
            {" "}
            You can change Your Password Here
          </span>
        </h1>

        <br />

        <br />
        <form onSubmit={handleSubmit} className="w-full mt-3 px-3 sm:px-3">
          {/* Email Field */}
          {!isGoogleUser && (
            <>
              {/* Password Field */}
              <div className="form-group w-full mb-4">
                <h4 className="text-[14px] font-[500] mb-2">Old Password</h4>
                <input
                  type="password"
                  placeholder="Enter Old Password"
                  disabled={isLoading}
                  value={formFields.oldPassword}
                  name="oldPassword"
                  onChange={onChangeInput}
                  className="w-full h-[50px] px-4 py-2 border-2 border-gray-700 rounded-lg"
                />
              </div>
            </>
          )}

          <div className="form-group w-full mb-4">
            <h4 className="text-[14px] font-[500] mb-2">New Password</h4>
            <div className="relative w-full">
              <input
                id="password"
                type={isPasswordShow ? "text" : "password"}
                placeholder="Enter Password Here"
                disabled={isLoading === true ? true : false}
                value={formFields.newPassword}
                name="newPassword"
                onChange={onChangeInput}
                className="w-full h-[50px] px-4 py-2 text-[19px] focus:outline-none focus:border-gray-900 focus:border-[3px] border-2 border-gray-700 rounded-lg text-sm placeholder-gray-500"
              />
              <Button
                onClick={() => setIsPasswordShow(!isPasswordShow)}
                className="!absolute !text-gray-600 top-[5.5px] right-[10px] z-50 !rounded-full !w-[40px] !h-[40px] !min-w-[40px]"
              >
                {isPasswordShow ? (
                  <FaRegEyeSlash className="text-[22px]" />
                ) : (
                  <FaRegEye className="text-[22px]" />
                )}
              </Button>
            </div>
          </div>
          <div className="mb-4">
            <h4 className="text-[14px] font-[500] mb-2">Confirm Password</h4>
            <div className="relative w-full">
              <input
                id="password"
                type={isPasswordShow2 ? "text" : "password"}
                placeholder="Enter Password Here"
                disabled={isLoading === true ? true : false}
                value={formFields.confirmPassword}
                name="confirmPassword"
                onChange={onChangeInput}
                className="w-full h-[50px] px-4 py-2 text-[19px] focus:outline-none focus:border-gray-900 focus:border-[3px] border-2 border-gray-700 rounded-lg text-sm placeholder-gray-500"
              />
              <Button
                onClick={() => setIsPasswordShow2(!isPasswordShow2)}
                className="!absolute !text-gray-600 top-[5.5px] right-[10px] z-50 !rounded-full !w-[40px] !h-[40px] !min-w-[40px]"
              >
                {isPasswordShow2 ? (
                  <FaRegEyeSlash className="text-[22px]" />
                ) : (
                  <FaRegEye className="text-[22px]" />
                )}
              </Button>
            </div>
          </div>

          {/* Remember + Forgot */}

          {/* Login Button */}
          <button
            type="submit"
            disabled={!ValideValue}
            className="w-full btn-blue btn-lg text-white font-medium py-2 rounded-lg transition-colors"
          >
            {isLoading === true ? (
              <CircularProgress color="inherit" />
            ) : (
              "Change Password"
            )}
          </button>
          <br />
          {/* Sign up link */}
        </form>
      </div>
    </section>
  );
};

export default ChangePassword;
