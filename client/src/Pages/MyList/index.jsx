import React, { useContext, useState } from "react";

import Button from "@mui/material/Button";

import { BsFillBagCheckFill } from "react-icons/bs";
import CartItems from "./myListItems";
import MyListItems from "./myListItems";
import AccountSideBar from "../../components/AccountSideBar";
import { myContext } from "../../App";
import { Link } from "react-router-dom";

const MyList = () => {
  const context = useContext(myContext);
  return (
    <>
      <section className="py-4 lg:py-6 pb-20  w-full ">
        <div className="container !ml-4   flex flex-col md:flex-row gap-5">
          <div className="col1 hidden lg:block w-full md:w-[20%]">
            <AccountSideBar />
          </div>

          <div className="col2 w-full lg:w-[70%]">
            <div className="shadow-md rounded-md  bg-white">
              <div className="py-2 px-3 border-b border-[rgba(0,0,0,0,1)]">
                <h2>My List</h2>
                <p className="mt-0">
                  There are{" "}
                  <span className="font-bold !text-primary">
                    {context?.myListData?.length}
                  </span>{" "}
                  products in your my List
                </p>
              </div>
              {context?.myListData?.length !== 0 ? (
                context?.myListData?.map((item, index) => {
                  return <MyListItems item={item} />;
                })
              ) : (
                <div className="flex flex-col py-10 px-3 gap-3 items-center justify-center">
                 
                  <img src="/list.png" className="w-[100px]" alt="" />
                   <h3>My List is currently Empty</h3>
                    <Link to="/">
                        {" "}
                        <Button className="btn-org ">Continue Shopping </Button>
                      </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyList;
