import Button from "@mui/material/Button";
import TablePagination from "@mui/material/TablePagination";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { GoTrash } from "react-icons/go";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import { MyContext } from "../../App";
import {
  deleteData,
  deleteMultipleData,
  fetchDataFromApi,
} from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const columns = [
  { id: "image", label: "Image", minWidth: 250 },
  { id: "action", label: "Action", minWidth: 100 },
];

const CatBanner = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const context = useContext(MyContext);
  const [sortedIds, setSortedIds] = useState([]);
  const [slidesData, setSlidesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null); // track deleting row

  useEffect(() => {
    getData();
  }, [context?.isOpenFullScreenPanel]);

  const getData = async () => {
    setIsLoading(true);
    try {
      const res = await fetchDataFromApi("/api/catBanner");
      if (res?.error === false) {
        const arr = res.data.map((item) => ({ ...item, checked: false }));
        // simulate loader for at least 1 second
        setTimeout(() => {
          setSlidesData(arr);
          setIsLoading(false);
        }, 1000);
      } else {
        setSlidesData([]);
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  const deleteSlide = async (id) => {
    if (!id) return;
    setDeletingId(id); // show loader on this row
    try {
      const res = await deleteData(`/api/catBanner/${id}`);
      setTimeout(() => {
        if (res?.error === false) {
          context?.openAlertBox(
            "success",
            res?.message || "Deleted successfully"
          );
          getData();
        } else {
          context?.openAlertBox(
            "error",
            res?.message || "Error deleting banner"
          );
        }
        setDeletingId(null);
      }, 1000); // simulate delay so spinner is visible
    } catch (err) {
      console.error(err);
      context?.openAlertBox("error", "Network error while deleting");
      setDeletingId(null);
    }
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    const updatedItems = slidesData.map((item) => ({
      ...item,
      checked: isChecked,
    }));
    setSlidesData(updatedItems);
    setSortedIds(isChecked ? updatedItems.map((item) => item._id).sort() : []);
  };

  const handleCheckboxChange = (e, id) => {
    const updatedItems = slidesData.map((item) =>
      item._id === id ? { ...item, checked: !item.checked } : item
    );
    setSlidesData(updatedItems);
    const selectedIds = updatedItems
      .filter((item) => item.checked)
      .map((item) => item._id)
      .sort();
    setSortedIds(selectedIds);
  };

  const deleteMultipleSlides = async () => {
    if (sortedIds.length === 0) {
      context?.openAlertBox("error", "Please select items to delete");
      return;
    }
    try {
      const res = await deleteMultipleData(
        `/api/catBanner/deleteMultiple`,
        sortedIds
      );
      setTimeout(() => {
        if (res?.error === false) {
          context?.openAlertBox("success", "Selected banners deleted");
          getData();
          setSortedIds([]);
        } else {
          context?.openAlertBox("error", "Error deleting banners");
        }
      }, 1000);
    } catch (err) {
      context?.openAlertBox("error", "Network error while deleting");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-2 mt-1 md:mt-3 py-0">
        <h3 className="text-[20px] font-[600]">Cat Banner List</h3>
        <div className="col flex items-center justify-end gap-3 ml-auto">
          {sortedIds?.length > 0 && (
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={deleteMultipleSlides}
            >
              Delete
            </Button>
          )}
          <Button
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add Cat Banner",
              })
            }
            className="!text-white !flex btn-purple !items-center !gap-2 normal-case"
          >
            <FaPlus size={16} /> Add Banner
          </Button>
        </div>
      </div>

      <div className="card my-4 pt-5 bg-white shadow-md sm:rounded-lg">
        {isLoading ? (
          <div className="flex justify-center p-10">
            <CircularProgress />
          </div>
        ) : (
          <div className="relative overflow-x-auto mt-4 shadow-md sm:rounded-lg">
            <Table sx={{ minWidth: 900 }}>
              <TableHead>
                <TableRow>
                  <TableCell width={60}>
                    <Checkbox
                      {...label}
                      onChange={handleSelectAll}
                      checked={
                        slidesData.length > 0 &&
                        slidesData.every((item) => item.checked)
                      }
                      size="small"
                    />
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell key={column.id} width={column.minWidth}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {slidesData.map((item) => (
                  <TableRow key={item._id || Math.random()}>
                    <TableCell>
                      <Checkbox
                        {...label}
                        size="small"
                        checked={item.checked || false}
                        onChange={(e) => handleCheckboxChange(e, item._id)}
                      />
                    </TableCell>
                    <TableCell width={300}>
                      <div className="flex items-center gap-4 w-[130px] lg:w-[200px]">
                        <div className="img w-full rounded-md group overflow-hidden">
                          <img
                            className="w-full group-hover:scale-110 transition-all"
                            src={item?.images?.[0] || ""}
                            alt="Banner"
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell width={100}>
                      <div className="flex items-center gap-1">
                        <Button
                          onClick={() =>
                            context.setIsOpenFullScreenPanel({
                              open: true,
                              model: "Edit CatBanner",
                              id: item._id,
                            })
                          }
                          className="!h-[35px] !min-h-[35px] !px-3 !rounded-md !bg-[#f1f1f1] hover:!bg-[#f1f1f1] relative flex items-center justify-center gap-2"
                        >
                          <AiOutlineEdit size={16} color="rgba(0,0,0,0.7)" />
                          <span>EDIT</span>
                        </Button>
                        <Button
                          disabled={deletingId === item._id}
                          onClick={() => deleteSlide(item._id)}
                          className="!h-[35px] !min-h-[35px] !px-3 !rounded-md !bg-[#f1f1f1] hover:!bg-[#f1f1f1] relative flex items-center justify-center gap-2"
                        >
                          {deletingId === item._id ? (
                            <CircularProgress
                              size={20}
                              className="!text-primary"
                            />
                          ) : (
                            <>
                              <GoTrash size={16} color="rgba(0,0,0,0.7)" />
                              <span>Delete</span>
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
        )}

        <TablePagination
          rowsPerPageOptions={[5, 15, 25]}
          component="div"
          count={slidesData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value));
            setPage(0);
          }}
        />
      </div>
    </>
  );
};

export default CatBanner;
