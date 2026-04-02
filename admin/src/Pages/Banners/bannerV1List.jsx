import Button from "@mui/material/Button";
import TablePagination from "@mui/material/TablePagination";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { GoTrash } from "react-icons/go";
import { MyContext } from "../../App";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import { deleteData, deleteMultipleData, fetchDataFromApi } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const columns = [
  { id: "image", label: "Image", minWidth: 250 },
  { id: "action", label: "Action", minWidth: 100 },
];

const BannerV1List = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [slidesData, setSlidesData] = useState([]);
  const [sortedIds, setSortedIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState(null); // NEW: track deleting row
  const context = useContext(MyContext);

  const getData = async () => {
    setIsLoading(true);
    try {
      const res = await fetchDataFromApi("/api/bannerV1");
      if (res?.error === false) {
        const arr = res.data.map((item) => ({ ...item, checked: false }));
        // simulate loading
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
    setIsDeletingId(id); // show loading on this row
    try {
      const res = await deleteData(`/api/bannerV1/${id}`);
      // simulate small delay to show spinner
      setTimeout(() => {
        if (res?.error === false) {
          context?.openAlertBox("success", res?.message || "Deleted successfully");
          getData();
        } else {
          context?.openAlertBox("error", res?.message || "Error deleting banner");
        }
        setIsDeletingId(null);
      }, 1000);
    } catch (err) {
      console.error(err);
      context?.openAlertBox("error", "Network error while deleting");
      setIsDeletingId(null);
    }
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    const updatedItems = slidesData.map((item) => ({ ...item, checked: isChecked }));
    setSlidesData(updatedItems);
    setSortedIds(isChecked ? updatedItems.map((item) => item._id).sort() : []);
  };

  const handleCheckboxChange = (e, id) => {
    const updatedItems = slidesData.map((item) =>
      item._id === id ? { ...item, checked: !item.checked } : item
    );
    setSlidesData(updatedItems);
    const selectedIds = updatedItems.filter((item) => item.checked).map((item) => item._id).sort();
    setSortedIds(selectedIds);
  };

  const deleteMultipleSlides = async () => {
    if (sortedIds.length === 0) {
      context?.openAlertBox("error", "Please select items to delete");
      return;
    }
    try {
      const res = await deleteMultipleData(`/api/bannerV1/deleteMultiple`, sortedIds);
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

  useEffect(() => {
    getData();
  }, [context?.isOpenFullScreenPanel]);

  return (
    <>
      <div className="flex items-center justify-between px-2 mt-1 md:mt-3 py-0">
        <h3 className="text-[20px] font-[600]">Banners List</h3>
        <div className="col flex items-center justify-end gap-3 ml-auto">
          {sortedIds?.length > 0 && (
            <Button variant="contained" size="small" color="error" onClick={deleteMultipleSlides}>
              Delete
            </Button>
          )}
          <Button
            onClick={() => context.setIsOpenFullScreenPanel({ open: true, model: "Add BannerV1" })}
            className="!text-white !flex btn-purple !items-center !gap-2 normal-case"
          >
            <FaPlus size={16} /> Add Banner
          </Button>
        </div>
      </div>

      <div className="card my-4 pt-5 bg-white shadow-md sm:rounded-lg">
        <div className="relative overflow-x-auto mt-4 shadow-md sm:rounded-lg">
          {isLoading ? (
            <div className="flex justify-center p-10">
              <CircularProgress />
            </div>
          ) : (
            <Table sx={{ minWidth: 900 }}>
              <TableHead>
                <TableRow>
                  <TableCell width={60}>
                    <Checkbox
                      {...label}
                      onChange={handleSelectAll}
                      checked={slidesData.length > 0 && slidesData.every((item) => item.checked)}
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
                {slidesData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
                    <TableRow key={item._id}>
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
                              src={item?.images[0]}
                              alt="Banner image"
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
                                model: "Edit BannerV1",
                                id: item._id,
                              })
                            }
                          className="!h-[35px] !min-h-[35px] !px-3 !rounded-md !bg-[#f1f1f1] hover:!bg-[#f1f1f1] relative flex items-center justify-center gap-2"
>
                            <>
      <AiOutlineEdit size={16} color="rgba(0,0,0,0.7)" />
      <span>EDIT</span>
    </>
                          </Button>
<Button
  disabled={isDeletingId === item._id}
  onClick={() => deleteSlide(item._id)}
  className="!h-[35px] !min-h-[35px] !px-3 !rounded-md !bg-[#f1f1f1] hover:!bg-[#f1f1f1] relative flex items-center justify-center gap-2"
>
  {isDeletingId === item._id ? (
    <CircularProgress size={20} className="!text-primary" />
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
          )}
        </div>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
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

export default BannerV1List;
