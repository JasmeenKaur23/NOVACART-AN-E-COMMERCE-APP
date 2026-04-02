// import Button from "@mui/material/Button";
// import TablePagination from "@mui/material/TablePagination";
// import React, { useContext, useEffect, useState } from "react";
// import { AiOutlineEdit } from "react-icons/ai";
// import { FaPlus } from "react-icons/fa6";
// import { GoTrash } from "react-icons/go";
// import { IoEye } from "react-icons/io5";
// import { PiExportBold } from "react-icons/pi";

// import "react-lazy-load-image-component/src/effects/blur.css";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import Progress from "../../Components/ProgressBar";
// import { Link } from "react-router-dom";
// import Checkbox from "@mui/material/Checkbox";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import Table from "@mui/material/Table";
// import TableCell from "@mui/material/TableCell";
// import TableRow from "@mui/material/TableRow";
// import TableBody from "@mui/material/TableBody";
// import SearchBox from "../../Components/SearchBox";
// import { MyContext } from "../../App";
// import { deleteData, fetchDataFromApi } from "../../utils/api";

// const label = { inputProps: { "aria-label": "Checkbox demo" } };
// const columns = [
//   //1.10
//   { id: "image", label: "Image", minWidth: 150 },
//   { id: "catname", label: "CATEGORY NAME", minWidth: 150 },
//   { id: "action", label: "Action", minWidth: 100 },
// ];

// const CategoryList = () => {
//   const [categoryFilterVal, setCategoryFilterVal] = useState("");
// const context = useContext(MyContext);
//   const handleChangeCatFilter = (event) => {
//     setCategoryFilterVal(event.target.value);
//   };
// useEffect(()=>
// {
//   fetchDataFromApi("/api/category").then((res) => {
//         console.log("delete Cat ", res?.data);
//         context?.setCatData(res?.data);
//       });
// },[context?.isOpenFullScreenPanel])
//   const [page, setPage] = React.useState(0);
//   // const [catData, setCatData] = useState([]);

//   const [rowsPerPage, setRowsPerPage] = React.useState(10);
//   // useEffect(() => {
//   //   fetchDataFromApi("/api/category").then((res) => {
//   //     console.log(res?.data);
//   //     setCatData(res?.data);
//   //   });
//   // }, [context?.isOpenFullScreenPanel]);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(event.target.value);
//     setPage(0);
//   };

//   const deleteCat = (id) => {
//     deleteData(`/api/category/${id}`).then((res) => {
//       console.log(res);
//       fetchDataFromApi("/api/category").then((res) => {
//         console.log("delete Cat ", res?.data);
//         context?.setCatData(res?.data);
//       });
//     });
//   };
//   return (
//     <>
//       <div className="flex items-center justify-between px-2 mt-1 py-0">
//         {" "}
//         <h3 className="text-[20px] font-[600]">
//           Categories
//         </h3>
//         <div className="col w-[40%] flex items-center justify-end gap-3 ml-auto">

//           <Button
//             onClick={() =>
//               context.setIsOpenFullScreenPanel({
//                 open: true,
//                 model: "Add New Category",
//               })
//             }
//             className="!text-white !flex btn-purple !items-center !gap-2  normal-case"
//           >
//             <FaPlus size={16} /> Add  Category
//           </Button>
//         </div>
//       </div>
//       <div className="card my-4 pt-5 bg-white shadow-md sm:rounded-lg">
//        <div className="relative overflow-x-auto mt-4 shadow-md sm:rounded-lg">
//   <Table sx={{ minWidth: 900 }}>

//             <TableHead>
//               <TableRow>
//                 {/* <TableCell width={60}>
//                   <Checkbox {...label} size="small" />
//                 </TableCell> */}

//                 {columns.map((column) => (
//                   <TableCell
//                     width={column.minWidth}
//                     key={column.id}
//                     align={column.align}
//                   >
//                     {column.label}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {context?.catData.length !== 0 &&
//                 context?.catData?.map((item, index) => {
//                   return (
//                     <TableRow key={index}>
//                       {/* <TableCell>
//                         <Checkbox {...label} size="small" />
//                       </TableCell> */}
//                       <TableCell width={100}>
//                         <div className="flex items-center gap-4 w-[60px]">
//                           <div className="img w-full  rounded-md group overflow-hidden">
//                             <Link to="/product/768585">
//                               <LazyLoadImage
//                                 alt="sample text"
//                                 className="!w-[100%] group-hover:scale-110 transition-all h-full object-cover"
//                                 effect="blur"
//                                 wrapperProps={{
//                                   // If you need to, you can tweak the effect transition using the wrapper style.
//                                   style: { transitionDelay: "1s" },
//                                 }}
//                                 src={item.images[0]} // use normal <img> attributes as props
//                               />{" "}
//                             </Link>
//                           </div>
//                         </div>
//                       </TableCell>

//                       <TableCell width={100}>{item?.name}</TableCell>

//                       <TableCell width={100}>
//                         <div className="flex  items-center gap-1">
//                           <Button
//                             onClick={() =>
//                               context.setIsOpenFullScreenPanel({
//                                 open: true,
//                                 model: "Edit Category",
//                                 id: item?._id,
//                               })
//                             }
//                             className="!w-[35px] !rounded-md hover:!bg-[#f1f1f1] dbtn !min-w-[35px] !bg-[#f1f1f1]  !h-[35px]"
//                           >
//                             <AiOutlineEdit size={25} color="rgba(0,0,0,0.7)" />
//                           </Button>
//                           {/* <Button className="!w-[35px] !rounded-md hover:!bg-[#f1f1f1] dbtn !min-w-[35px] !bg-[#f1f1f1]  !h-[35px]">
//                             <IoEye size={25} color="rgba(0,0,0,0.7)" />
//                           </Button> */}
//                           <Button
//                             onClick={() => {
//                               deleteCat(item?._id);
//                             }}
//                             className="!w-[35px] !rounded-md hover:!bg-[#f1f1f1] dbtn !min-w-[35px] !bg-[#f1f1f1]  !h-[35px]"
//                           >
//                             <GoTrash size={25} color="rgba(0,0,0,0.7)" />
//                           </Button>
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })}
//             </TableBody>
//           </Table>
//         </div>

//         <TablePagination
//           rowsPerPageOptions={[10, 25, 100]}
//           component="div"
//           count={10}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </div>
//     </>
//   );
// };

// export default CategoryList;
import Button from "@mui/material/Button";
import TablePagination from "@mui/material/TablePagination";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { GoTrash } from "react-icons/go";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import { MyContext } from "../../App";
import { deleteData, fetchDataFromApi } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";

const columns = [
  { id: "image", label: "Image" },
  { id: "catname", label: "Category" },
  { id: "action", label: "Action" },
];

const CategoryList = () => {
  const context = useContext(MyContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    fetchDataFromApi("/api/category").then((res) => {
      context?.setCatData(res?.data || []);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    });
  }, [context?.isOpenFullScreenPanel]);

  const deleteCat = (id) => {
    setDeletingId(id); // only control button loader

    deleteData(`/api/category/${id}`)
      .then(() => {
        fetchDataFromApi("/api/category").then((res) => {
          setTimeout(() => {
            context?.setCatData(res?.data || []);
            setDeletingId(null);
          }, 700); // stop button loader
        });
      })
      .catch(() => {
        setDeletingId(null); // ensure stop if error
      });
  };

  return (
    <>
      {isLoading === true ? (
        <div className="flex items-center !w-full !text-primary min-h-[500px] justify-center">
          <CircularProgress color="inherit" className="w-full" />
        </div>
      ) : (
        <div className="w-full min-h-screen overflow-y-auto">
          {/* HEADER */}
          <div className="flex flex-wrap items-center justify-between px-2 mt-2">
            <h3 className="text-[18px] sm:text-[20px] font-[600]">
              Categories
            </h3>

            <Button
              onClick={() =>
                context.setIsOpenFullScreenPanel({
                  open: true,
                  model: "Add New Category",
                })
              }
              className="!text-white btn-purple !normal-case !mt-2 sm:!mt-0"
            >
              <FaPlus size={15} /> Add Category
            </Button>
          </div>

          {/* TABLE CARD */}
          <div className="card w-[80%] my-4 pt-3 bg-white shadow-md rounded-lg">
            {/* ✅ SCROLL FIX */}
            <div className="relative  overflow-x-auto mt-4 w-full">
              {/* <Table sx={{ minWidth: 200 }}> */}
              <Table
                size="small"
                sx={{
                  width: "100%",
                  minWidth: 500,
                  tableLayout: "fixed",
                }}
              >
                {/* HEADER */}
                <TableHead>
                  <TableRow>
                    <TableCell
                      className="!pl-12"
                      sx={{ paddingLeft: 12, width: 50 }}
                    >
                      Image
                    </TableCell>
                    <TableCell sx={{ width: 50 }}>Category</TableCell>
                    <TableCell sx={{ width: 50 }}>Action</TableCell>
                  </TableRow>
                </TableHead>

                {/* BODY */}
                <TableBody>
                  {context?.catData?.length > 0 &&
                    context?.catData
                      ?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      ?.map((item, index) => (
                        <TableRow key={index}>
                          {/* IMAGE */}
                          <TableCell>
                            <div className="w-[55px] h-[55px]  overflow-hidden rounded-md">
                              <LazyLoadImage
                                alt="category"
                                className="w-full h-full object-cover rounded"
                                effect="blur"
                                src={item.images?.[0]}
                              />
                            </div>
                          </TableCell>

                          {/* NAME */}
                          <TableCell className="whitespace-nowrap">
                            {item?.name}
                          </TableCell>

                          {/* ACTION */}
                          <TableCell>
                            <div className="flex items-center gap-5">
                              <Button
                                onClick={() =>
                                  context.setIsOpenFullScreenPanel({
                                    open: true,
                                    model: "Edit Category",
                                    id: item?._id,
                                  })
                                }
                                className="!h-[35px] !min-h-[35px] !px-3 !rounded-md !bg-[#f1f1f1] hover:!bg-[#e5e5e5] flex items-center justify-center gap-2"
                              >
                                <AiOutlineEdit
                                  color="rgba(0,0,0,0.7)"
                                  size={16}
                                />
                                <span className="text-[rgba(0,0,0,0.7)]">
                                  EDIT
                                </span>
                              </Button>

                              <Button
                                disabled={deletingId === item._id}
                                onClick={() => deleteCat(item?._id)}
                                className="!h-[35px] !min-h-[35px] !px-3 !rounded-md !bg-[#f1f1f1] hover:!bg-[#e5e5e5] flex items-center justify-center gap-2"
                                sx={{
                                  minWidth: "90px", // ✅ lock button width
                                  position: "relative", // ✅ required for loader center
                                }}
                              >
                                {deletingId === item._id ? (
                                  <span
                                    style={{
                                      position: "absolute",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      width: "100%",
                                    }}
                                  >
                                    <CircularProgress size={16} thickness={4} />{" "}
                                    {/* ✅ smaller size */}
                                  </span>
                                ) : (
                                  <>
                                    <GoTrash
                                      color="rgba(0,0,0,0.7)"
                                      size={16}
                                    />
                                    <span className="text-[rgba(0,0,0,0.7)]">
                                      Delete
                                    </span>
                                  </>
                                )}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </div>

            {/* PAGINATION */}
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={context?.catData?.length || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(e, newPage) => setPage(newPage)}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value));
                setPage(0);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryList;
