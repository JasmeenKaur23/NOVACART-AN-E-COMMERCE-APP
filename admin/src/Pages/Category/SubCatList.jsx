import Button from "@mui/material/Button";
import React, { useContext, useEffect, useState } from "react";
import { PiExportBold } from "react-icons/pi";
import { MyContext } from "../../App";
// import { FaAngleDown, FaAngleUp, FaPlus } from "react-icons/fa";
import { FaAnglesDown, FaAnglesUp, FaPlus } from "react-icons/fa6";
import EditSubCatBox from "./EditSubCatBox";
import CircularProgress from "@mui/material/CircularProgress";

// const label = { inputProps: { "aria-label": "Checkbox demo" } };
// const columns = [
//   //1.10
//   { id: "image", label: "CATEGORY IMAGE", minWidth: 250 },
//   { id: "CatName", label: "CATEGORY NAME", minWidth: 250 },
//   { id: "subCatName", label: "SUB CATEGORY NAME", minWidth: 400 },
//   { id: "action", label: "Action", minWidth: 100 },
// ];

const SubCatList = () => {
  const context = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(true);
  // const [isOpen, setIsOpen] = useState(0);
  // const expand = (index) => {
  //   if (isOpen === index) {
  //     setIsOpen(!isOpen);
  //   } else {
  //     setIsOpen(index);
  //   }
  // };
  const [isOpen, setIsOpen] = useState(null);
 
useEffect(() => {
  const timer = setTimeout(() => {
    setIsLoading(false);
  }, 1000);

  return () => clearTimeout(timer); // cleanup
}, []);

  const expand = (index) => {
    setIsOpen((prev) => (prev === index ? null : index));
  };

  return (
    <>
      {isLoading === true ? (
        <div className="flex items-center w-full !text-primary min-h-[600px] justify-center">
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <>
          <div className="flex items-center flex-col md:flex-row justify-start md:justify-between px-2 mt-3 py-0">
            {" "}
            <h3 className="text-[20px] font-[600] w-full md:w-[50%] mb-2 md:mb-1">
              Sub Category List
            </h3>
            <div className="col mr-auto md:mr-0  flex items-center justify-end gap-3 md:ml-auto">
              <Button
                onClick={() =>
                  context.setIsOpenFullScreenPanel({
                    open: true,
                    model: "Add New Sub Category",
                  })
                }
                className="!text-white !flex btn-purple !items-center !gap-2  normal-case"
              >
                <FaPlus size={16} /> Add New Sub Category
              </Button>
            </div>
          </div>

          <div className="card my-4 p-5 shadow-md sm:rounded-lg bg-white">
            {context?.catData?.length !== 0 && (
              <ul className="w-full">
                {context?.catData?.map((firstLevelCat, index) => {
                  return (
                    <li className="w-full mb-1" key={index}>
                      <div className="flex items-center w-full p-2 bg-[#f1f1f1] rounded-sm px-4">
                        <span className="font-[500] flex items-center gap-4 tetxt-[14px] ">
                          {firstLevelCat?.name}
                        </span>
                        <Button
                          onClick={() => {
                            if (firstLevelCat?.children?.length > 0)
                              expand(index);
                          }}
                          className={`!min-w-[35px] !w-[35px] !ml-auto !h-[35px] !rounded-full 
              !text-black transition-all duration-200 
              hover:!bg-[#e0e0e0] ${
                firstLevelCat?.children?.length === 0
                  ? "!opacity-50 !cursor-not-allowed"
                  : ""
              }`}
                        >
                          {isOpen === index ? <FaAnglesUp /> : <FaAnglesDown />}
                        </Button>
                      </div>
                      {isOpen === index && (
                        <>
                          {firstLevelCat?.children?.length !== 0 && (
                            <ul className="w-full">
                              {firstLevelCat.children?.map((subCat, index_) => {
                                return (
                                  <li
                                    className="w-full pl-4 py-1 "
                                    key={index_}
                                  >
                                    <EditSubCatBox
                                      name={subCat?.name}
                                      id={subCat?._id}
                                      catData={context?.catData}
                                      selectedCatName={subCat?.parentCatName}
                                      selectedCat={subCat?.parentId}
                                      index={subCat._id}
                                    />
                                    {subCat?.children?.length !== 0 && (
                                      <ul className="pl-6">
                                        {subCat?.children?.map(
                                          (thirdLevel, index__) => {
                                            return (
                                              <li
                                                className="w-full hover:bg-[#f1f1f1]"
                                                key={index__}
                                              >
                                                <EditSubCatBox
                                                  name={thirdLevel?.name}
                                                  id={thirdLevel?._id}
                                                  catData={
                                                    firstLevelCat?.children
                                                  }
                                                  selectedCatName={
                                                    thirdLevel?.parentCatName
                                                  }
                                                  selectedCat={
                                                    thirdLevel?.parentId
                                                  }
                                                  index={thirdLevel?._id}
                                                />
                                              </li>
                                            );
                                          }
                                        )}
                                      </ul>
                                    )}
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default SubCatList;
