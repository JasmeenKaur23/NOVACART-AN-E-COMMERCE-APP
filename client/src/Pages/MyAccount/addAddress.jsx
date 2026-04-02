import Button from "@mui/material/Button";
import React, { useContext, useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import { myContext } from "../../App";
import TextField from "@mui/material/TextField";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import RadioGroup from "@mui/material/RadioGroup";
import { editData, fetchDataFromApi, postData } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";

const AddAddress = () => {
  const context = useContext(myContext);
  const [phone, setPhone] = useState("");
  const [isloading, setIsLoading] = useState(false);
  //   const [addressId, setAddressId] = useState("");
  // const [mode, setMode] = useState("add");
  //   const [isOpenModel, setIsOpenModel] = useState(false);
  const [addressType, setAddressType] = useState("");
  const [formFields, setFormFields] = useState({
    address_line1: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",

    userId: "", //userData?._id
    addressType: "",
    landmark: "",
  });
  useEffect(() => {
    if (context?.userData?._id) {
      setFormFields((prev) => ({
        ...prev,
        userId: context?.userData?._id,
      }));
    }
  }, [context?.userData]);
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

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
    if (formFields.landmark === "") {
      context.openAlertBox("error", "Please enter Landmark");
      return false;
    }
    if (formFields.addressType === "") {
      context.openAlertBox("error", "Please enter Address Type");
      return false;
    }
    if (phone === "") {
      context.openAlertBox("error", "Please enter 10 digit mobile number");
      return false;
    }
    console.log(formFields.address_line1, formFields.city);
    if (context?.addressMode === "add") {
      setIsLoading(true);
      postData(`/api/address/add`, formFields, { withCredentials: true }).then(
        (res) => {
          console.log("res,res", res);

          if (res?.error !== true) {
            setTimeout(() => {
              setIsLoading(false);
              context?.setOpenAddressPanel(false);
            }, 700);
            context.openAlertBox("success", res?.message);
            // localStorage.setItem("userEmail", formFields.email);

            // context?.setIsOpenFullScreenPanel({
            //   open: false,
            // });

            context?.getUserDetails();

            setFormFields({
              address_line1: "",
              city: "",
              state: "",
              pincode: "",
              country: "",
              mobile: "",

              userId: "", //userData?._id
              addressType: "",
              landmark: "",
            });
            setPhone("");
            setAddressType("");
          } else {
            context.openAlertBox("error", res?.data?.message);
            setIsLoading(false);
          }

          // setIsLoading(false);
        }
      );
    }

    if (context?.addressMode === "edit") {
      setIsLoading(true);
      editData(`/api/address/${context?.addressId}`, formFields, {
        withCredentials: true,
      }).then((res) => {
        console.log("res from edit add", res);
        fetchDataFromApi(
          `/api/address/get?userId=${context?.userData?._id}`
        ).then((res) => {
          setTimeout(() => {
            setIsLoading(false);
            context?.setOpenAddressPanel(false);
          }, 700);
          context?.getUserDetails(res.address);
          // context?.setAddress(res.address);
        });
      });
      setFormFields({
        address_line1: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        mobile: "",

        userId: "", //userData?._id
        addressType: "",
        landmark: "",
      });
      setPhone("");
      setAddressType("");
    }
  };
  const handleChangeAddressType = (e) => {
    setAddressType(e.target.value);
    // alert(e.target.value)
    setFormFields(() => ({
      ...formFields,
      addressType: e.target.value,
    }));
  };
  const fetchAddress = (id) => {
    // e.preventDefault();
    // setMode("edit");
    // setIsLoading(true);
    // setIsOpenModel(true);
    // setAddressId(id);
    fetchDataFromApi(`/api/address/${id}`).then((res) => {
      // console.log("res address",res);
      setFormFields({
        address_line1: res?.address?.address_line1,
        city: res?.address?.city,
        state: res?.address?.state,
        pincode: res?.address?.pincode,
        country: res?.address?.country,
        mobile: res?.address?.mobile,

        userId: res?.address?.userId, //userData?._id
        addressType: res?.address?.addressType,
        landmark: res?.address?.landmark,
      });
      const ph = `"${res?.address?.mobile}"`;
      console.log(ph);

      setPhone(ph);

      setAddressType(res?.address?.addressType);
    });
  };
  useEffect(() => {
    if (context?.addressMode === "edit") {
      fetchAddress(context?.addressId);
    }
  }, [context?.addressMode]);
  return (
    <form
      action=""
      onSubmit={handleSubmit}
      className="w-full !pb-12 px-4 pt-0  mt-2"
    >
      <div className="col w-[100%] mb-4">
        {" "}
        {/* 50% width container */}
        <TextField
          fullWidth // ensures it fills its 50% container, not the row
          label="Address Line 1"
          variant="outlined"
          size="small"
          name="address_line1"
          value={formFields.address_line1}
          onChange={onChangeInput}
        />
      </div>
      <div className="col w-[100%] mb-4">
        {" "}
        {/* 50% width container */}
        <TextField
          fullWidth // ensures it fills its 50% container, not the row
          label="City"
          name="city"
          value={formFields.city}
          onChange={onChangeInput}
          variant="outlined"
          size="small"
        />
      </div>

      <div className="col w-[100%] mb-4">
        {" "}
        {/* 50% width container */}
        <TextField
          fullWidth // ensures it fills its 50% container, not the row
          label="State"
          variant="outlined"
          name="state"
          value={formFields.state}
          onChange={onChangeInput}
          size="small"
        />
      </div>

      <div className="col w-[100%] mb-4">
        {" "}
        {/* 50% width container */}
        <TextField
          fullWidth // ensures it fills its 50% container, not the row
          label="Pincode"
          name="pincode"
          value={formFields.pincode}
          onChange={onChangeInput}
          variant="outlined"
          size="small"
        />
      </div>

      <div className="col w-[100%] mb-4">
        {" "}
        {/* 50% width container */}
        <TextField
          fullWidth // ensures it fills its 50% container, not the row
          label="Country"
          variant="outlined"
          name="country"
          value={formFields.country}
          onChange={onChangeInput}
          size="small"
        />
      </div>

      <div className="col w-[100%] mb-4">
        {" "}
        {/* 50% width container */}
        <PhoneInput
          //  disabled={isLoading}
          defaultCountry="in"
          className="!w-full !h-full !bg-transparent  !border-none !outline-none !text-white !p-0 !m-0 flex items-center"
          value={phone}
          onChange={(phone) => {
            setPhone(phone);
            setFormFields((prev) => ({
              ...prev, // keep previous name and email
              mobile: phone, // update only the phone
            }));
          }}
        />
      </div>

      <div className="col w-[100%] mb-4">
        {" "}
        <TextField
          fullWidth // ensures it fills its 50% container, not the row
          label="Landmark"
          variant="outlined"
          name="landmark"
          value={formFields.landmark}
          onChange={onChangeInput}
          size="small"
        />
      </div>

      <div className="flex  flex-col gap-3 pb-4">
        {" "}
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">
            Address Type
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            className="flex items-center gap-3"
            value={addressType}
            onChange={handleChangeAddressType}
          >
            <FormControlLabel value="Home" control={<Radio />} label="Home" />
            <FormControlLabel
              value="Office"
              control={<Radio />}
              label="Office"
            />
          </RadioGroup>
        </FormControl>
      </div>

      <div className="flex gap-2 items-center w-full justify-between">
        <Button type="submit" className="btn-org w-full">
          {isloading === true ? <CircularProgress color="inherit" /> : "SAVE"}
        </Button>

        {/* <Button onClick={handleClose} className="btn-org btn-border w-full">
          Cancel
        </Button> */}
      </div>
    </form>
  );
};

export default AddAddress;
