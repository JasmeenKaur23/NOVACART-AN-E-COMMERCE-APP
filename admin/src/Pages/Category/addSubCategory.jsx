import React, { useContext, useState } from "react";
import UploadBox from "../../Components/UploadBox";

import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IoMdClose } from "react-icons/io";
import Button from "@mui/material/Button";
import { FaCloudUploadAlt } from "react-icons/fa";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { MyContext } from "../../App";
import { postData } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
const AddSubCategory = () => {
  const context = useContext(MyContext);
  const [productCat, setProductCat] = useState("");
  const [productCat2, setProductCat2] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  const [formFields, setFormFields] = useState({
    name: "",
    parentCatName: null,
    parentId: null,
  });
  const history=useNavigate()
  
  const [formFields2, setFormFields2] = useState({
    name: "",
    parentCatName: null,
    parentId: null,
  });
  const onChangeInput = (e) => {
    const { name, value } = e.target;

    const catId = productCat;
    setProductCat(catId);
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };
  const onChangeInput2 = (e) => {
    const { name, value } = e.target;

    const catId = productCat2;
    setProductCat2(catId);
    setFormFields2(() => {
      return {
        ...formFields2,
        [name]: value,
      };
    });
  };
  const selectCatFun = (catName) => {
    formFields.parentCatName = catName;
  };
  const selectCatFun2 = (catName) => {
    formFields2.parentCatName = catName;
  };
  const [productSubCat, setProductSubCat] = useState("");

  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
    formFields.parentId = event.target.value;
  };
  const handleChangeProductCat2 = (event) => {
    setProductCat2(event.target.value);
    formFields2.parentId = event.target.value;
  };
  const handleChangeSubProductCat = (event) => {
    setProductSubCat(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(formFields);

    if (formFields.name === "") {
      context.openAlertBox("error", "please enter Category Name ");
      setIsLoading(false);
      return false;
    }

    if (productCat === "") {
      context.openAlertBox("error", "please select Parent Product Category");
      setIsLoading(false);
      return false;
    }

    postData("/api/category/create", formFields).then((res) => {
      console.log(res);

      setTimeout(() => {
        setIsLoading(false);
        context.setIsOpenFullScreenPanel({
          open: false,
          // model:'Add New Category'
        });
        context?.getCat();
      }, 2500);
    });
  };
  const handleSubmit2 = (e) => {
    e.preventDefault();
    setIsLoading2(true);
    console.log(formFields2);

    if (formFields2.name === "") {
      context.openAlertBox("error", "please enter sub Category Name ");
      setIsLoading2(false);
      return false;
    }

    if (productCat2 === "") {
      context.openAlertBox("error", "please select subParent Product Category");
      setIsLoading2(false);
      return false;
    }

    postData("/api/category/create", formFields2).then((res) => {
      console.log(res);

      setTimeout(() => {
        setIsLoading2(false);
        context.setIsOpenFullScreenPanel({
          open: false,
          // model:'Add New Category'
        });
        context?.getCat();
         context?.openAlertBox("success","Created Successfully")
        history("/subCategory/list")
      }, 2500);
    });
  };
  return (
    <>
      <section className="bg-gray-100 p-5  grid grid-cols-1 md:grid-cols-2 gap-10 ">
        {/* <h1>Create product</h1> */}
        <form className="form  py-1 p-1 md:p-8 md:py-1  " onSubmit={handleSubmit} action="">
          <h4 className="font-[600]">Add Sub Category</h4>
          <div className="scroll  max-h-[525px] overflow-y-scroll pt-4 pr-4">
            <div className="grid gap-5 mb-3 grid-cols-1 md:grid-cols-1">
              <div className="col ">
                <h3 className="text-[16px] font-[500]  text-black mb-1">
                  Product Category
                </h3>
                <Select
                  labelId="demo-simple-select-label"
                  id="productCatDrop"
                  value={productCat}
                  label="Category"
                  className="w-full"
                  size="small"
                  onChange={handleChangeProductCat}
                >
                  {context?.catData?.length !== 0 &&
                    context?.catData?.map((item, index) => {
                      return (
                        <MenuItem
                          onClick={selectCatFun(item?.name)}
                          key={index}
                          value={item?._id}
                        >
                          {item?.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </div>
              <div className="col">
                <h3 className="text-[16px]  text-black font-[500] mb-1">
                  Sub Category Name
                </h3>
                {/* <Select
                  labelId="demo-simple-select-label"
                  id="productCatDrop"
                  value={productSubCat}
                  label="Category"
                  className="w-full"
                  size="small"
                  onChange={handleChangeSubProductCat}
                >
                  <MenuItem value={""}>None</MenuItem>
                  <MenuItem value={10}>Men</MenuItem>
                  <MenuItem value={20}>Women</MenuItem>
                  <MenuItem value={30}>Kids</MenuItem>
                </Select> */}

                <input
                  type="text"
                  name="name"
                  value={formFields.name}
                  onChange={onChangeInput}
                  className="w-full h-[40px] border border-[rgba(0,0,0,0.2] 
                  focus:outline-none focus:border-[rgba(0,0,0,0.4]
                   rounded-sm p-3 text-sm"
                />
              </div>
            </div>
          </div>
          <br />
          {/* <div className="!min-w-[250px] ">
            <Button type="submit" className="btn-purple  flex gap-4  btn-lg">
              {" "}
              {isLoading === true ? (
                <CircularProgress color="inherit" className="!w-full justify-center flex items-center" />
              ) : (
                <>
                  <FaCloudUploadAlt className="text-[25px] hover:text-purple-600 hover:bg-purple-600 text-purple" />
                  " Publish And View"
                </>
              )}
            </Button>
          </div> */}
            <div className="!min-w-[250px] ">
            <Button
              type="submit"
              className="btn-purple !min-w-[300px] !w-[300px]  flex gap-4  btn-lg"
            >
              {" "}
              {isLoading === true ? (
                <CircularProgress color="inherit" className="w-full" />
              ) : (
                <>
                  <FaCloudUploadAlt className="text-[25px] hover:text-purple-600 hover:bg-purple-600 text-purple" />
                  " Publish And View"
                </>
              )}
            </Button>
          </div>
        </form>
        <form className="form  py-1 p-1 md:p-8 md:py-1 " onSubmit={handleSubmit2} action="">
          <h4 className="font-[600]">Add Third Level Category</h4>

          <div className="scroll  max-h-[525px] overflow-y-scroll pt-4 pr-4">
            <div className="grid gap-5 mb-3 grid-cols-1 md:grid-cols-1">
              <div className="col ">
                <h3 className="text-[16px] font-[500]  text-black mb-1">
                  Sub Category
                </h3>

                <Select
                  labelId="demo-simple-select-label"
                  id="productCatDrop"
                  value={productCat2}
                  label="Category"
                  className="w-full"
                  size="small"
                  onChange={handleChangeProductCat2}
                >
                  {context?.catData?.length > 0 &&
                    context?.catData.map((item) =>
                      item?.children?.length > 0
                        ? item.children.map((item2) => (
                            <MenuItem
                              key={item2._id}
                              value={item2._id}
                              onClick={() => selectCatFun2(item2.name)}
                            >
                              {item2.name}
                            </MenuItem>
                          ))
                        : null
                    )}
                </Select>
              </div>
              <div className="col">
                <h3 className="text-[16px]  text-black font-[500] mb-1">
                  Third Level Category Name
                </h3>
                {/* <Select
                  labelId="demo-simple-select-label"
                  id="productCatDrop"
                  value={productSubCat}
                  label="Category"
                  className="w-full"
                  size="small"
                  onChange={handleChangeSubProductCat}
                >
                  <MenuItem value={""}>None</MenuItem>
                  <MenuItem value={10}>Men</MenuItem>
                  <MenuItem value={20}>Women</MenuItem>
                  <MenuItem value={30}>Kids</MenuItem>
                </Select> */}

                <input
                  type="text"
                  name="name"
                  value={formFields2.name}
                  onChange={onChangeInput2}
                  className="w-full h-[40px] border border-[rgba(0,0,0,0.2] 
                  focus:outline-none focus:border-[rgba(0,0,0,0.4]
                   rounded-sm p-3 text-sm"
                />
              </div>
            </div>
          </div>
          <br />
           <div className="!min-w-[250px] ">
            <Button
              type="submit"
              className="btn-purple !min-w-[300px] !w-[300px]  flex gap-4  btn-lg"
            >
              {" "}
              {isLoading2 === true ? (
                <CircularProgress color="inherit" className="w-full" />
              ) : (
                <>
                  <FaCloudUploadAlt className="text-[25px] hover:text-purple-600 hover:bg-purple-600 text-purple" />
                   Publish And View
                </>
              )}
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddSubCategory;
