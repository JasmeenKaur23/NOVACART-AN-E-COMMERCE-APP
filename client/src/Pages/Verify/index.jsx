import React, { act, useContext, useState } from "react";
import OtpBox from "../../components/OtpBox";
import Button from "@mui/material/Button";
import { postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { myContext } from "../../App";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const handleOtpChange = (value) => {
    setOtp(value);
  };
  const history = useNavigate();

  const context = useContext(myContext);

  const verifyOTP = (e) => {
    e.preventDefault();
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
          history("/login");
        } else {
          context.openAlertBox("error", res?.message);
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
          history("/forgot-password");
        } else {
          context.openAlertBox("error", res?.message);
        }
      });
    }
  };

  return (
    <>
      <section className="section py-5 lg:py-10">
        <div className="container">
          <div className="card shadow-md w-ful sm:w-[400px] p-5 px-10 m-auto rounded-md bg-white">
            <div className="flex items-center justify-center text-center">
              <img src="/verify.png" width="80" alt="" />
            </div>
            <h3 className="text-center text-[22px] mb-3 mt-4 text-black">
              Verify OTP
            </h3>

            <p className="text-center mb-4 mt-0 text-[18px]">
              OTP sent to{" "}
              <span className="font-bold  !text-primary">
                {localStorage.getItem("userEmail")}
              </span>
            </p>

            <form onSubmit={verifyOTP} className="" action="">
              <OtpBox length={6} onChange={handleOtpChange} />

              <div className="flex items-center px-4 mt-4 justify-center">
                <Button type="submit" className="btn-org  btn-lg w-full">
                  Verify OTP
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Verify;
