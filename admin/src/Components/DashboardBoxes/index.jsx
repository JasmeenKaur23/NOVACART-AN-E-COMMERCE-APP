import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation"; // ✅ Add this line
import "swiper/css/free-mode"; // ✅ Add this line
import { IoGiftOutline } from "react-icons/io5";
import { FiPieChart } from "react-icons/fi";
import { IoStatsChartSharp } from "react-icons/io5";
import { AiOutlinePieChart } from "react-icons/ai";
import { BsBank } from "react-icons/bs";
import { FaProductHunt } from "react-icons/fa";
// Import required modules
import { Navigation, FreeMode } from "swiper/modules";
import { useContext } from "react";
import { MyContext } from "../../App";
import PlaceholderBox from "../DashboardSkeleton";

const DashboardBoxes = (props) => {
  const context = useContext(MyContext);
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        navigation={context?.windowWidth < 1100 ? false : true}
        modules={[Navigation, FreeMode]}
        className="dashboardBoxesSlider"
        freeMode={true}
        breakpoints={{
          300: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          550: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          900: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1100: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
      >
        {props.isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <SwiperSlide key={i}>
              <PlaceholderBox />
            </SwiperSlide>
          ))
        ) : (
          <>
            <SwiperSlide>
              <div className="box bg-[rgb(52,189,110)] p-5 cursor-pointer rounded-md border flex items-center gap-4  border-[rgba(0,0,0,0.2)]">
                <FiPieChart className="text-white text-[40px] " />
                <div className="info  w-[70%]">
                  <h4 className="text-white">Total Users</h4>
                  <b className="text-white text-[20px]">{props?.users}</b>
                </div>
                <IoStatsChartSharp className="text-[50px] text-white" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="box bg-[rgb(218,69,243)] p-5 cursor-pointer rounded-md border flex items-center gap-4  border-[rgba(0,0,0,0.2)]">
                <AiOutlinePieChart className="text-white text-[50px]  " />
                <div className="info  w-[70%] ">
                  <h4 className="text-white">Total Orders</h4>
                  <b className="text-white text-[20px]">{props?.orders}</b>
                </div>
                <IoStatsChartSharp className="text-[50px] text-white" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="box bg-[#408ae0] p-5 cursor-pointer  rounded-md border flex items-center gap-4  border-[rgba(0,0,0,0.2)]">
                <BsBank className="text-[40px] text-white" />
                <div className="info  w-[70%]">
                  <h4 className="text-white">Total products</h4>
                  <b className=" text-white text-[20px]">{props?.products}</b>
                </div>
                <IoStatsChartSharp className="text-[50px] text-white " />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="box bg-[#e1960e] p-5 cursor-pointer  rounded-md border flex items-center gap-4  border-[rgba(0,0,0,0.2)]">
                <FaProductHunt className="text-[40px] text-white" />
                <div className="info  w-[70%]">
                  <h4 className="text-white">Total Categories</h4>
                  <b className="text-white text-[20px]">{props?.category}</b>
                </div>
                <IoStatsChartSharp className="text-[50px] text-white " />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="box bg-[#6e22baaa] p-5 cursor-pointer  rounded-md border flex items-center gap-4  border-[rgba(0,0,0,0.2)]">
                <IoGiftOutline className="text-[30px] text-white" />
                <div className="info  w-[70%]">
                  <h4 className="text-white">Total Reviews</h4>
                  <b className="text-white text-[20px]">{props?.reviews}</b>
                </div>
                <IoStatsChartSharp className="text-[50px] text-white" />
              </div>
            </SwiperSlide>
          </>
        )}
      </Swiper>
    </>
  );
};

export default DashboardBoxes;
