import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@mui/material/styles";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FaRegEye } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { postData } from "../../utils/api";
import { myContext } from "../../App";
import CircularProgress from "@mui/material/CircularProgress";
import { getAuth,  GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseApp } from "../../firebase";



const auth = getAuth(firebaseApp);
const googleProvider =new GoogleAuthProvider()
const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
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

  useEffect(()=>
  {
    window.scrollTo(0,0)
  },[])
  console.log(formFields);
  const ValideValue = Object.values(formFields).every((el) => el);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (formFields.name === "") {
      context.openAlertBox("error", "please enter full name");
      return false;
    }

    if (formFields.email === "") {
      context.openAlertBox("error", "please enter email id");
      return false;
    }

    if (formFields.password === "") {
      context.openAlertBox("error", "please enter password");
      return false;
    }
    postData("/api/user/register", formFields).then((res) => {
      console.log(res);

      if (res?.error !== true) {
        setIsLoading(false);
        context.openAlertBox("success", res?.message);
        localStorage.setItem("userEmail", formFields.email);
        setFormFields({
          name: "",
          email: "",
          password: "",
        });

        history("/verify");
      } else {
        context.openAlertBox("error", res.message);
        setIsLoading(false);
      }
      setIsLoading(false);
      setFormFields({
        name: "",
        email: "",
        password: "",
      });
    });
  };
  const authWithGoogle =()=>{
signInWithPopup(auth, googleProvider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
   
    const fields={
      name:user.providerData[0].displayName,
      email:user.providerData[0].email,
      password:null,
      avatar:user.providerData[0].photoURL,
      mobile:user.providerData[0].phoneNumber,
      role:"USER"
    //  signUpWithGoogle:true
    }

     postData("/api/user/authWithGoogle", fields).then((res) => {
      console.log(res);

      if (res?.error !== true) {
        setIsLoading(false);
        context.openAlertBox("success", res?.message);
        localStorage.setItem("userEmail", fields.email);
       
localStorage.setItem("accessToken", res?.data?.accesstoken);
          localStorage.setItem("refreshToken", res?.data?.refreshToken);
          context.setIsLogin(true);
        history("/");
      } else {
        context.openAlertBox("error", res.message);
        setIsLoading(false);
      }
      setIsLoading(false);
      setFormFields({
        name: "",
        email: "",
        password: "",
      });
    });
     console.log(user);
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  }
  return (
    <>
      <section className="section py-5 sm:py-10">
        <div className="container">
          <div className="card shadow-md w-full sm:w-[400px] p-5 px-10 m-auto rounded-md bg-white">
            <h3 className="text-center text-[22px] text-black">Register</h3>
            <form onSubmit={handleSubmit} className="mt-4 w-full" action="">
              <div className="form-group w-full mb-3">
                {" "}
                <TextField
                  id="name"
                  type="name"
                  name="name"
                  disabled={isLoading === true ? true : false}
                  className="w-full"
                  value={formFields.name}
                  variant="outlined"
                  label="Full Name"
                  onChange={onChangeInput}
                />
              </div>

              <div className="form-group w-full mb-3">
                {" "}
                <TextField
                  id="email"
                  type="email"
                  className="w-full"
                  disabled={isLoading === true ? true : false}
                  value={formFields.email}
                  name="email"
                  variant="outlined"
                  label="Email Id"
                  
                  onChange={onChangeInput}
                />
              </div>
              <div className="form-group relative w-full mb-3">
                {" "}
                <TextField
                  id="password"
                  className="w-full"
                  disabled={isLoading === true ? true : false}
                  variant="outlined"
                  label="Password"
                  name="password"
                  value={formFields.password}
                  onChange={onChangeInput}
                  type={isShowPassword === false ? "password" : "text"}
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

              <div className="flex mt-3 mb-3 items-center w-full ">
                <Button
                  disabled={!ValideValue}
                  type="submit"
                  className="btn-org flex gap-3 w-full text-[16px]"
                >
                  {isLoading === true ? (
                    <CircularProgress color="inherit" />
                  ) : (
                    " Register"
                  )}
                </Button>
              </div>

              <p className="text-center text-[16px]">
                Alreday have an Account ?{" "}
                <Link
                  to="/login"
                  className="!text-primary link text-[16px] font-[600]"
                >
                  {" "}
                  Sign In
                </Link>
              </p>
              <p className="font-[500] text-center">
                Or Continue with Social Account
              </p>
              <Button onClick={authWithGoogle} className="flex gap-3 w-full !text-black text-[16px] !bg-[#f1f1f1]">
                <FcGoogle size={32} />
                Sign In With Google
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
