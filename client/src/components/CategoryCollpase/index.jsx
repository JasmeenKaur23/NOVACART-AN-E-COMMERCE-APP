// import React, { useState } from "react";
// import { FaRegSquarePlus } from "react-icons/fa6";
// import { FiMinusSquare } from "react-icons/fi";
// import { Link } from "react-router-dom";
// import Button from "@mui/material/Button";

// const CategoryCollapse = (props) => {
//   const [openSubmenu, setOpenSubmenu] = useState(null);
//   const [openNestedSubmenu, setOpenNestedSubmenu] = useState(null);

//   const toggleSubmenu = (category) => {
//     setOpenSubmenu(openSubmenu === category ? null : category);
//   };

//   const toggleNestedSubmenu = (subcategory) => {
//     setOpenNestedSubmenu(
//       openNestedSubmenu === subcategory ? null : subcategory
//     );
//   };

//   // ✅ Category Data
//   const categories = [
//     {
//       name: "Fashion",
//       subcategories: [
//         { name: "Apparels", nested: ["T-Shirts", "Pants", "Jackets"] },
//         { name: "Footwear" },
//         { name: "Accessories" },
//         { name: "Leather Watch" },
//       ],
//     },
//     {
//       name: "Electronics",
//       subcategories: [
//         { name: "Home Appliances" },
//         { name: "Smart Watch" },
//         { name: "Mobile Accessories" },
//         { name: "Air Conditioner" },
//         { name: "Refrigerator" },
//         { name: "Kitchen Appliances" },
//         { name: "Home Theater and Speaker" },
//         { name: "Cooler" },
//         { name: "Neckband & Ear Buds" },
//         { name: "Fragrance & Personal Care" },
//         { name: "Bags & Trolley" },
//         { name: "Mobile Phones" },
//       ],
//     },
//     {
//       name: "Home & Kitchen",
//       subcategories: [
//         { name: "Furniture" },
//         { name: "Decor" },
//         { name: "Cookware" },
//       ],
//     },
//   ];

//   return (
//     <div className="scroll">
//       <ul className="w-full p-0 m-0">

//         {categories.map((cat) => (
//           <li
//             key={cat.name}
//             className="list-none flex flex-col relative border-b border-gray-100"
//           >
//             {/* Main Category */}
//             <div className="flex items-center relative">
//               <Link to="/products" className="link w-full">
//                 <Button
//                   className="flex !justify-start !text-left !normal-case !pt-2 !pb-2 !text-[16px] !text-gray-800 pl-2"
//                   sx={{ width: "100%" }}
//                 >
//                   {cat.name}
//                 </Button>
//               </Link>

//               {cat.subcategories && (
//                 <>
//                   {openSubmenu === cat.name ? (
//                     <FiMinusSquare
//                       className="absolute cursor-pointer top-[10px] right-[15px] text-[16px] text-gray-500"
//                       onClick={() => toggleSubmenu(cat.name)}
//                     />
//                   ) : (
//                     <FaRegSquarePlus
//                       className="absolute cursor-pointer top-[10px] right-[15px] text-[16px] text-gray-500"
//                       onClick={() => toggleSubmenu(cat.name)}
//                     />
//                   )}
//                 </>
//               )}
//             </div>

//             {/* Submenu */}
//             {openSubmenu === cat.name && cat.subcategories && (
//               <ul className="submenu w-full bg-gray-50 p-0 m-0">
//                 {cat.subcategories.map((sub) => (
//                   <li key={sub.name} className="list-none flex flex-col relative">
//                     <div className="flex items-center relative pl-4">
//                       <Link to="/" className="link w-full">
//                         <Button
//                           className="flex !justify-start !text-left !normal-case !pt-1 !pb-1 !text-[15px] !text-gray-700"
//                           sx={{ width: "100%" }}
//                         >
//                           {sub.name}
//                         </Button>
//                       </Link>

//                       {sub.nested && (
//                         <>
//                           {openNestedSubmenu === sub.name ? (
//                             <FiMinusSquare
//                               className="absolute right-[15px] text-[15px] text-gray-500 cursor-pointer"
//                               onClick={() => toggleNestedSubmenu(sub.name)}
//                             />
//                           ) : (
//                             <FaRegSquarePlus
//                               className="absolute right-[15px] text-[15px] text-gray-500 cursor-pointer"
//                               onClick={() => toggleNestedSubmenu(sub.name)}
//                             />
//                           )}
//                         </>
//                       )}
//                     </div>

//                     {/* Nested Submenu */}
//                     {openNestedSubmenu === sub.name && sub.nested && (
//                       <ul className="submenu w-full bg-gray-100 p-0 m-0">
//                         {sub.nested.map((item) => (
//                           <li key={item} className="list-none pl-8 py-1">
//                             <Link
//                               to="/"
//                               className="block text-[14px] text-gray-700 hover:text-gray-900"
//                             >
//                               {item}
//                             </Link>
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CategoryCollapse;

import React, { useState } from "react";
import { FaRegSquarePlus } from "react-icons/fa6";
import { FiMinusSquare } from "react-icons/fi";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const CategoryCollapse = (props) => {
  const [submenuIndex, setSubmenuIndex] = useState(null);
  const [innerSubmenuIndex, setInnerSubmenuIndex] = useState(null);

  const openSubmenu = (index) => {
    setSubmenuIndex(submenuIndex === index ? null : index);
  };

  const openInnerSubmenu = (index) => {
    setInnerSubmenuIndex(innerSubmenuIndex === index ? null : index);
  };

  return (
    <div className="scroll !ml-2">
      <ul className="w-full  p-0 m-0">
        {props?.data?.length !== 0 &&
          props?.data?.map((cat, index) => {
            return (
              <li key={index} className="list-none border-b border-gray-100">
                <div className="flex items-center relative">
                  <Link
                    to={`product-listing?${cat?._id}`}
                    className="link w-full"
                  >
                    <Button
                      className="flex !justify-start !text-left !normal-case !pt-2 !pb-2 !text-[16px] !text-gray-800 pl-2"
                      sx={{ width: "100%" }}
                    >
                      {cat?.name}
                    </Button>
                  </Link>
                  <div
                    onClick={() => openSubmenu(index)}
                    className="absolute w-[30px] h-[30px] flex items-center justify-center right-[15px] text-[16px] text-gray-500 cursor-pointer"
                  >
                    {submenuIndex === index ? (
                      <FiMinusSquare />
                    ) : (
                      <FaRegSquarePlus />
                    )}
                  </div>
                </div>

                {submenuIndex === index && (
                  <ul className="bg-gray-50 subMenu w-full pl-3 p-0 m-0">
                    {cat?.children?.length !== 0 &&
                      cat?.children?.map((subCat, index_) => {
                        return (
                          <li key={index_} className="list-none relative pl-4">
                            <div className="flex items-center relative">
                              <Link to="/" className="link w-full">
                                <Button
                                  className="flex !justify-start !text-left !normal-case !pt-1 !pb-1 !text-[15px] !text-gray-700"
                                  sx={{ width: "100%" }}
                                >
                                  {subCat?.name}
                                </Button>
                              </Link>
                              <div
                                onClick={() => openInnerSubmenu(index_)}
                                className="absolute w-[30px] h-[30px] flex items-center justify-center right-[15px] text-[16px] text-gray-500 cursor-pointer"
                              >
                                {" "}
                                {innerSubmenuIndex === index_ ? (
                                  <FiMinusSquare
                                      />
                                ) : (
                                  <FaRegSquarePlus
                                        />
                                )}
                              </div>
                            </div>

                            {innerSubmenuIndex === index_ && (
                              <ul className="inner_submenu bg-gray-100 p-0 m-0">
                                {subCat?.children?.length !== 0 &&
                                  subCat?.children?.map(
                                    (thirdLevelCat, index__) => {
                                      return (
                                        <li
                                          key={index__}
                                          className="list-none pl-8 py-1"
                                        >
                                          <Link
                                            to="/product-listing"
                                            className="block text-[14px] !w-full text-left !transition text-gray-700 link  hover:text-gray-900"
                                          >
                                            {thirdLevelCat?.name}
                                          </Link>
                                        </li>
                                      );
                                    }
                                  )}
                              </ul>
                            )}
                          </li>
                        );
                      })}
                  </ul>
                )}
              </li>
            );
          })}

        {/* ===== Fashion ===== */}

        {/* ===== Electronics ===== */}
      </ul>
    </div>
  );
};

export default CategoryCollapse;
