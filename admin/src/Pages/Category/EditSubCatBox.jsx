import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, { useContext, useEffect, useState } from "react";
// import { useEffectEvent } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { deleteData, editData } from "../../utils/api";
import { MyContext } from "../../App";
const EditSubCatBox = (props) => {
  const context = useContext(MyContext);
  const [selectVal, setSelectVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formFields, setFormFields] = useState({
    name: "",
    parentCatName: null,
    parentId: null,
  });

  // // ✅ Proper state update for select dropdown
  // const handleChange = (event) => {
  //   const value = event.target.value;
  //   setSelectVal(value);
  //   setFormFields((prev) => ({
  //     ...prev,
  //     parentId: value,
  //     parentCatName:
  //       props?.catData?.find((cat) => cat?.id === value)?.name || prev.parentCatName,
  //   }));
  // };
  // ✅ Place this inside your EditSubCatBox component
  const handleChange = (event) => {
    const value = event.target.value;
    setSelectVal(value);
    const selected = props?.catData?.find((cat) => cat?._id === value);
    setFormFields((prev) => ({
      ...prev,
      parentId: value,
      parentCatName: selected?.name || "",
    }));
  };

  useEffect(() => {
    setFormFields({
      name: props?.name || "",
      parentCatName: props?.selectedCatName || "",
      parentId: props?.selectedCat || "",
    });
    setSelectVal(props?.selectedCat || "");
  }, [props?.name, props?.selectedCat, props?.selectedCatName]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (formFields.name === "") {
      context.openAlertBox("error", "Please enter Name of Category");
      setIsLoading(false);
      return;
    }

    editData(`/api/category/${props?.id}`, formFields).then((res) => {
      // setIsLoading(true)
      setTimeout(() => {
        // console.log(res?.message);

        context.openAlertBox("success", "Updated Successfully");
        context?.getCat();
        setIsLoading(false);
        setEditMode(false);
      }, 1000);
    });
  };

  const deleteCat = (id) => {
    setIsLoading(true)
    deleteData(`/api/category/${id}`).then((res) => {
      setTimeout(()=>
      {
 context?.getCat();
      setIsLoading(false)
      context.openAlertBox("success", "Deleted Successfully");
      },1000)
     
    });
  };
  return (
    <>
      <form
        className="w-100 whitespace-nowrap overflow-x-scroll flex items-center gap-3 p-0 px-4"
        action=""
        onSubmit={handleSubmit}
      >
        {editMode === true && (
          <>
            <div className="flex items-center justify-between py-2 gap-4 ">
              <div className="w-[180px] md:w-[150px]">
                <Select
                  style={{ zoom: "75%" }}
                  labelId="demo-simple-select-label"
                  value={selectVal || ""}
                  label="Category"
                  className="w-full"
                  size="small"
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  onChange={handleChange}
                >
                  {props?.catData?.length > 0 &&
                    props?.catData.map((item, index) => (
                      <MenuItem value={item?._id} key={index}>
                        {item?.name}
                      </MenuItem>
                    ))}
                </Select>
              </div>
              <input
                onChange={onChangeInput}
                type="text"
                name="name"
                value={formFields?.name}
                className="w-[150px] md:w-full h-[40px] border-2  p-3 text-sm border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none focus:border-[rgba(0,0,0,0.5)]"
              />
              <div className="flex items-center gap-2">
                <Button
                  type="submit"
                  className="btn-purple !min-w-[100px] !w-[100px]  flex gap-4  btn-lg"
                >
                  {" "}
                  {isLoading === true ? (
                    <CircularProgress color="inherit" className="w-full" />
                  ) : (
                    <>Edit</>
                  )}
                </Button>
                <Button
                  onClick={() => setEditMode(false)}
                  type="submit"
                  className="btn-purple !min-w-[100px] !w-[100px] flex gap-4  btn-lg"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </>
        )}

        {editMode === false && (
          <>
            <span className="font-[500] text-[14px]">{props?.name}</span>

            <div className="flex items-center ml-auto gap-2">
              <Button
                onClick={() => {
                  setEditMode(true);
                  setSelectVal(props.selectedCat);
                }}
                className="!min-w-[35px] !w-[35px] !ml-auto !h-[35px] !rounded-full !text-black"
              >
                <MdOutlineModeEdit />
              </Button>
              <Button
                onClick={() => deleteCat(props?.id)}
                className="!min-w-[35px] !w-[35px] !ml-auto !h-[35px] !rounded-full !text-black"
              >
              {isLoading === true ? (
                    <CircularProgress color="inherit" className="w-full" />
                  ) : (
                    <FaRegTrashAlt />
                  )}
              </Button>
            </div>
          </>
        )}
      </form>
    </>
  );
};

export default EditSubCatBox;
