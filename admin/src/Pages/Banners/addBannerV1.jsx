// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";
// import React, { useContext, useState } from "react";
// import { MyContext } from "../../App.jsx";
// import { deleteImages, postData } from "../../utils/api.js";
// import UploadBox from "../../Components/UploadBox/index.jsx";
// import { useNavigate } from "react-router-dom";
// import CircularProgress from "@mui/material/CircularProgress";
// import { FaCloudUploadAlt } from "react-icons/fa";
// import Button from "@mui/material/Button";
// import { IoMdClose } from "react-icons/io";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import "react-lazy-load-image-component/src/effects/blur.css";

// const AddBannerV1 = () => {
//   const [productCat, setProductCat] = useState("");
//   const [productSubCat, setProductSubCat] = useState("");
//   const [alignInfo, setAlignInfo] = useState("");
//   const [productThirdLevelCat, setProductThirdLevelCat] = useState("");
//   const context = useContext(MyContext);
//   const [previews, setPreviews] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);
//   const [deletingIndex, setDeletingIndex] = useState(null);
//   const [formFields, setFormFields] = useState({
//     catId: "",
//     bannerTitle: "",
//     subCatId: "",
//     thirdSubCatId: "",
//     price: "",
//     alignInfo: "",
//   });
//   const history = useNavigate();
//   const setPreviewsFun = (previewsArr) => {
//     setPreviews(previewsArr);
//     setFormFields((prev) => ({
//       ...prev,
//       images: previewsArr,
//     }));
//   };
//   const onChangeInput = (e) => {
//     const { name, value } = e.target;
//     setFormFields((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };
//   const removeImg = (image, index) => {
//     setDeletingIndex(index); // mark which image is deleting
//     const imageArr = [...previews];

//     deleteImages(`/api/category/deleteImage?img=${image}`)
//       .then((res) => {
//         imageArr.splice(index, 1);
//         setPreviews([]);
//         setTimeout(() => {
//           setPreviews(imageArr);
//           setFormFields((prev) => ({
//             ...prev,
//             images: imageArr,
//           }));
//           setDeletingIndex(null); // reset after done
//         }, 100);
//       })
//       .catch(() => {
//         setDeletingIndex(null);
//       });
//   };
//   const handleChangeProductThirdLevelCat = (event) => {
//     const value = event.target.value;
//     console.log("value,", value);
//     setProductThirdLevelCat(value);
//     setFormFields((prev) => ({
//       ...prev,
//       thirdSubCatId: value,
//     }));
//   };

//   const handleChangeProductCat = (event) => {
//     const value = event.target.value;
//     setProductCat(value);
//     setFormFields((prev) => ({
//       ...prev,
//       catId: value,
//     }));
//   };

//   const handleChangeSubProductCat = (event) => {
//     const value = event.target.value;
//     setProductSubCat(value);
//     setFormFields((prev) => ({
//       ...prev,
//       subCatId: value,
//     }));
//   };
//   const handleChangeAlignInfo=(e)=>
//   {
//     setAlignInfo(e.target.value)
//     formFields.alignInfo=e.target.value
//   }
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log();

//     setIsLoading(true);
//     if (formFields.bannerTitle === "") {
//       context.openAlertBox("error", "please enter Bnner Title ");
//       setIsLoading(false);
//       return false;
//     }
//     if (formFields.price === "") {
//       context.openAlertBox("error", "please enter Price ");
//       setIsLoading(false);
//       return false;
//     }

//     if (previews?.length === 0) {
//       context.openAlertBox("error", "please select Category Images");
//       setIsLoading(false);
//       return false;
//     }

//     postData("/api/bannerV1/add", formFields).then((res) => {
//       console.log(res);
// if(res?.error===false)
// {
//  setTimeout(() => {
//         setIsLoading(false);
//         context.setIsOpenFullScreenPanel({
//           open: false,
//           // model:'Add New Category'
//         });
//         context?.getCat();
//         context?.openAlertBox("error", "Created Successfully");
//         history("/bannerV1/List");
//       }, 2500);
// }
//    else
//     {
//        setTimeout(() => {
//         setIsLoading(false);
//         context.setIsOpenFullScreenPanel({
//           open: false,
//           // model:'Add New Category'
//         });
//         context?.getCat();
//         context?.openAlertBox("success", "Error while Creating");
//         history("/bannerV1/List");
//       }, 2500);
//     }  
//     });
//   };

//   return (
//     <>
//       <section className="bg-gray-100 p-5 ">
//         {/* <h1>Create product</h1> */}
//         <form className="form  py-1 p-1 md:p-8 md:py-1" onSubmit={handleSubmit} action="">
//           <div className="scroll  max-h-[525px] overflow-scroll pt-4 pr-4">
//             <div className="grid mb-3 gap-5 grid-cols-1 sm:grid-cols-5 md:grid-cols-5  lg:grid-cols-5">
//               <div className="col ">
//                 <h3 className="text-[16px] text-black font-[500] mb-1">
//                   Banner Title
//                 </h3>
//                 <input
//                   onChange={onChangeInput}
//                   type="text"
//                   name="bannerTitle"
//                   value={formFields.bannerTitle}
//                   className="w-full h-[40px] border-2  p-3 text-sm border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none focus:border-[rgba(0,0,0,0.5)]"
//                 />
//               </div>
//               <div className="col ">
//                 <h3 className="text-[16px] text-black font-[500] mb-1">
//                   Banner Category
//                 </h3>
//                 {context?.catData.length !== 0 && (
//                   <Select
//                     labelId="demo-simple-select-label"
//                     id="productCatDrop"
//                     value={productCat}
//                     label="Category"
//                     className="w-full"
//                     size="small"
//                     onChange={handleChangeProductCat}
//                   >
//                     {context?.catData?.map((cat, index) => {
//                       return (
//                         <MenuItem
//                           key={index}
//                           // onClick={() => selectCatByName(cat?.name)}
//                           value={cat?._id}
//                         >
//                           {cat?.name}
//                         </MenuItem>
//                       );
//                     })}
//                   </Select>
//                 )}
//               </div>
//               <div className="col">
//                 <h3 className="text-[16px]  text-black font-[500] mb-1">
//                   Sub Category
//                 </h3>
//                 {context?.catData.length !== 0 && (
//                   <Select
//                     labelId="demo-simple-select-label"
//                     id="productCatDrop"
//                     value={productSubCat}
//                     label="Sub Category"
//                     className="w-full"
//                     size="small"
//                     onChange={handleChangeSubProductCat}
//                   >
//                     {context?.catData?.map((cat, index) => {
//                       return (
//                         cat?.children?.length !== 0 &&
//                         cat?.children?.map((subCat, index_) => {
//                           return (
//                             <MenuItem
//                               key={index_}
//                               // onClick={() => selectSubCatByName(subCat?.name)}
//                               value={subCat?._id}
//                             >
//                               {subCat?.name}
//                             </MenuItem>
//                           );
//                         })
//                       );
//                     })}
//                   </Select>
//                 )}
//               </div>
//               <div className="col">
//                 <h3 className="text-[16px]  text-black font-[500] mb-1">
//                   Third Level Category
//                 </h3>
//                 {context?.catData.length !== 0 && (
//                   <Select
//                     labelId="demo-simple-select-label"
//                     id="productCatDrop"
//                     value={productThirdLevelCat}
//                     label="Sub Category"
//                     className="w-full"
//                     size="small"
//                     onChange={handleChangeProductThirdLevelCat}
//                   >
//                     {context?.catData?.map((cat) => {
//                       return (
//                         cat?.children?.length !== 0 &&
//                         cat?.children?.map((subCat) => {
//                           return (
//                             subCat?.children?.length !== 0 &&
//                             subCat?.children?.map((thirdLevelCat, index__) => {
//                               return (
//                                 <MenuItem
//                                   // onClick={() => {
//                                   //   selectSubCatByThirdLevel(
//                                   //     thirdLevelCat?.name
//                                   //   );
//                                   // }}
//                                   key={index__}
//                                   value={thirdLevelCat?._id}
//                                 >
//                                   {thirdLevelCat?.name}
//                                 </MenuItem>
//                               );
//                             })
//                           );
//                         })
//                       );
//                     })}
//                   </Select>
//                 )}
//               </div>
//               <div className="col">
//                 <h3 className="text-[16px]  text-black font-[500] mb-1">
//                   Align Info
//                 </h3>
//                 {context?.catData.length !== 0 && (
//                   <Select
//                     labelId="demo-simple-select-label"
//                     id="productCatDrop"
//                     value={alignInfo}
//                     label="Sub Category"
//                     className="w-full"
//                     size="small"
//                     onChange={handleChangeAlignInfo}
//                   >
//                     <MenuItem value={"left"}>Left </MenuItem>
//                     <MenuItem value={"right"}>Right </MenuItem>
//                   </Select>
//                 )}
//               </div>
//               <div className="col ">
//                 <h3 className="text-[16px]  text-black font-[500] mb-1">
//                   Product Price
//                 </h3>
//                 <input
//                   type="number"
//                   name="price"
//                   value={formFields.price}
//                   onChange={onChangeInput}
//                   className="w-full h-[40px] border-2 p-3 text-sm border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none focus:border-[rgba(0,0,0,0.5)]"
//                 />
//               </div>
//             </div>
//             <br />
//             <h3 className="text-[16px] text-black font-[500] mb-3">
//               Banner Image
//             </h3>
//             <div className="grid grid-cols-2 md:grid-cols-7 gap-4 ">
//               {previews?.length !== 0 &&
//                 previews?.map((image, index) => {
//                   return (
//                     <div key={index} className="uploadBoxWrapper mr-3 relative">
//                       <span
//                         onClick={() => {
//                           removeImg(image, index);
//                         }}
//                         className="absolute z-50 w-[20px] h-[20px] rounded-full overflow-hidden -top-[8px] cursor-pointer -right-[8px] flex items-center justify-center bg-red-700 "
//                       >
//                         {" "}
//                         <IoMdClose className="text-white text-[18px] " />{" "}
//                       </span>
//                       {deletingIndex === index && (
//                         <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-40">
//                           <CircularProgress size={35} color="inherit" />
//                         </div>
//                       )}
//                       <div
//                         className="uploadBox p-3 bg-gray-200 
//       cursor-pointer hover:bg-gray-300 rounded-md 
//       overflow-hidden border-2 border-dashed border-[rgba(0,0,0,0.4)]
//       flex items-center justify-center flex-col relative w-[100%] h-[150px]"
//                       >
//                         {isUploading ? (
//                           <LazyLoadImage
//                             alt="sample text"
//                             className="!w-[100%] h-full object-cover"
//                             effect="blur"
//                             wrapperProps={{
//                               // If you need to, you can tweak the effect transition using the wrapper style.
//                               style: { transitionDelay: "1s" },
//                             }}
//                             src={image} // use normal <img> attributes as props
//                           />
//                         ) : (
//                           <img
//                             alt="sample text"
//                             className="!w-[100%] h-full object-cover"
//                             src={image}
//                           />
//                         )}
//                         {deletingIndex === index && (
//                           <div className="absolute w-full  inset-0 flex items-center justify-center bg-white/60 z-40">
//                             <CircularProgress size={35} color="inherit" />
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })}

//               <UploadBox
//                 setPreviewsFun={setPreviewsFun}
//                 name="images"
//                 setIsUploading={setIsUploading}
//                 url="/api/bannerV1/uploadImages"
//                 multiple={true}
//                 className="mb-3"
//               />
//             </div>
//           </div>

//           <div className="!min-w-[250px] ">
//             <Button
//               type="submit"
//               className="btn-purple !min-w-[300px] !w-[300px]  flex gap-4  btn-lg"
//             >
//               {" "}
//               {isLoading === true ? (
//                 <CircularProgress color="inherit" className="w-full" />
//               ) : (
//                 <>
//                   <FaCloudUploadAlt className="text-[25px] hover:text-purple-600 hover:bg-purple-600 text-purple" />
//                   Publish And View
//                 </>
//               )}
//             </Button>
//           </div>
//         </form>
//       </section>
//     </>
//   );
// };

// export default AddBannerV1;
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, { useContext, useState } from "react";
import { MyContext } from "../../App.jsx";
import { deleteImages, postData } from "../../utils/api.js";
import UploadBox from "../../Components/UploadBox/index.jsx";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { FaCloudUploadAlt } from "react-icons/fa";
import Button from "@mui/material/Button";
import { IoMdClose } from "react-icons/io";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const AddBannerV1 = () => {
  const [productCat, setProductCat] = useState("");
  const [productSubCat, setProductSubCat] = useState("");
  const [alignInfo, setAlignInfo] = useState("");
  const [productThirdLevelCat, setProductThirdLevelCat] = useState("");
  const context = useContext(MyContext);
  const [previews, setPreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState(null);
  const history = useNavigate();

  // NOTE: images array initialized here so we always send images to backend
  const [formFields, setFormFields] = useState({
    catId: "",
    bannerTitle: "",
    subCatId: "",
    thirdSubCatId: "",
    price: "",
    alignInfo: "",
    images: [],
  });

  // called by UploadBox after upload completes with array of image URLs
  const setPreviewsFun = (previewsArr) => {
    setPreviews(previewsArr || []);
    setFormFields((prev) => ({
      ...prev,
      images: previewsArr || [],
    }));
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Remove image both from cloud (API) and local previews/formFields
  const removeImg = async (image, index) => {
    try {
      setDeletingIndex(index);
      // call deleteImages endpoint
      await deleteImages(`/api/category/deleteImage?img=${image}`);
      const imageArr = [...previews];
      imageArr.splice(index, 1);
      // apply immediately (no forced setTimeout needed)
      setPreviews(imageArr);
      setFormFields((prev) => ({ ...prev, images: imageArr }));
    } catch (err) {
      // keep UX graceful
      console.error("Failed to delete image:", err);
      context.openAlertBox("error", "Failed to delete image");
    } finally {
      setDeletingIndex(null);
    }
  };

  const handleChangeProductThirdLevelCat = (event) => {
    const value = event.target.value;
    setProductThirdLevelCat(value);
    setFormFields((prev) => ({
      ...prev,
      thirdSubCatId: value,
    }));
  };

  const handleChangeProductCat = (event) => {
    const value = event.target.value;
    setProductCat(value);
    setFormFields((prev) => ({
      ...prev,
      catId: value,
    }));
  };

  const handleChangeSubProductCat = (event) => {
    const value = event.target.value;
    setProductSubCat(value);
    setFormFields((prev) => ({
      ...prev,
      subCatId: value,
    }));
  };

  // Correctly update alignInfo in both local state and formFields
  const handleChangeAlignInfo = (e) => {
    const value = e.target.value;
    setAlignInfo(value);
    setFormFields((prev) => ({ ...prev, alignInfo: value }));
  };

  // Client-side validation helper
  const validateForm = () => {
    if (!formFields.bannerTitle || formFields.bannerTitle.trim() === "") {
      context.openAlertBox("error", "Please enter Banner Title");
      return false;
    }
    if (!formFields.price || formFields.price === "") {
      context.openAlertBox("error", "Please enter Price");
      return false;
    }
    if (!formFields.images || formFields.images.length === 0) {
      context.openAlertBox("error", "Please select Banner Images");
      return false;
    }
    return true;
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  setIsLoading(true);

  try {
    const res = await postData("/api/bannerV1/add", formFields);

    console.log("API RESPONSE:", res);

    // Simulate a delay to show loader for at least 1-2 seconds
    setTimeout(() => {
      if (res && res?.error === false) {
        context.openAlertBox("success", "Created Successfully");
        if (context?.getCat) context.getCat();
        context.setIsOpenFullScreenPanel?.({ open: false });
        history("/bannerV1/List");
      } else {
        const message =
          (res && (res?.message || res?.data?.message)) ||
          "Error while creating banner";
        context.openAlertBox("error", message);
      }

      setIsLoading(false); // remove loader after delay
    }, 1500); // 1.5 seconds delay (adjust as needed)
  } catch (err) {
    console.error("Network/API error:", err);
    setTimeout(() => {
      context.openAlertBox("error", "Network or Server error. Try again.");
      setIsLoading(false); // ensure loader is removed
    }, 1500); // keep loader visible for at least 1.5s
  }
};


  return (
    <>
      <section className="bg-gray-100 p-5 ">
        <form className="form py-1 p-1 md:p-8 md:py-1" onSubmit={handleSubmit}>
          <div className="scroll max-h-[525px] overflow-scroll pt-4 pr-4">
            <div className="grid mb-3 gap-5 grid-cols-1 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5">
              <div className="col ">
                <h3 className="text-[16px] text-black font-[500] mb-1">
                  Banner Title
                </h3>
                <input
                  onChange={onChangeInput}
                  type="text"
                  name="bannerTitle"
                  value={formFields.bannerTitle}
                  className="w-full h-[40px] border-2 p-3 text-sm border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none focus:border-[rgba(0,0,0,0.5)]"
                />
              </div>

              <div className="col ">
                <h3 className="text-[16px] text-black font-[500] mb-1">
                  Banner Category
                </h3>
                {context?.catData?.length > 0 && (
                  <Select
                    id="productCatDrop"
                    value={productCat}
                    label="Category"
                    className="w-full"
                    size="small"
                    onChange={handleChangeProductCat}
                  >
                    {context?.catData?.map((cat, index) => (
                      <MenuItem key={index} value={cat?._id}>
                        {cat?.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              </div>

              <div className="col">
                <h3 className="text-[16px]  text-black font-[500] mb-1">
                  Sub Category
                </h3>
                {context?.catData?.length > 0 && (
                  <Select
                    id="productSubCatDrop"
                    value={productSubCat}
                    label="Sub Category"
                    className="w-full"
                    size="small"
                    onChange={handleChangeSubProductCat}
                  >
                    {context?.catData?.map((cat) =>
                      cat?.children?.length > 0
                        ? cat.children.map((subCat, index_) => (
                            <MenuItem key={subCat?._id || index_} value={subCat?._id}>
                              {subCat?.name}
                            </MenuItem>
                          ))
                        : null
                    )}
                  </Select>
                )}
              </div>

              <div className="col">
                <h3 className="text-[16px]  text-black font-[500] mb-1">
                  Third Level Category
                </h3>
                {context?.catData?.length > 0 && (
                  <Select
                    id="productThirdLevelDrop"
                    value={productThirdLevelCat}
                    label="Third Level"
                    className="w-full"
                    size="small"
                    onChange={handleChangeProductThirdLevelCat}
                  >
                    {context?.catData?.map((cat) =>
                      cat?.children?.length > 0
                        ? cat.children.map((subCat) =>
                            subCat?.children?.length > 0
                              ? subCat.children.map((thirdLevelCat) => (
                                  <MenuItem
                                    key={thirdLevelCat?._id}
                                    value={thirdLevelCat?._id}
                                  >
                                    {thirdLevelCat?.name}
                                  </MenuItem>
                                ))
                              : null
                          )
                        : null
                    )}
                  </Select>
                )}
              </div>

              <div className="col">
                <h3 className="text-[16px]  text-black font-[500] mb-1">
                  Align Info
                </h3>
                <Select
                  id="alignInfoDrop"
                  value={alignInfo}
                  label="Align"
                  className="w-full"
                  size="small"
                  onChange={handleChangeAlignInfo}
                >
                  <MenuItem value={"left"}>Left</MenuItem>
                  <MenuItem value={"right"}>Right</MenuItem>
                </Select>
              </div>

              <div className="col ">
                <h3 className="text-[16px]  text-black font-[500] mb-1">
                  Product Price
                </h3>
                <input
                  type="number"
                  name="price"
                  value={formFields.price}
                  onChange={onChangeInput}
                  className="w-full h-[40px] border-2 p-3 text-sm border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none focus:border-[rgba(0,0,0,0.5)]"
                />
              </div>
            </div>

            <br />
            <h3 className="text-[16px] text-black font-[500] mb-3">Banner Image</h3>
            <div className="grid grid-cols-2 md:grid-cols-7 gap-4 ">
              {previews?.length > 0 &&
                previews.map((image, index) => (
                  <div key={index} className="uploadBoxWrapper mr-3 relative">
                    <span
                      onClick={() => removeImg(image, index)}
                      className="absolute z-50 w-[20px] h-[20px] rounded-full overflow-hidden -top-[8px] cursor-pointer -right-[8px] flex items-center justify-center bg-red-700"
                    >
                      <IoMdClose className="text-white text-[18px]" />
                    </span>

                    {deletingIndex === index && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-40">
                        <CircularProgress size={35} color="inherit" />
                      </div>
                    )}

                    <div
                      className="uploadBox p-3 bg-gray-200 cursor-pointer hover:bg-gray-300 rounded-md overflow-hidden border-2 border-dashed border-[rgba(0,0,0,0.4)] flex items-center justify-center flex-col relative w-[100%] h-[150px]"
                    >
                      {isUploading ? (
                        <LazyLoadImage
                          alt="banner"
                          className="!w-[100%] h-full object-cover"
                          effect="blur"
                          wrapperProps={{ style: { transitionDelay: "0.2s" } }}
                          src={image}
                        />
                      ) : (
                        <img
                          alt="banner"
                          className="!w-[100%] h-full object-cover"
                          src={image}
                        />
                      )}
                    </div>
                  </div>
                ))}

              <UploadBox
                setPreviewsFun={setPreviewsFun}
                name="images"
                setIsUploading={setIsUploading}
                url="/api/bannerV1/uploadImages"
                multiple={true}
                className="mb-3"
              />
            </div>
          </div>

          <div className="!min-w-[250px] ">
            <Button
              type="submit"
              className="btn-purple !min-w-[300px] !w-[300px] flex gap-4 btn-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress color="inherit" className="w-full" />
              ) : (
                <>
                  <FaCloudUploadAlt className="text-[25px] hover:text-purple-600 text-purple" />
                  Publish And View
                </>
              )}
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddBannerV1;
