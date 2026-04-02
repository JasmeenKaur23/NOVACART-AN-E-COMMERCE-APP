// import React, { useState } from "react";
// import HomeSlider from "../../components/HomeSlider";
// import HomeCatSlider from "../../components/HomeCatSlider";
// import { LiaShippingFastSolid } from "react-icons/lia";
// import AdsBannerSlider from "../../components/AdsBannerSlider";

// import Tabs from "@material/Tabs";
// import Tab from "@material-ui/core/Tab";

// // import Box from "@material-ui/core/Box";

// const Home = () => {
//   const classes = useStyles();
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };
//   return (
//     <>
//       <div className="bg-[#e9e8e8] min-h-screen">
//         <HomeSlider />
//         <HomeCatSlider />

//         <section className="bg-white py-8">
//           <div className="container">
//             <div className="items-center flex justify-between">
//               <div className="leftSec">
//                 <h3>Popular Products</h3>
//                 <p className="text-[18px]">
//                   Do not miss the current offers until the end of this Month
//                 </p>
//               </div>

//               <div className="rightSec">
//                 <Tabs
//                   value={value}
//                   onChange={handleChange}
//                   indicatorColor="primary"
//                   textColor="primary"
//                   variant="scrollable"
//                   scrollButtons="auto"
//                   aria-label="scrollable auto tabs example"
//                 >
//                   <Tab label="Item One" {...a11yProps(0)} />
//                   <Tab label="Item Two" {...a11yProps(1)} />
//                   <Tab label="Item Three" {...a11yProps(2)} />
//                   <Tab label="Item Four" {...a11yProps(3)} />
//                   <Tab label="Item Five" {...a11yProps(4)} />
//                   <Tab label="Item Six" {...a11yProps(5)} />
//                   <Tab label="Item Seven" {...a11yProps(6)} />
//                 </Tabs>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section className="py-5 px-3 mt-5 bg-white">
//           <div className="container-fluid flex flex-col items-center justify-center ">
//             <div className="freeShipping mb-7 w-[90%] p-2 px-4 border-2 flex items-center justify-between border-[#ff5252]">
//               <div className="col1 flex items-center gap-4">
//                 <LiaShippingFastSolid size={56} />
//                 <span className="text-[20px] font-[600] uppercase">
//                   Free Shipping
//                 </span>
//               </div>
//               <div className="col2 flex items-center">
//                 <span className="text-[20px] font-[500]">
//                   Free Delivery now on your first Order and over $200
//                 </span>
//               </div>
//               <span className="font-bold text-[30px]">Only $200</span>
//             </div>

//             <AdsBannerSlider items={4} />
//           </div>
//         </section>
//         <br />
//         <br />
//         <br />
//         <br />
//         <br />
//         <br />
//         <br />
//         <br />
//       </div>
//       ;
//     </>
//   );
// };

// export default Home;
import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { Navigation, FreeMode } from "swiper/modules";
import { Link } from "react-router-dom";
import HomeSlider from "../../components/HomeSlider";
import HomeCatSlider from "../../components/HomeCatSlider";
import AdsBannerSlider from "../../components/AdsBannerSlider";
import AdsBannerSliderV2 from "../../components/AdsBannerSliderV2";
import { LiaShippingFastSolid } from "react-icons/lia";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ProductSlider from "../../components/ProductSlider";
import BlogItem from "../../components/BlogItem";
import Footer from "../../components/Footer";
import HomebannerV2 from "../../components/HomeSliderV2";
import BannerboxV2 from "../../components/bannerBoxV2";
import { fetchDataFromApi } from "../../utils/api";
import { myContext } from "../../App";
import ProductLoading from "../../components/ProductLoading";
import BannerLoading from "../../components/LoadingSkeleton/bannerLoading";

// Accessible props helper for tabs
function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const Home = () => {
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [homeSlidesData, setHomeSlidesData] = useState([]);
  const [popularProductsData, setPopularProductsData] = useState([]);
  const [productsData, setAllProductsData] = useState([]);
  const [featuredProduct, setFeaturedProducts] = useState([]);
  const context = useContext(myContext);
  const [blogData, setBlogData] = useState([]);
  const [bannerV1Data, setBannerV1Data] = useState([]);
  const [bannerList2Data, setBannerList2Data] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDataFromApi("/api/homeSlides").then((res) => {
      console.log(res);
      setHomeSlidesData(res?.data);
    });
    fetchDataFromApi("/api/product/getAllProducts").then((res) => {
      console.log("data res product all ", res);
      setAllProductsData(res?.products);
    });
    fetchDataFromApi("/api/product/getAllFeaturedProducts").then((res) => {
      console.log("data featured ", res);
      setFeaturedProducts(res?.products);
    });
    fetchDataFromApi("/api/blog").then((res) => {
      console.log("data featured ", res);
      setBlogData(res?.blogs);
    });

    fetchDataFromApi("/api/bannerList2").then((res) => {
      console.log("data featured ", res);
      setBannerList2Data(res?.data);
    });

    fetchDataFromApi("/api/bannerV1").then(
      (res) => {
        console.log("banner", res);

        // let arr = [];
        // if (res?.error === false) {
        //   for (let i = 0; i < res?.data?.length; i++) {
        //     arr[i] = res?.data;
        //     // arr[i].checked = false;
        //     console.log(arr[i]);
        //   }
        //   setTimeout(() => {
        setBannerV1Data(res?.data);
        //   setIsLoading(false);
        // }, 1000);
        //  console.log(productArr);
      }

      //   setTimeout(() => {
      //     console.log(slidesData);
      //   }, 3000);
    );
  }, []);

  useEffect(() => {
    // Only run if catData exists and has at least one entry
    if (context?.catData && context.catData.length > 0) {
      console.log("Fetching products for:", context.catData[0]._id);

      fetchDataFromApi(
        `/api/product/getAllProductsByCatId/${context.catData[0]._id}`
      ).then((res) => {
        if (res?.error === false) {
          setPopularProductsData(res.products);
        } else {
          console.warn("No products found for:", context.catData[0]._id);
        }
      });
    }
  }, [context?.catData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const filterByCatId = (id) => {
    setPopularProductsData([]);
    fetchDataFromApi(`/api/product/getAllProductsByCatId/${id}`).then((res) => {
      if (res?.error === false) {
        setPopularProductsData(res?.products);
      } else {
        // clear old data so nothing shows
        setPopularProductsData([]);
      }
    });
  };

  return (
    <>
      <div className="relative min-h-max lg:min-h-[65vh]">
        {homeSlidesData?.length !== 0 && <HomeSlider data={homeSlidesData} />}
        <div className="bg-[#f9e8e8] ">
          {context?.catData?.length !== 0 && (
            <HomeCatSlider data={context?.catData} />
          )}
          <BannerLoading />
        </div>

        {/* ---------- Popular Products Section ---------- */}
        <section className="bg-white py-8">
          <div className="container-fluid">
            <div className="flex items-center justify-between flex-col lg:flex-row gap-4">
              <div className="leftSec w-full lg:w-[40%]">
                <h3 className="text-[16px] sm:text-[16px] md:text-[18px] lg:text-[22px] font-bold">
                  Popular Products
                </h3>
                <p className="text-[14px] sm:text-[16px] md:text-[16px] lg:text-[18px] !mt-0 !mb-0 text-gray-600">
                  Do not miss the current offers until the end of this Month
                </p>
              </div>

              <div className="rightSec w-full md:w-auto">
                <div className="rightSec w-full md:w-auto overflow-x-auto">
                  <Box
                    sx={{
                      borderBottom: 1,
                      borderColor: "divider",
                      maxWidth: { xs: "100%", md: 600 }, // Controls when overflow happens
                    }}
                  >
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      variant="scrollable"
                      // scrollButtons="auto"
                      // allowScrollButtonsMobile
                      indicatorColor="primary"
                      textColor="primary"
                      aria-label="scrollable auto tabs"
                      sx={{
                        "& .MuiTabs-scrollButtons": {
                          color: "#000",
                          opacity: 1, // ensures visible buttons
                        },
                        "& .MuiTabs-scrollButtons.Mui-disabled": {
                          opacity: 0.3, // show faded look when disabled
                        },
                      }}
                    >
                      {context?.catData?.length !== 0 &&
                        context?.catData?.map((cat, index) => {
                          return (
                            <Tab
                              label={cat?.name}
                              onClick={() => filterByCatId(cat?._id)}
                              {...a11yProps(index)}
                            />
                          );
                        })}
                    </Tabs>
                  </Box>
                </div>
              </div>
            </div>
            <div className="min-h-[60vh]">
              {popularProductsData?.length === 0 && <ProductLoading />}

              {popularProductsData?.length !== 0 && (
                <ProductSlider data={popularProductsData} items={6} />
              )}
            </div>
          </div>
        </section>

        <section className="py-6   pt-0">
          <div className="container flex-col lg:flex-row gap-5 flex">
            {/* Left: Main Banner */}
            <div className="part1 w-full lg:w-[70%]">
              {productsData.length !== 0 && (
                <HomebannerV2 data={productsData} />
              )}
            </div>

            {/* Right: Banner Box */}
            <div className=" part2 scrollableBox w-full lg:w-[30%] flex-row lg:flex-col flex items-center gap-5   justify-between">
              <BannerboxV2
                info={bannerV1Data[bannerV1Data?.length - 1]?.alignInfo}
                image={bannerV1Data[bannerV1Data?.length - 1]?.images[0]}
                item={bannerV1Data[bannerV1Data?.length - 1]}
              />
              <BannerboxV2
                info={bannerV1Data[bannerV1Data?.length - 2]?.alignInfo}
                image={bannerV1Data[bannerV1Data?.length - 2]?.images[0]}
                item={bannerV1Data[bannerV1Data?.length - 2]}
              />
            </div>
          </div>
        </section>

        {/* ---------- Free Shipping Banner ---------- */}
        <section className="py-0 lg:py-4 pt-0 lg:pt-8 !pb-0  ">
          <div className="container-fluid flex flex-col items-center justify-center">
            <div className="freeShipping flex-col lg:flex-row mb-7 w-full md:w-[80%] p-2 px-4 border-2 flex items-center justify-center lg:justify-between border-[#ff5252]">
              <div className="col1 flex items-center gap-4">
                <LiaShippingFastSolid className="text-[30px] lg:text-[50px]" />
                <span className="text-[16px] lg:text-[20px] font-[600] uppercase">
                  Free Shipping
                </span>
              </div>
              <div className="col2 flex items-center">
                <span className="text-[20px] text-center font-[500]">
                  Free Delivery now on your first Order and over $200
                </span>
              </div>
              <span className="font-bold text-[20px] lg:text-[25px]">
                Only $200
              </span>
            </div>
            {bannerV1Data?.length !== 0 && (
              <AdsBannerSlider items={4} data={bannerV1Data} />
            )}
            {bannerV1Data?.length !== 0 && (
              <AdsBannerSliderV2 data={bannerV1Data} items={4} />
            )}
          </div>
        </section>

        <section className="py-4 !pt-0 mt-2 bg-white">
          <div className="container">
            <div className="leftSec ">
              <h3 className="text-[24px] font-bold">Latest Products</h3>
            </div>
            {productsData?.length === 0 && <ProductLoading />}
            {productsData?.length !== 0 && (
              <ProductSlider data={productsData} items={6} />
            )}

            <AdsBannerSlider items={3} />
          </div>
        </section>

        <section className="py-2 lg:py-4 !pt-0 mt-2 bg-white">
          <div className="container ">
            <div className="leftSec ">
              <h3 className="text-[24px] font-bold">Featured Products</h3>
            </div>
            {featuredProduct?.length === 0 && <ProductLoading />}
            {featuredProduct?.length !== 0 && (
              <ProductSlider data={featuredProduct} items={6} />
            )}

            {/* <ProductSlider items={6} /> */}
            {bannerList2Data?.length !== 0 && (
              <AdsBannerSliderV2 data={bannerList2Data} items={3} />
            )}
          </div>
        </section>
        {blogData?.length !== 0 && (
          <section className="py-5 pb-8 pt-0 bg-white blogSection">
            <div className=" container ">
              <h3 className="text-[24px] mb-4 font-bold">From the Blog</h3>

              <Swiper
                slidesPerView={4}
                spaceBetween={30}
                modules={[Navigation, FreeMode]}
                        navigation={context?.windowWidth < 992 ? false : true}
                        freeMode={true}
                className="blogSlider !overflow-x-scroll"
                 breakpoints={{
            250: { slidesPerView: 1, spaceBetween: 10 },
            350: { slidesPerView: 1, spaceBetween: 10 },
            500: { slidesPerView: 2, spaceBetween: 20 },
            900: { slidesPerView: 3, spaceBetween: 20 },
            1100: { slidesPerView: 4, spaceBetween: 30 },
          }}
              >
                {blogData?.map((item, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <BlogItem item={item} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default Home;
