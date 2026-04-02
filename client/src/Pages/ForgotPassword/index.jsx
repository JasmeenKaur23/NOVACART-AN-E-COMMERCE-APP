import React, { useContext, useState } from "react";
import { makeStyles } from "@mui/material/styles";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FaRegEye } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { myContext } from "../../App";
import CircularProgress from "@mui/material/CircularProgress";
import { postData } from "../../utils/api";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPassword2, setIsShowPassword2] = useState(false);
  const [formFields, setFormFields] = useState({
    email: localStorage.getItem("userEmail"),
    newPassword: "",
    confirmPassword: "",
  });

  const context = useContext(myContext);
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

    if(res?.error===false){
    localStorage.removeItem("userEmail");
    localStorage.removeItem("actionType");
    setIsLoading(false);
    context.openAlertBox("success", "Password reset successfully");
    history("/login"); // navigate to login page if needed
  }
else{
    context.openAlertBox("error", res?.message);

}})
  .catch((err) => {
    console.error(err);
    setIsLoading(false);
    context.openAlertBox("error", "Something went wrong while resetting password");
  });

  };
  return (
    <>
      <section className="section py-5 lg:py-10">
        <div className="container">
          <div className="card shadow-md w-full sm:w-[500px] p-5 px-10 m-auto rounded-md bg-white">
            <h3 className="text-center text-[22px] text-black">
              Forgot password
            </h3>
            <form onSubmit={handleSubmit} className="mt-4 w-full" action="">
              <div className="form-group relative w-full mb-3">
                {" "}
                <TextField
                  id="password"
                  
                  type={isShowPassword === false ? "password" : "text"}
                  className="w-full"
                  disabled={isLoading === true ? true : false}
                  value={formFields.newPassword}
                 name="newPassword"
                  onChange={onChangeInput}
                   variant="outlined"
                  label="New Password"
                />
                <Button
                  onClick={() => setIsShowPassword(!isShowPassword)}
                  className="!absolute !rounded-full !text-black top-[10px] right-[10px] z-50 !h-[35px] !min-w-[35px] !w-[35px]"
                >
                  {isShowPassword === false ? (
                    <FaRegEye size={26} className="opacity-75" />
                  ) : (
                    <FaRegEyeSlash size={26} className="opacity-75" />
                  )}
                </Button>
              </div>
              <div className="form-group relative w-full mb-3">
                {" "}
                <TextField
                  id="confirm_password"
                  className="w-full"
                  variant="outlined"
                  disabled={isLoading === true ? true : false}
                  value={formFields.confirmPassword}
                 
                  name="confirmPassword"
                  onChange={onChangeInput}
                   label="Confirm Password"
                  type={isShowPassword2 === false ? "password" : "text"}
                />
                <Button
                  onClick={() => setIsShowPassword2(!isShowPassword2)}
                  className="!absolute !rounded-full !text-black top-[10px] right-[10px] z-50 !h-[35px] !min-w-[35px] !w-[35px]"
                >
                  {isShowPassword2 === false ? (
                    <FaRegEye size={26} className="opacity-75" />
                  ) : (
                    <FaRegEyeSlash size={26} className="opacity-75" />
                  )}
                </Button>
              </div>

              {/* <a
                className="link  cursor-pointer font-[600] text-[16px]"
                onClick={ForgotPassword}
              >
                Forgot Password
              </a> */}

              <div className="flex mt-3 mb-3 items-center w-full ">
                <Button
                  disabled={!ValideValue}
                  type="submit"
                  className="btn-org flex gap-3 w-full text-[16px]"
                >
                  {isLoading === true ? (
                    <CircularProgress color="inherit" />
                  ) : (
                    "Change Password"
                  )}
                </Button>
              </div>

              {/* <p className="text-center text-[16px]">
                Not Registered ?{" "}
                <Link
                  to="/register"
                  className="!text-primary link text-[16px] font-[600]"
                >
                  {" "}
                  Sign Up
                </Link>
              </p>
              <p className="font-[500] text-center">
                Or Continue with Social Account
              </p>
              <Button className="flex gap-3 w-full !text-black text-[16px] !bg-[#f1f1f1]">
                <FcGoogle size={32} />
                Login With Google
              </Button> */}
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
