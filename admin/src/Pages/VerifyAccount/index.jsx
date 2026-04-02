import React, { useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, NavLink } from "react-router-dom";
import { CgLogIn } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa6";
import { MyContext } from "../../App";
import OtpBox from "../../Components/OtpBox";
import { useContext } from "react";
import { postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const VerifyAccount = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(MyContext);
  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const history = useNavigate();
  const verifyOTP = (e) => {
    e.preventDefault();

    if (otp !== "") {
      setIsLoading(true);
      const actionType = localStorage.getItem("actionType");
      if (actionType !== "forgot-password") {
        postData("/api/user/verifyEmail", {
          email: localStorage.getItem("userEmail"),
          otp: otp,
        }).then((res) => {
          console.log(res);
          if (res?.error === false) {
            context.openAlertBox("success", res?.message);
            localStorage.removeItem("userEmail");
            setIsLoading(false);
            history("/login");
          } else {

            context.openAlertBox("error", res?.message);
            setIsLoading(false);
          }
        });
      } else {
        postData("/api/user/verify-forgot-password-otp", {
          email: localStorage.getItem("userEmail"),
          otp: otp,
        }).then((res) => {
          console.log(res);
          if (res?.error === false) {
            context.openAlertBox("success", res?.message);
            // localStorage.removeItem("userEmail");
            history("/change-password");
          } else {
            context.openAlertBox("error", res?.message);
            setIsLoading(false);
          }
        });
      }
    } else {
      context.openAlertBox("error", "Please enter otp");
    }
  };

  return (
    <section className="min-h-screen w-full top-0 left-0 ">
       <header className="w-full z-50 static lg:fixed  top-0 left-0 px-4 py-3 flex items-center justify-center sm:justify-between">
       <Link to="/">
          <img
            className="w-[120px] h-[50px]"
            src="https://marketplace.canva.com/EAGQ1aYlOWs/1/0/1600w/canva-blue-colorful-illustrative-e-commerce-online-shop-logo-bHiX_0QpJxE.jpg"
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
          <img src="/verify.png" className="w-[120px] m-auto" alt="" />
        </div>

        <h1 className="text-center font-[800] mt-4 text-[37px]">
          Welcome back! <br />
          <span className="!text-primary"> Please Verify your Email</span>
        </h1>

        <br />
        <p className="text-center text-[15px]">
          OTP send to &nbsp;{" "}
          <span className=" font-bold text-[12px] sm:text-[14px] !text-primary">
            {localStorage.getItem("userEmail")}
          </span>
        </p>

        <br />
        <form onSubmit={verifyOTP} className="w-full mt-3 px-3 sm:px-3" action="">
          <div className="text-center flex items-center justify-center flex-col">
            <OtpBox length={6} onChange={handleOtpChange} />
          </div>
          <div className="m-auto  w-[350px] px-4 mt-4">
            <Button type="submit" className="btn-purple   w-full">
              {isLoading === true ? (
                <CircularProgress color="inherit" />
              ) : (
                "Verify OTP"
              )}
            </Button>
          </div>
        </form>
        <br />
      </div>
    </section>
  );
};

export default VerifyAccount;
