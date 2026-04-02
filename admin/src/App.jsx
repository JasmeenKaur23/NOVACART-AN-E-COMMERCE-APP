// import React, { createContext, useEffect, useState } from "react";
// import {
//   createBrowserRouter,
//   RouterProvider,
//   useNavigate,
// } from "react-router-dom";
// import "./App.css";
// import "./responsive.css";
// import Dashboard from "./Pages/Dashboard";
// import Header from "./Components/Header";
// import Sidebar from "./Components/Sidebar";
// import Login from "./Pages/Login";
// import SignUp from "./Pages/SignUp";
// import toast, { Toaster } from "react-hot-toast";
// import Products from "./Pages/Products";

// import Slide from "@mui/material/Slide";
// import Button from "@mui/material/Button";
// import AddProduct from "./Pages/Products/addProduct";
// import HomeSliderBanners from "./Pages/HomeSliderBanners";
// import AddHomeSlide from "./Pages/HomeSliderBanners/addHomeSlide";
// import CategoryList from "./Pages/Category";
// import AddCategory from "./Pages/Category/addCategory";
// import SubCatList from "./Pages/Category/SubCatList";
// import AddSubCategory from "./Pages/Category/addSubCategory";
// import Users from "./Pages/Users";
// import Orders from "./Pages/Orders";
// import ForgotPassword from "./Pages/ForgotPassword";
// import VerifyAccount from "./Pages/VerifyAccount";
// import ChangePassword from "./Pages/ChangePassword";
// import { fetchDataFromApi } from "./utils/api";
// import Profile from "./Pages/Profile";
// import AddAddress from "./Pages/Address/addAddress.jsx";
// import EditCategory from "./Pages/Category/editCategory.jsx";
// import ProductDetails from "./Pages/Products/productDetails.jsx";
// import AddRams from "./Pages/Products/addRams.jsx";
// import AddWeight from "./Pages/Products/addWeight.jsx";
// import AddSize from "./Pages/Products/addSize.jsx";
// import BannerV1List from "./Pages/Banners/bannerV1List.jsx";
// import BlogList from "./Pages/Blog/index.jsx";
// import BannerList2 from "./Pages/Banners/bannerList2.jsx";

// const MyContext = createContext();
// const App = () => {
//   const [address, setAddress] = useState([]);
//   const [catData, setCatData] = useState([]);
//   const [userData, setUserData] = useState(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isLogin, setIsLogin] = useState(false);
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
//   const [sidebarWidth, setSidebarWidth] = useState(18);
//   //  const history = useNavigate();
//   const [isOpenFullScreenPanel, setIsOpenFullScreenPanel] = useState({
//     open: false,
//     model: "",
//     id: "",
//   });
//   const openAlertBox = (type, msg) => {
//     if (type === "success") {
//       toast.success(msg);
//     }
//     if (type === "error") {
//       toast.error(msg);
//     }
//   };
//   useEffect(() => {
//     if (windowWidth < 992) {
//       setIsSidebarOpen(false);
//       setSidebarWidth(100);
//     } else {
//       setSidebarWidth(18);
//     }
//   }, [windowWidth]);
//   const router = createBrowserRouter([
//     {
//       path: "/",
//       exact: true,
//       element: (
//         <>
//           <section className="main">
//             <Header />
//             <div className="contentMain flex ">
//               <div
//                 className={`sidebarWrapper overflow-hidden transition-all  ease-in-out 
//                   ${
//                     isSidebarOpen === true
//                       ? windowWidth < 992
//                         ? `w-[${sidebarWidth / 1.5}%]`
//                         : `w-[${sidebarWidth}%]`
//                       : "w-[0px] opacity-0"
//                   }`}
//               >
//                 {console.log("sidebar width", sidebarWidth)}
//                 <Sidebar />
//               </div>

//               <div
//                 className={`contentRight ${
//                   isSidebarOpen === true && windowWidth < 992 && "opacity-0"
//                 } px-5 py-4 ${
//                   isSidebarOpen === false
//                     ? "w-[100%]"
//                     : `w-[${100 - sidebarWidth}%]`
//                 } transition-all  ease-in-out`}
//               >
//                 <Dashboard />
//               </div>
//             </div>
//           </section>
//         </>
//       ),
//     },
//     {
//       path: "/products",
//       exact: true,
//       element: (
//         <>
//           <section className="main">
//             <Header />
//             <div className="contentMain flex ">
//               <div
//                 className={`sidebarWrapper ${
//                   isSidebarOpen
//                     ? "w-[18%] opacity-100"
//                     : "w-0 opacity-0 overflow-hidden"
//                 } transition-all  ease-in-out`}
//               >
//                 <Sidebar />
//               </div>

//               <div
//                 className={`contentRight py-4 ${
//                   isSidebarOpen ? "w-[82%] px-5" : "w-full pl-16 pr-6"
//                 } transition-all  ease-in-out`}
//               >
//                 <Products />
//               </div>
//             </div>
//           </section>
//         </>
//       ),
//     },
//     {
//       path: "/login",
//       exact: true,
//       element: (
//         <>
//           <Login />
//         </>
//       ),
//     },
//     {
//       path: "/sign-up",
//       exact: true,
//       element: (
//         <>
//           <SignUp />
//         </>
//       ),
//     },
//     {
//       path: "/homeSlider/list",
//       exact: true,
//       element: (
//         <>
//           <section className="main">
//             <Header />
//             <div className="contentMain flex ">
//               <div
//                 className={`sidebarWrapper ${
//                   isSidebarOpen
//                     ? "w-[18%] opacity-100"
//                     : "w-0 opacity-0 overflow-hidden"
//                 } transition-all  ease-in-out`}
//               >
//                 <Sidebar />
//               </div>

//               <div
//                 className={`contentRight py-4 ${
//                   isSidebarOpen ? "w-[82%] px-5" : "w-full pl-16 pr-6"
//                 } transition-all  ease-in-out`}
//               >
//                 <HomeSliderBanners />
//               </div>
//             </div>
//           </section>
//         </>
//       ),
//     },
//     {
//       path: "/orders",
//       exact: true,
//       element: (
//         <>
//           <section className="main">
//             <Header />
//             <div className="contentMain flex ">
//               <div
//                 className={`sidebarWrapper ${
//                   isSidebarOpen
//                     ? "w-[18%] opacity-100"
//                     : "w-0 opacity-0 overflow-hidden"
//                 } transition-all  ease-in-out`}
//               >
//                 <Sidebar />
//               </div>

//               <div
//                 className={`contentRight py-4 ${
//                   isSidebarOpen ? "w-[82%] px-5" : "w-full pl-16 pr-6"
//                 } transition-allease-in-out`}
//               >
//                 <Orders />
//               </div>
//             </div>
//           </section>
//         </>
//       ),
//     },
//     {
//       path: "/subCategory/list",
//       exact: true,
//       element: (
//         <>
//           <section className="main">
//             <Header />
//             <div className="contentMain flex ">
//               <div
//                 className={`sidebarWrapper ${
//                   isSidebarOpen
//                     ? "w-[18%] opacity-100"
//                     : "w-0 opacity-0 overflow-hidden"
//                 } transition-all  ease-in-out`}
//               >
//                 <Sidebar />
//               </div>

//               <div
//                 className={`contentRight py-4 ${
//                   isSidebarOpen ? "w-[82%] px-5" : "w-full pl-16 pr-6"
//                 } transition-all  ease-in-out`}
//               >
//                 <SubCatList />
//               </div>
//             </div>
//           </section>
//         </>
//       ),
//     },
//     {
//       path: "/category/list",
//       exact: true,
//       element: (
//         <>
//           <section className="main">
//             <Header />
//             <div className="contentMain flex ">
//               <div
//                 className={`sidebarWrapper ${
//                   isSidebarOpen
//                     ? "w-[18%] opacity-100"
//                     : "w-0 opacity-0 overflow-hidden"
//                 } transition-all  ease-in-out`}
//               >
//                 <Sidebar />
//               </div>

//               <div
//                 className={`contentRight py-4 ${
//                   isSidebarOpen ? "w-[82%] px-5" : "w-full pl-16 pr-6"
//                 } transition-all  ease-in-out`}
//               >
//                 <CategoryList />
//               </div>
//             </div>
//           </section>
//         </>
//       ),
//     },
//     {
//       path: "/users",
//       exact: true,
//       element: (
//         <>
//           <section className="main">
//             <Header />
//             <div className="contentMain flex ">
//               <div
//                 className={`sidebarWrapper ${
//                   isSidebarOpen
//                     ? "w-[18%] opacity-100"
//                     : "w-0 opacity-0 overflow-hidden"
//                 } transition-all  ease-in-out`}
//               >
//                 <Sidebar />
//               </div>

//               <div
//                 className={`contentRight py-4 ${
//                   isSidebarOpen ? "w-[82%] px-5" : "w-full pl-16 pr-6"
//                 } transition-all ease-in-out`}
//               >
//                 <Users />
//               </div>
//             </div>
//           </section>
//         </>
//       ),
//     },
//     {
//       path: "/forgot-password",
//       exact: true,
//       element: (
//         <>
//           <ForgotPassword />
//         </>
//       ),
//     },
//     {
//       path: "/verify-account",
//       exact: true,
//       element: (
//         <>
//           <VerifyAccount />
//         </>
//       ),
//     },
//     {
//       path: "/change-password",
//       exact: true,
//       element: (
//         <>
//           <ChangePassword />
//         </>
//       ),
//     },
//     {
//       path: "/profile",
//       exact: true,
//       element: (
//         <>
//           <section className="main">
//             <Header />
//             <div className="contentMain flex ">
//               <div
//                 className={`sidebarWrapper ${
//                   isSidebarOpen
//                     ? "w-[18%] opacity-100"
//                     : "w-0 opacity-0 overflow-hidden"
//                 } transition-all  ease-in-out`}
//               >
//                 <Sidebar />
//               </div>

//               <div
//                 className={`contentRight py-4 ${
//                   isSidebarOpen ? "w-[82%] px-5" : "w-full pl-16 pr-6"
//                 } transition-all  ease-in-out`}
//               >
//                 <Profile />
//               </div>
//             </div>
//           </section>
//         </>
//       ),
//     },
//     {
//       path: "/product/:id",
//       exact: true,
//       element: (
//         <>
//           <section className="main">
//             <Header />
//             <div className="contentMain flex ">
//               <div
//                 className={`sidebarWrapper ${
//                   isSidebarOpen
//                     ? "w-[18%] opacity-100"
//                     : "w-0 opacity-0 overflow-hidden"
//                 } transition-all ease-in-out`}
//               >
//                 <Sidebar />
//               </div>

//               <div
//                 className={`contentRight py-4 ${
//                   isSidebarOpen ? "w-[82%] px-5" : "w-full pl-16 pr-6"
//                 } transition-all  ease-in-out`}
//               >
//                 <ProductDetails />
//               </div>
//             </div>
//           </section>
//         </>
//       ),
//     },
//     {
//       path: "/product/addRams",
//       exact: true,
//       element: (
//         <>
//           <section className="main">
//             <Header />
//             <div className="contentMain flex ">
//               <div
//                 className={`sidebarWrapper ${
//                   isSidebarOpen
//                     ? "w-[18%] opacity-100"
//                     : "w-0 opacity-0 overflow-hidden"
//                 } transition-all  ease-in-out`}
//               >
//                 <Sidebar />
//               </div>

//               <div
//                 className={`contentRight py-4 ${
//                   isSidebarOpen ? "w-[82%] px-5" : "w-full pl-16 pr-6"
//                 } transition-all  ease-in-out`}
//               >
//                 <AddRams />
//               </div>
//             </div>
//           </section>
//         </>
//       ),
//     },
//     {
//       path: "/product/addWeight",
//       exact: true,
//       element: (
//         <>
//           <section className="main">
//             <Header />
//             <div className="contentMain flex ">
//               <div
//                 className={`sidebarWrapper ${
//                   isSidebarOpen
//                     ? "w-[18%] opacity-100"
//                     : "w-0 opacity-0 overflow-hidden"
//                 } transition-all  ease-in-out`}
//               >
//                 <Sidebar />
//               </div>

//               <div
//                 className={`contentRight py-4 ${
//                   isSidebarOpen ? "w-[82%] px-5" : "w-full pl-16 pr-6"
//                 } transition-all  ease-in-out`}
//               >
//                 <AddWeight />
//               </div>
//             </div>
//           </section>
//         </>
//       ),
//     },
//     {
//       path: "/product/addSize",
//       exact: true,
//       element: (
//         <>
//           <section className="main">
//             <Header />
//             <div className="contentMain flex ">
//               <div
//                 className={`sidebarWrapper ${
//                   isSidebarOpen
//                     ? "w-[18%] opacity-100"
//                     : "w-0 opacity-0 overflow-hidden"
//                 } transition-all ease-in-out`}
//               >
//                 <Sidebar />
//               </div>

//               <div
//                 className={`contentRight py-4 ${
//                   isSidebarOpen ? "w-[82%] px-5" : "w-full pl-16 pr-6"
//                 } transition-all ease-in-out`}
//               >
//                 <AddSize />
//               </div>
//             </div>
//           </section>
//         </>
//       ),
//     },
//     {
//       path: "/bannerV1/list",
//       exact: true,
//       element: (
//         <>
//           <section className="main">
//             <Header />
//             <div className="contentMain flex ">
//               <div
//                 className={`sidebarWrapper ${
//                   isSidebarOpen
//                     ? "w-[18%] opacity-100"
//                     : "w-0 opacity-0 overflow-hidden"
//                 } transition-all ease-in-out`}
//               >
//                 <Sidebar />
//               </div>

//               <div
//                 className={`contentRight py-4 ${
//                   isSidebarOpen ? "w-[82%] px-5" : "w-full pl-16 pr-6"
//                 } transition-all ease-in-out`}
//               >
//                 <BannerV1List />
//               </div>
//             </div>
//           </section>
//         </>
//       ),
//     },
//     {
//       path: "/bannerList2/List",
//       exact: true,
//       element: (
//         <>
//           <section className="main">
//             <Header />
//             <div className="contentMain flex ">
//               <div
//                 className={`sidebarWrapper ${
//                   isSidebarOpen
//                     ? "w-[18%] opacity-100"
//                     : "w-0 opacity-0 overflow-hidden"
//                 } transition-all ease-in-out`}
//               >
//                 <Sidebar />
//               </div>

//               <div
//                 className={`contentRight py-4 ${
//                   isSidebarOpen ? "w-[82%] px-5" : "w-full pl-16 pr-6"
//                 } transition-all  ease-in-out`}
//               >
//                 <BannerList2 />
//               </div>
//             </div>
//           </section>
//         </>
//       ),
//     },
//     {
//       path: "/blog/list",
//       exact: true,
//       element: (
//         <>
//           <section className="main">
//             <Header />
//             <div className="contentMain flex ">
//               <div
//                 className={`sidebarWrapper ${
//                   isSidebarOpen
//                     ? "w-[18%] opacity-100"
//                     : "w-0 opacity-0 overflow-hidden"
//                 } transition-all  ease-in-out`}
//               >
//                 <Sidebar />
//               </div>

//               <div
//                 className={`contentRight py-4 ${
//                   isSidebarOpen ? "w-[82%] px-5" : "w-full pl-16 pr-6"
//                 } transition-all ease-in-out`}
//               >
//                 <BlogList />
//               </div>
//             </div>
//           </section>
//         </>
//       ),
//     },
//   ]);
//   //53 min  video no 42

//   const handleLogout = (
//     message = "Session expired or invalid. Please login again."
//   ) => {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     openAlertBox("error", message);
//     console.log("hello");

//     setIsLogin(false);
//     window.location.href = "/login"; // ✅ Works outside router context
//     openAlertBox("error", message);
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");

//     if (token) {
//       setIsLogin(true);

//       fetchDataFromApi(`/api/user/user-details`)
//         .then((res) => {
//           // Handle API failures (no response)
//           if (!res) {
//             handleLogout("Unable to fetch user details, please login again.");
//             return;
//           }

//           // Handle backend invalid/expired token response
//           // Adjust this condition based on your API's exact response structure
//           // (e.g., if it's res.response?.data?.error or similar; test with your backend)
//           if (
//             res.error === true ||
//             (res.response?.data?.error === true &&
//               (res.message?.includes("Invalid") ||
//                 res.message?.includes("expired") ||
//                 res.response?.data?.message?.includes("not login") ||
//                 res.response?.data?.message?.includes("Unauthorized")))
//           ) {
//             handleLogout(
//               res.message ||
//                 res.response?.data?.message ||
//                 "Your session is closed, Please login again."
//             );
//             return;
//           }

//           // If successful response
//           if (res.success === true || res.data) {
//             setUserData(res.data || res);
//           } else {
//             // Any other unexpected response: treat as invalid
//             handleLogout("Invalid session. Please login again.");
//           }
//         })
//         .catch((error) => {
//           console.error("Error fetching user details:", error);
//           // Catch network errors or other failures as invalid session
//           handleLogout("Session expired or invalid. Please login again.");
//         });
//     } else {
//       setIsLogin(false);
//       openAlertBox("error", "Login Again");
//       console.log("No token found in localStorage.");
//       // window.location.href="/login"
//     }
//   }, [isLogin]); // Empty dependency array: runs once on mount
//   useEffect(() => {
//     fetchDataFromApi("/api/category").then((res) => {
//       console.log(res?.data);
//       setCatData(res?.data);
//     });
//   }, []);
//   useEffect(() => {
//     getCat();
//     const handleResize = () => {
//       setWindowWidth(window.innerWidth);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const getCat = () => {
//     fetchDataFromApi("/api/category").then((res) => {
//       console.log(res?.data);
//       setCatData(res?.data);
//     });
//   };
//   // useEffect(() => {
//   //   const token = localStorage.getItem("accessToken");

//   //   if (token) {
//   //     setIsLogin(true);

//   //     fetchDataFromApi(`/api/user/user-details`)
//   //       .then((res) => {
//   //         // Handle API failures (no response)
//   //         if (!res) {
//   //           handleLogout("Unable to fetch user details, please login again.");
//   //           return;
//   //         }

//   //         // Handle backend invalid/expired token response
//   //         // Adjust this condition based on your API's exact response structure
//   //         // (e.g., if it's res.response?.data?.error or similar; test with your backend)
//   //         if (
//   //           res.error === true ||
//   //           (res.response?.data?.error === true &&
//   //             (res.message?.includes("Invalid") ||
//   //               res.message?.includes("expired") ||
//   //               res.response?.data?.message?.includes("not login") ||
//   //               res.response?.data?.message?.includes("Unauthorized")))
//   //         ) {
//   //           handleLogout(
//   //             res.message ||
//   //               res.response?.data?.message ||
//   //               "Your session is closed, Please login again."
//   //           );
//   //           return;
//   //         }

//   //         // If successful response
//   //         if (res.success === true || res.data) {
//   //           setUserData(res.data || res);
//   //         } else {
//   //           // Any other unexpected response: treat as invalid
//   //           handleLogout("Invalid session. Please login again.");
//   //         }
//   //       })
//   //       .catch((error) => {
//   //         console.error("Error fetching user details:", error);
//   //         // Catch network errors or other failures as invalid session
//   //         handleLogout("Session expired or invalid. Please login again.");
//   //       });
//   //   } else {
//   //     setIsLogin(false);
//   //     console.log("No token found in localStorage.");
//   //   }
//   // }, []); // Empty dependency array: runs once on mount

//   const values = {
//     setIsSidebarOpen,
//     isOpenFullScreenPanel,
//     setIsOpenFullScreenPanel,
//     isSidebarOpen,
//     isLogin,
//     setIsLogin,
//     openAlertBox,
//     setUserData,
//     userData,
//     setAddress,
//     address,
//     catData,
//     setCatData,
//     getCat,
//     windowWidth,
//     setSidebarWidth,
//     sidebarWidth,
//     // setWindowWidth
//   };
//   return (
//     <>
//       <MyContext.Provider value={values}>
//         <RouterProvider router={router} />

//         <Toaster />
//       </MyContext.Provider>
//     </>
//   );
// };

// export default App;
// export { MyContext };

// /**
//  * useEffect(() => {
//     const token = localStorage.getItem("accessToken");
//     if (token !== undefined && token !== null && token !== "") {
//       setIsLogin(true);

//       fetchDataFromApi(`/api/user/user-details`).then((response) => {
//         console.log("res is ",response.message.Unauthorized);
//         setUserData(response.data)
        
//     //     if (res?.response?.data?.error === true) {
//     // if (res?.response?.data?.message === "Invalid or expired token, please login again.") {
//     //   localStorage.removeItem("accessToken");
//     //   localStorage.removeItem("refreshToken");
//     //   openAlertBox("error", "Your session is closed, Please login again");
//     //   setIsLogin(false);
//   //   }
//   // }
//       });
//     } else {
//       setIsLogin(false);
//     }
//   }, [isLogin]);
//  */

// /**----------------------------------------------------- */
// /**
//  * 
//         <Dialog
//           fullScreen
//           open={isOpenFullScreenPanel.open}
//           onClose={() =>
//             setIsOpenFullScreenPanel({
//               open: false,
//             })
//           }
//           slots={{
//             transition: Transition,
//           }}
//         >
//           <AppBar sx={{ position: "relative" }}>
//             <Toolbar>
//               <IconButton
//                 edge="start"
//                 color="inherit"
//                 onClick={() =>
//                   setIsOpenFullScreenPanel({
//                     open: false,
//                   })
//                 }
//                 aria-label="close"
//               >
//                 <IoMdClose className="text-black" />
//               </IconButton>
//               <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
//                 {isOpenFullScreenPanel?.model}
//               </Typography>
//               <Button
//                 autoFocus
//                 color="inherit"
//                 onClick={() =>
//                   setIsOpenFullScreenPanel({
//                     open: false,
//                   })
//                 }
//               >
//                 save
//               </Button>
//             </Toolbar>
//           </AppBar>
//           {/* {isOpenFullScreenPanel?.model === "Add Product" && <AddProduct />}
//           {isOpenFullScreenPanel.model === "Add Product" && <AddProduct />}

//           {isOpenFullScreenPanel?.model === "Add Home Slide" && (
//             <AddHomeSlide />
//           )}
//           {isOpenFullScreenPanel?.model === "Add New Category" && (
//             <AddCategory />
//           )}
//           {isOpenFullScreenPanel?.model === "Add New Sub Category" && (
//             <AddSubCategory />
//           )}
//           {isOpenFullScreenPanel?.model === "Add New Address" && <AddAddress />}
//           {isOpenFullScreenPanel?.model === "Edit Category" && (
//             <EditCategory />
//           )} */
// // </Dialog>
import React, { createContext, useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import "./responsive.css";
import Dashboard from "./Pages/Dashboard";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import toast, { Toaster } from "react-hot-toast";
import Products from "./Pages/Products";

import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import AddProduct from "./Pages/Products/addProduct";
import HomeSliderBanners from "./Pages/HomeSliderBanners";
import AddHomeSlide from "./Pages/HomeSliderBanners/addHomeSlide";
import CategoryList from "./Pages/Category";
import AddCategory from "./Pages/Category/addCategory";
import SubCatList from "./Pages/Category/SubCatList";
import AddSubCategory from "./Pages/Category/addSubCategory";
import Users from "./Pages/Users";
import Orders from "./Pages/Orders";
import ForgotPassword from "./Pages/ForgotPassword";
import VerifyAccount from "./Pages/VerifyAccount";
import ChangePassword from "./Pages/ChangePassword";
import { fetchDataFromApi } from "./utils/api";
import Profile from "./Pages/Profile";
import AddAddress from "./Pages/Address/addAddress.jsx";
import EditCategory from "./Pages/Category/editCategory.jsx";
import ProductDetails from "./Pages/Products/productDetails.jsx";
import AddRams from "./Pages/Products/addRams.jsx";
import AddWeight from "./Pages/Products/addWeight.jsx";
import AddSize from "./Pages/Products/addSize.jsx";
import BannerV1List from "./Pages/Banners/bannerV1List.jsx";
import BlogList from "./Pages/Blog/index.jsx";
import BannerList2 from "./Pages/Banners/bannerList2.jsx";
import CatBanner from "./Pages/Banners/catBanner.jsx";

const MyContext = createContext();

// ✅ New: ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const { isLogin } = React.useContext(MyContext);
  const location = useLocation();
  return isLogin ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

const App = () => {
  const [address, setAddress] = useState([]);
  const [catData, setCatData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [sidebarWidth, setSidebarWidth] = useState(18);
  //  const history = useNavigate();
  const [isOpenFullScreenPanel, setIsOpenFullScreenPanel] = useState({
    open: false,
    model: "",
    id: "",
  });
  const openAlertBox = (type, msg) => {
    if (type === "success") {
      toast.success(msg);
    }
    if (type === "error") {
      toast.error(msg);
    }
  };
  useEffect(() => {
    if (windowWidth < 992) {
      setIsSidebarOpen(false);
      setSidebarWidth(100);
    } else {
      setSidebarWidth(18);
    }
  }, [windowWidth]);
  const router = createBrowserRouter([
    {
      path: "/",
      exact: true,
      element: (
        <ProtectedRoute>
          <section className="main">
            <Header />
            <div className="contentMain flex ">
              <div
                className={`sidebarWrapper overflow-hidden transition-all  ease-in-out 
                  ${
                    isSidebarOpen === true
                      ? windowWidth < 992
                        ? `w-[${sidebarWidth / 1.5}%]`
                        : `w-[${sidebarWidth}%]`
                      : "w-[0px] opacity-0"
                  }`}
              >
                {console.log("sidebar width", sidebarWidth)}
                <Sidebar />
              </div>

              <div
                className={`contentRight ${
                  isSidebarOpen === true && windowWidth < 992 && "opacity-0"
                } px-5 py-4 ${
                  isSidebarOpen === false
                    ? "w-[100%]"
                    : `w-[${100 - sidebarWidth}%]`
                } transition-all  ease-in-out`}
              >
                <Dashboard />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      ),
    },
    {
      path: "/products",
      exact: true,
      element: (
        <ProtectedRoute>
          <section className="main">
            <Header />
            <div className="contentMain flex ">
              <div
                className={`sidebarWrapper ${
                  isSidebarOpen
                    ? "w-[18%] opacity-100"
                    : "w-0 opacity-0 overflow-hidden"
                } transition-all  ease-in-out`}
              >
                <Sidebar />
              </div>

              <div
                className={`contentRight py-4 ${
                  isSidebarOpen ? "w-[82%] px-5" : "w-full pl-16 pr-6"
                } transition-all  ease-in-out`}
              >
                <Products />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      exact: true,
      element: (
        <>
          <Login />
        </>
      ),
    },
    {
      path: "/sign-up",
      exact: true,
      element: (
        <>
          <SignUp />
        </>
      ),
    },
    {
      path: "/homeSlider/list",
      exact: true,
      element: (
        <ProtectedRoute>
          <section className="main">
            <Header />
            <div className="contentMain flex ">
              <div
                className={`sidebarWrapper ${
                  isSidebarOpen
                    ? "w-[18%] opacity-100"
                    : "w-0 opacity-0 overflow-hidden"
                } transition-all  ease-in-out`}
              >
                <Sidebar />
              </div>

              <div
                className={`contentRight py-4 ${
                  isSidebarOpen ? "w-[82%] px-5" : "w-full pl-16 pr-6"
                } transition-all  ease-in-out`}
              >
                <HomeSliderBanners />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      ),
    },
    {
      path: "/orders",
      exact: true,
      element: (
        <ProtectedRoute>
          <section className="main">
            <Header />
            <div className="contentMain flex ">
              <div
                className={`sidebarWrapper ${
                  isSidebarOpen
                    ? "w-[18%] opacity-100"
                    : "w-0 opacity-0 overflow-hidden"
                } transition-all  ease-in-out`}
              >
                <Sidebar />
              </div>

              <div
                className={`contentRight py-4 ${
                  isSidebarOpen ? "w-[82%] px-5" : "w-full pl-16 pr-6"
                } transition-allease-in-out`}
              >
                <Orders />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      ),
    },
    {
      path: "/subCategory/list",
      exact: true,
      element: (
        <ProtectedRoute>
          <section className="main">
            <Header />
            <div className="contentMain flex ">
              <div
                className={`sidebarWrapper ${
                  isSidebarOpen
                    ? "w-[18%] opacity-100"
                    : "w-0 opacity-0 overflow-hidden"
                } transition-all  ease-in-out`}
              >
                <Sidebar />
              </div>

              <div
                className={`contentRight py-4 ${
                  isSidebarOpen ? "w-[82%] px-5" : "w-full pl-16 pr-6"
                } transition-all  ease-in-out`}
              >
                <SubCatList />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      ),
    },
    {
      path: "/category/list",
      exact: true,
      element: (
        <ProtectedRoute>
          <section className="main">
            <Header />
            <div className="contentMain flex ">
              <div
                className={`sidebarWrapper ${
                  isSidebarOpen
                    ? "w-[18%] opacity-100"
                    : "w-0 opacity-0 overflow-hidden"
                } transition-all  ease-in-out`}
              >
                <Sidebar />
              </div>

              <div
                className={`contentRight py-4 ${
                  isSidebarOpen ? "w-[82%] px-5" : "w-full pl-16 pr-6"
                } transition-all  ease-in-out`}
              >
                <CategoryList />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      ),
    },
    {
      path: "/users",
      exact: true,
      element: (
        <ProtectedRoute>
          <section className="main">
            <Header />
            <div className="contentMain flex ">
              <div
                className={`sidebarWrapper ${
                  isSidebarOpen
                    ? "w-[18%] opacity-100"
                    : "w-0 opacity-0 overflow-hidden"
                } transition-all  ease-in-out`}
              >
                <Sidebar />
              </div>

              <div
                className={`contentRight py-4 ${
                  isSidebarOpen ? "w-[82%] px-5" : "w-full pl-16 pr-6"
                } transition-all ease-in-out`}
              >
                <Users />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      ),
    },
    {
      path: "/forgot-password",
      exact: true,
      element: (
        <>
          <ForgotPassword />
        </>
      ),
    },
    {
      path: "/verify-account",
      exact: true,
      element: (
        <>
          <VerifyAccount />
        </>
      ),
    },
    {
      path: "/change-password",
      exact: true,
      element: (
        <>
          <ChangePassword />
        </>
      ),
    },
    {
      path: "/profile",
      exact: true,
      element: (
        <ProtectedRoute>
          <section className="main">
            <Header />
            <div className="contentMain flex ">
              <div
                className={`sidebarWrapper ${
                  isSidebarOpen
                    ? "w-[18%] opacity-100"
                    : "w-0 opacity-0 overflow-hidden"
                } transition-all  ease-in-out`}
              >
                <Sidebar />
              </div>

              <div
                className={`contentRight py-4 ${
                  isSidebarOpen ? "w-[82%] px-5" : "w-full pl-16 pr-6"
                } transition-all  ease-in-out`}
              >
                <Profile />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      ),
    },
    {
      path: "/product/:id",
      exact: true,
      element: (
        <ProtectedRoute>
          <section className="main">
            <Header />
            <div className="contentMain flex ">
              <div
                className={`sidebarWrapper ${
                  isSidebarOpen
                    ? "w-[18%] opacity-100"
                    : "w-0 opacity-0 overflow-hidden"
                } transition-all ease-in-out`}
              >
                <Sidebar />
              </div>

              <div
                className={`contentRight py-4 ${
                  isSidebarOpen ? "w-[82%] px-5" : "w-full pl-16 pr-6"
                } transition-all  ease-in-out`}
              >
                <ProductDetails />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      ),
    },
    {
      path: "/product/addRams",
      exact: true,
      element: (
        <ProtectedRoute>
          <section className="main">
            <Header />
            <div className="contentMain flex ">
              <div
                className={`sidebarWrapper ${
                  isSidebarOpen
                    ? "w-[18%] opacity-100"
                    : "w-0 opacity-0 overflow-hidden"
                } transition-all  ease-in-out`}
              >
                <Sidebar />
              </div>

              <div
                className={`contentRight py-4 ${
                  isSidebarOpen ? "w-[82%] px-5" : "w-full pl-16 pr-6"
                } transition-all  ease-in-out`}
              >
                <AddRams />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      ),
    },
    {
      path: "/product/addWeight",
      exact: true,
      element: (
        <ProtectedRoute>
          <section className="main">
            <Header />
            <div className="contentMain flex ">
              <div
                className={`sidebarWrapper ${
                  isSidebarOpen
                    ? "w-[18%] opacity-100"
                    : "w-0 opacity-0 overflow-hidden"
                } transition-all  ease-in-out`}
              >
                <Sidebar />
              </div>

              <div
                className={`contentRight py-4 ${
                  isSidebarOpen ? "w-[82%] px-5" : "w-full pl-16 pr-6"
                } transition-all  ease-in-out`}
              >
                <AddWeight />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      ),
    },
    {
      path: "/product/addSize",
      exact: true,
      element: (
        <ProtectedRoute>
          <section className="main">
            <Header />
            <div className="contentMain flex ">
              <div
                className={`sidebarWrapper ${
                  isSidebarOpen
                    ? "w-[18%] opacity-100"
                    : "w-0 opacity-0 overflow-hidden"
                } transition-all ease-in-out`}
              >
                <Sidebar />
              </div>

              <div
                className={`contentRight py-4 ${
                  isSidebarOpen ? "w-[82%] px-5" : "w-full pl-16 pr-6"
                } transition-all ease-in-out`}
              >
                <AddSize />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      ),
    },
    {
      path: "/bannerV1/list",
      exact: true,
      element: (
        <ProtectedRoute>
          <section className="main">
            <Header />
            <div className="contentMain flex ">
              <div
                className={`sidebarWrapper ${
                  isSidebarOpen
                    ? "w-[18%] opacity-100"
                    : "w-0 opacity-0 overflow-hidden"
                } transition-all ease-in-out`}
              >
                <Sidebar />
              </div>

              <div
                className={`contentRight py-4 ${
                  isSidebarOpen ? "w-[82%] px-5" : "w-full pl-16 pr-6"
                } transition-all ease-in-out`}
              >
                <BannerV1List />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      ),
    },
    {
      path: "/bannerList2/List",
      exact: true,
      element: (
        <ProtectedRoute>
          <section className="main">
            <Header />
            <div className="contentMain flex ">
              <div
                className={`sidebarWrapper ${
                  isSidebarOpen
                    ? "w-[18%] opacity-100"
                    : "w-0 opacity-0 overflow-hidden"
                } transition-all ease-in-out`}
              >
                <Sidebar />
              </div>

              <div
                className={`contentRight py-4 ${
                  isSidebarOpen ? "w-[82%] px-5" : "w-full pl-16 pr-6"
                } transition-all  ease-in-out`}
              >
                <BannerList2 />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      ),
    },
    {
      path: "/catBanner/List",
      exact: true,
      element: (
        <ProtectedRoute>
          <section className="main">
            <Header />
            <div className="contentMain flex ">
              <div
                className={`sidebarWrapper ${
                  isSidebarOpen
                    ? "w-[18%] opacity-100"
                    : "w-0 opacity-0 overflow-hidden"
                } transition-all ease-in-out`}
              >
                <Sidebar />
              </div>

              <div
                className={`contentRight py-4 ${
                  isSidebarOpen ? "w-[82%] px-5" : "w-full pl-16 pr-6"
                } transition-all  ease-in-out`}
              >
                <CatBanner />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      ),
    },
    {
      path: "/blog/list",
      exact: true,
      element: (
        <ProtectedRoute>
          <section className="main">
            <Header />
            <div className="contentMain flex ">
              <div
                className={`sidebarWrapper ${
                  isSidebarOpen
                    ? "w-[18%] opacity-100"
                    : "w-0 opacity-0 overflow-hidden"
                } transition-all  ease-in-out`}
              >
                <Sidebar />
              </div>

              <div
                className={`contentRight py-4 ${
                  isSidebarOpen ? "w-[82%] px-5" : "w-full pl-16 pr-6"
                } transition-all ease-in-out`}
              >
                <BlogList />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      ),
    },
  ]);
  //53 min  video no 42

  const handleLogout = (
    message = "Session expired or invalid. Please login again."
  ) => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    openAlertBox("error", message);
    console.log("hello");

    setIsLogin(false);
    window.location.href = "/login"; // ✅ Works outside router context
    openAlertBox("error", message);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      setIsLogin(true);

      fetchDataFromApi(`/api/user/user-details`)
        .then((res) => {
          // Handle API failures (no response)
          if (!res) {
            handleLogout("Unable to fetch user details, please login again.");
            return;
          }

          // Handle backend invalid/expired token response
          // Adjust this condition based on your API's exact response structure
          // (e.g., if it's res.response?.data?.error or similar; test with your backend)
          if (
            res.error === true ||
            (res.response?.data?.error === true &&
              (res.message?.includes("Invalid") ||
                res.message?.includes("expired") ||
                res.response?.data?.message?.includes("not login") ||
                res.response?.data?.message?.includes("Unauthorized")))
          ) {
            handleLogout(
              res.message ||
                res.response?.data?.message ||
                "Your session is closed, Please login again."
            );
            return;
          }

          // If successful response
          if (res.success === true || res.data) {
            setUserData(res.data || res);
          } else {
            // Any other unexpected response: treat as invalid
            handleLogout("Invalid session. Please login again.");
          }
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
          // Catch network errors or other failures as invalid session
          handleLogout("Session expired or invalid. Please login again.");
        });
    } else {
      setIsLogin(false);
      openAlertBox("error", "Login Again");
      console.log("No token found in localStorage.");
      // window.location.href="/login"
    }
  }, []); // ✅ Changed: Empty array to run once on mount, avoid loops
  useEffect(() => {
    fetchDataFromApi("/api/category").then((res) => {
      console.log(res?.data);
      setCatData(res?.data);
    });
  }, []);
  useEffect(() => {
    getCat();
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getCat = () => {
    fetchDataFromApi("/api/category").then((res) => {
      console.log(res?.data);
      setCatData(res?.data);
    });
  };
  // useEffect(() => {
  //   const token = localStorage.getItem("accessToken");

  //   if (token) {
  //     setIsLogin(true);

  //     fetchDataFromApi(`/api/user/user-details`)
  //       .then((res) => {
  //         // Handle API failures (no response)
  //         if (!res) {
  //           handleLogout("Unable to fetch user details, please login again.");
  //           return;
  //         }

  //         // Handle backend invalid/expired token response
  //         // Adjust this condition based on your API's exact response structure
  //         // (e.g., if it's res.response?.data?.error or similar; test with your backend)
  //         if (
  //           res.error === true ||
  //           (res.response?.data?.error === true &&
  //             (res.message?.includes("Invalid") ||
  //               res.message?.includes("expired") ||
  //               res.response?.data?.message?.includes("not login") ||
  //               res.response?.data?.message?.includes("Unauthorized")))
  //         ) {
  //           handleLogout(
  //             res.message ||
  //               res.response?.data?.message ||
  //               "Your session is closed, Please login again."
  //           );
  //           return;
  //         }

  //         // If successful response
  //         if (res.success === true || res.data) {
  //           setUserData(res.data || res);
  //         } else {
  //           // Any other unexpected response: treat as invalid
  //           handleLogout("Invalid session. Please login again.");
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching user details:", error);
  //         // Catch network errors or other failures as invalid session
  //         handleLogout("Session expired or invalid. Please login again.");
  //       });
  //   } else {
  //     setIsLogin(false);
  //     console.log("No token found in localStorage.");
  //   }
  // }, []); // Empty dependency array: runs once on mount

  const values = {
    setIsSidebarOpen,
    isOpenFullScreenPanel,
    setIsOpenFullScreenPanel,
    isSidebarOpen,
    isLogin,
    setIsLogin,
    openAlertBox,
    setUserData,
    userData,
    setAddress,
    address,
    catData,
    setCatData,
    getCat,
    windowWidth,
    setSidebarWidth,
    sidebarWidth,
    // setWindowWidth
  };
  return (
    <>
      <MyContext.Provider value={values}>
        <RouterProvider router={router} />

        <Toaster />
      </MyContext.Provider>
    </>
  );
};

export default App;
export { MyContext };

/**
 * useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token !== undefined && token !== null && token !== "") {
      setIsLogin(true);

      fetchDataFromApi(`/api/user/user-details`).then((response) => {
        console.log("res is ",response.message.Unauthorized);
        setUserData(response.data)
        
    //     if (res?.response?.data?.error === true) {
    // if (res?.response?.data?.message === "Invalid or expired token, please login again.") {
    //   localStorage.removeItem("accessToken");
    //   localStorage.removeItem("refreshToken");
    //   openAlertBox("error", "Your session is closed, Please login again");
    //   setIsLogin(false);
  //   }
  // }
      });
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);
 */

/**----------------------------------------------------- */
/**
 * 
        <Dialog
          fullScreen
          open={isOpenFullScreenPanel.open}
          onClose={() =>
            setIsOpenFullScreenPanel({
              open: false,
            })
          }
          slots={{
            transition: Transition,
          }}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() =>
                  setIsOpenFullScreenPanel({
                    open: false,
                  })
                }
                aria-label="close"
              >
                <IoMdClose className="text-black" />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                {isOpenFullScreenPanel?.model}
              </Typography>
              <Button
                autoFocus
                color="inherit"
                onClick={() =>
                  setIsOpenFullScreenPanel({
                    open: false,
                  })
                }
              >
                save
              </Button>
            </Toolbar>
          </AppBar>
          {/* {isOpenFullScreenPanel?.model === "Add Product" && <AddProduct />}
          {isOpenFullScreenPanel.model === "Add Product" && <AddProduct />}

          {isOpenFullScreenPanel?.model === "Add Home Slide" && (
            <AddHomeSlide />
          )}
          {isOpenFullScreenPanel?.model === "Add New Category" && (
            <AddCategory />
          )}
          {isOpenFullScreenPanel?.model === "Add New Sub Category" && (
            <AddSubCategory />
          )}
          {isOpenFullScreenPanel?.model === "Add New Address" && <AddAddress />}
          {isOpenFullScreenPanel?.model === "Edit Category" && (
            <EditCategory />
          )} */
// </Dialog>