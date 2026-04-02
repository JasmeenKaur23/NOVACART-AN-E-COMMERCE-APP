// import React, { useState } from "react";
// import Breadcrumbs from "@mui/material/Breadcrumbs";
// import { Link } from "react-router-dom";
// import ProductZoom from "../../components/ProductZoom";
// import Rating from "@mui/material/Rating";
// import Button from "@mui/material/Button";
// import QtyBox from "../../components/QtyBox";
// import { MdOutlineShoppingCart } from "react-icons/md";
// import { FaRegHeart } from "react-icons/fa6";
// import { IoGitCompareOutline } from "react-icons/io5";
// import Box from '@mui/material/Box';

// import ProductDetailsComponent from "../../components/ProductDetails"
// import ProductSlider from "../../components/ProductSlider";

// const ProductDetails = () => {

//   const [activeTab, setActiveTab] = useState(0);
//   return (
//     <>
//       <div className="py-4">
//         <div
//           className="container-fluid 
//            !pl-8"
//         >
//           <Breadcrumbs aria-label="breadcrumb">
//             <Link
//               underline="hover"
//               className="link text-[16px] transition"
//               color="inherit"
//               to="/"
//             >
//               Home
//             </Link>
//             <Link
//               to="/product-listing"
//               underline="hover"
//               color="inherit"
//               className="link transition text-[16px]"
//             >
//               Fashion
//             </Link>

//             <Link
//               underline="hover"
//               color="inherit"
//               to="/product-details/d766"
//               className="link transition text-[16px]"
//             >
//               Cropped Satin Jacket
//             </Link>
//           </Breadcrumbs>
//         </div>
//       </div>

//       <section className="bg-white py-2">
//         {" "}
//         <div className="container-fluid items-center flex gap-1">
//           <div className="productZoomContainer w-[40%] ">
//             <ProductZoom />
//           </div>
          
//           <div className="productContent  py-5 px-2 w-[60%]  ">
//         <ProductDetailsComponent />
//           </div>
//         </div>
//         <div className="container pt-10">
//           <div className="flex items-center mb-5 gap-8">
//             <span
//               onClick={() => setActiveTab(0)}
//               className={`link text-[18px] cursor-pointer font-[500] ${
//                 activeTab === 0 && "!text-primary"
//               }`}
//             >
//               Description
//             </span>
//             <span
//               onClick={() => setActiveTab(1)}
//               className={`link p-2  text-[18px] cursor-pointer font-[500] ${
//                 activeTab === 1 && "!text-primary  !border-3   !border-primary"
//               }`}
//             >
//               Product Details
//             </span>
//             <span
//               onClick={() => setActiveTab(2)}
//               className={`link text-[18px] cursor-pointer font-[500] ${
//                 activeTab === 2 && "!text-primary"
//               }`}
//             >
//               Reviews (8)
//             </span>
//           </div>

//           {activeTab === 0 && (
//             <div className="shadow-md  w-full py-5 px-8 rounded-md ">
//               <p>
//                 Lorem Ipsum is loremimply dummy text of the printing and typesetting
//                 industry. Lorem Ipsum has been the industry's standard dummy
//                 text ever since the 1500s, when an unknown printer took a galley
//                 of type and scrambled it to make a type specimen book.ac
//               </p>
//               <h4>LightWeight Design </h4>
//               <p>
//                 Designed with a super light geometric case, the Versa family
//                 watches are slim, casual and comfortable enough to wear all day
//                 and night. Switch up your look with classic, leather, metal and
//                 woven accessory bands. Ut elit tellus, luctus nec ullamcorper
//                 mattis, pulvinar dapibus leo.
//               </p>
//               <h4>Free Shipping & Return</h4>
//               <p>
//                 We offer free shipping for products on orders above 50$ and
//                 offer free delivery for all orders in US.
//               </p>

//               <h4>Money Back Guarantee</h4>
//               <p>
//                 We guarantee our products and you could get back all of your
//                 money anytime you want in 30 days.
//               </p>
//               <h4>Online Support</h4>
//               <p>
//                 You will get 24 hour support with this purchase product and you
//                 can return it within 30 days for an exchange.
//               </p>
//             </div>
//           )}

//           {activeTab === 1 && (
//             <div className="shadow-md  w-full py-5 px-8 rounded-md ">
//               <table className="w-full border border-gray-300 rounded-md overflow-hidden text-left">
//                 <thead className="bg-gray-100 text-gray-800 font-semibold">
//                   <tr>
//                     <th className="border px-5 py-3 w-[40%]">Specification</th>
//                     <th className="border px-5 py-3">Details</th>
//                   </tr>
//                 </thead>
//                 <tbody className="text-gray-700">
//                   <tr className="hover:bg-gray-50">
//                     <td className="border font-[500] px-5 py-3">Stand Up</td>
//                     <td className="border  font-[500] px-5 py-3">
//                       35″L x 24″W x 37-45″H (front to back wheel)
//                     </td>
//                   </tr>
//                   <tr className="hover:bg-gray-50">
//                     <td className="border  font-[500] px-5 py-3">
//                       Folded (w/o wheels)
//                     </td>
//                     <td className="border  font-[500] px-5 py-3">
//                       32.5″L x 18.5″W x 16.5″H
//                     </td>
//                   </tr>
//                   <tr className="hover:bg-gray-50">
//                     <td className="border  font-[500] px-5 py-3">
//                       Folded (w/ wheels)
//                     </td>
//                     <td className="border  font-[500] px-5 py-3">
//                       32.5″L x 24″W x 18.5″H
//                     </td>
//                   </tr>
//                   <tr className="hover:bg-gray-50">
//                     <td className="border  font-[500] px-5 py-3">
//                       Door Pass Through
//                     </td>
//                     <td className="border  font-[500] px-5 py-3">24″</td>
//                   </tr>
//                   <tr className="hover:bg-gray-50">
//                     <td className="border  font-[500] px-5 py-3">Frame</td>
//                     <td className="border font-[500]  px-5 py-3">Aluminum</td>
//                   </tr>
//                   <tr className="hover:bg-gray-50">
//                     <td className="border  font-[500] px-5 py-3">
//                       Weight (w/o wheels)
//                     </td>
//                     <td className="border  font-[500] px-5 py-3">20 LBS</td>
//                   </tr>
//                   <tr className="hover:bg-gray-50">
//                     <td className="border  font-[500] px-5 py-3">
//                       Weight Capacity
//                     </td>
//                     <td className="border  font-[500] px-5 py-3">60 LBS</td>
//                   </tr>
//                   <tr className="hover:bg-gray-50">
//                     <td className="border  font-[500] px-5 py-3">Width</td>
//                     <td className="border  font-[500] px-5 py-3">24″</td>
//                   </tr>
//                   <tr className="hover:bg-gray-50">
//                     <td className="border  font-[500] px-5 py-3">
//                       Handle Height (ground to handle)
//                     </td>
//                     <td className="border  font-[500] px-5 py-3">37–45″</td>
//                   </tr>
//                   <tr className="hover:bg-gray-50">
//                     <td className="border  font-[500] px-5 py-3">Wheels</td>
//                     <td className="border  font-[500] px-5 py-3">
//                       12″ air / wide track slick tread
//                     </td>
//                   </tr>
//                   <tr className="hover:bg-gray-50">
//                     <td className="border  font-[500] px-5 py-3">
//                       Seat Back Height
//                     </td>
//                     <td className="border  font-[500] px-5 py-3">21.5″</td>
//                   </tr>
//                   <tr className="hover:bg-gray-50">
//                     <td className="border  font-[500] px-5 py-3">
//                       Head Room (inside canopy)
//                     </td>
//                     <td className="border  font-[500] px-5 py-3">25″</td>
//                   </tr>
//                   <tr className="hover:bg-gray-50">
//                     <td className="border  font-[500] px-5 py-3">Color</td>
//                     <td className="border  font-[500] px-5 py-3">
//                       Black, Blue, Red, White
//                     </td>
//                   </tr>
//                   <tr className="hover:bg-gray-50">
//                     <td className="border  font-[500] px-5 py-3">Size</td>
//                     <td className="border  font-[500] px-5 py-3">M, S</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {activeTab === 2 && (
//             <>
//               <div className="shadow-md  w-[80%] py-5 px-8 rounded-md ">
//                 <div className=" productReviewsContainer w-full">
//                   <h2 className="text-[23px]">Customer Questions & Answers</h2>
//                   <div className="w-full max-h-[300px] overflow-y-scroll overflow-x-hidden mt-5 pr-5 reviewscroll">
//                     <div className="review pt-5 pb-5 border-b border-[rgba(0,0,0,0.2)] w-full flex items-center justify-between">
//                       <div className="info w-[60%] flex items-center gap-3">
//                         <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
//                           <img
//                             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYNBu3pJM_X6NstQGuGpZX8Ud0sw03uLMZmKmI9fZWsl9c9joDg-2rtuyT5yNzLX6NTXI&usqp=CAU"
//                             className="w-full"
//                             alt=""
//                           />
//                         </div>
//                         <div className="w-[80%]">
//                           <h4 className="text-[16px]">Farhan Saeed</h4>
//                           <h5 className="text-[14px]">2025-12-02</h5>
//                           <p className="mt-0 mb-0">
//                             Nice Product Lorem ipsum dolor, sit amet consectetur
//                             adipisicing elit. Rem, possimus sapiente laborum
//                             laboriosam, cumque velit ipsum dolorum eveniet
//                             neque, dicta voluptatum itaque doloribus magnam
//                             quia.
//                           </p>
//                         </div>
//        </div>
       
//                           <Rating name="size-small" defaultValue={4} className="" readOnly />
               
//                     </div>
//                     <div className="review pt-5 pb-5 border-b border-[rgba(0,0,0,0.2)] w-full flex items-center justify-between">
//                       <div className="info w-[60%] flex items-center gap-3">
//                         <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
//                           <img
//                             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYNBu3pJM_X6NstQGuGpZX8Ud0sw03uLMZmKmI9fZWsl9c9joDg-2rtuyT5yNzLX6NTXI&usqp=CAU"
//                             className="w-full"
//                             alt=""
//                           />
//                         </div>
//                         <div className="w-[80%]">
//                           <h4 className="text-[16px]">Farhan Saeed</h4>
//                           <h5 className="text-[14px]">2025-12-02</h5>
//                           <p className="mt-0 mb-0">
//                             Nice Product Lorem ipsum dolor, sit amet consectetur
//                             adipisicing elit. Rem, possimus sapiente laborum
//                             laboriosam, cumque velit ipsum dolorum eveniet
//                             neque, dicta voluptatum itaque doloribus magnam
//                             quia.
//                           </p>
//                         </div>
//        </div>
       
//                           <Rating name="size-small" defaultValue={4} className="" readOnly />
               
//                     </div>
//                     <div className="review pt-5 pb-5 border-b border-[rgba(0,0,0,0.2)] w-full flex items-center justify-between">
//                       <div className="info w-[60%] flex items-center gap-3">
//                         <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
//                           <img
//                             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYNBu3pJM_X6NstQGuGpZX8Ud0sw03uLMZmKmI9fZWsl9c9joDg-2rtuyT5yNzLX6NTXI&usqp=CAU"
//                             className="w-full"
//                             alt=""
//                           />
//                         </div>
//                         <div className="w-[80%]">
//                           <h4 className="text-[16px]">Farhan Saeed</h4>
//                           <h5 className="text-[14px]">2025-12-02</h5>
//                           <p className="mt-0 mb-0">
//                             Nice Product Lorem ipsum dolor, sit amet consectetur
//                             adipisicing elit. Rem, possimus sapiente laborum
//                             laboriosam, cumque velit ipsum dolorum eveniet
//                             neque, dicta voluptatum itaque doloribus magnam
//                             quia.
//                           </p>
//                         </div>
//        </div>
       
//                           <Rating name="size-small" defaultValue={4} className="" readOnly />
               
//                     </div>
//                     <div className="review pt-5 pb-5 border-b border-[rgba(0,0,0,0.2)] w-full flex items-center justify-between">
//                       <div className="info w-[60%] flex items-center gap-3">
//                         <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
//                           <img
//                             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYNBu3pJM_X6NstQGuGpZX8Ud0sw03uLMZmKmI9fZWsl9c9joDg-2rtuyT5yNzLX6NTXI&usqp=CAU"
//                             className="w-full"
//                             alt=""
//                           />
//                         </div>
//                         <div className="w-[80%]">
//                           <h4 className="text-[16px]">Farhan Saeed</h4>
//                           <h5 className="text-[14px]">2025-12-02</h5>
//                           <p className="mt-0 mb-0">
//                             Nice Product Lorem ipsum dolor, sit amet consectetur
//                             adipisicing elit. Rem, possimus sapiente laborum
//                             laboriosam, cumque velit ipsum dolorum eveniet
//                             neque, dicta voluptatum itaque doloribus magnam
//                             quia.
//                           </p>
//                         </div>
//        </div>
       
//                           <Rating name="size-small" defaultValue={4} className="" readOnly />
               
//                     </div>
//                     <div className="review pt-3 pb-3 border-b border-[rgba(0,0,0,0.2)] w-full flex items-center justify-between">
//                       <div className="info w-[60%] flex items-center gap-3">
//                         <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
//                           <img
//                             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYNBu3pJM_X6NstQGuGpZX8Ud0sw03uLMZmKmI9fZWsl9c9joDg-2rtuyT5yNzLX6NTXI&usqp=CAU"
//                             className="w-full"
//                             alt=""
//                           />
//                         </div>
//                         <div className="w-[80%]">
//                           <h4 className="text-[16px]">Farhan Saeed Butt</h4>
//                           <h5 className="text-[14px]">2025-12-02</h5>
//                           <p className="mt-0 mb-0">
//                             Nice Product Lorem ipsum dolor, sit amet consectetur
//                             adipisicing elit. Rem, possimus sapiente laborum
//                             laboriosam, cumque velit ipsum dolorum eveniet
//                             neque, dicta voluptatum itaque doloribus magnam
//                             quia.
//                           </p>
//                         </div>
//        </div>
       
//                           <Rating name="size-small" defaultValue={4} className="" readOnly />
               
//                     </div>
//                   </div>


//                   <br />

//                   <div className="bg-[#f1f1f1] p-4 rounded-md reviewForm">
//                     <h2 className="text-[18px]">
//                       Add a Review
//                     </h2>
//                     <form className="w-full mt-5" action="">        <TextField
//           id="outlined-multiline-flexible"
//           label="Write A Review"
//           multiline
         
//           className="mb-3 w-full"
//           rows={3}
//           maxRows={4}
//         />
//           <Rating name="size-small" defaultValue={4} className=""  />

//           <div className="flex items-center mt-3">
//             <Button className="btn-org">Submit Review</Button>
//           </div>
               
// </form>
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>

//         <div className="container mt-5">
//           <h4 className="text-[20px] mb-1 font-[600]">Related products</h4>
//           <ProductSlider items={6} />
//         </div>


//       </section>


//     </>
//   );
// };

// export default ProductDetails;


// // import React, { useState } from "react";
// // import Breadcrumbs from "@mui/material/Breadcrumbs";
// // import { Link, useSearchParams, useParams } from "react-router-dom";
// // import ProductZoom from "../../components/ProductZoom";
// // import ProductDetailsComponent from "../../components/ProductDetails";
// // import ProductSlider from "../../components/ProductSlider";

// // const ProductDetails = () => {

// //   const [activeTab, setActiveTab] = useState(0);

// //   // If later you want dynamic category name & product name:
// //   const { productId } = useParams();
// //   const [searchParams] = useSearchParams();
// //   const catId = searchParams.get("catId");

// //   return (
// //     <>
// //       <div className="py-4">
// //         <div className="container-fluid !pl-8">

// //           {/* ✅ Fixed Breadcrumbs */}
// //           <Breadcrumbs aria-label="breadcrumb">
// //             <Link
// //               underline="hover"
// //               className="link text-[16px] transition"
// //               color="inherit"
// //               to="/"
// //             >
// //               Home
// //             </Link>

// //             {/* Category breadcrumb → fixed to product-listing with catId */}
// //             <Link
// //               to={`/product-listing${catId ? `?catId=${catId}` : ""}`}
// //               underline="hover"
// //               color="inherit"
// //               className="link transition text-[16px]"
// //             >
// //               Fashion
// //             </Link>

// //             {/* Product breadcrumb */}
// //             <Link
// //               underline="hover"
// //               color="inherit"
// //               to={`/product-details/${productId}`}
// //               className="link transition text-[16px]"
// //             >
// //               Product Details
// //             </Link>
// //           </Breadcrumbs>

// //         </div>
// //       </div>

// //       <section className="bg-white py-2">
// //         <div className="container-fluid items-center flex gap-1">
// //           <div className="productZoomContainer w-[40%]">
// //             <ProductZoom />
// //           </div>

// //           <div className="productContent py-5 px-2 w-[60%]">
// //             <ProductDetailsComponent />
// //           </div>
// //         </div>

// //         <div className="container pt-10">
// //           {/* Tabs */}
// //           <div className="flex items-center mb-5 gap-8">
// //             <span
// //               onClick={() => setActiveTab(0)}
// //               className={`link text-[18px] cursor-pointer font-[500] ${
// //                 activeTab === 0 && "!text-primary"
// //               }`}
// //             >
// //               Description
// //             </span>

// //             <span
// //               onClick={() => setActiveTab(1)}
// //               className={`link text-[18px] cursor-pointer font-[500] ${
// //                 activeTab === 1 && "!text-primary"
// //               }`}
// //             >
// //               Product Details
// //             </span>

// //             <span
// //               onClick={() => setActiveTab(2)}
// //               className={`link text-[18px] cursor-pointer font-[500] ${
// //                 activeTab === 2 && "!text-primary"
// //               }`}
// //             >
// //               Reviews (8)
// //             </span>
// //           </div>

// //           {/* TAB CONTENT */}
// //           {activeTab === 0 && (
// //             <div className="shadow-md w-full py-5 px-8 rounded-md ">
// //               <p>
// //                 Lorem Ipsum is loremimply dummy text of the printing and typesetting industry...
// //               </p>
// //             </div>
// //           )}

// //           {activeTab === 1 && (
// //             <div className="shadow-md w-full py-5 px-8 rounded-md ">
// //               {/* table content unchanged */}
// //             </div>
// //           )}

// //           {activeTab === 2 && (
// //             <div className="shadow-md w-[80%] py-5 px-8 rounded-md ">
// //               {/* reviews content unchanged */}
// //             </div>
// //           )}
// //         </div>

// //         <div className="container mt-5">
// //           <h4 className="text-[20px] mb-1 font-[600]">Related products</h4>
// //           <ProductSlider items={6} />
// //         </div>

// //       </section>
// //     </>
// //   );
// // };

// // export default ProductDetails;


import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";

import TextField from "@mui/material/TextField";
import { myContext } from "../../App";
import { fetchDataFromApi, postData } from "../../utils/api";

const Reviews = (props) => {
  const [reviews, setReviews] = useState({
    image: "",
    userName: "",
    review: "",
    rating: 1,
    userId: "",
    productId: "",
  });
  const context = useContext(myContext);
  const [reviewsData, setReviewsData] = useState([]);
  useEffect(() => {
    console.log("context data", context?.userData);
    console.log(props?.productId);

    setReviews(() => ({
      ...reviews,
  image: context?.userData?.avatar || "/profile.jpg",

      userName: context?.userData?.name,
      userId: context?.userData?._id,
      productId: props?.productId,
    }));

    getReview()
  }, [context?.userData, props]);

  const onChangeInput = (e) => {
    setReviews(() => ({
      ...reviews,
      review: e.target.value,
    }));
  };

  const addReview = (e) => {
    e.preventDefault();
    console.log(reviews);

    if(reviews?.review !==""){
  postData("/api/user/addReview", reviews).then((res) => {
      if (res?.error === false) {
        context?.openAlertBox("success", res?.message);
         setReviews(() => ({
      ...reviews,
      review: "",
      rating: 1,
    }));

     getReview();
      }else{
  context?.openAlertBox("error", "You have not Login ");
     
      }
    });
   
    }else{
        context?.openAlertBox("error", "Please add review");
    }
      
    

  

   
  };
  const getReview = () => {
    fetchDataFromApi(`/api/user/getReviews?productId=${props?.productId}`).then(
      (res) => {
        if (res?.error === false) {
          setReviewsData(res?.reviews);
        }
      }
    );
  };
  return (
    <>
      <div className=" productReviewsContainer w-full">
        <h2 className="text-[23px]">Customer Questions & Answers</h2>
        {reviewsData?.length !== 0 && (
          <div className="w-full max-h-[300px] overflow-y-scroll overflow-x-hidden mt-5 pr-5 reviewscroll">
        {
          reviewsData?.map((review,index)=>
          {
return (    <div className="review pt-5 pb-5 border-b border-[rgba(0,0,0,0.2)] w-full flex items-center justify-between">
              <div className="info w-[60%] flex items-center gap-3">
                <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                  <img
                    src={review?.image}    className="w-full"
                    alt=""
                  />
                </div>
                <div className="w-[80%]">
                  <h4 className="text-[16px]">{review?.userName}</h4>
                  <h5 className="text-[14px]">{review?.createdAt?.split("T")[0]}</h5>
                  <p className="mt-0 mb-0">
                  {review?.review}
                  </p>
                </div>
              </div>

              <Rating
                name="size-small"
                defaultValue={1}
                className=""
                readOnly
                value={review.rating}
              />
            </div>
         )
          })
        }
        
        
          </div>
        )}

        <br />

        <div className="bg-[#f1f1f1] p-4 rounded-md reviewForm">
          <h2 className="text-[18px]">Add a Review</h2>
          <form onSubmit={addReview} className="w-full mt-5" action="">
            {" "}
            <TextField
              id="outlined-multiline-flexible"
              label="Write A Review"
              multiline
              onChange={onChangeInput}
              className="mb-3 w-full"
              rows={3}
              name="review"
              maxRows={4}
              value={reviews?.review}
            />
            <Rating
              name="size-small"
              defaultValue={1}
              value={reviews.rating}
              onChange={(event, newValue) => {
                console.log(newValue);

                setReviews(() => ({
                  ...reviews,
                  rating: newValue,
                }));
              }}
            />
            <div className="flex items-center mt-3">
              <Button type="submit" className="btn-org">
                Submit Review
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Reviews;
