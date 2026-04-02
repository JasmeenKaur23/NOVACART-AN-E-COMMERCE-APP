// import React from "react";
// import { IoMdTime } from "react-icons/io";
// import { Link } from "react-router-dom";
// import { IoIosArrowForward } from "react-icons/io";

// const BlogItem = (props) => {
//   return (
//     <div className="BlogItem group">
//       <div className="imgWrapper w-full overflow-hidden cursor-pointer relative rounded-md">
//         <img
//           src={props?.item?.images[0]}
//           className="w-full h-[200px] transition-all group-hover:scale-105 group-hover:rotate-1"
//           alt="blog Image"
//         />

//         <span
//           className="flex items-center text-[12px] font-[500]
//          !bg-primary rounded-md p-1 absolute bottom-[15px] z-50 right-[15px] 
//          justify-center text-white gap-1"
//         >
//           {" "}
//           <IoMdTime className="text-[16px]" />{" "}
//           {props?.item?.createdAt?.split("T")[0]}
//         </span>
//       </div>

//       <div className="info py-4">
//         <h2 className="text-[16px] mb-1 lg:mb-3 text-black font-[600]">
//           <Link to="/" className="link">
//             {" "}
//             {props?.item?.title}
//           </Link>
//         </h2>
//         <div
//           dangerouslySetInnerHTML={{
//             __html: props?.item?.description?.substr(0, 100) + "...",
//           }} className="text-[14px] lg:text-[16px] mb-3"
//         />

//         <p className="text-[15px]   text-[rgba(0,0,0,0.8)] font-[400]"></p>
//         <Link
//           to="/"
//           className="link flex items-center gap-1 font-[500] text-[14px] !underline"
//         >
//           Read More <IoIosArrowForward />
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default BlogItem;
// src/components/BlogItem.jsx
import React from "react";
import { IoMdTime, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const BlogItem = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blog/${item._id}`);
  };

  // 100% Safe Date — Never shows "Invalid Date"
  const formatDate = (dateStr) => {
    if (!dateStr) return "No date";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      const [y, m, d] = dateStr.split("T")[0].split("-");
      return `${d}/${m}/${y}`;
    }
    return date.toLocaleDateString("en-GB"); // e.g. 25/04/2025
  };

  return (
    <div
      className="group border rounded-lg overflow-hidden shadow hover:shadow-lg cursor-pointer transition"
      onClick={handleClick}
    >
      <div className="relative">
        <img
          src={item.images?.[0] || "https://via.placeholder.com/400x200"}
          alt={item.title}
          className="w-full h-56 object-cover group-hover:scale-105 transition"
        />
        <span className="absolute bottom-3 right-3 bg-red-600 text-white text-xs px-3 py-1 rounded flex items-center gap-1">
          <IoMdTime /> {formatDate(item.createdAt)}
        </span>
      </div>

      <div className="p-5">
        <h2 className="text-xl font-bold mb-2 line-clamp-2">{item.title}</h2>
        <div
          className="text-gray-600 text-sm mb-4 line-clamp-3"
          dangerouslySetInnerHTML={{
            __html: item.description?.substr(0, 120) + "...",
          }}
        />
        <div className="flex items-center text-red-600 font-medium">
          Read More <IoIosArrowForward className="ml-1" />
        </div>
      </div>
    </div>
  );
};

export default BlogItem;