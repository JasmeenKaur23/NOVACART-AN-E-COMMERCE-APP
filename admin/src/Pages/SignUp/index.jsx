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
import { useNavigate } from "react-router-dom";
import { postData } from "../../utils/api.js";
import { useContext } from "react";
import { MyContext } from "../../App.jsx";
import { getAuth,  GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseApp } from "../../firebase";



const auth = getAuth(firebaseApp);
const googleProvider =new GoogleAuthProvider()

const SignUp = () => {
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingfb, setLoadingfb] = useState(false);
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
    const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };
  const history = useNavigate();
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });
  function handleClickGoogle() {
    setLoadingGoogle(true);

    // Simulate Google login delay (2 seconds)
    setTimeout(() => {
      setLoadingGoogle(false);
    }, 2000);
  }
  function handleClickfb() {
    setLoadingfb(true);

    // Simulate Google login delay (2 seconds)
    setTimeout(() => {
      setLoadingfb(false);
    }, 2000);
  }
  const context=useContext(MyContext)
const ValideValue = Object.values(formFields).every((el) => el);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

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
   
           history("/verify-account");
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
        role:"ADMIN"
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
     const forgotPassword = () => {
        if (formFields.email === "") {
          context.openAlertBox("error", "please enter email id");
          return false;
        } else {
          context.openAlertBox("success", `OTP sent to ${formFields.email}`);
    
          localStorage.setItem("userEmail", formFields.email);
          localStorage.setItem("actionType", "forgot-password");
    
          postData("/api/user/forgot-password", {
            email: formFields.email,
          }).then((res) => {
            console.log(res);
            if (res?.error === false) {
              context.openAlertBox("success", res?.message);
    
              history("/verify-account");
            } else {
              context.openAlertBox("error", res?.message);
            }
          });
          // history("/verify");
        }
      };
    
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

      <div className="loginBox card md:w-[600px] w-full h-[auto] pb-24 relative z-50 mx-auto pt-5 lg:pt-24">
         <div className="text-center">
          <img src="/icon.svg" className="m-auto" alt="icon" />
        </div>

         <h1 className="text-center font-[800] mt-4 text-[18px] sm:text-[37px]">
       Join Us Today !
          Get Special  <br /> Benefits and stay up-to date
        </h1>

        <div className="flex items-center justify-center w-full gap-4 mt-5">
          <Button
            // onClick={handleClickGoogle}
            disabled={loadingGoogle}
             onClick={authWithGoogle}

            className="flex !py-3 items-center justify-center gap-3 !px-5 w-full !text-black capitalize text-[16px] !bg-[#f1f1f1]"
          >
            {loadingGoogle ? (
              <>
                <CircularProgress size={26} thickness={4} color="inherit" />
                Logging in...
              </>
            ) : (
              <>
                <FcGoogle size={28} />
                Login With Google
              </>
            )}
          </Button>
          
        </div>

        <br />

        <div className="w-full flex items-center justify-center gap-3">
          <span className="flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.3)]"></span>
           <span className="text-[10px] lg:text-[14px] font-[500]">
            Or,Sign In with your Email
          </span>
          <span className="flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.3)]"></span>
        </div>

        <br />
        <form onSubmit={handleSubmit} className="w-full mt-3 px-8">
          {/* Email Field */}
          <div className="mb-4 form-group w-full">
            <h4 className="text-[14px] font-[500] mb-2">Full Name</h4>
            <input
              id="name"
              type="text"
               disabled={isLoading === true ? true : false}
                  value={formFields.name}
                  name="name"
              placeholder="Your Name "
              onChange={onChangeInput}
              className="w-full h-[50px] text-[19px] px-4 py-2 focus:outline-none focus:border-gray-900 focus:border-[3px]  border-2 border-gray-700 rounded-lg text-sm placeholder-gray-500  "
            />
          </div>
          <div className="mb-4 form-group w-full">
            <h4 className="text-[14px] font-[500] mb-2">Email</h4>
            <input
              id="email"
              type="email"
                 name="email"
                  disabled={isLoading === true ? true : false}
                  value={formFields.email}
              placeholder="name@company.com"
                 onChange={onChangeInput}
              className="w-full h-[50px] text-[19px] px-4 py-2 focus:outline-none focus:border-gray-900 focus:border-[3px]  border-2 border-gray-700 rounded-lg text-sm placeholder-gray-500  "
            />
          </div>

          {/* Password Field */}
         <div className="mb-4">
  <h4 className="text-[14px] font-[500] mb-2">Password</h4>
  <div className="relative w-full">
    <input
      id="password"
      type={isPasswordShow ? "text" : "password"}
      placeholder="Enter Password Here"
         onChange={onChangeInput}
            name="password"
                  disabled={isLoading === true ? true : false}
                  value={formFields.password}
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

          {/* Remember + Forgot */}
         
             

<div className="flex items-center mb-8 mt-8 gap-5 justify-center">
            {" "}
            <span className="text-[14px]">Already have an Account? </span>
            <Link
              to="/login"
              className="!text-primary cursor-pointer hover:!text-gray-700  !text-[15px] font-[600] hover:underline"
            >
              Sign In
            </Link>
          </div>
          {/* Login Button */}
          <button
            type="submit"
             disabled={!ValideValue}
                 
            className="w-full btn-blue btn-lg text-white font-medium py-2 rounded-lg transition-colors"
          >
         {isLoading === true ? (
                            <CircularProgress color="inherit" />
                          ) : (
                            "Sign Up"
                          )}
          </button>
          <br />
          {/* Sign up link */}
         
        </form>
      </div>
    </section>
  );
};

export default SignUp;
