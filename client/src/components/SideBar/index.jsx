// import React, { useContext, useEffect, useState } from "react";
// import { Collapse } from "react-collapse";
// import FormGroup from "@mui/material/FormGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import "../SideBar/style.css";
// import { FaAngleDown } from "react-icons/fa";
// import { FaAngleUp } from "react-icons/fa";
// import Rating from "@mui/material/Rating";
// import Button from "@mui/material/Button";
// import RangeSlider from "react-range-slider-input";
// import "react-range-slider-input/dist/style.css";
// import { myContext } from "../../App";
// import { useLocation } from "react-router-dom";
// import { postData } from "../../utils/api";
// import { MdOutlineFilterAlt } from "react-icons/md";

// const SideBar = (props) => {
//   const [isOpenedCategoryFilter, setIsOpenedCategoryFilter] = useState(true);
//   const [isOpenedSizeFilter, setIsOpenedSizeFilter] = useState(true);
//   const [isOpenedAvailibilityFilter, setIsOpenedAvailibilityFilter] =
//     useState(true);
//   const context = useContext(myContext);
//   const [filters, setFilters] = useState({
//     catId: [],
//     subCatId: [],
//     thirdSubCatId: [],
//     minPrice: "",
//     maxPrice: "",
//     rating: "",
//     page: 1,
//     limit: 25,
//   });

//   const location = useLocation();
//   const [price, setPrice] = useState([0, 60000]);
//   const handleCheckBoxChange = (field, value) => {
//     context?.setSearchData([]);

//     const currentValues = filters[field] || [];
//     const updatedValues = currentValues?.includes(value)
//       ? currentValues.filter((item) => item !== value)
//       : [...currentValues, value];
//     setFilters((prev) => ({
//       ...prev,
//       [field]: updatedValues,
//     }));

//     if (field === "catId") {
//       setFilters((prev) => ({
//         ...prev,
//         subCatId: [],
//         thirdSubCatId: [],
//       }));
//     }
//   };
//   useEffect(() => {
//     const url = window.location.href;

//     const queryParameters = new URLSearchParams(location.search);

//     if (url.includes("catId")) {
//       const categoryId = queryParameters.get("catId");
//       const catArr = [];
//       catArr.push(categoryId);
//       filters.catId = catArr;
//       filters.subCatId = [];
//       filters.thirdSubCatId = [];
//       filters.rating = [];
//       context?.setSearchData([]);
//     }
//     if (url.includes("subCatId")) {
//       const subcategoryId = queryParameters.get("subCatId");
//       const subcatArr = [];
//       subcatArr.push(subcategoryId);
//       filters.catId = [];
//       filters.subCatId = subcatArr;
//       filters.thirdSubCatId = [];
//       filters.rating = [];
//       context?.setSearchData([]);
//     }
//     if (url.includes("thirdLevelCatId")) {
//       const thirdcategoryId = queryParameters.get("thirdLevelCatId");
//       const thirdcatArr = [];
//       thirdcatArr.push(thirdcategoryId);
//       filters.catId = [];
//       filters.subCatId = [];
//       filters.thirdSubCatId = thirdcatArr;
//       filters.rating = [];
//       context?.setSearchData([]);
//     }

//     filters.page = 1;

//     setTimeout(() => {
//       filtersData();
//     }, 200);

//     // context?.setSearchData([])
//   }, [location]);

//   // useEffect(() => {
//   //   const queryParameters = new URLSearchParams(location.search);

//   //   const categoryId = queryParameters.get("catId");
//   //   const subcategoryId = queryParameters.get("subCatId");
//   //   const thirdcategoryId = queryParameters.get("thirdLevelCatId");

//   //   setFilters((prev) => ({
//   //     ...prev,
//   //     catId: categoryId ? [categoryId] : [],
//   //     subCatId: subcategoryId ? [subcategoryId] : [],
//   //     thirdSubCatId: thirdcategoryId ? [thirdcategoryId] : [],
//   //     rating: [],
//   //     page: 1,
//   //   }));

//   //   setTimeout(() => {
//   //     filtersData();
//   //   }, 200);
//   // }, [location]);

//   const filtersData = () => {
//     props?.setIsLoading(true);
//     console.log("search data", context?.searchData);

//     if (context?.searchData?.products?.length > 0) {
//       props?.setProductsData(context?.searchData?.products || []);
//       props.setIsLoading(false);
//       props.setTotalPages(context?.searchData?.totalPages || 1);

//       window.scrollTo(0, 0);
//     } else {
//       postData(`/api/product/filters`, filters).then((res) => {
//         props?.setProductsData(res?.products || []);

//         props.setIsLoading(false);
//         props.setTotalPages(res?.totalPages);
//         window.scrollTo(0, 0);
//       });
//     }
//   };

//   useEffect(() => {
//     setFilters((prev) => ({ ...prev, page: props.page }));
//   }, [props.page]);

//   useEffect(() => {
//     filtersData();
//   }, [filters]);

//   useEffect(() => {
//     setFilters((prev) => ({
//       ...prev,
//       minPrice: price[0],
//       maxPrice: price[1],
//     }));
//   }, [price]);

//   return (
//     <aside className="sidebar static lg:sticky top-[130px] z-[50] pr-0 lg:pr-5 py-3 lg:py-5">
//       {console.log("filters", filters)}
//       <div className=" max-h-[60vh]
//                  lg:overflow-hidden  overflow-auto w-full">
//         <div className="box">
//           <h3 className="mb-3 !ml-1 text-[20px] font-[600] flex items-center ">
//             Shop By Category
//             <Button
//               onClick={() => setIsOpenedCategoryFilter(!isOpenedCategoryFilter)}
//               className="!border-3 !border-[#ff5252] !ml-auto !text-[#ff5252] !w-[30px] !h-[30px] !min-w-[30px] !rounded-full"
//             >
//               {isOpenedCategoryFilter === true ? (
//                 <FaAngleUp />
//               ) : (
//                 <FaAngleDown />
//               )}
//             </Button>
//           </h3>
//           <Collapse isOpened={isOpenedCategoryFilter}>
//             <div className="scroll px-4  relative -left-[13px] !ml-2">
//               {context?.catData?.length !== 0 &&
//                 context?.catData?.map((item, index) => {
//                   return (
//                     <FormControlLabel
//                       key={index}
//                       value={item?._id}
//                       control={<Checkbox />}
//                       checked={filters?.catId?.includes(item?._id)}
//                       label={item?.name}
//                       onChange={() => handleCheckBoxChange("catId", item?._id)}
//                       className="w-full"
//                     />
//                   );
//                 })}
//             </div>
//           </Collapse>
//         </div>

//         <div className="mt-4  box">
//           <h3 className="mb-3 !ml-1 text-[18px]  font-[600] flex items-center ">
//             Filter By Price
//           </h3>

//           <RangeSlider
//             value={price}
//             onInput={setPrice}
//             min={100}
//             max={60000}
//             step={5}
//           />
//           <div className="flex pt-4 pb-2 priceRange">
//             <span className="">
//               From : <strong className="text-dark">Rs: {price[0]}</strong>
//             </span>
//             <span className="ml-auto">
//               To : <strong className="text-dark">Rs: {price[1]}</strong>
//             </span>
//           </div>
//         </div>

//         <div className="mt-4  box">
//           <h3 className="mb-3 !ml-1 text-[20px]  font-[600] flex items-center ">
//             Filter By Rating
//           </h3>

//           <div className="flex pl-3 lg:pl-0 items-center">
//             <FormControlLabel
//               // key={index}
//               value={5}
//               control={<Checkbox />}
//               checked={filters?.rating?.includes(5)}
//               // label={item?.name}
//               onChange={() => handleCheckBoxChange("rating", 5)}
//               // className="w-full"
//             />
//             <Rating name="rating" value={5} size="small" readOnly />
//           </div>
//           <div className="flex pl-3 lg:pl-0 items-center">
//             <FormControlLabel
//               // key={index}
//               value={4}
//               control={<Checkbox />}
//               checked={filters?.rating?.includes(4)}
//               // label={item?.name}
//               onChange={() => handleCheckBoxChange("rating", 4)}
//               // className="w-full"
//             />
//             <Rating name="rating" value={3} size="small" readOnly />
//           </div>
//           <div className="flex pl-3 lg:pl-0 items-center">
//             <FormControlLabel
//               // key={index}
//               value={3}
//               control={<Checkbox />}
//               checked={filters?.rating?.includes(3)}
//               // label={item?.name}
//               onChange={() => handleCheckBoxChange("rating", 3)}
//               // className="w-full"
//             />
//             <Rating name="rating" value={3} size="small" readOnly />
//           </div>
//           <div className="flex pl-3 lg:pl-0 items-center">
//             <FormControlLabel
//               // key={index}
//               value={2}
//               control={<Checkbox />}
//               checked={filters?.rating?.includes(2)}
//               // label={item?.name}
//               onChange={() => handleCheckBoxChange("rating", 2)}
//               // className="w-full"
//             />
//             <Rating name="rating" value={2} size="small" readOnly />
//           </div>
//           <div className="flex pl-3 lg:pl-0 items-center">
//             <FormControlLabel
//               // key={index}
//               value={1}
//               control={<Checkbox />}
//               checked={filters?.rating?.includes(1)}
//               // label={item?.name}
//               onChange={() => handleCheckBoxChange("rating", 1)}
//               // className="w-full"
//             />
//             <Rating name="rating" value={1} size="small" readOnly />
//           </div>
//         </div>
//       </div>
//       <br />
//       <Button
//         onClick={() => context?.setOpenFilter(false)}
//         className="btn-org !flex lg:!hidden w-full "
//       >
//         <MdOutlineFilterAlt size={20} />
//         Filters{" "}
//       </Button>
//     </aside>
//   );
// };

// export default SideBar;
// {
//   /* <div className="mt-4 box">
//         <h3 className="mb-3 !ml-1 text-[20px]  font-[600] flex items-center ">
//           Availability
//           <Button
//             onClick={() =>
//               setIsOpenedAvailibilityFilter(!isOpenedAvailibilityFilter)
//             }
//             className="!border-3 !border-[#ff5252] !ml-auto !text-[#ff5252] !w-[30px] !h-[30px] !min-w-[30px] !rounded-full"
//           >
//             {isOpenedAvailibilityFilter === true ? (
//               <FaAngleUp />
//             ) : (
//               <FaAngleDown />
//             )}
//           </Button>
//         </h3>
//         <Collapse isOpened={isOpenedAvailibilityFilter}>
//           <div className="scroll px-4   relative -left-[13px] !ml-2">
//             <FormGroup>
//               <FormControlLabel
//                 control={<Checkbox size="small" />}
//                 label="Available (17)"
//                 className="w-full"
//               />
//               <FormControlLabel
//                 control={<Checkbox size="small" />}
//                 label="In Stock (19)"
//                 className="w-full"
//               />
//               <FormControlLabel
//                 control={<Checkbox size="small" />}
//                 label="Not Available (0)"
//                 className="w-full"
//               />
//             </FormGroup>
//           </div>
//         </Collapse>
//       </div> */
// }
// {
//   /* <div className="mt-4 box">
//         <h3 className="mb-3 !ml-1 text-[20px]  font-[600] flex items-center ">
//           Size
//           <Button
//             onClick={() => setIsOpenedSizeFilter(!isOpenedSizeFilter)}
//             className="!border-3 !border-[#ff5252] !ml-auto !text-[#ff5252] !w-[30px] !h-[30px] !min-w-[30px] !rounded-full"
//           >
//             {isOpenedSizeFilter === true ? <FaAngleUp /> : <FaAngleDown />}
//           </Button>
//         </h3>
//         <Collapse isOpened={isOpenedSizeFilter}>
//           <div className="scroll px-4   relative -left-[13px] !ml-2">
//             <FormGroup>
//               <FormControlLabel
//                 control={<Checkbox size="small" />}
//                 label="Small"
//                 className="w-full"
//               />
//               <FormControlLabel
//                 control={<Checkbox size="small" />}
//                 label="Medium"
//                 className="w-full"
//               />
//               <FormControlLabel
//                 control={<Checkbox size="small" />}
//                 label="Large"
//                 className="w-full"
//               />
//               <FormControlLabel
//                 control={<Checkbox size="small" />}
//                 label="XL"
//                 className="w-full"
//               />
//               <FormControlLabel
//                 control={<Checkbox size="small" />}
//                 label="XL++"
//                 className="w-full"
//               />
//             </FormGroup>
//           </div>
//         </Collapse>
//       </div> */
// }
import React, { useContext, useEffect, useState } from "react";
import { Collapse } from "react-collapse";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "../SideBar/style.css";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { myContext } from "../../App";
import { useLocation } from "react-router-dom";
import { fetchDataFromApi, postData } from "../../utils/api";
import { MdOutlineFilterAlt } from "react-icons/md";
import AdsBannerSlider from "../AdsBannerSlider";
import HomebannerV2 from "../HomeSliderV2";
import CatBannerPage from "../CatBanner";

const SideBar = (props) => {
  const [isOpenedCategoryFilter, setIsOpenedCategoryFilter] = useState(true);
  const [isOpenedSizeFilter, setIsOpenedSizeFilter] = useState(true);
  const [isOpenedAvailibilityFilter, setIsOpenedAvailibilityFilter] =
    useState(true);
  const context = useContext(myContext);
  const [filters, setFilters] = useState({
    catId: [],
    subCatId: [],
    thirdSubCatId: [],
    minPrice: "",
    maxPrice: "",
    rating: "",
    page: 1,
    limit: 25,
  });

  const location = useLocation();
  const [price, setPrice] = useState([0, 60000]);
  const handleCheckBoxChange = (field, value) => {
    context?.setSearchData([]);

    const currentValues = filters[field] || [];
    const updatedValues = currentValues?.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];
    setFilters((prev) => ({
      ...prev,
      [field]: updatedValues,
    }));

    if (field === "catId") {
      setFilters((prev) => ({
        ...prev,
        subCatId: [],
        thirdSubCatId: [],
      }));
    }
  };
  useEffect(() => {
    const url = window.location.href;

    const queryParameters = new URLSearchParams(location.search);

    if (url.includes("catId")) {
      const categoryId = queryParameters.get("catId");
      const catArr = [];
      catArr.push(categoryId);
      filters.catId = catArr;
      filters.subCatId = [];
      filters.thirdSubCatId = [];
      filters.rating = [];
      context?.setSearchData([]);
    }
    if (url.includes("subCatId")) {
      const subcategoryId = queryParameters.get("subCatId");
      const subcatArr = [];
      subcatArr.push(subcategoryId);
      filters.catId = [];
      filters.subCatId = subcatArr;
      filters.thirdSubCatId = [];
      filters.rating = [];
      context?.setSearchData([]);
    }
    if (url.includes("thirdLevelCatId")) {
      const thirdcategoryId = queryParameters.get("thirdLevelCatId");
      const thirdcatArr = [];
      thirdcatArr.push(thirdcategoryId);
      filters.catId = [];
      filters.subCatId = [];
      filters.thirdSubCatId = thirdcatArr;
      filters.rating = [];
      context?.setSearchData([]);
    }

    filters.page = 1;

    setTimeout(() => {
      filtersData();
    }, 200);

    // context?.setSearchData([])
  }, [location]);

  // useEffect(() => {
  //   const queryParameters = new URLSearchParams(location.search);

  //   const categoryId = queryParameters.get("catId");
  //   const subcategoryId = queryParameters.get("subCatId");
  //   const thirdcategoryId = queryParameters.get("thirdLevelCatId");

  //   setFilters((prev) => ({
  //     ...prev,
  //     catId: categoryId ? [categoryId] : [],
  //     subCatId: subcategoryId ? [subcategoryId] : [],
  //     thirdSubCatId: thirdcategoryId ? [thirdcategoryId] : [],
  //     rating: [],
  //     page: 1,
  //   }));

  //   setTimeout(() => {
  //     filtersData();
  //   }, 200);
  // }, [location]);
  const [catBannerData, setCatBannerData] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    fetchDataFromApi("/api/catBanner").then((res) => {
      console.log("data banner", res);
      setCatBannerData(res?.data);
    });
  }, []);
  const filtersData = () => {
    props?.setIsLoading(true);
    console.log("search data", context?.searchData);

    if (context?.searchData?.products?.length > 0) {
      props?.setProductsData(context?.searchData?.products || []);
      props.setIsLoading(false);
      props.setTotalPages(context?.searchData?.totalPages || 1);

      window.scrollTo(0, 0);
    } else {
      postData(`/api/product/filters`, filters).then((res) => {
        props?.setProductsData(res?.products || []);

        props.setIsLoading(false);
        props.setTotalPages(res?.totalPages);
        window.scrollTo(0, 0);
      });
    }
  };

  useEffect(() => {
    setFilters((prev) => ({ ...prev, page: props.page }));
  }, [props.page]);

  useEffect(() => {
    filtersData();
  }, [filters]);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      minPrice: price[0],
      maxPrice: price[1],
    }));
  }, [price]);

  return (
    <aside className="sidebar  lg:sticky top-[130px] z-[50] pr-0 lg:pr-5 py-3 lg:py-5">
      {" "}
      {console.log("filters", filters)}{" "}
      <div className=" max-h-[60vh] lg:overflow-hidden overflow-auto w-full">
        {/* Fixed: lg max-h calc for sticky viewport fit, lg:overflow-y-auto for internal scroll */}
        <div className="box">
          <h3 className="mb-3 !ml-1 text-[20px] font-[600] flex items-center ">
            Shop By Category
            <Button
              onClick={() => setIsOpenedCategoryFilter(!isOpenedCategoryFilter)}
              className="!border-3 !border-[#ff5252] !ml-auto !text-[#ff5252] !w-[30px] !h-[30px] !min-w-[30px] !rounded-full"
            >
              {isOpenedCategoryFilter === true ? (
                <FaAngleUp />
              ) : (
                <FaAngleDown />
              )}
            </Button>
          </h3>
          <Collapse isOpened={isOpenedCategoryFilter}>
            <div className="scroll px-4  relative -left-[13px] !ml-2">
              {context?.catData?.length !== 0 &&
                context?.catData?.map((item, index) => {
                  return (
                    <FormControlLabel
                      key={index}
                      value={item?._id}
                      control={<Checkbox />}
                      checked={filters?.catId?.includes(item?._id)}
                      label={item?.name}
                      onChange={() => handleCheckBoxChange("catId", item?._id)}
                      className="w-full"
                    />
                  );
                })}
            </div>
          </Collapse>
        </div>
        <div className="mt-4  box">
          <h3 className="mb-3 !ml-1 text-[18px]  font-[600] flex items-center ">
            Filter By Price
          </h3>

          <RangeSlider
            value={price}
            onInput={setPrice}
            min={100}
            max={60000}
            step={5}
          />
          <div className="flex pt-4 pb-2 priceRange">
            <span className="">
              From : <strong className="text-dark">Rs: {price[0]}</strong>
            </span>
            <span className="ml-auto">
              To : <strong className="text-dark">Rs: {price[1]}</strong>
            </span>
          </div>
        </div>
        <div className="mt-4  box">
          <h3 className="mb-3 !ml-1 text-[20px]  font-[600] flex items-center ">
            Filter By Rating
          </h3>

          <div className="flex pl-3 lg:pl-0 items-center">
            <FormControlLabel
              // key={index}
              value={5}
              control={<Checkbox />}
              checked={filters?.rating?.includes(5)}
              // label={item?.name}
              onChange={() => handleCheckBoxChange("rating", 5)}
              // className="w-full"
            />
            <Rating name="rating" value={5} size="small" readOnly />
          </div>
          <div className="flex pl-3 lg:pl-0 items-center">
            <FormControlLabel
              // key={index}
              value={4}
              control={<Checkbox />}
              checked={filters?.rating?.includes(4)}
              // label={item?.name}
              onChange={() => handleCheckBoxChange("rating", 4)}
              // className="w-full"
            />
            <Rating name="rating" value={3} size="small" readOnly />
          </div>
          <div className="flex pl-3 lg:pl-0 items-center">
            <FormControlLabel
              // key={index}
              value={3}
              control={<Checkbox />}
              checked={filters?.rating?.includes(3)}
              // label={item?.name}
              onChange={() => handleCheckBoxChange("rating", 3)}
              // className="w-full"
            />
            <Rating name="rating" value={3} size="small" readOnly />
          </div>
          <div className="flex pl-3 lg:pl-0 items-center">
            <FormControlLabel
              // key={index}
              value={2}
              control={<Checkbox />}
              checked={filters?.rating?.includes(2)}
              // label={item?.name}
              onChange={() => handleCheckBoxChange("rating", 2)}
              // className="w-full"
            />
            <Rating name="rating" value={2} size="small" readOnly />
          </div>
          <div className="flex pl-3 lg:pl-0 items-center">
            <FormControlLabel
              // key={index}
              value={1}
              control={<Checkbox />}
              checked={filters?.rating?.includes(1)}
              // label={item?.name}
              onChange={() => handleCheckBoxChange("rating", 1)}
              // className="w-full"
            />
            <Rating name="rating" value={1} size="small" readOnly />
          </div>
        </div>
      </div>
      {/* -------- DESKTOP ONLY ADS -------- */}
 {props?.productsData?.length > 0 && (
  <div 
    className={`mt-4 bg-red-100 overflow-hidden lg:overflow-auto ${
      props.productsData.length > 10 ? 'h-[800px] max-h-[800px]' : 'h-[400px] max-h-[400px]'
    }`}
  >
    <CatBannerPage 
      data={catBannerData} 
      maxItems={
        props.productsData.length <= 5 ? 1 :
        props.productsData.length < 10 ? 3 :
        undefined  // Render all for >10, constrained by h-screen scroll
      }
    />
  </div>
)}


      {/* ------ END DESKTOP ADS ------ */}
      <br />
      <Button
        onClick={() => context?.setOpenFilter(false)}
        className="btn-org !flex lg:!hidden w-full "
      >
        <MdOutlineFilterAlt size={20} />
        Filters{" "}
      </Button>
    </aside>
  );
};

export default SideBar;
