import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import React, { useEffect } from "react";
// import { useContext } from "react";
import { useState, useContext } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { FaCloudUploadAlt } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import { IoEye } from "react-icons/io5";
import { MyContext } from "../../App.jsx";
import {
  deleteData,
  editData,
  fetchDataFromApi,
  postData,
} from "../../utils/api.js";
import CircularProgress from "@mui/material/CircularProgress";
const AddSize = () => {
  const [name, setName] = useState();
  const [data, setData] = useState([]);
  const context = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false);
  const [editId, setEditId] = useState("");
  useEffect(() => {
    getData();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (name === "") {
      context.openAlertBox("error", "PLease enter product Size");
      return false;
    }
    if (editId === "") {
      postData(`/api/product/productSize/create`, { name: name }).then(
        (res) => {
          if (res?.error === false) {
            context.openAlertBox("success", res?.message);
            setTimeout(() => {
              setIsLoading(false);
              getData();
              setName("");
            }, 500);
          }
          if (res?.error === true) {
            context.openAlertBox("error", "Error Submitting Fill Form");
            setIsLoading(false);
          }
        }
      );
    }
    if (editId !== "") {
      editData(`/api/product/productSize/${editId}`, { name: name }).then(
        (res) => {
          if (res?.data?.error === false) {
            context.openAlertBox("success", res?.data?.message);
            setTimeout(() => {
              setIsLoading(false);
              getData();
              setName("");
              setEditId("")
            }, 500);
          } else {
            console.log('error ',res?.data?.message);
            
            context.openAlertBox("error", "Error Submitting Edited Fill Form");
            setIsLoading(false);
          }
        }
      );
    }
  };
  const getData = () => {
    fetchDataFromApi("/api/product/productSize/get").then((res) => {
      console.log(res);
      if (res?.error === false) {
        setData(res?.data);
      }
    });
  };
  const deleteItem = (id) => {
    deleteData(`/api/product/productSize/${id}`).then((res) => {
      if (res?.error === false) {
        getData();
        console.log(res);

        context?.openAlertBox("success", "Item deleted");
      } else {
        context?.openAlertBox("error", "Error deleting Item");
      }
    });
  };

  const editItem = (id) => {
    fetchDataFromApi(`/api/product/productSize/${id}`).then((res) => {
      console.log(res);
      if (res?.error === false) {
        setName(res?.data?.name);
        console.log("id", res?.data?._id);

        setEditId(res?.data?._id);
      }
    });

    // editData(`/api/product/productRams/${id}`,{ name:name}).then((res)=>
    // {
    //   console.log(res);
    //    if (res?.error === false) {
    //         getData();
    //         console.log(res);

    //         context?.openAlertBox("success", "Item Updated");
    //       } else {
    //         context?.openAlertBox("error", "Error Updating  Item");
    //       }

    // })
  };
  return (
    <>
      <div className="flex items-center justify-between px-2 mt-3 py-0">
        {" "}
        <h3 className="text-[20px] font-[600]">Add Product SIZE</h3>
      </div>
      <div className="card my-4 pb-5 pt-5 bg-white  w-[100%] sm:w-[100%] lg:w-[65%] shadow-md sm:rounded-lg">
        <form className="form p-8 py-6" onSubmit={handleSubmit} action="">
          <div className="col mb-4 ">
            <h3 className="text-[16px] text-black font-[500] mb-1">
              Product SIZE
            </h3>
            <input
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full h-[40px] border-2  p-3 text-sm border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none focus:border-[rgba(0,0,0,0.5)]"
            />
          </div>
          <Button
            type="submit"
            className="btn-purple w-full flex gap-4  btn-lg"
          >
            {" "}
            {isLoading === true ? (
              <CircularProgress color="inherit" className="w-full" />
            ) : (
              <>
                <FaCloudUploadAlt className="text-[25px] hover:text-purple-600 hover:bg-purple-600 text-purple" />
                Publish And View
              </>
            )}
          </Button>
        </form>
      </div>

      {data?.length !== 0 && (
        <div className="card my-4 pb-5 pt-5 bg-white w-[100%] sm:w-[100%] lg:w-[65%] shadow-md sm:rounded-lg">
          <div class="relative overflow-x-auto mt-5 pb-2  shadow-md sm:rounded-lg">
            <table class="w-full text-sm mb-4 text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                 

                  <th
                    scope="col"
                    className="px-6 whitespace-nowrap py-3"
                    width="60%"
                  >
                   PRODUCT SIZE
                  </th>
                  <th
                    scope="col"
                    className="px-6 whitespace-nowrap py-3"
                    width="40%"
                  >
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-200 even:dark:bg-gray-700 border-b dark:border-gray-300 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      
                      <td className="px-6 py-2"><span className="text-[#4f4e4e] font-[600]">{item?.name}</span></td>
                      <td className="px-6 py-2">
                        <div className="flex  items-center gap-2">
                          <Button
                            onClick={() => editItem(item?._id)}
                            className="!w-[35px] !rounded-md hover:!bg-[#f1f1f1] dbtn !min-w-[35px] !bg-[#f1f1f1]  !h-[35px]"
                          >
                            <AiOutlineEdit size={25} color="rgba(0,0,0,0.7)" />
                          </Button>

                          <Button
                            onClick={() => deleteItem(item?._id)}
                            className="!w-[35px] !rounded-md hover:!bg-[#f1f1f1] dbtn !min-w-[35px] !bg-[#f1f1f1]  !h-[35px]"
                          >
                            <GoTrash size={25} color="rgba(0,0,0,0.7)" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default AddSize;
