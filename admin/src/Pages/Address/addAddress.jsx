import React, { useContext, useEffect, useState } from "react";

import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IoMdClose } from "react-icons/io";
import Button from "@mui/material/Button";
import { FaCloudUploadAlt } from "react-icons/fa";
import { PhoneInput } from "react-international-phone";
import Select from "@mui/material/Select";
import "react-international-phone/style.css";
import MenuItem from "@mui/material/MenuItem";
import { editData, fetchDataFromApi, postData } from "../../utils/api";
import { MyContext } from "../../App";

const AddAddress = () => {
  const [phone, setPhone] = useState("");
  
  const context = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [formFields, setFormFields] = useState({
    address_line1: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
    status: "",
    userId: "",
    selected:false //userData?._id
  });
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };
  
  // useEffect((prev)=>(
  // {
  //   ...prev,
  //   userId:context?.userData?._id
  // }),[context?.userData])

  //changed portion
    useEffect(() => {
    if (context?.userData?._id) {
      setFormFields((prev) => ({
        ...prev,
        userId: context?.userData?._id,
      }));
    }
  }, [context?.userData]);
  
  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
    setFormFields((prev) => ({
      ...prev,
      status: event.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (formFields.address_line1 === "") {
      context.openAlertBox("error", "Please enter Address");
      return false;
    }
    if (formFields.city === "") {
      context.openAlertBox("error", "Please enter city");
      return false;
    }

    if (formFields.state === "") {
      context.openAlertBox("error", "Please enter State");
      return false;
    }
    if (formFields.pincode === "") {
      context.openAlertBox("error", "Please enter Pincode");
      return false;
    }
    if (formFields.country === "") {
      context.openAlertBox("error", "Please enter Country");
      return false;
    }
    if (phone === "") {
      context.openAlertBox("error", "Please enter 10 digit mobile number");
      return false;
    }
    console.log(formFields.address_line1, formFields.city);

    postData(`/api/address/add`, formFields, { withCredentials: true }).then(
      (res) => {
        console.log(res);

        if (res?.error !== true) {
          setIsLoading(false);
          context.openAlertBox("success", res?.data?.message);
          // localStorage.setItem("userEmail", formFields.email);

          context?.setIsOpenFullScreenPanel({
            open: false,
          });
 fetchDataFromApi(
        `/api/address/get?userId=${context?.userData?._id}`
      ).then((res) => {
    fetchDataFromApi(`/api/address/get?userId=${context?.userData?._id}`)
  .then((res) => {
     // Add this line!
    context?.setAddress(res.address);
  });
      });
          
        } else {
          context.openAlertBox("error", res?.data?.message);
          setIsLoading(false);
        }

        // setIsLoading(false);
      }
    );
  };
  return (
    <>
      <section className="bg-gray-100 p-5 ">
        {/* <h1>Create product</h1> */}
        <form onSubmit={handleSubmit} className="form p-8 py-3" action="">
          <div className="scroll  max-h-[525px] overflow-y-scroll pt-4 pr-4">
            <div className="grid mb-3 gap-4 grid-cols-2">
              <div className="col w-[100%]">
                <h3 className="text-[16px] text-black font-[500] mb-1">
                  Address Line 1
                </h3>
                <input
                  type="text"
                  name="address_line1"
                  value={formFields.address_line1}
                  onChange={onChangeInput}
                  className="w-full h-[40px] border-2  p-3 text-sm border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none focus:border-[rgba(0,0,0,0.5)]"
                />
              </div>
              <div className="col w-[100%]">
                <h3 className="text-[16px] text-black font-[500] mb-1">City</h3>
                <input
                  type="text"
                  name="city"
                  value={formFields.city}
                  onChange={onChangeInput}
                  className="w-full h-[40px] border-2  p-3 text-sm border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none focus:border-[rgba(0,0,0,0.5)]"
                />
              </div>
            </div>
            <div className="grid mb-3 gap-4 grid-cols-3">
              <div className="col w-[100%]">
                <h3 className="text-[16px] text-black font-[500] mb-1">
                  State
                </h3>
                <input
                  type="text"
                  name="state"
                  value={formFields.state}
                  onChange={onChangeInput}
                  className="w-full h-[40px] border-2  p-3 text-sm border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none focus:border-[rgba(0,0,0,0.5)]"
                />
              </div>
              <div className="col w-[100%]">
                <h3 className="text-[16px] text-black font-[500] mb-1">
                  Pincode
                </h3>
                <input
                  type="text"
                  name="pincode"
                  value={formFields.pincode}
                  onChange={onChangeInput}
                  className="w-full h-[40px] border-2  p-3 text-sm border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none focus:border-[rgba(0,0,0,0.5)]"
                />
              </div>
              <div className="col w-[100%]">
                <h3 className="text-[16px] text-black font-[500] mb-1">
                  Country
                </h3>
                <input
                  type="text"
                  name="country"
                  value={formFields.country}
                  onChange={onChangeInput}
                  className="w-full h-[40px] border-2  p-3 text-sm border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none focus:border-[rgba(0,0,0,0.5)]"
                />
              </div>
              <div className="col  w-[100%]">
                <h3 className="text-[16px] text-black font-[500] mb-0">
                  Mobile Number
                </h3>
                <PhoneInput
                  disabled={isLoading}
                  defaultCountry="in"
                  className="!w-full !h-full !bg-transparent   !border-none !outline-none !text-white !p-0 !m-0 flex items-center"
                  value={phone}
                  onChange={(phone) => {
                    setPhone(phone);
                    {
                      setFormFields((prev) => ({
                        ...prev,
                        mobile: phone,
                      }));
                    }
                  }}
                />
              </div>

              <div className="col w-[100%]">
                <h3 className="text-[16px] text-black font-[500] mb-1">
                  Status
                </h3>{" "}
                <Select
                  value={status}
                  onChange={handleChangeStatus}
                  displayEmpty
                  className="w-full"
                  size="small"
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={true}>True</MenuItem>
                  <MenuItem value={false}>False</MenuItem>
                </Select>
              </div>
            </div>

            <br />
          </div>
          <br />
          <div className="!min-w-[250px] ">
            <Button type="submit" className="btn-purple  flex gap-4  btn-lg">
              {" "}
              <FaCloudUploadAlt className="text-[25px] hover:text-purple-600 hover:bg-purple-600 text-purple" />{" "}
              Publish And View
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddAddress;
