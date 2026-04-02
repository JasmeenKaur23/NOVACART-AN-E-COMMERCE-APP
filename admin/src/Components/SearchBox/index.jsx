import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";

const SearchBox = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchInput = useRef();
  const onChangeInput = (e) => {
    setSearchQuery(e.target.value);
    props?.setSearchQuery(e.target.value);
    if (searchInput.current.value === "") {
      // console.log("a");
      props.setPageOrder(1);
    }
  };
  return (
    <>
      <div className="w-full rounded-md h-auto relative overflow-hidden border-border-[rgba(0,0,0,0.2)] bg-[#f1f1f1]">
        <IoSearch className="opacity-50 absolute top-[10px] text-[20px] left-[8px] z-50 pointer-events-none" />
        <input
          type="text"
          className="w-full h-[40px] pl-8 bg-[#f1f1f1] p-2 focus:outline-none focus:border-2 focus:border-[rgba(0,0,0,0.5)] !rounded-md text-[14px]"
          name="searchbox"
          id=""
          placeholder="Search Here"
          ref={searchInput}
          value={searchQuery}
          onChange={onChangeInput}
        />
      </div>
    </>
  );
};

export default SearchBox;
