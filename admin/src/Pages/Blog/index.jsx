import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TablePagination from "@mui/material/TablePagination";
import { AiOutlineEdit } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { GoTrash } from "react-icons/go";
import CircularProgress from "@mui/material/CircularProgress";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import { MyContext } from "../../App";
import {
  deleteData,
  deleteMultipleData,
  fetchDataFromApi,
} from "../../utils/api";
// import Progress from "../../Components/ProgressBar";

const columns = [
  { id: "image", label: "Image", minWidth: 100 },
  { id: "title", label: "Title", minWidth: 200 },
  { id: "description", label: "Description", minWidth: 300 },
  { id: "action", label: "Action", minWidth: 150 },
];

const BlogList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [blogData, setBlogData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortedIds, setSortedIds] = useState([]);
  const [deletingId, setDeletingId] = useState(null); // row-specific delete loader
  const context = useContext(MyContext);

  // Fetch blogs
  // const getData = async () => {
  //   setIsLoading(true);
  //   try {
  //     const res = await fetchDataFromApi("/api/blog");
  //     if (!res?.error && res?.blogs?.length > 0) {
  //       const dataWithChecked = res.blogs.map((b) => ({
  //         ...b,
  //         checked: false,
  //       }));
  //       setBlogData(dataWithChecked);
  //        setTimeout(() => {
  //         setIsLoading(false);
  //       }, 1000);
  //     } else {
  //       setBlogData([]);
  //     }
  //   } catch {
  //     context?.openAlertBox("error", "Error fetching blogs");
  //     setBlogData([]);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
const getData = async () => {
  setIsLoading(true);

  try {
    const res = await fetchDataFromApi("/api/blog");

    if (!res?.error && res?.blogs?.length > 0) {
      const dataWithChecked = res.blogs.map((b) => ({
        ...b,
        checked: false,
      }));
      setBlogData(dataWithChecked);
    } else {
      setBlogData([]);
    }

    // ⏳ Keep loader visible slightly smoother
    setTimeout(() => {
      setIsLoading(false);
    }, 700);

  } catch {
    context?.openAlertBox("error", "Error fetching blogs");
    setBlogData([]);
    setIsLoading(false);
  }
};

  // Delete a single blog
  const deleteSlide = async (id) => {
    setDeletingId(id); // only show loader for this row
    let res;
    try {
      res = await deleteData(`/api/blog/${id}`);
    } catch {
      context?.openAlertBox("error", "Network error while deleting");
      setDeletingId(null);
      return;
    }

    // Delay for 1 second to ensure loader is visible on success
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!res?.error) {
      context?.openAlertBox("success", res?.message || "Deleted successfully");
      getData();
    } else {
      context?.openAlertBox("error", res?.message || "Error deleting blog");
    }
    setDeletingId(null);
  };

  // Delete multiple selected blogs
  const deleteMultipleSlides = async () => {
    if (!sortedIds.length) {
      context?.openAlertBox("error", "Please select items to delete");
      return;
    }
    try {
      const res = await deleteMultipleData(
        "/api/blog/deleteMultiple",
        sortedIds
      );
      if (!res?.error) {
        context?.openAlertBox("success", "Blogs deleted successfully");
        setSortedIds([]);
        await getData();
      } else {
        context?.openAlertBox("error", "Error deleting blogs");
      }
    } catch {
      context?.openAlertBox("error", "Error deleting blogs");
    }
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    getData();
  }, [context?.isOpenFullScreenPanel]);

  return (
    <div>
      {/* Header & Add/Delete Buttons */}
      <div className="flex items-center justify-between px-2 mt-3 py-0">
        <h3 className="text-[20px] font-[600]">Blog List</h3>
        <div className="flex items-center justify-end gap-3 ml-auto w-[30%]">
          {sortedIds.length > 0 && (
            <Button
              variant="contained"
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
                model: "Add Blog",
              })
            }
            className="!text-white !flex btn-purple !items-center !gap-2 normal-case"
          >
            <FaPlus size={16} /> Add Blog
          </Button>
        </div>
      </div>

      {/* Loader / Empty State / Table */}
      {isLoading ? (
          <div className="flex items-center w-full !text-primary min-h-[400px] justify-center">
                         <CircularProgress color="inherit" />
                       </div>
      ) : blogData.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No Blogs Available
        </div>
      ) : (
        <div className="card my-4 pt-5 bg-white shadow-md sm:rounded-lg">
          <div className="relative overflow-x-auto mt-4 shadow-md sm:rounded-lg">
            <Table sx={{ minWidth: 900 }}>
              <TableHead>
                <TableRow>
                  <TableCell width={60}></TableCell>
                  {columns.map((column) => (
                    <TableCell key={column.id} width={column.minWidth}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {blogData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <TableRow key={item._id || index}>
                      <TableCell></TableCell>
                      <TableCell>
                        <img
                          className="w-full rounded-md group overflow-hidden"
                          src={item?.images[0]}
                          alt="Blog"
                        />
                      </TableCell>
                      <TableCell>{item?.title}</TableCell>
                      <TableCell
                        dangerouslySetInnerHTML={{
                          __html: item?.description?.substr(0, 150) + "...",
                        }}
                      />
                      <TableCell>
                        <div className="flex gap-1">
                          {/* Edit Button */}
                          <Button
                            onClick={() =>
                              context.setIsOpenFullScreenPanel({
                                open: true,
                                model: "Edit Blog",
                                id: item?._id,
                              })
                            }
                            className="!h-[35px] !min-h-[35px] !px-3 !rounded-md !bg-[#f1f1f1] hover:!bg-[#e5e5e5] flex items-center justify-center gap-2"
                          >
                            <AiOutlineEdit color="rgba(0,0,0,0.7)" size={16} />
                            <span>EDIT</span>
                          </Button>

                          {/* Delete Button */}
                          <Button
                            disabled={deletingId === item._id}
                            onClick={() => deleteSlide(item._id)}
                            className="!h-[35px] !min-h-[35px] !px-3 !rounded-md !bg-[#f1f1f1] hover:!bg-[#e5e5e5] flex items-center justify-center gap-2"
                          >
                            {deletingId === item._id ? (
                              <CircularProgress
                                size={20}
                                className="!text-primary"
                              />
                            ) : (
                              <>
                                <GoTrash color="rgba(0,0,0,0.7)" size={16} />
                                Delete
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

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={blogData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      )}
    </div>
  );
};

export default BlogList;
