import React, { useContext, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";

import { PiDotsThreeOutlineVertical } from "react-icons/pi";
import { myContext } from "../../App";
import MenuItem from "@mui/material/MenuItem";



const ITEM_HEIGHT = 48;
const AddressBox = (props) => {
    const context = useContext(myContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
const removeAddress=(id)=>
{
     setAnchorEl(null);
    props?.removeAddress(id)
}
const editAddress=(id)=>
{
    setAnchorEl(null)
    context?.setOpenAddressPanel(true)
    context?.setAddressMode("edit")
    context?.setAddressId(id)
    // context?.editAddress(id)
}
  return (
    <>
      <div
        className="border group hover:!bg-slate-400 relative border-dashed 
                           border-[rgba(0,0,0,0.2)]  addressBox bg-[#fafafa] w-full   cursor-pointer p-4 rounded-md"
      >
        <span className="inline-block p-1 bg-[#e7e7e7] text-[12px] rounded-sm">
          {props?.address?.addressType}
        </span>
        <h6 className="pt-2 text-[14px] flex items-center gap-4">
          <span>{context?.userData?.name}</span>
          <span>+{props?.address?.mobile}</span>
        </h6>
        <span className="text-[13px] pt-0 w-100 block">
          {props?.address?.address_line1 +
            " " +
            props?.address?.city +
            " " +
            props?.address?.country +
            " " +
            props?.address?.state +
            " " +
            props?.address?.pincode +
            " "}
        </span>

        <div className="absolute top-[20px] right-[20px] ">
          {" "}
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <PiDotsThreeOutlineVertical />
          </IconButton>
           <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          },
          list: {
            'aria-labelledby': 'long-button',
          },
        }}
      >
        <MenuItem   onClick={()=>editAddress(props?.address?._id)}>
           Edit
          </MenuItem>
        <MenuItem   onClick={()=>removeAddress(props?.address?._id)}>
           Delete
          </MenuItem>
      </Menu>
        </div>

        {/* <span
                               onClick={() => removeAddress(address?._id)}
                               className="ml-auto z-50 justify-center items-center w-[30px] h-[30px] hidden  group-hover:flex rounded-full !bg-gray-500 text-white"
                             >
                               <FaRegTrashAlt />
                             </span> */}
      </div>
    </>
  );
};

export default AddressBox;
