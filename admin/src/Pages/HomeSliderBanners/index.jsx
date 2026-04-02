import Button from "@mui/material/Button";
import TablePagination from "@mui/material/TablePagination";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { GoTrash } from "react-icons/go";
import { IoEye } from "react-icons/io5";
import { PiExportBold } from "react-icons/pi";
import Progress from "../../Components/ProgressBar";
import { Link } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import SearchBox from "../../Components/SearchBox";
import { MyContext } from "../../App";
import {
  deleteData,
  deleteMultipleData,
  fetchDataFromApi,
} from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const columns = [
  //1.10
  { id: "image", label: "Image", minWidth: 250 },
  { id: "action", label: "Action", minWidth: 100 },
];

const HomeSliderBanners = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const context = useContext(MyContext);
  const [sortedIds, setSortedIds] = useState([]);
  const [slidesData, setSlidesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const deleteSlide = (id) => {
    deleteData(`/api/homeSlides/${id}`).then((res) => {
      if (res?.error === false) {
        // getProducts();
        console.log(res);

        context?.openAlertBox("success", res?.message);
        getData();
      } else {
        context?.openAlertBox("error", res?.message);
      }
    });
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const getData = async () => {
    setIsLoading(true);
    fetchDataFromApi("/api/homeSlides").then((res) => {
      console.log(res);

      let arr = [];
      if (res?.error === false) {
        for (let i = 0; i < res?.data?.length; i++) {
          arr[i] = res?.data[i];
          arr[i].checked = false;
          console.log(arr[i]);
        }
        setTimeout(() => {
          setSlidesData(arr);
          setIsLoading(false);
        }, 1000);
        //  console.log(productArr);
      }

      //   setTimeout(() => {
      //     console.log(slidesData);
      //   }, 3000);
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };
  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    const updatedItems = slidesData.map((item) => ({
      ...item,
      checked: isChecked,
    }));
    setSlidesData(updatedItems);

    if (isChecked) {
      const ids = updatedItems.map((item) => item?._id).sort((a, b) => a - b);
      // console.log(ids);
      setSortedIds(ids);
    } else {
      setSortedIds([]);
    }
  };
  const handleCheckboxChange = (e, id, index) => {
    const updatedItems = slidesData.map((item) =>
      item._id === id
        ? {
            ...item,
            checked: !item.checked,
          }
        : item
    );
    setSlidesData(updatedItems);
    const selectedIds = updatedItems
      .filter((item) => item.checked)
      .map((item) => item._id)
      .sort((a, b) => a - b);
    setSortedIds(selectedIds);
    // console.log(selectedIds);
  };
  const deleteMultipleSlides = (id) => {
    if (sortedIds.length === 0) {
      context?.openAlertBox("error", "Please select items to delete");
      return;
    }
    try {
      deleteMultipleData(`/api/homeSlides/deleteMultiple`, sortedIds).then(
        (res) => {
          if (res?.error === false) {
            getData();
            console.log(res);

            context?.openAlertBox("success", "Slide Deleted");
            setSortedIds([]);
          } else {
            context?.openAlertBox("error", "Error deleting Slides");
          }
        }
      );
    } catch (error) {
      context?.openAlertBox("error", "Error deleting Slides");
    }
  };
  useEffect(() => {
    getData();
  }, [context?.isOpenFullScreenPanel]);
  return (
    <>
    {
      isLoading ===true ?  <div className="flex items-center w-full !text-primary min-h-[600px] justify-center">
                               <CircularProgress color="inherit" />
                             </div> :
                             <>
                               {/* <div className="grid grid-cols-1 md:grid-cols-3 px- mt-2 py-0">
        {" "}
        <h3 className="text-[20px] font-[600]">Home Slider Banners</h3>
        <div className="col flex items-center justify-start md:justify-end gap-3 ">
          {sortedIds?.length !== 0 && (
            <Button
              variant="contained"
              className="btn-sm"
              size="small"
              color="error"
              onClick={deleteMultipleSlides}
            >
              Delete
            </Button>
          )}

          <Button
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add Home Slide",
              })
            }
            className="!text-white !flex btn-purple !ml-auto  !items-end !justify-end !gap-2  normal-case"
          >
            <FaPlus size={16} /> Add Home Slide
          </Button>
        </div>
      </div> */}
      <div className="flex items-center mt-2 mb-2 w-full">
  {/* Heading on left */}
  <h3 className="text-[20px] font-[600]">Home Slider Banners</h3>

  {/* Spacer pushes buttons to the right */}
  <div className="ml-auto flex items-center gap-3">
    {/* Delete button */}
    {sortedIds?.length !== 0 && (
      <Button
        variant="contained"
        size="small"
        color="error"
        onClick={deleteMultipleSlides}
      >
        Delete
      </Button>
    )}

    {/* Add button */}
    <Button
      onClick={() =>
        context.setIsOpenFullScreenPanel({
          open: true,
          model: "Add Home Slide",
        })
      }
      className="!text-white !flex btn-purple !items-center !gap-2 normal-case"
    >
      <FaPlus size={16} /> Add Home Slide
    </Button>
  </div>
</div>

      <div className="card my-4 pt-5 bg-white shadow-md sm:rounded-lg">
         <div className="relative overflow-x-auto mt-4 shadow-md sm:rounded-lg">
  <Table sx={{ minWidth: 900 }}>
            <TableHead>
              <TableRow>
                <TableCell width={60}>
                  <Checkbox
                    {...label}
                    onChange={handleSelectAll}
                    checked={
                      slidesData?.length > 0
                        ? slidesData.every((item) => item.checked)
                        : false
                    }
                    size="small"
                  />
                </TableCell>

                {columns.map((column) => (
                  <TableCell
                    width={column.minWidth}
                    key={column.id}
                    align={column.align}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {slidesData?.length !== 0 &&
                slidesData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        <Checkbox
                          onChange={(e) =>
                            handleCheckboxChange(e, item?._id, index)
                          }
                          checked={item.checked === true ? true : false}
                          {...label}
                          size="small"
                        />
                      </TableCell>
                      <TableCell width={300}>
                        <div className="flex items-center gap-4 w-[350px]">
                          <div className="img w-full  rounded-md group overflow-hidden">
                            <img
                              className="w-full group-hover:scale-110 trnasition-all"
                              src={item?.images[0]}
                              alt="Banner image"
                            />
                          </div>
                        </div>
                      </TableCell>

                      <TableCell width={100}>
                        <div className="flex  items-center gap-1">
                          <Button  onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Edit Home Slide",
              })
            } className="!w-[35px] !rounded-md hover:!bg-[#f1f1f1] dbtn !min-w-[35px] !bg-[#f1f1f1]  !h-[35px]">
                            <AiOutlineEdit size={25} color="rgba(0,0,0,0.7)" />
                          </Button>

                          <Button
                            onClick={() => deleteSlide(item._id)}
                            className="!w-[35px] !rounded-md hover:!bg-[#f1f1f1] dbtn !min-w-[35px] !bg-[#f1f1f1]  !h-[35px]"
                          >
                            <GoTrash size={25} color="rgba(0,0,0,0.7)" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>

       <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={slidesData?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value));
            setPage(0);
          }}
        />
      </div> </>
    }
    
    </>
  );
};

export default HomeSliderBanners;
