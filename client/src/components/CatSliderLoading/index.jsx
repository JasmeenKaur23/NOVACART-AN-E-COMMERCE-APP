import React from "react";

const CatSliderLoading = () => {
  return (
    <div  className="homeCatSlider py-4 lg:py-8 pt-0 lg:pt-4"> {/* Exact outer classes from HomeCatSlider */}
      <div className="container-fluid mx-auto px-2 flex items-center justify-center w-full"> {/* Exact container classes */}
        <div className="w-[100%] overflow-hidden"> {/* Mimics Swiper wrapper; overflow-hidden prevents scroll during load */}
          {/* Flex row with exact spaceBetween=5px via gap-1 (Tailwind gap-1=4px, close; or custom gap-[5px] if Tailwind supports */}
          <div  className="flex flex-nowrap gap-[5px] px-2 animate-pulse justify-start"> {/* flex-nowrap ensures row; justify-start to left-align like Swiper if many items; animate-pulse on whole for unified, but stagger per item */}
            {/* 7 placeholders to match your "7 columns" */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="item py-4 lg:py-7 px-3 flex text-center items-center justify-center flex-col bg-white rounded-sm flex-shrink-0" // Exact "item" classes from real; flex-shrink-0 prevents merge/squish
                style={{ 
                  width: '180px', // Fixed width for consistent 7-column fit (adjust to ~70-90px based on your container width / 7 - gaps; e.g., 600px container /7 ~85px)
                  minHeight: '150px', // Approx total item height: img 40-60 + text 12-14 + py-4/7 (16-28px top/bot) + gaps
                  animationDelay: `${i * 0.15}s` // Staggered delay for individual "fade-in" effect
                }}
              >
                {/* Individual img placeholder: exact size, rounded for icon feel */}
                <div 
                  className="mb-1 bg-gray-300 rounded-full animate-pulse" 
                  style={{ width: '60px', height: '60px' }} // Base size; lg: will be handled by parent lg:py, but for precision add media if needed
                />
                
                {/* Individual text placeholder: short bar below img, matching h5 width ~ name length */}
                <div 
                  className="h-[12px] bg-gray-300 rounded animate-pulse mt-1" 
                  style={{ width: '50px' }} // Approx text width for short names like "Bags"; make wider (48px) if longer names
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatSliderLoading;