import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { IoMdClose } from "react-icons/io";
import Rating from "@mui/material/Rating";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import UploadBox from "../../Components/UploadBox";
import Button from "@mui/material/Button";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MyContext } from "../../App.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import { deleteImages, fetchDataFromApi, postData } from "../../utils/api.js";
import { useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";

// import { getProductsCount } from "../../../../server/controllers/product.controller.js";

// const ITEM_HEIGHT=48;
// const ITEM_PADDING_TOP=8;
// const MenuProps ={
//   PaperProps:
//   {
//     style:
//     {
//       maxHeight:ITEM_HEIGHT *4.5 +ITEM_PADDING_TOP,
//       width:250,
//     }
//   }
// }
const label = { inputProps: { "aria-label": "Switch Demo" } };
const AddProduct = () => {
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    images: [],
    brand: "",
    price: "",
    oldPrice: "",
    category: "",
    catName: "",
    catId: "",
    subCatId: "",
    subCat: "",
    thirdSubCat: "",
    thirdSubCatId: "",

    countInStock: "",
    rating: "",
    isFeatured: false,
    discount: "",
    ProductRam: [],
    size: [],
    productWeight: [],
    bannerTitleName: "",
    bannerImages: [],
    isDisplayOnHomeBanner:false
  });
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const [deletingIndex, setDeletingIndex] = useState(null);
  const [deletingIndex2, setDeletingIndex2] = useState(null);
  const [checkedSwitch,setCheckedSwitch]=useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const history = useNavigate();
  const [previews, setPreviews] = useState([]);
  const [bannerPreviews, setBannerPreviews] = useState([]);
  const [productCat, setProductCat] = useState("");
  const [productSubCat, setProductSubCat] = useState("");
  const [productThirdLevelCat, setProductThirdLevelCat] = useState("");

  const [isUploading, setIsUploading] = useState(false);
  const [productFeatured, setProductFeatured] = useState("");
  const [productRams, setProductRams] = useState([]);
  const [productRamsData, setProductRamsData] = useState([]);
  const [productWeight, setProductWeight] = useState([]);
  const [productWeightData, setProductWeightData] = useState([]);
  const [productSize, setProductSize] = useState([]);
  const [productSizeData, setProductSizeData] = useState([]);

  const context = useContext(MyContext);

  useEffect(() => {
    fetchDataFromApi("/api/product/productRAMS/get").then((res) => {
      console.log(res);
      if (res?.error === false) {
        setProductRamsData(res?.data);
      }
    });
    fetchDataFromApi("/api/product/productWeight/get").then((res) => {
      console.log(res);
      if (res?.error === false) {
        setProductWeightData(res?.data);
      }
    });
    fetchDataFromApi("/api/product/productSize/get").then((res) => {
      console.log(res);
      if (res?.error === false) {
        setProductSizeData(res?.data);
      }
    });
  }, []);

  //1
  // const handleChangeProductCat = (event) => {
  //   setProductCat(event.target.value);
  //   formFields.catId = event.target.value;
  // };

  // useEffect(() => {
  //   getProducts();
  // }, [context?.setIsOpenFullScreenPanel]);
  // const getProducts = () => {

  // };
  const selectCatByName = (name) => {
    setFormFields((prev) => ({
      ...prev,
      catName: name,
    }));
  };
  //2
  // const handleChangeSubProductCat = (event) => {
  //   setProductSubCat(event.target.value);
  //   formFields.subCatId = event.target.value;
  // };

  const selectSubCatByName = (name) => {
    setFormFields((prev) => ({
      ...prev,
      subCat: name,
    }));
  };
  //3
  const handleChangeProductThirdLevelCat = (event) => {
    const value = event.target.value;
    console.log("value,", value);
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
      category: value,
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
  // const handleChangeProductThirdLevelCat = (event) => {
  //   const value = event.target.value;
  //   console.log("value,", value);
  //   //not setting thirs id in
  //   setProductThirdLevelCat(value);
  //   setFormFields((prev) => ({
  //     ...prev,
  //     thirdSubCatId: value,
  //   }));
  // };

  const selectSubCatByThirdLevel = (name) => {
    setFormFields((prev) => ({
      ...prev,
      thirdSubCat: name,
    }));
  };

  const handleChangeProductRams = (event) => {
    const {
      target: { value },
    } = event;
    const rams = typeof value === "string" ? value.split(",") : value;
    setProductRams(rams);
    setFormFields((prev) => ({
      ...prev,
      productRam: rams,
    }));
  };

  const handleChangeProductWeight = (event) => {
    const {
      target: { value },
    } = event;
    const weights = typeof value === "string" ? value.split(",") : value;
    setProductWeight(weights);
    setFormFields((prev) => ({
      ...prev,
      productWeight: weights,
    }));
  };
  const handleChangeProductFeatured = (event) => {
    const value = event.target.value;
    setProductFeatured(value);
    setFormFields((prev) => ({
      ...prev,
      isFeatured: value, // Directly assign the boolean—no need for string comparison
    }));
  };
  const handleChangeProductSize = (event) => {
    const {
      target: { value },
    } = event;
    const sizes = typeof value === "string" ? value.split(",") : value;
    setProductSize(sizes);
    setFormFields((prev) => ({
      ...prev,
      size: sizes,
    }));
  };

  const onChangeRating = (newValue) => {
    setFormFields((prev) => ({
      ...prev,
      rating: newValue,
    }));
  };
  const setPreviewsFun = (previewsArr) => {
    setPreviews(previewsArr);
    setFormFields((prev) => ({
      ...prev,
      images: previewsArr,
    }));
  };
  const removeImg = (image, index) => {
    setDeletingIndex(index); // mark which image is deleting
    const imageArr = [...previews];

    deleteImages(`/api/category/deleteImage?img=${image}`)
      .then((res) => {
        imageArr.splice(index, 1);
        setPreviews([]);
        setTimeout(() => {
          setPreviews(imageArr);
          setFormFields((prev) => ({
            ...prev,
            images: imageArr,
          }));
          setDeletingIndex(null); // reset after done
        }, 100);
      })
      .catch(() => {
        setDeletingIndex(null);
      });
  };

const  handleChangeSwitch=(e)=>
{
setCheckedSwitch(e.target.checked)
formFields.isDisplayOnHomeBanner=e.target.checked
}

  const setBannerImagesFun = (previewsArr) => {
    const imgArr = bannerPreviews;
    for (let i = 0; i < previewsArr.length; i++) {
      imgArr.push(previewsArr[i]);
    }
    setBannerPreviews([]);
    setTimeout(() => {
      setBannerPreviews(imgArr);
      formFields.bannerImages = imgArr;
    }, 100);
  };

  const removeBannerImg = (image, index) => {
    setDeletingIndex2(index); // mark which image is deleting
    const imageArr = [...bannerPreviews];

    deleteImages(`/api/category/deleteImage?img=${image}`)
      .then((res) => {
        imageArr.splice(index, 1);
        setBannerPreviews([]);
        setTimeout(() => {
          setBannerPreviews(imageArr);
          setFormFields((prev) => ({
            ...prev,
            bannerImages: imageArr,
          }));
          setDeletingIndex2(null); // reset after done
        }, 100);
      })
      .catch(() => {
        setDeletingIndex2(null);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formFields.name === "") {
      context.openAlertBox("error", "PLease enter product name");
      return false;
    }
    if (formFields.description === "") {
      context.openAlertBox("error", "PLease enter description");
      return false;
    }
    if (formFields.catId === "") {
      context.openAlertBox("error", "PLease select product Category");
      return false;
    }
    if (formFields.price === "") {
      context.openAlertBox("error", "PLease enter price of product");
      return false;
    }
    if (formFields.oldPrice === "") {
      context.openAlertBox("error", "PLease enter Old price of product");
      return false;
    }

    if (formFields.countInStock === "") {
      context.openAlertBox("error", "PLease select stock");
      return false;
    }
    if (formFields.brand === "") {
      context.openAlertBox("error", "PLease enter brand of product");
      return false;
    }

    if (formFields.discount === "") {
      context.openAlertBox("error", "PLease enter discount");
      return false;
    }

    if (formFields.rating === "") {
      context.openAlertBox("error", "PLease select rating");
      return false;
    }

    if (previews.length === 0) {
      context.openAlertBox("error", "PLease enter product images");
      return false;
    }
    console.log("iiiiii");
    setIsLoading(true);
    console.log(formFields);

    postData("/api/product/create", formFields).then((res) => {
      console.log(res);
      // history("/products")
      if (res?.error == false) {
        // context.openAlertBox("success", res?.message);
        // setIsLoading(false);
        // context.setIsOpenFullScreenPanel({
        //   open: false,
        //   // model:'Add New Category'
        // });

        setTimeout(() => {
          setIsLoading(false);
          context.setIsOpenFullScreenPanel({
            open: false,
            // model:'Add New Category'
          });
          history("/products");
          // context?.getCat();
          context?.openAlertBox("success", "Created Successfully");
        }, 2500);
      } else {
        setIsLoading(false);
        context?.openAlertBox("error", res?.message);
      }
    });
  };
  return (
    <>
      <section className="bg-gray-100 p-5 ">
        {/* <h1>Create product</h1> */}
       <form className="form  py-1 p-1 md:p-8 md:py-1" onSubmit={handleSubmit} action="">
            <div className="scroll  max-h-[525px] overflow-scroll pr-4">
            <div className="grid mb-3 grid-cols-1">
              <div className="col ">
                <h3 className="text-[16px] text-black font-[500] mb-1">
                  Product Name
                </h3>
                <input
                  type="text"
                  name="name"
                  value={formFields.name}
                  onChange={onChangeInput}
                  className="w-full h-[40px] border-2  p-3 text-sm border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none focus:border-[rgba(0,0,0,0.5)]"
                />
              </div>
            </div>
            <div className="grid mb-3 grid-cols-1">
              <div className="col ">
                <h3 className="text-[16px]  text-black font-[500] mb-1">
                  Product Description
                </h3>
                <textarea
                  rows={5}
                  type="text"
                  name="description"
                  value={formFields.description}
                  onChange={onChangeInput}
                  className="w-full h-[140px] border-2 p-3 text-sm border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none focus:border-[rgba(0,0,0,0.5)]"
                />
              </div>
            </div>
            <div className="grid mb-3 gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <div className="col">
                <h3 className="text-[16px] font-[500]  text-black mb-1">
                  Product Category
                </h3>
                {context?.catData.length !== 0 && (
                  <Select
                    labelId="demo-simple-select-label"
                    id="productCatDrop"
                    value={productCat}
                    label="Category"
                    className="w-full"
                    size="small"
                    onChange={handleChangeProductCat}
                  >
                    {context?.catData?.map((cat, index) => {
                      return (
                        <MenuItem
                          key={index}
                          onClick={() => selectCatByName(cat?.name)}
                          value={cat?._id}
                        >
                          {cat?.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                )}
              </div>
              <div className="col">
                <h3 className="text-[16px]  text-black font-[500] mb-1">
                  Product Sub Category
                </h3>
                {context?.catData.length !== 0 && (
                  <Select
                    labelId="demo-simple-select-label"
                    id="productCatDrop"
                    value={productSubCat}
                    label="Sub Category"
                    className="w-full"
                    size="small"
                    onChange={handleChangeSubProductCat}
                  >
                    {context?.catData?.map((cat, index) => {
                      return (
                        cat?.children?.length !== 0 &&
                        cat?.children?.map((subCat, index_) => {
                          return (
                            <MenuItem
                              key={index_}
                              onClick={() => selectSubCatByName(subCat?.name)}
                              value={subCat?._id}
                            >
                              {subCat?.name}
                            </MenuItem>
                          );
                        })
                      );
                    })}
                  </Select>
                )}
              </div>
              <div className="col">
                <h3 className="text-[16px]  text-black font-[500] mb-1">
                  Product Third Level Category
                </h3>
                {context?.catData.length !== 0 && (
                  <Select
                    labelId="demo-simple-select-label"
                    id="productCatDrop"
                    value={productThirdLevelCat}
                    label="Sub Category"
                    className="w-full"
                    size="small"
                    onChange={handleChangeProductThirdLevelCat}
                  >
                    {context?.catData?.map((cat) => {
                      return (
                        cat?.children?.length !== 0 &&
                        cat?.children?.map((subCat) => {
                          return (
                            subCat?.children?.length !== 0 &&
                            subCat?.children?.map((thirdLevelCat, index__) => {
                              return (
                                <MenuItem
                                  onClick={() => {
                                    selectSubCatByThirdLevel(
                                      thirdLevelCat?.name
                                    );
                                  }}
                                  key={index__}
                                  value={thirdLevelCat?._id}
                                >
                                  {thirdLevelCat?.name}
                                </MenuItem>
                              );
                            })
                          );
                        })
                      );
                    })}
                  </Select>
                )}
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
                <div className="col ">
                <h3 className="text-[16px]  text-black font-[500] mb-1">
                  Product Old Price
                </h3>
                <input
                  type="number"
                  name="oldPrice"
                  value={formFields.oldPrice}
                  onChange={onChangeInput}
                  className="w-full h-[40px] border-2 p-3 text-sm border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none focus:border-[rgba(0,0,0,0.5)]"
                />
              </div>
              <div className="col">
                <h3 className="text-[16px] font-[500]  text-black mb-1">
                  Is Featured ?
                </h3>
                <Select
                  labelId="demo-simple-select-label"
                  id="productCatDrop"
                  value={productFeatured}
                  label="Category"
                  className="w-full"
                  size="small"
                  onChange={handleChangeProductFeatured}
                >
                  <MenuItem value={true}>True</MenuItem>
                  <MenuItem value={false}>False</MenuItem>
                </Select>
              </div>
              <div className="col ">
                <h3 className="text-[16px]  text-black font-[500] mb-1">
                  Product Stock
                </h3>
                <input
                  type="number"
                  name="countInStock"
                  value={formFields.countInStock}
                  onChange={onChangeInput}
                  className="w-full h-[40px] border-2 p-3 text-sm border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none focus:border-[rgba(0,0,0,0.5)]"
                />
              </div>
              <div className="col ">
                <h3 className="text-[16px]  text-black font-[500] mb-1">
                  Brand
                </h3>
                <input
                  type="text"
                  name="brand"
                  value={formFields.brand}
                  onChange={onChangeInput}
                  className="w-full h-[40px] border-2 p-3 text-sm border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none focus:border-[rgba(0,0,0,0.5)]"
                />
              </div>
  <div className="col ">
                <h3 className="text-[16px]  text-black font-[500] mb-1">
                  Product Discount
                </h3>
                <input
                  type="number"
                  name="discount"
                  value={formFields.discount}
                  onChange={onChangeInput}
                  className="w-full h-[40px] border-2 p-3 text-sm border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none focus:border-[rgba(0,0,0,0.5)]"
                />
              </div>
              <div className="col">
                <h3 className="text-[16px] font-[500]  text-black mb-1">
                  Product Rams
                </h3>
                {productRamsData.length !== 0 && (
                  <Select
                    multiple
                    labelId="demo-simple-select-label"
                    id="productCatDrop"
                    value={productRams}
                    label="Category"
                    className="w-full"
                    size="small"
                    // MenuProps={MenuProps}
                    onChange={handleChangeProductRams}
                  >
                    {productRamsData.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item?.name}>
                          {item?.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                )}
              </div>
              <div className="col">
                <h3 className="text-[16px]  text-black font-[500] mb-1">
                  Product Weight
                </h3>
                {productWeightData.length !== 0 && (
                  <Select
                    multiple
                    labelId="demo-simple-select-label"
                    id="productCatDrop"
                    value={productWeight}
                    label="Category"
                    className="w-full"
                    size="small"
                    onChange={handleChangeProductWeight}
                  >
                    {productWeightData.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item?.name}>
                          {item?.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                )}
              </div>

              <div className="col ">
                <h3 className="text-[16px]  text-black font-[500] mb-1">
                  Product Size
                </h3>
                {productSizeData.length !== 0 && (
                  <Select
                    labelId="demo-simple-select-label"
                    id="productCatDrop"
                    value={productSize}
                    label="Category"
                    className="w-full"
                    size="small"
                    multiple
                    onChange={handleChangeProductSize}
                  >
                    {productSizeData.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item?.name}>
                          {item?.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                )}
              </div>
            </div>

        

            <div className="grid mb-3 gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 ">
              <div className="col ">
                <h3 className="text-[16px]  text-black font-[500] mb-1">
                  Product Rating
                </h3>
                <Rating
                  onChange={(_, newValue) => onChangeRating(newValue)}
                  defaultValue={1}
                  precision={0.5}
                />
              </div>
            </div>
            <div className="col w-full px-0 p-5">
              <h3 className="font-[700] mb-3 text-[18px]">Media and Images</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 ">
         
                {previews?.length !== 0 &&
                  previews?.map((image, index) => {
                    return (
                      <div key={index} className="uploadBoxWrapper mr-3 relative">
                        <span
                          onClick={() => {
                            removeImg(image, index);
                          }}
                          className="absolute z-50 w-[20px] h-[20px] rounded-full overflow-hidden -top-[8px] cursor-pointer -right-[8px] flex items-center justify-center bg-red-700 "
                        >
                          {" "}
                          <IoMdClose className="text-white text-[18px] " />{" "}
                        </span>
                        {deletingIndex === index && (
                          <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-40">
                            <CircularProgress size={35} color="inherit" />
                          </div>
                        )}
                        <div
                          className="uploadBox p-3 bg-gray-200 
                  cursor-pointer hover:bg-gray-300 rounded-md 
                  overflow-hidden border-2 border-dashed border-[rgba(0,0,0,0.4)]
                  flex items-center justify-center flex-col relative w-[100%] h-[150px]"
                        >
                          {isUploading ? (
                            <LazyLoadImage
                              alt="sample text"
                              className="!w-[100%] h-full object-cover"
                              effect="blur"
                              wrapperProps={{
                                // If you need to, you can tweak the effect transition using the wrapper style.
                                style: { transitionDelay: "1s" },
                              }}
                              src={image} // use normal <img> attributes as props
                            />
                          ) : (
                            <img
                              alt="sample text"
                              className="!w-[100%] h-full object-cover"
                              src={image}
                            />
                          )}
                          {deletingIndex === index && (
                            <div className="absolute w-full  inset-0 flex items-center justify-center bg-white/60 z-40">
                              <CircularProgress size={35} color="inherit" />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                <UploadBox
                  setPreviewsFun={setPreviewsFun}
                  name="images"
                  setIsUploading={setIsUploading}
                  url="/api/product/uploadImages"
                  multiple={true}
                />
              </div>
            </div>

            {/* //banner images */}
            <div className="col w-full px-0 p-5">
              <div className="card shadow-md p-4 bg-white w-full">
                {" "}
                <div className="flex items-center gap-8">
                  <h3 className="font-[700] mb-3 text-[18px]">Banner Images</h3>
                  <Switch {...label} onChange={handleChangeSwitch} checked={checkedSwitch}/>
                </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 ">
         
                  {bannerPreviews?.length !== 0 &&
                    bannerPreviews?.map((image, index) => {
                      return (
                        <div key={index} className="uploadBoxWrapper  mr-3 relative">
                          <span
                            onClick={() => {
                              removeBannerImg(image, index);
                            }}
                            className="absolute z-50 w-[20px] h-[20px] rounded-full overflow-hidden -top-[8px] cursor-pointer -right-[8px] flex items-center justify-center bg-red-700 "
                          >
                            {" "}
                            <IoMdClose className="text-white text-[18px] " />{" "}
                          </span>
                          {deletingIndex2 === index && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-40">
                              <CircularProgress size={35} color="inherit" />
                            </div>
                          )}
                          <div
                            className="uploadBox p-3 bg-gray-200 
                  cursor-pointer hover:bg-gray-300 rounded-md 
                  overflow-hidden border-2 border-dashed border-[rgba(0,0,0,0.4)]
                  flex items-center justify-center flex-col relative w-[100%] h-[150px]"
                          >
                            {isUploading ? (
                              <LazyLoadImage
                                alt="sample text"
                                className="!w-[100%] h-full object-cover"
                                effect="blur"
                                wrapperProps={{
                                  // If you need to, you can tweak the effect transition using the wrapper style.
                                  style: { transitionDelay: "1s" },
                                }}
                                src={image} // use normal <img> attributes as props
                              />
                            ) : (
                              <img
                                alt="sample text"
                                className="!w-[100%] h-full object-cover"
                                src={image}
                              />
                            )}
                            {deletingIndex2 === index && (
                              <div className="absolute w-full  inset-0 flex items-center justify-center bg-white/60 z-40">
                                <CircularProgress size={35} color="inherit" />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}

                  <UploadBox
                    setPreviewsFun={setBannerImagesFun}
                    name="bannerimages"
                    setIsUploading={setIsUploading}
                    url="/api/product/uploadBannerImages"
                    multiple={true}
                  />
                </div>
                <br />
                <h3 className="font-[700] mb-3 text-[18px]">Banner Title</h3>
                <input
                  type="text"
                  name="bannerTitleName"
                  value={formFields.bannerTitleName}
                  onChange={onChangeInput}
                  className="w-full h-[40px] border-2  p-3 text-sm border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none focus:border-[rgba(0,0,0,0.5)]"
                />
              </div>
            </div>
          </div>

          <div></div>
          <hr />
          <hr className="border-t-2 border-gray-600 my-2" />
          <Button
            type="submit"
            className="btn-purple w-full flex gap-4  btn-lg"
          >
            {" "}
            {isLoading === true ? (
              <CircularProgress color="inherit" className="w-full" />
            ) : (
              <>
                <FaCloudUploadAlt className="text-[25px] hover:text-purple-600 hover:bg-purple-600 text-purple" />
                Publish And View
              </>
            )}
          </Button>
        </form>
      </section>
    </>
  );
};

export default AddProduct;

// import React, { useState } from "react";
// import { IoMdClose } from "react-icons/io";
// import Rating from "@mui/material/Rating";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import "react-lazy-load-image-component/src/effects/blur.css";
// import UploadBox from "../../Components/UploadBox";
// import Button from "@mui/material/Button";
// import { FaCloudUploadAlt } from "react-icons/fa";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
// import toast from "react-hot-toast";
// import { postData } from "../../utils/api.js"; // ✅ make sure this path is correct

// const AddProduct = ({ onClose }) => {
//   const [formFields, setFormFields] = useState({
//     name: "",
//     description: "",
//     images: [],
//     brand: "",
//     price: "",
//     oldPrice: "",
//     catName: "",
//     catId: "",
//     subCatId: "",
//     subCat: "",
//     thirdSubCat: "",
//     thirdSubCatId: "",
//     category: "",
//     countInStock: "",
//     rating: 3.5,
//     isFeatured: false,
//     discount: "",
//     ProductRam: [],
//     size: [],
//     productWeight: [],
//   });

//   // handle inputs

//   const [productCat, setProductCat] = useState("");
//   const [productSubCat, setProductSubCat] = useState("");
//   const [productFeatured, setProductFeatured] = useState("");
//   const [productRams, setProductRams] = useState("");
//   const [productWeight, setProductWeight] = useState("");
//   const [productSize, setProductSize] = useState("");

//   const handleChange = (e) => {
//     setProduct({ ...product, [e.target.name]: e.target.value });
//   };

//   // handle dropdowns
//   const handleSelect = (field, value) => {
//     setProduct({ ...product, [field]: value });
//   };

//   // handle rating
//   const handleRating = (event, newValue) => {
//     setProduct({ ...product, rating: newValue });
//   };

//   // submit data
//   const handleSubmit = async () => {
//     try {
//       const res = await postData("/api/product/add", product); // ✅ update route if needed
//       toast.success("Product added successfully!");
//       if (onClose) onClose();
//     } catch (err) {
//       console.error(err);
//       toast.error("Error adding product!");
//     }
//   };

//   return (
//     <section className="bg-gray-100 p-5">
//       <form className="form p-8 py-3" onSubmit={(e) => e.preventDefault()}>
//         <div className="scroll max-h-[525px] overflow-scroll pr-4">
//           {/* Product Name */}
//           <div className="grid mb-3 grid-cols-1">
//             <div className="col">
//               <h3 className="text-[16px] text-black font-[500] mb-1">
//                 Product Name
//               </h3>
//               <input
//                 name="name"
//                 value={formFields.name}
//                 onChange={onChangeInput}
//                 type="text"
//                 className="w-full border  focus:outline-none focus:border-2 focus:border-[rgba(0,0,0,0.5)] h-[40px]  p-3 text-sm border-gray-300 rounded-md"
//               />
//             </div>
//           </div>

//           {/* Product Description */}
//           <div className="grid mb-3 grid-cols-1">
//             <div className="col">
//               <h3 className="text-[16px] text-black font-[500] mb-1">
//                 Product Description
//               </h3>
//               <textarea
//                 name="description"
//                 value={formFields.description}
//                 onChange={onChangeInput}
//                 rows={5}
//                 className="w-full border-2 p-3 text-sm border-gray-300 rounded-md"
//               />
//             </div>
//           </div>

//           {/* Category & Price */}
//           <div className="grid mb-3 gap-4 grid-cols-4">
//             <div>
//               <h3 className="text-[16px] font-[500] text-black mb-1">
//                 Product Category
//               </h3>
//               <Select
//                 value={product.category}
//                 onChange={(e) => handleSelect("category", e.target.value)}
//                 size="small"
//                 className="w-full"
//               >
//                 <MenuItem value="">None</MenuItem>
//                 <MenuItem value="Fashion">Fashion</MenuItem>
//                 <MenuItem value="Beauty">Beauty</MenuItem>
//                 <MenuItem value="Wellness">Wellness</MenuItem>
//               </Select>
//             </div>

//             <div>
//               <h3 className="text-[16px] text-black font-[500] mb-1">
//                 Product Sub Category
//               </h3>
//               <Select
//                 value={product.subCategory}
//                 onChange={(e) => handleSelect("subCategory", e.target.value)}
//                 size="small"
//                 className="w-full"
//               >
//                 <MenuItem value="">None</MenuItem>
//                 <MenuItem value="Men">Men</MenuItem>
//                 <MenuItem value="Women">Women</MenuItem>
//                 <MenuItem value="Kids">Kids</MenuItem>
//               </Select>
//             </div>

//             <div>
//               <h3 className="text-[16px] font-[500] text-black mb-1">
//                 Product Price
//               </h3>
//               <input
//                 name="price"
//                 value={product.price}
//                 onChange={handleChange}
//                 type="number"
//                 className="w-full h-[40px] border-2 p-3 text-sm border-gray-300 rounded-md"
//               />
//             </div>

//             <div>
//               <h3 className="text-[16px] font-[500] text-black mb-1">
//                 Product Old Price
//               </h3>
//               <input
//                 name="oldPrice"
//                 value={product.oldPrice}
//                 onChange={handleChange}
//                 type="number"
//                 className="w-full h-[40px] border-2 p-3 text-sm border-gray-300 rounded-md"
//               />
//             </div>
//           </div>

//           {/* More Attributes */}
//           <div className="grid mb-3 gap-4 grid-cols-4">
//             <div>
//               <h3 className="text-[16px] font-[500] text-black mb-1">
//                 Is Featured?
//               </h3>
//               <Select
//                 value={product.featured}
//                 onChange={(e) => handleSelect("featured", e.target.value)}
//                 size="small"
//                 className="w-full"
//               >
//                 <MenuItem value="">None</MenuItem>
//                 <MenuItem value="true">True</MenuItem>
//                 <MenuItem value="false">False</MenuItem>
//               </Select>
//             </div>

//             <div>
//               <h3 className="text-[16px] text-black font-[500] mb-1">
//                 Product Stock
//               </h3>
//               <input
//                 name="stock"
//                 value={product.stock}
//                 onChange={handleChange}
//                 type="number"
//                 className="w-full h-[40px] border-2 p-3 text-sm border-gray-300 rounded-md"
//               />
//             </div>

//             <div>
//               <h3 className="text-[16px] text-black font-[500] mb-1">Brand</h3>
//               <input
//                 name="brand"
//                 value={product.brand}
//                 onChange={handleChange}
//                 type="text"
//                 className="w-full h-[40px] border-2 p-3 text-sm border-gray-300 rounded-md"
//               />
//             </div>

//             <div>
//               <h3 className="text-[16px] text-black font-[500] mb-1">
//                 Product Discount
//               </h3>
//               <input
//                 name="discount"
//                 value={product.discount}
//                 onChange={handleChange}
//                 type="number"
//                 className="w-full h-[40px] border-2 p-3 text-sm border-gray-300 rounded-md"
//               />
//             </div>
//           </div>

//           {/* Rating */}
//           <div className="grid mb-3 gap-4 grid-cols-4">
//             <div>
//               <h3 className="text-[16px] font-[500] text-black mb-1">
//                 Product Rating
//               </h3>
//               <Rating
//                 value={product.rating}
//                 precision={0.5}
//                 onChange={handleRating}
//               />
//             </div>
//           </div>

//           {/* Image Upload */}
//           <div className="col w-full px-0 p-5">
//             <h3 className="font-[700] mb-3 text-[18px]">Media and Images</h3>
//             <div className="grid grid-cols-7 gap-4">
//               <LazyLoadImage
//                 alt="sample"
//                 className="w-full h-full object-cover rounded-md border"
//                 effect="blur"
//                 src="https://serviceapi.spicezgold.com/download/1742462287664_siril-poly-silk-white-beige-color-saree-with-blouse-piece-product-images-rv2vcdkuly-0-202304220523.webp"
//               />
//               <UploadBox multiple={true} />
//             </div>
//           </div>
//         </div>

//         <Button
//           type="button"
//           onClick={handleSubmit}
//           className="btn-purple w-full flex gap-4 btn-lg mt-4"
//         >
//           <FaCloudUploadAlt className="text-[25px]" /> Publish And View
//         </Button>
//       </form>
//     </section>
//   );
// };

// export default AddProduct;
