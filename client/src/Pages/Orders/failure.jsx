import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const OrderFailed = () => {
  return (
    <section className="w-full py-8 lg:py-20 p-10 gap-2 flex items-center justify-center flex-col">
      <img src="/close.png" className="w-[70px] sm:w-[120px]" width="120" alt="" />
      <h3 className="mb-0 text-[20px] sm:text-[25px]">Oops !! Your Order Failed </h3>
      <p className="mt-0 text-center">Sorry for that..any inconvenince is regretted</p>
      <Link to="/">
        {" "}
        <Button className="btn-org btn-border"> Back to Home</Button>
      </Link>
    </section>
  );
};

export default OrderFailed;
