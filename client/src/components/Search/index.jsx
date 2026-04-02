import React from "react";
import "../Search/style.css";
import Button from "@mui/material/Button";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import { useContext } from "react";
import { myContext } from "../../App";
import { fetchDataFromApi, postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
const Search = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // const [searchData, setSearchData] = useState()
  const context = useContext(myContext);
  const onChangeInput = (e) => {
    setSearchQuery(e.target.value);

    // setSearchQuery(e.target.value);
  };
  const history = useNavigate();
  const search = () => {
    setIsLoading(true);
    const obj = {
      page: 1, // always reset
      limit: 3,
      query: searchQuery,
    };

    if (searchQuery !== "") {
      postData(`/api/product/search/get`, obj).then((res) => {
        context?.setSearchData(res);
        // setSearchData(res);
        setTimeout(() => {
          setIsLoading(false);
          context?.setOpenSearchPanel(false)
          history("/search");
        }, 1000);
      });
    }
    // console.log("searchdata", context?.searchData);

    // context?.setSearchData(context?.searchData);
  };
  return (
    <div className="searchBox w-[100%] h-[50px] bg-[#e5e5e5] rounded-[5px] p-2 relative">
      <input
        type="text"
        name=""
        value={searchQuery}
        placeholder="Search for Products...."
        onChange={onChangeInput}
        className="w-full h-[35px] focus:outline-none bg-inherit text-[15px] p-2"
        id=""
      />

      <Button
        onClick={search}
        className="!text-black !absolute top-[7px] right-[5px] z-50 !min-w-[37px] !w-[37px] h-[37px] !rounded-full"
      >
        {isLoading === true ? (
          <CircularProgress  />
        ) : (
          <IoSearch className="text-[#4e4e4e] text-[24px]" size={48} />
        )}
      </Button>
    </div>
  );
};

export default Search;
