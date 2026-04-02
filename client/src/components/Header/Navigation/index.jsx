// import React, {  useContext, useEffect, useState } from "react";
// import Button from "@mui/material/Button";
// import { RiMenu2Fill } from "react-icons/ri";
// import { LiaAngleDownSolid } from "react-icons/lia";
// import { Link } from "react-router-dom";
// import CategoryPanel from "./Categorypanel";
// import "../Navigation/style.css";
// import { fetchDataFromApi } from "../../../utils/api.js";
// import Login from "../../../Pages/Login";
// import { myContext } from "../../../App.jsx";

// const Navigation = () => {
//   const [isOpenCategoryPanel, setIsOpenCategoryPanel] = useState(false);
//   const [catData, setCatData] = useState([]);
//   const context=useContext(myContext)
//   useEffect(() => {

//         setCatData(context?.catData);

//   }, [context?.catData]);
//   const openCategoryPanel = () => {
//     setIsOpenCategoryPanel(true);
//   };

//   return (
//     <>
//       <nav className="!bg-white !py-2">
//         <div className="container-fluid  flex items-center justify-end gap-8">
//           {/* Column 1: Shop By Categories */}
//           <div className="col_1 w-[20%] flex items-center">
//             <Button
//               onClick={openCategoryPanel}
//               className="text-black gap-2 w-full justify-start normal-case"
//             >
//               <RiMenu2Fill className="text-[18px]" />
//               Shop By Categories
//               <LiaAngleDownSolid className="text-[14px] cursor-pointer ml-auto" />
//             </Button>
//           </div>

//           {/* Column 2: Navigation Links */}
//           <div className="col_2  flex items-center w-[80%] h-[35px] rounded-md">
//             <ul className="flex  nav items-center gap-4 h-full px-5 rounded-md">
//               {/* ✅ HOME */}
//               <li>
//                 <Link to="/product-listing">
//                   <Button className="!text-[rgba(0,0,0,0.9)] !py-1 !text-center flex justify-center items-center   hover:!text-[#ff5252] !text-[14px] !font-[500]">
//                     Home
//                   </Button>
//                 </Link>
//               </li>

//               {catData?.length !== 0 &&
//                 catData?.map((cat, index) => {
//                   return (
//                     <li key={index} className="relative list-none group">
//                       <Link
//                         className="link transition"
//                         to="/product-details/jghr7"
//                       >
//                         <Button className="!text-[rgba(0,0,0,0.9)] w-full !text-left !justify-start hover:!text-[#ff5252] !text-[14px] !font-[500]">
//                           {cat?.name}
//                         </Button>
//                       </Link>

//                       {cat?.children?.length !== 0 && (
//                         <div className="submenu absolute !top-[120%] left-[0%] transition-all opacity-0 min-w-[150px] bg-white">
//                           <ul>
//                             {cat?.children?.map((subCat, index_) => {
//                               return (
//                                 <li
//                                   key={index_}
//                                   className="relative w-full group"
//                                 >
//                                   <Link to="/product-listing">
//                                     <Button className="!text-[rgba(0,0,0,0.9)] w-full !text-left !justify-start hover:!text-[#ff5252] !text-[14px] !font-[500]">
//                                       {subCat?.name}
//                                     </Button>
//                                   </Link>
//                                   {/* //position should be chnaged */}

//                                   {subCat?.children?.length !== 0 && (
//                                     <div className="submenu absolute !top-[0%] !left-[100%] transition-all opacity-0 min-w-[150px] bg-white">
//                                       <ul>
//                                         {subCat?.children?.map(
//                                           (thirdLevelCat, index__) => {
//                                             return (
//                                               <li
//                                                 key={index__}
//                                                 className="list-none w-full "
//                                               >
//                                                 <Link
//                                                   to="/product-listing"
//                                                   className="w-full link"
//                                                 >
//                                                   <Button className="!text-[rgba(0,0,0,0.9)] w-full !text-left !justify-start hover:!text-[#ff5252] !text-[14px] !font-[500]">
//                                                     {thirdLevelCat?.name}
//                                                   </Button>
//                                                 </Link>
//                                               </li>
//                                             );
//                                           }
//                                         )}
//                                       </ul>
//                                     </div>
//                                   )}

//                                   {/* Nested submenu for MEN */}
//                                 </li>
//                               );
//                             })}

//                             {/* ✅ MEN — has nested submenu */}
//                           </ul>
//                         </div>
//                       )}
//                       {/* Main Submenu */}
//                     </li>
//                   );
//                 })}

//               {/* ✅ FASHION with submenu */}
//             </ul>
//           </div>
//         </div>
//       </nav>

//       {/* Drawer Panel */}
//       {
//         catData?.length !==0 &&

//       <CategoryPanel
//         isOpenCategoryPanel={isOpenCategoryPanel}
//         setIsOpenCategoryPanel={setIsOpenCategoryPanel}
//         data={catData}
//       />
//       }
//     </>
//   );
// };

// export default Navigation;

import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { RiMenu2Fill } from "react-icons/ri";
import { LiaAngleDownSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import CategoryPanel from "./Categorypanel";
import "../Navigation/style.css";
import { myContext } from "../../../App.jsx";
import MobileNav from "./mobileNav.jsx";
import { GoRocket } from "react-icons/go";

const Navigation = (props) => {
  const [isOpenCategoryPanel, setIsOpenCategoryPanel] = useState(false);
  const [catData, setCatData] = useState([]);
  const context = useContext(myContext);

  useEffect(() => {
    if (context?.catData) {
      setCatData(context.catData);
    }
  }, [context?.catData]);

  useEffect(() => {
    setIsOpenCategoryPanel(props?.isOpenCategoryPanel);
  }, [props?.isOpenCategoryPanel]);

  const openCategoryPanel = () => {
    setIsOpenCategoryPanel(true);
    props?.setIsOpenCategoryPanel?.(true);
  };

  return (
    <>
      <nav className="!bg-white navigation !py-0">
        <div className="container-fluid flex items-center justify-start lg:justify-end gap-4">
          {/* LEFT COLUMN */}
          {context?.windowWidth > 992 && (
            <div className="col_1 w-[20%] flex items-center">
              <Button
                onClick={openCategoryPanel}
                className="text-black gap-2 w-full justify-start normal-case"
              >
                <RiMenu2Fill className="text-[18px]" />
                Shop By Categories
                <LiaAngleDownSolid className="text-[14px] ml-auto" />
              </Button>
            </div>
          )}

          {/* CENTER COLUMN */}
          <div className="col_2 w-full lg:w-[60%]">
            <ul className="flex nav items-center gap-4">
              {/* HOME */}
              <li className="list-none">
                <Link to="/" className="link">
                  <Button className="!text-[rgba(0,0,0,0.9)] hover:!text-[#ff5252]">Home</Button>
                </Link>
              </li>

              {/* CATEGORY LOOP */}
              {catData?.slice(0, 6)?.map((cat, index) => (
                <li key={index} className="relative list-none group">
                  {/* MAIN CATEGORY */}
                  <Link to={`/product-listing?catId=${cat._id}`}>
                    <Button className="!text-[rgba(0,0,0,0.9)]  w-full !justify-start flex !items-start hover:!text-[#ff5252] !text-[14px] font-[500]">
                      {cat.name}
                    </Button>
                  </Link>

                  {/* SUBMENU */}
                  {cat?.children?.length > 0 && (
                    <div className="submenu absolute  top-[120%] left-0 opacity-0  z-50">
                      <ul>
                        {cat.children.map((subCat, subIndex) => (
                          <li key={subIndex} className="relative group">
                            <Link
                              to={`/product-listing?subCatId=${subCat._id}`}
                            >
                              <Button className="w-full text-left  hover:text-[#ff5252]">
                                {subCat.name}
                              </Button>
                            </Link>

                            {/* THIRD LEVEL */}
                            {subCat?.children?.length > 0 && (
                            <div className="submenu absolute !top-[0%] !left-[100%] transition-all opacity-0 min-w-[150px] bg-white">  
                                <ul>
                                  {subCat.children.map((third, thirdIndex) => (
                                    <li key={thirdIndex}>
                                      <Link
                                        to={`/product-listing?thirdLevelCatId=${third._id}`}
                                      >
                                        <Button className="w-full text-left hover:text-[#ff5252]">
                                          {third.name}
                                        </Button>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}

              {/* MORE BUTTON */}
              {catData.length > 5 && (
                <li className="list-none">
                  <Button
                    onClick={openCategoryPanel}
                    className="!text-[rgba(0,0,0,0.9)] hover:!text-[#ff5252]"
                  >
                    More Categories
                  </Button>
                </li>
              )}
            </ul>
          </div>

          {/* RIGHT COLUMN */}
          <div className="col_3 w-[20%] hidden lg:block">
            <p className="text-[14px] font-[500] flex items-center gap-2">
              <GoRocket className="text-[18px]" />
              Free International Delivery
            </p>
          </div>
        </div>
      </nav>

      {/* CATEGORY PANEL */}
      {catData?.length > 0 && (
        <CategoryPanel
          isOpenCategoryPanel={isOpenCategoryPanel}
          setIsOpenCategoryPanel={setIsOpenCategoryPanel}
          data={catData}
        />
      )}

      {/* MOBILE MENU */}
      {context?.windowWidth < 992 && <MobileNav />}
    </>
  );
};

export default Navigation;
