import React, { useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, NavLink } from "react-router-dom";
import { CgLogIn } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

const ForgotPassword = () => {
  

  return (
    <section className="min-h-screen bg-white  w-full top-0 left-0 ">
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

        <h1 className="text-center font-[800] mt-4 text-[37px]">
          Having Trouble to Sign In ! <br />
          Reset Your Password
           </h1>

       
        <br />

      

        <br />
        <form  className="w-full mt-3 px-3 sm:px-3">
          {/* Email Field */}
          <div className="mb-4 form-group w-full">
            <h4 className="text-[14px] font-[500] mb-2">Email</h4>
            <input
              id="email"
              type="email"
              placeholder="Enter Your Email"
              className="w-full h-[50px] text-[19px] px-4 py-2 focus:outline-none focus:border-gray-900 focus:border-[3px]  border-2 border-gray-700 rounded-lg text-sm placeholder-gray-500  "
            />
          </div>

         

          {/* Login Button */}
          <button
            type="submit"
            className="w-full btn-blue btn-lg text-white font-medium py-2 rounded-lg transition-colors"
          >
           Reset Your Password
          </button>
          <br />
          <br />
          {/* Sign up link */}
          <div className="flex text-center gap-4 justify-center items-center ">
         <span>   Don’t want to reset ?</span>
         
            <Link to="login" className=" btn-purple btn-lg text-white font-medium py-2 rounded-lg transition-colors">
              Sign in
            </Link>
         
          </div>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
