import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BannerboxV2 = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const repeatInterval = 4000; // Adjust this for every few seconds (e.g., 4000ms = 4s)
  const animationDuration = 1000; // Matches your transition duration
  const pauseAfterOut = 200; // Brief pause after slide-out before next in (ms)

  useEffect(() => {
    let isFirst = true;

    const cycle = () => {
      if (isFirst) {
        setIsVisible(true);
        isFirst = false;
      } else {
        setIsVisible(false); // Start slide-out
        setTimeout(() => setIsVisible(true), animationDuration + pauseAfterOut); // Slide in after out completes + pause
      }
    };

    // Start first animation after short delay
    const initialTimer = setTimeout(cycle, 100);

    // Repeat every interval
    const interval = setInterval(cycle, repeatInterval);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  const isLeft = props.info === "left";
  const slideDirection = isLeft ? "-translate-x-full" : "translate-x-full";
  const slideTo = "translate-x-0";
  const textAlignClass = isLeft
    ? "items-start pl-4 pr-0"
    : "items-end pr-4 pl-0";
  const textPositionClass = isLeft ? "left-0" : "right-0";

  return (
    <div className="bannerBoxV2 box w-full group overflow-hidden relative rounded-md">
      <img
        src={props.image}
        className="w-full group-hover:scale-105 transition-all duration-150"
        alt=""
      />

      <div
        className={`info flex flex-col gap-2 justify-center absolute pt-2.5 top-0 ${textPositionClass} ${textAlignClass} w-[60%] h-[100%] z-50`}
      >
        <h2
          className={`text-[14px] cursor-pointer md:text-[18px] font-[600] flex items-start transition-all duration-1000 delay-[200ms] transform ${
            isVisible ? slideTo : slideDirection
          } ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          {props?.item?.bannerTitle}
        </h2>
        <span
          className={`text-[20px] !text-primary cursor-pointer font-[600] transition-all duration-1000 delay-[400ms] transform ${
            isVisible ? slideTo : slideDirection
          } ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          {Number(props?.item?.price || 0).toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
          })}
        </span>
        <div
          className={`transition-all cursor-pointer duration-1000 delay-[600ms] transform ${
            isVisible ? slideTo : slideDirection
          } ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          <Link  className="no-underline btn btn-org  link text-[20px] font-[600]" >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BannerboxV2;
