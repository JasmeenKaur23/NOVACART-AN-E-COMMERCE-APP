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
import { MdLocalPhone, MdOutlineMarkEmailRead } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { deleteMultipleData, fetchDataFromApi } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";
import Badge from "@mui/material/Badge";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const columns = [
  //1.10
  { id: "userImg", label: "USER IMAGE", minWidth: 80 },
  { id: "userName", label: "USER NAME", minWidth: 100 },
  { id: "email", label: "USER EMAIL", minWidth: 150 },
  { id: "verifyemail", label: "VERIFY EMAIL", minWidth: 150 },
  { id: "userPhone", label: "USER PHONE NUMBER", minWidth: 100 },
  { id: "createdDate", label: "CREATED", minWidth: 100 },
];

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = React.useState(0);
  const [sortedIds, setSortedIds] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(1);
  const [userData, setUserData] = useState([]);
  const [userTotalData, setUserTotalData] = useState([]);
  const context = useContext(MyContext);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    const updatedItems = userData.map((item) => ({
      ...item,
      checked: isChecked,
    }));
    setUserData(updatedItems);

    if (isChecked) {
      const ids = updatedItems.map((item) => item?._id).sort((a, b) => a - b);
      // console.log(ids);
      setSortedIds(ids);
    } else {
      setSortedIds([]);
    }
  };
  const handleCheckboxChange = (e, id, index) => {
    const updatedItems = userData.map((item) =>
      item._id === id
        ? {
            ...item,
            checked: !item.checked,
          }
        : item
    );
    setUserData(updatedItems);
    const selectedIds = updatedItems
      .filter((item) => item.checked)
      .map((item) => item._id)
      .sort((a, b) => a - b);
    setSortedIds(selectedIds);
    // console.log(selectedIds);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };
  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = () => {
    setIsLoading(true);
    fetchDataFromApi(`/api/user/getAllUsers`).then((res) => {
      // console.log("users",res?.users);
      setUserData(res?.users);
      setUserTotalData(res?.users);
      // setIsLoading(false);
      imeout(() => {
        setIsLoading(false);
      }, 1000);setT
    });
  };
  const deleteMultiple = (id) => {
    if (sortedIds.length === 0) {
      context?.openAlertBox("error", "Please select items to delete");
      return;
    }
    try {
      deleteMultipleData(`/api/user/deleteMultiple`, sortedIds).then((res) => {
        setIsLoading(true);
        if (res?.error === false) {
          getUsers();
          console.log(res);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
          context?.openAlertBox("success", "User Deleted");
        } else {
          context?.openAlertBox("error", "Error deleting items");
        }
      });
    } catch (error) {
      context?.openAlertBox("error", "Error deleting items");
    }
  };
  useEffect(() => {
    if (searchQuery !== "") {
      const filteredItems = userTotalData?.filter(
        (user) =>
          user._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user?.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user?.createdAt.includes(searchQuery)
      );
      setUserData(filteredItems);
    } else {
      setIsLoading(true);
      fetchDataFromApi(`/api/user/getAllUsers`).then((res) => {
        if (res?.error === false) {
          // setOrders(res);
          setUserData(res?.users);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        }
      });
    }
  }, [searchQuery]);

  return (
    <>
      {isLoading === true ? (
        <div className="flex items-center w-full !text-primary min-h-[400px] justify-center">
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <div className="card my-4 pt-5 bg-white shadow-md sm:rounded-lg">
          <div className="flex items-center px-5  pl-5 pr-5 justify-between w-full ">
            <div className="col w-[40%]">
              <div className="flex items-center justify-between px-2 mt-3 py-0">
                {" "}
                <h3 className="text-[20px] font-[600]">Users</h3>
              </div>
            </div>

            <div className="col flex items-center gap-3  ml-auto w-[40%]">
              {sortedIds?.length !== 0 && (
                <Button
                  variant="contained"
                  className="btn-sm"
                  size="small"
                  color="error"
                  onClick={deleteMultiple}
                >
                  Delete
                </Button>
              )}
              <SearchBox
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>
          </div>
          <br />
          <div className="relative overflow-x-auto mt-4 shadow-md sm:rounded-lg">
            <Table sx={{ minWidth: 900 }}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Checkbox
                      {...label}
                      onChange={handleSelectAll}
                      checked={
                        userData?.length > 0
                          ? userData.every((item) => item.checked)
                          : false
                      }
                      size="small"
                    />
                  </TableCell>

                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      <span className="whitespace-nowrap"> {column.label}</span>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading === false ? (
                  userData?.length !== 0 &&
                  userData
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    ?.reverse()
                    ?.map((user, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell style={{ minWidth: columns.minWidth }}>
                            <Checkbox
                              onChange={(e) =>
                                handleCheckboxChange(e, user?._id, index)
                              }
                              checked={user.checked === true ? true : false}
                              {...label}
                              size="small"
                            />
                          </TableCell>
                          <TableCell style={{ minWidth: columns.minWidth }}>
                            <div className="flex items-center gap-4 w-[70px]">
                              <div className="img w-[70px] h-[70px] rounded-md group overflow-hidden">
                                <Link to="/product/768585">
                                  <img
                                    className="w-full h-full object-cover group-hover:scale-110 transition-all"
                                    src={
                                      user?.avatar !== "" &&
                                      user?.avatar !== undefined
                                        ? user?.avatar
                                        : "/profile.jpg"
                                    }
                                    alt={user?.name}
                                  />
                                </Link>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell style={{ minWidth: columns.minWidth }}>
                            {user?.name}
                          </TableCell>
                          <TableCell style={{ minWidth: columns.minWidth }}>
                            <span className="flex items-center gap-2 ">
                              <MdOutlineMarkEmailRead /> {user?.email}
                            </span>
                          </TableCell>
                          <TableCell style={{ minWidth: columns.minWidth }}>
                            {user?.verify_email === false ? (
                              <span
                                className={` capitalize inline-block py-1 px-4 text-[12px] text-white font-[500] rounded-full  bg-red-400`}
                              >
                                Not Verified
                              </span>
                            ) : (
                              <span
                                className={` capitalize inline-block py-1 px-4 text-[12px] rounded-full text-white font-[500]  bg-green-500`}
                              >
                                Verified
                              </span>
                            )}
                          </TableCell>
                          <TableCell style={{ minWidth: columns.minWidth }}>
                            <span className="flex items-center gap-2 ">
                              <MdLocalPhone />+
                              {user?.mobile === null ? "NONE" : user?.mobile}
                            </span>
                          </TableCell>
                          <TableCell style={{ minWidth: columns.minWidth }}>
                            <span className="flex items-center gap-2 ">
                              <SlCalender /> {user.createdAt.split("T")[0]}
                            </span>
                          </TableCell>
                        </TableRow>
                      );
                    })
                ) : (
                  <TableRow>
                    <TableCell colSpan={8}>
                      {" "}
                      <div className="flex items-center w-full  min-h-[400px] justify-center">
                        <CircularProgress color="inherit" />
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <TablePagination
            rowsPerPageOptions={[1, 5, 10]}
            component="div"
            count={userData?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      )}
    </>
  );
};

export default Users;
