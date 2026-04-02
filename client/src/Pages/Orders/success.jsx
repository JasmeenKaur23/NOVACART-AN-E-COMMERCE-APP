import { Button } from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { myContext } from "../../App";

const OrderSuccess = () => {
  const context=useContext(myContext)
  return (
    <section className="w-full py-8 lg:py-20 p-10 gap-2 flex items-center justify-center flex-col">
      <img src="/check.png" className="w-[80px] sm:w-[120px]" width="120" alt="" />
      <h3 className="mb-0 text-[20px] sm:text-[25px]">Yay!! Order Recieved</h3>
      <p className="mt-0">Thank You for your Payment.</p>
      <p className="mt-0 text-center">Order invoice sent to email
        <br />
        {context?.userData?.email}
      </p>
      <Link to="/">
        {" "}
        <Button className="btn-org btn-border"> Back to Home</Button>
      </Link>
    </section>
  );
};

export default OrderSuccess;
