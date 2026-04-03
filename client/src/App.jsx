// import React, { createContext, useEffect, useState } from "react";

// import Header from "./components/Header";
// import { Link, Route, Routes, useNavigate } from "react-router-dom";
// import Home from "./Pages/Home";
// import "./index.css";
// import Drawer from "@mui/material/Drawer";
// import toast, { Toaster } from "react-hot-toast";
// import ProductListing from "./Pages/Home/ProductListing";
// import Footer from "./components/Footer";
// import ProductDetails from "./Pages/ProductDetails";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import Slide from "@mui/material/Slide";
// import ProductZoom from "./components/ProductZoom";
// import { IoCloseSharp } from "react-icons/io5";
// import ProductDetailsComponent from "./components/ProductDetails";
// import Login from "./Pages/Login";
// import Register from "./Pages/Register";
// import CartPanel from "./components/CartPanel";
// import CartPage from "./Pages/Cart";
// import Verify from "./Pages/Verify";
// import ForgotPassword from "./Pages/ForgotPassword";
// import Checkout from "./Pages/Checkout";
// import MyAccount from "./Pages/MyAccount";
// import MyList from "./Pages/MyList";
// import Orders from "./Pages/Orders";
// import { fetchDataFromApi } from "../src/utils/api.js";

// const myContext = createContext();
// // const Transition = React.forwardRef(function Transition(props, ref) {
// //   return <Slide direction="up" ref={ref} {...props} />;
// // });
// const App = () => {
//   const [maxWidth, setMaxWidth] = React.useState("xl");
//   const [fullWidth, setFullWidth] = React.useState(true);
//   const [openProductDetailModal, setOpenProductDetailModal] = useState(false);
//   const [isLogin, setIsLogin] = useState(false);
//   const [userData, setUserData] = useState({});
//   // const apiUrl=import.meta.env.VITE_API_URL
// const history=useNavigate();
// //   useEffect(() => {
// //     const token = localStorage.getItem("accessToken");
// //     console.log("token",token);

// //     if (token !== undefined && token !== null && token !== "") {
// //       setIsLogin(true);

// //     //   fetchDataFromApi(`/api/user/user-details`).then((res) => {

// //     //     setUserData(res?.data || res);

// //     //     console.log(res?.response?.data);
// //     //     console.log("jasmeen");

// //     //  console.log(res?.response?.data?.error);

// //     //   });

// //     fetchDataFromApi(`/api/user/user-details`).then((res) => {
// //   setUserData(res.data);
// //   // console.log("data is ", res);
// //   if (res?.response?.data?.error === true) {
// //     if (res?.response?.data?.message === "You have not login") {
// //       localStorage.removeItem("accessToken");
// //       localStorage.removeItem("refreshToken");
// //       openAlertBox("error", "Your session is closed, Please login again");
// //       setIsLogin(false);
// //     }
// //   }
// // });

// //     } else {
// //       setIsLogin(false);
// //     }
// //   }, [isLogin]);
// const handleLogout=()=>
// {
// history("/login")
// }
// useEffect(() => {
//     const token = localStorage.getItem("accessToken");
// if(isLogin===false){
//   console.log("false");

// }
//     if (token) {
//       setIsLogin(true);

//       fetchDataFromApi(`/api/user/user-details`)
//         .then((res) => {
//           // Handle API failures
//           if (!res) {
//             handleLogout("Unable to fetch user details, please login again.");
//             return;
//           }

//           // Handle backend invalid token response
//           if (res.error === true && res.message?.includes("Invalid or expired")) {
//             handleLogout(res.message);
//             return;
//           }

//           // If successful
//           if (res.success === true || res.data) {
//             setUserData(res.data || res);
//           }
//         })
//         .catch((error) => {
//           console.error("Error fetching user details:", error);
//           handleLogout("Session expired or invalid. Please login again.");
//         });
//     } else {
//       setIsLogin(false);
//       console.log("hello");

//     }
//   }, []);
//   const handleClickOpenProductDetailModal = () => {
//     setOpenProductDetailModal(true);
//   };

//   const handleCloseProductDetailModal = () => {
//     setOpenProductDetailModal(false);
//   };

//   const [openCartPanel, setOpenCartPanel] = useState(false);

//   const toggleCartPanel = (newOpen) => () => {
//     setOpenCartPanel(newOpen);
//   };

//   const openAlertBox = (type, msg) => {
//     if (type === "success") {
//       toast.success(msg);
//     }
//     if (type === "error") {
//       toast.error(msg);
//     }
//   };
//   const values = {
//     setOpenProductDetailModal,
//     setOpenCartPanel,
//     openCartPanel,
//     toggleCartPanel,
//     openAlertBox,
//     isLogin,
//     setIsLogin,
//      userData,
//     setUserData,

//   };
//   return (
//     <>
//       <myContext.Provider value={values}>
//         <Header />
//         <Routes>
//           <Route path={"/"} element={<Home />} />
//           <Route path={"/product-listing"} element={<ProductListing />} />
//           <Route path={"/login"} element={<Login />} />
//           <Route path={"/register"} element={<Register />} />
//           <Route path={"/product-details/:id"} element={<ProductDetails />} />
//           <Route path={"/cart"} element={<CartPage />} />
//           <Route path={"/verify"} element={<Verify />} />
//           <Route path={"/checkout"} element={<Checkout />} />
//           <Route path={"/forgot-password"} element={<ForgotPassword />} />
//           <Route path={"/my-account"} element={<MyAccount />} />
//           <Route path={"/my-list"} element={<MyList />} />
//           <Route path={"/my-orders"} element={<Orders />} />
//         </Routes>

//         <Footer />
//       </myContext.Provider>

//       <Dialog
//         open={openProductDetailModal}
//         // TransitionComponent={Transition}
//         keepMounted
//         fullWidth={fullWidth}
//         maxWidth={maxWidth}
//         className="productDetailsModal"
//         onClose={handleCloseProductDetailModal}
//         aria-labelledby="alert-dialog-slide-title"
//         aria-describedby="alert-dialog-slide-description"
//       >
//         <DialogContent>
//           <div className="flex !pl-0 items-center gap-4 productDetailsModalContainer relative w-full">
//             <Button
//               onClick={handleCloseProductDetailModal}
//               className="!border-3 !border-[#ff5252] !bg-[#fad9d9] !h-[40px] !min-w-[40px] !text-[#ff5252] !absolute !top-[15px] !right-[15px] !rounded-full !w-[40px]"
//             >
//               <IoCloseSharp className="text-[40px]" />
//             </Button>
//             <div className="col1 !pl-0 flex items-start w-[40%]">
//               <ProductZoom />
//             </div>
//             <div className="col2 w-[60%]">
//               <ProductDetailsComponent />
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>

//       <Toaster />
//       {/* cart Panel  */}
//     </>
//   );
// };

// export default App;
// export { myContext };
import React, { createContext, useEffect, useState } from "react";

import Header from "./components/Header";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Pages/Home/index.jsx";
import "./index.css";
import "./App.css";
import "./responsive.css";
import Drawer from "@mui/material/Drawer";
import toast, { Toaster } from "react-hot-toast";
import ProductListing from "./Pages/Home/ProductListing";
import Footer from "./components/Footer";
import ProductDetails from "./Pages/ProductDetails";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import ProductZoom from "./components/ProductZoom";
import { IoCloseSharp } from "react-icons/io5";
import ProductDetailsComponent from "./components/ProductDetails";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import CartPanel from "./components/CartPanel";
import CartPage from "./Pages/Cart";
import Verify from "./Pages/Verify";
import ForgotPassword from "./Pages/ForgotPassword";
import Checkout from "./Pages/Checkout";
import MyAccount from "./Pages/MyAccount";
import MyList from "./Pages/MyList";
import Orders from "./Pages/Orders";
import { fetchDataFromApi, postData } from "../src/utils/api.js";
import Address from "./Pages/MyAccount/address.jsx";
import Success from "./Pages/Orders/success.jsx";
import OrderSuccess from "./Pages/Orders/success.jsx";
import OrderFailed from "./Pages/Orders/failure.jsx";
import SearchPage from "./Pages/Search/index.jsx";
import OrdersStatus from "./Pages/OrderStatus/index.jsx";
import BlogDetail from "./Pages/BlogDetail/index.jsx";
import BlogItem from "./components/BlogItem/index.jsx";
import BlogList from "./Pages/BlogDetail/BlogList.jsx";

const myContext = createContext();
// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });
const App = () => {
  const [maxWidth, setMaxWidth] = React.useState("xl");
  const [fullWidth, setFullWidth] = React.useState(true);
  const [openProductDetailModal, setOpenProductDetailModal] = useState({
    open: false,
    item: {},
  });
  const [addressMode, setAddressMode] = useState("add");
  const [products, setProducts] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState({});
  const [catData, setCatData] = useState([]);
  const [cartData, setCartdata] = useState([]);
  const [myListData, setMyListdata] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [addressId, setAddressId] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [openFilter, setOpenFilter] = useState(false);
  const [isFilterBtnShow, setIsFilterBtnShow] = useState(false);
  const [openSearchPanel, setOpenSearchPanel] = useState(false);
  // const apiUrl=import.meta.env.VITE_API_URL
  const history = useNavigate();

  const handleLogout = (
    message = "Session expired or invalid. Please login again."
  ) => {
    // Clear tokens from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // Show alert
    openAlertBox("error", message);

    // Set login state
    setIsLogin(false);

    // Redirect to login
    history("/login");
  };
const editCart = (obj) => {
  editData(`/api/cart/update-qty`, obj).then(() => getCartItems());
};

const removeCartItem = (id) => {
  deleteData(`/api/cart/delete-cart-item/${id}`).then(() => getCartItems());
};

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      setIsLogin(true);

      // fetchDataFromApi(`/api/user/user-details`)
      //   .then((res) => {
      //     // Handle API failures (no response)
      //     if (!res) {
      //       handleLogout("Unable to fetch user details, please login again.");
      //       return;
      //     }

      //     // Handle backend invalid/expired token response
      //     // Adjust this condition based on your API's exact response structure
      //     // (e.g., if it's res.response?.data?.error or similar; test with your backend)
      //     if (
      //       res.error === true ||
      //       (res.response?.data?.error === true &&
      //         (res.message?.includes("Invalid") ||
      //           res.message?.includes("expired") ||
      //           res.response?.data?.message?.includes("not login") ||
      //           res.response?.data?.message?.includes("Unauthorized")))
      //     ) {
      //       handleLogout(
      //         res.message ||
      //           res.response?.data?.message ||
      //           "Your session is closed, Please login again."
      //       );
      //       return;
      //     }

      //     // If successful response
      //     if (res.success === true || res.data) {
      //       setUserData(res.data || res);
      //     } else {
      //       // Any other unexpected response: treat as invalid
      //       handleLogout("Invalid session. Please login again.");
      //     }
      //   })
      //   .catch((error) => {
      //     console.error("Error fetching user details:", error);
      //     // Catch network errors or other failures as invalid session
      //     handleLogout("Session expired or invalid. Please login again.");
      //   });

      getCartItems();
      getMyListData();
      getUserDetails();
    } else {
      setIsLogin(false);
      console.log("No token found in localStorage.");
      openAlertBox("error", "Login Again , No token Found in Local Storage");
    }
  }, [isLogin]); // Empty dependency array: runs once on mount

  const getUserDetails = () => {
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
  };

  const handleClickOpenProductDetailModal = (status, item) => {
    setOpenProductDetailModal({
      open: status,
      item: item,
    });
  };

  const handleCloseProductDetailModal = () => {
    // alert(status)
    setOpenProductDetailModal({
      open: false,
      item: {},
    });
  };

  const [openCartPanel, setOpenCartPanel] = useState(false);
  const [openAddressPanel, setOpenAddressPanel] = useState(false);

  const toggleCartPanel = (newOpen) => () => {
    setOpenCartPanel(newOpen);
  };
  const toggleAddressPanel = (newOpen) => () => {
    if (newOpen === false) {
      setAddressMode("add");
    }
    setOpenAddressPanel(newOpen);
  };

  const openAlertBox = (type, msg) => {
    if (type === "success") {
      toast.success(msg);
    }
    if (type === "error") {
      toast.error(msg);
    }
  };
  useEffect(() => {
    fetchDataFromApi("/api/category").then((res) => {
      console.log("res is ", res);
      if (res?.error === false) {
        setCatData(res?.data);
setIsCatLoading(false);

      }
    });
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const addToCart = (product, userId, quantity) => {
    if (userId === undefined) {
      openAlertBox("error", "Please login first ");
      return false;
    }
    console.log(product, userId);
    // console.log(userData);
    const data = {
      // _id:product?._id,
      productTitle: product?.name,
      image: product?.image,
      rating: product?.rating,
      price: product?.price, //see if error
      oldPrice: product?.oldPrice,

      quantity: quantity,
      subTotal: parseInt(product?.price * quantity),
      productId: product?._id,
      countInStock: product?.countInStock,

      userId: userId,
      brand: product?.brand,
      discount: product?.discount,
      size: product?.size,
      weight: product?.weight,
      ram: product?.ram,
    };
    console.log("data", data);

    postData("/api/cart/add", data).then((res) => {
      if (res?.error === false) {
        openAlertBox("success", res?.message);
        getCartItems();
      } else {
        openAlertBox("error", res?.message);
      }
    });
  };

  const getCartItems = () => {
    fetchDataFromApi(`/api/cart/get`).then((res) => {
      if (res?.error === false) {
        setCartdata(res?.data);
      }
    });
  };
  const getMyListData = () => {
    fetchDataFromApi(`/api/myList`).then((res) => {
      if (res?.error === false) {
        setMyListdata(res?.data);
      }
    });
  };
  const getProducts = async () => {
    const res = await fetchDataFromApi("/api/product/getAllProducts");
    setProducts(res.products); // or however your structure is
  };

  const [isCatLoading, setIsCatLoading] = useState(true);

  const values = {
    isCatLoading,
    setIsCatLoading,
    products,
    setProducts,
    getProducts,
    openProductDetailModal,
    setOpenProductDetailModal,
    handleClickOpenProductDetailModal,
    maxWidth,
    editCart,
    removeCartItem,
    fullWidth,
    handleCloseProductDetailModal,
    setOpenCartPanel,
    openCartPanel,
    toggleCartPanel,
    openAddressPanel,
    setOpenAddressPanel,
    toggleAddressPanel,
    openAlertBox,
    isLogin,
    setIsLogin,
    userData,
    setUserData,
    setCatData,
    catData,
    addToCart,
    cartData,
    setCartdata,
    getCartItems,
    getMyListData,
    setMyListdata,
    myListData,
    getUserDetails,
    addressMode,
    setAddressMode,
    addressId,
    setAddressId,
    searchData,
    setSearchData,
    windowWidth,
    openFilter,
    setOpenFilter,
    setIsFilterBtnShow,
    isFilterBtnShow,
    openSearchPanel,
    setOpenSearchPanel,
  };
  return (
    <>
      <myContext.Provider value={values}>
        <Header />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path="/product-listing" element={<ProductListing />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/product-details/:id"} element={<ProductDetails />} />
          <Route path={"/cart"} element={<CartPage />} />
          <Route path={"/verify"} element={<Verify />} />
          <Route path={"/checkout"} element={<Checkout />} />
          <Route path={"/forgot-password"} element={<ForgotPassword />} />
          <Route path={"/my-account"} element={<MyAccount />} />
          <Route path={"/my-list"} element={<MyList />} />
          <Route path={"/my-orders"} element={<Orders />} />
          <Route path={"/address"} element={<Address />} />
          <Route path={"/order/success"} element={<OrderSuccess />} />
          <Route path={"/order/failed"} element={<OrderFailed />} />
          <Route path={"/search"} element={<SearchPage />} />
          <Route path={"/order-status"} element={<OrdersStatus />} />
          <Route path="/blogs" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        </Routes>

        <Footer />
      </myContext.Provider>

      <Toaster />
      {/* cart Panel  */}
    </>
  );
};

export default App;
export { myContext };
