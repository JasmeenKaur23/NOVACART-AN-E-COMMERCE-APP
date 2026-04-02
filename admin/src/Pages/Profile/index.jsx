import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App.jsx";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { FaCloudUploadAlt } from "react-icons/fa";
import { fetchDataFromApi, uploadImage, editData, postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import Collapse from "react-collapse";
import Radio from "@mui/material/Radio";

const Profile = () => {
  const [phone, setPhone] = useState("");
  const context = useContext(MyContext);
  const [previews, setPreviews] = useState([]);
  const history = useNavigate();
  const [address, setAddress] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [userId, setUserId] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [isChangePasswordFormShow, setIsChangePasswordFormShow] = useState(false);

  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [changePassword, setChangePassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  // Redirect if not logged in
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      history("/login");
    }
  }, [context?.isLogin]);

  // Load user data
  useEffect(() => {
    if (context?.userData?._id) {
      fetchDataFromApi(`/api/address/get?userId=${context?.userData._id}`).then((res) => {
        setAddress(res.address);
        context?.setAddress(res.address);
      });

      setUserId(context.userData._id);
      setFormFields({
        name: context.userData.name,
        email: context.userData.email,
        mobile: context.userData.mobile,
      });
      setPhone(String(context.userData.mobile || ""));

      setChangePassword({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [context?.userData]);

  // Handle form input changes
  const onChangeInput = (e) => {
    const { name, value } = e.target;

    // Profile fields
    if (["name", "email", "mobile"].includes(name)) {
      setFormFields((prev) => ({ ...prev, [name]: value }));
    }

    // Password fields
    if (["oldPassword", "newPassword", "confirmPassword"].includes(name)) {
      setChangePassword((prev) => ({ ...prev, [name]: value }));
    }
  };

  const ValideValue = Object.values(formFields).every((el) => el);
  const ValideValue2 = Object.values(changePassword).every((el) => el);

  // Submit profile update
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formFields.name) return context.openAlertBox("error", "Please enter Full Name");
    if (!formFields.email) return context.openAlertBox("error", "Please enter Email ID");
    if (!formFields.mobile) return context.openAlertBox("error", "Please enter Mobile Number");

    editData(`/api/user/${userId}`, formFields, { withCredentials: true }).then((res) => {
      setIsLoading(false);
      if (!res?.error) {
        context.openAlertBox("success", res?.data?.message);
      } else {
        context.openAlertBox("error", res?.data?.message);
      }
    });
  };

  // Submit password change
  const handleSubmitChangePassword = (e) => {
    e.preventDefault();
    setIsLoading2(true);

    if (!changePassword.oldPassword) return context.openAlertBox("error", "Please enter old password");
    if (!changePassword.newPassword) return context.openAlertBox("error", "Please enter new password");
    if (!changePassword.confirmPassword) return context.openAlertBox("error", "Please enter confirm password");
    if (changePassword.confirmPassword !== changePassword.newPassword) return context.openAlertBox("error", "Passwords do not match");

    postData(`/api/user/reset-password`, changePassword, { withCredentials: true }).then((res) => {
      setIsLoading2(false);
      if (!res?.error) {
        context.openAlertBox("success", res?.message);
        history("/login");
      } else {
        context.openAlertBox("error", res?.message);
      }
    });
  };

  // Handle avatar upload
  const formdata = new FormData();
  const [uploading, setUploading] = useState(false);
  let selectedImages = [];

  const onChangeFile = async (e) => {
    try {
      setPreviews([]);
      const files = e.target.files;
      setUploading(true);

      for (let i = 0; i < files.length; i++) {
        if (["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(files[i].type)) {
          selectedImages.push(files[i]);
          formdata.append("avatar", files[i]);
        } else {
          setUploading(false);
          return context.openAlertBox("error", "Please select a valid jpg/jpeg/webp/png image file");
        }
      }

      uploadImage("/api/user/user-avatar", formdata).then((res) => {
        setUploading(false);
        setPreviews([res?.data?.avtar]);
      });
    } catch (error) {
      console.log("error in avatar upload", error);
    }
  };

  // Set initial avatar preview
  useEffect(() => {
    if (context?.userData?.avatar) {
      setPreviews([context.userData.avatar]);
    }
  }, [context?.userData]);

  return (
    <>
      <div className="card w-[100%] sm:w-[100%] lg:w-[65%] my-2 px-5 pb-5 pt-2 bg-white shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-[20px] font-[600]">Admin Profile</h3>
          <Button className="!ml-auto btn-blue" onClick={() => setIsChangePasswordFormShow(!isChangePasswordFormShow)}>
            Change Password
          </Button>
        </div>

        <br />
        <div className="rounded-full mb-3 relative overflow-hidden bg-gray-200 flex items-center justify-center w-[110px] h-[110px] group">
      {uploading ? (
  <CircularProgress color="inherit" />
) : previews?.length > 0 ? (
  <img
    className="w-full h-full object-cover"
    src={previews[0]}
    onError={(e) => (e.target.src = "/profile.jpg")}
    alt="Profile Preview"
  />
) : (
  <img
    className="w-full h-full object-cover"
    src="/profile.jpg"
    alt="Default Profile"
  />
)}


          <div className="overlay group-hover:opacity-100 opacity-0 transition-all duration-300 flex cursor-pointer items-center justify-center w-full h-full absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.7)]">
            <FaCloudUploadAlt className="text-[#fff] text-[28px]" />
            <input type="file" className="top-0 left-0 w-full h-full absolute opacity-0 cursor-pointer" accept="image/*" onChange={onChangeFile} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="form mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <input
              onChange={onChangeInput}
              disabled={isLoading}
              value={formFields.name}
              name="name"
              type="text"
              className="w-full h-[40px] border-2 p-3 text-sm border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md"
            />

            <input
              onChange={onChangeInput}
              disabled
              value={formFields.email}
              name="email"
              type="email"
              className="w-full h-[40px] border-2 p-3 text-sm border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md"
            />

            <div className="w-full h-[40px] !p-0 !m-0 rounded-md flex items-center">
              <PhoneInput
                value={String(phone || "")}
                defaultCountry="in"
                onChange={(value) => {
                  const safeValue = String(value || "");
                  setPhone(safeValue);
                  setFormFields((prev) => ({ ...prev, mobile: safeValue }));
                }}
              />
            </div>
          </div>

          <br />
          <div className="flex items-center gap-4">
            <Button type="submit" disabled={!ValideValue} className="btn-blue btn-lg w-full">
              {isLoading ? <CircularProgress color="inherit" /> : "Update Profile"}
            </Button>
          </div>
        </form>
      </div>

      <Collapse isOpened={isChangePasswordFormShow}>
        <div className="card w-[100%] sm:w-[100%] lg:w-[65%] bg-white p-3 shadow-md rounded-md">
          <div className="pb-3 flex items-center">
            <h3 className="text-[20px] font-[600] pb-0">Change Password</h3>
          </div>
          <hr />
          <form onSubmit={handleSubmitChangePassword} className="mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {context?.userData?.signUpWithGoogle === false && (
                <TextField
                  label="Old Password"
                  size="small"
                  className="w-full"
                  variant="outlined"
                  onChange={onChangeInput}
                  disabled={isLoading2}
                  value={changePassword.oldPassword}
                  name="oldPassword"
                />
              )}

              <TextField
                label="New Password"
                size="small"
                className="w-full"
                type="password"
                variant="outlined"
                onChange={onChangeInput}
                disabled={isLoading2}
                value={changePassword.newPassword}
                name="newPassword"
              />

              <TextField
                label="Confirm Password"
                size="small"
                type="password"
                className="w-full"
                variant="outlined"
                name="confirmPassword"
                disabled={isLoading2}
                value={changePassword.confirmPassword}
                onChange={onChangeInput}
              />
            </div>

            <br />
            <div className="flex items-center gap-4">
              <Button type="submit" disabled={!ValideValue2} className="btn-blue btn-lg w-full">
                {isLoading2 ? <CircularProgress color="inherit" /> : "Change Password"}
              </Button>
            </div>
          </form>
        </div>
      </Collapse>
    </>
  );
};

export default Profile;
