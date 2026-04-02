import React, { useContext, useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AccountSideBar from "../../components/AccountSideBar";
import { myContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { editData, postData } from "../../utils/api.js";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { Collapse } from "react-collapse";
import CircularProgress from "@mui/material/CircularProgress";
const MyAccount = () => {
  const context = useContext(myContext);
  const history = useNavigate();
  const [phone, setPhone] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [userId, setUserId] = useState("");
  const [isChangePasswordFormShow, setIsChangePasswordFormShow] =
    useState(false);
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [changePassword, setChangePassword] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token === null) {
      history("/");
    }
  }, [context?.isLogin]);

  useEffect(() => {
    if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
      setUserId(context?.userData?._id);
      setFormFields({
        name: context?.userData?.name,
        email: context?.userData?.email,
        mobile: context?.userData?.mobile,
      });

      const ph = `"${context?.userData?.mobile}"`;
      console.log(ph);

      setPhone(ph);
      setChangePassword({
        email: context?.userData?.email,
      });
    }
  }, [context?.userData]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
    setChangePassword(() => {
      return {
        ...changePassword,
        [name]: value,
      };
    });
  };

  const ValideValue = Object.values(formFields).every((el) => el);
  const ValideValue2 = Object.values(changePassword).every((el) => el);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (formFields.name === "") {
      context.openAlertBox("error", "Please enter Full Name");
      return false;
    }
    if (formFields.email === "") {
      context.openAlertBox("error", "Please enter Email ID");
      return false;
    }

    if (formFields.mobile === "") {
      context.openAlertBox("error", "Please enter Mobile Number");
      return false;
    }
    editData(`/api/user/${userId}`, formFields, { withCredentials: true }).then(
      (res) => {
        console.log(res);

        if (res?.error !== true) {
          setIsLoading(false);
          context.openAlertBox("success", res?.data?.message);
          // localStorage.setItem("userEmail", formFields.email);
        } else {
          context.openAlertBox("error", res?.data?.message);
          setIsLoading(false);
        }

        // setIsLoading(false);
      }
    );
  };
  const handleSubmitChangePassword = (e) => {
    e.preventDefault();
    setIsLoading2(true);
    if (changePassword.oldPassword === "") {
      context.openAlertBox("error", "Please enter old password");
      return false;
    }
    if (changePassword.newPassword === "") {
      context.openAlertBox("error", "Please enter new password");
      return false;
    }

    if (changePassword.confirmPassword === "") {
      context.openAlertBox("error", "Please enter confirm password");
      return false;
    }
    if (changePassword.confirmPassword !== changePassword.newPassword) {
      context.openAlertBox("error", "Passwords do not match");
      return false;
    }
    postData(`/api/user/reset-password`, changePassword, {
      withCredentials: true,
    }).then((res) => {
      console.log(res);

      if (res?.error !== true) {
        setIsLoading2(false);
        context.openAlertBox("success", res?.message);
        // localStorage.setItem("userEmail", formFields.email);
        history("/login");
      } else {
        context.openAlertBox("error", res?.message);
        setIsLoading2(false);
      }

      // setIsLoading(false);
    });
  };
  return (
    <>
      <section className="py-3 lg:py-10 w-full ">
        <div className="container-fluid !ml-4 px-2  !py-8 !top-[50px] flex-col lg:flex-row flex gap-5">
          <div className="w-full lg:w-[20%]">
            <AccountSideBar />
          </div>

          <div className="col2 w-full lg:w-[50%]">
            <div className="card bg-white mb-5 p-3 shadow-md rounded-md">
              <div className="pb-3 flex items-center">
                {" "}
                <h3 className="text-[20px] pb-0 ">My profile</h3>
                <Button
                  className="!ml-auto btn-org"
                  onClick={() =>
                    setIsChangePasswordFormShow(!isChangePasswordFormShow)
                  }
                >
                  Change Password
                </Button>
              </div>
              <hr />
              <form onSubmit={handleSubmit} action="" className="mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ">
                  <div className="col">
                    <TextField
                      label="Full Name"
                      size="small"
                      className="w-full"
                      variant="outlined"
                      onChange={onChangeInput}
                      disabled={isLoading === true ? true : false}
                      value={formFields.name}
                      name="name"
                    />
                  </div>
                  <div className="col">
                    <TextField
                      label="Email"
                      size="small"
                      className="w-full"
                      type="email"
                      variant="outlined"
                      onChange={onChangeInput}
                      disabled={true}
                      value={formFields.email}
                      name="email"
                    />
                  </div>
                   <div className="col">
                    <div className="!w-full h-[40px] !p-0 !m-0  rounded-md flex items-center">
                      <PhoneInput
                        disabled={isLoading}
                        defaultCountry="in"
                        className="!w-full !h-full !bg-transparent  !border-none !outline-none !text-white !p-0 !m-0 flex items-center"
                        value={phone}
                        onChange={(phone) => {
                          setPhone(phone);
                          setFormFields((prev) => ({
                            ...prev, // keep previous name and email
                            mobile: phone, // update only the phone
                          }));
                        }}
                      />
                    </div>
                  </div>
                </div>
               

                <br />

                <div className="flex items-center gap-4">
                  <Button
                    type="submit"
                    disabled={!ValideValue}
                    className="btn-org btn-lg w-[200px]"
                  >
                    {" "}
                    {isLoading === true ? (
                      <CircularProgress color="inherit" />
                    ) : (
                      "Update Profile"
                    )}
                  </Button>
                </div>
              </form>
            </div>

            <Collapse isOpened={isChangePasswordFormShow}>
              <div className="card bg-white  p-3 shadow-md rounded-md">
                <div className="pb-3 flex items-center">
                  {" "}
                  <h3 className="text-[20px] pb-0 ">Change Password</h3>
                </div>
                <hr />
                <form
                  onSubmit={handleSubmitChangePassword}
                  action=""
                  className="mt-8"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ">
                    {context?.userData?.signUpWithGoogle === false && (
                      <div className="col">
                        <TextField
                          label="Old Password"
                          size="small"
                          className="w-full"
                          variant="outlined"
                          onChange={onChangeInput}
                          disabled={isLoading2 === true ? true : false}
                          value={changePassword.oldPassword}
                          name="oldPassword"
                        />
                      </div>
                    )}

                    <div className="col">
                      <TextField
                        label="New Password"
                        size="small"
                        className="w-full"
                        type="text"
                        variant="outlined"
                        onChange={onChangeInput}
                        value={changePassword.newPassword}
                        name="newPassword"
                      />
                    </div>
                    <div className="col">
                      <TextField
                        label="Confirm Password"
                        size="small"
                        type="text"
                        className="w-full"
                        variant="outlined"
                        name="confirmPassword"
                        disabled={isLoading === true ? true : false}
                        value={changePassword.confirmPassword}
                        onChange={onChangeInput}
                      />
                    </div>
                  </div>

                  <br />

                  <div className="flex items-center gap-4">
                    <Button
                      type="submit"
                      // disabled={!ValideValue2}
                      className="btn-org btn-lg w-[200px]"
                    >
                      {" "}
                      {isLoading2 === true ? (
                        <CircularProgress color="inherit" />
                      ) : (
                        "Change Password"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </Collapse>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyAccount;
