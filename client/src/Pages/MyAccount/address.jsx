import React, { useContext, useEffect, useState } from "react";
import AccountSideBar from "../../components/AccountSideBar";
import Radio from "@mui/material/Radio";
import { myContext } from "../../App";

import InputLabel from "@mui/material/InputLabel";
import {
  deleteData,
  editData,
  fetchDataFromApi,
  postData,
} from "../../utils/api";
import AddressBox from "./addressBox";

const label = { inputProps: { "aria-label": "Radio demo" } };
const Address = () => {
  const context = useContext(myContext);
  // const [status, setStatus] = useState(false);
  const [address, setAddress] = useState([]);
  // const [islOading, setIsLoading] = useState(false);
  // const [phone, setPhone] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  // const [addressId, setAddressId] = useState("");
  // const [mode, setMode] = useState("add");
  // const [isOpenModel, setIsOpenModel] = useState(false);
  // const [addressType, setAddressType] = useState("");
  // const [formFields, setFormFields] = useState({
  //   address_line1: "",
  //   city: "",
  //   state: "",
  //   pincode: "",
  //   country: "",
  //   mobile: "",

  //   userId: "", //userData?._id
  //   addressType: "",
  //   landmark: "",
  // });

  useEffect(() => {
    if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
      setAddress(context?.userData?.address);
    }
  }, [context?.userData]);

  const removeAddress = (id) => {
    deleteData(`/api/address/${id}`).then((res) => {
      console.log(res);
      fetchDataFromApi(
        `/api/address/get?userId=${context?.userData?._id}`
      ).then((res) => {
        setAddress(res.address); // Add this line!
        // context?.setAddress(res.address);
        // context?.setUserData(res?.data)
        context?.getUserDetails()
      });
    });
  };

  return (
    <>
      <section className="py-5 lg:py-10 w-full ">
        <div className="container-fluid  flex-col md:flex-row flex gap-5">
          <div className="col1 !sticky w-full md:w-[30%] lg:w-[20%]">
            <AccountSideBar />
          </div>

          <div className="col2 w-full md:w-[70%] lg:w[50%]">
            <div className="card bg-white mb-5 p-3 shadow-md rounded-md">
              <div className="pb-3 flex items-center">
                {" "}
                <h3 className="text-[20px] pb-0 ">Address</h3>
              </div>
              <hr />

              <div
                className="flex items-center justify-center p-4 border border-dashed 
                        border-[rgba(0,0,0,0.2)] rounded-md hover:bg-[#e7f3f9] bg-[#f1faff] cursor-pointer "
                onClick={()=>
                {
                  context?.setOpenAddressPanel(true),
                  context?.setAddressMode("add")
                }
                }
              >
                <span className="text-[15px] font-[500] ">Add Address</span>
              </div>
              <div className="flex flex-col mt-4 gap-2 ">
                {address?.length > 0 &&
                  address?.map((address, index) => {
                    return (
                      <AddressBox
                        removeAddress={removeAddress}
                        address={address}
                        key={index}
                        // editAddress={editAddress}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Address;
