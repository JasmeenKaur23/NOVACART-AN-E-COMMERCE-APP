import React, { useContext, useState } from "react";
import { LiaShippingFastSolid } from "react-icons/lia";
import { PiKeyReturnLight } from "react-icons/pi";
import { BsWalletFill } from "react-icons/bs";
import { LiaGiftSolid } from "react-icons/lia";
import { BiSupport } from "react-icons/bi";
import { Link } from "react-router-dom";
import { IoChatboxOutline, IoCloseSharp } from "react-icons/io5";
import Button from "@mui/material/Button";
// import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import ProductZoom from "../ProductZoom";
// import { IoCloseSharp } from "react-icons/io5";
import ProductDetailsComponent from "../ProductDetails";
import FormControlLabel from "@mui/material/FormControlLabel";

import Checkbox from "@mui/material/Checkbox";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaPinterest } from "react-icons/fa";
<FaPinterest />;
import { FaInstagram } from "react-icons/fa";
import CartPanel from "../CartPanel";
import Drawer from "@mui/material/Drawer";
import { myContext } from "../../App";
import AddAddress from "../../Pages/MyAccount/addAddress";
import { Zoom } from "@mui/material";

const Footer = () => {
  const [gilad, setGilad] = useState(false);

  const handleChange = (event) => {
    setGilad(event.target.checked);
  };
  const context = useContext(myContext);

  return (
    <>
      <footer className="py-6 bg-[#f1f1f1]">
        <div className="container-fluid">
          <div className="flex scrollableBox footerBoxWrap px-0 lg:px-5  items-center justify-center pb-8 py-2 lg:py-8  gap-2">
            <div className="col items-center justify-center flex group w-[20%] flex-col">
              <LiaShippingFastSolid
                size={56}
                className="group-hover:!text-primary group-hover:-translate-y-1 transition-all duration-300"
              />
              <h5 className="text-[18px] mt-3 font-[600]">Free Shipping</h5>
              <p className="text-[13px] font-[400]">For all Orders Over $100</p>
            </div>
            <div className="col items-center  w-[20%] justify-center flex group flex-col">
              <PiKeyReturnLight
                size={56}
                className="group-hover:!text-primary group-hover:-translate-y-1 transition-all duration-300"
              />
              <h5 className="text-[18px] mt-3 font-[600]">30 Days Returns</h5>
              <p className="text-[13px] font-[400]">For an Exchange Product</p>
            </div>
            <div className="col items-center w-[20%]  justify-center flex group flex-col">
              <BsWalletFill
                size={56}
                className="group-hover:!text-primary group-hover:-translate-y-1 transition-all duration-300"
              />
              <h5 className="text-[18px] mt-3 font-[600]">Secured Payment</h5>
              <p className="text-[13px] font-[400]">Payment Cards Accepted</p>
            </div>
            <div className="col items-center  w-[20%] justify-center flex group flex-col">
              <LiaGiftSolid
                size={56}
                className="group-hover:!text-primary group-hover:-translate-y-1 transition-all duration-300"
              />
              <h5 className="text-[18px] mt-3 font-[600]">Special Gifts</h5>
              <p className="text-[13px] font-[400]">Our First Product Order</p>
            </div>
            <div className="col items-center w-[20%]  justify-center flex group flex-col">
              <BiSupport
                size={56}
                className="group-hover:!text-primary group-hover:-translate-y-1 transition-all duration-300"
              />
              <h5 className="text-[18px] mt-3 font-[600]">Support 24/7</h5>
              <p className="text-[13px] font-[400]">Contact us Anytime</p>
            </div>
          </div>
          <br />
          <hr className="w-full" />

          <div className="footer px-3 flex lg:px-0 flex-col lg:flex-row py-8 ">
            <div className="w-full lg:w-[25%] part1 border-r-2 border-[#ff5252]">
              <h4 className="text-[20px] mb-4 font-[600]">Contact Us</h4>
              <p className="text-[18px] mb-1 font-[500]">
                Classyshop - Mega Super Store
              </p>
              <p>
                507-Union Trade Centre
                <br /> France
              </p>
              <Link to="mailto:someone@example.com" className="link">
                sales@yourcompany.com
              </Link>
              <span className="text-[22px] mt-2 mb-3 !text-primary block w-full font-[600]">
                (+91) 9876-543-210
              </span>

              <div className="items-center flex">
                <IoChatboxOutline className="mt-2 !text-primary" size={56} />
                <span className="text-[16px] !text-primary p-2 font-[600]">
                  Online Chat
                  <br />
                  Get Expert Help
                </span>
              </div>
            </div>

            <div className="w-full lg:w-[40%] flex pl-0 lg:pl-8 mt-6 lg:mt-0 part2">
              <div className="w-[50%] part2_col1">
                <h4 className="text-[20px] mb-4 font-[600]">Products</h4>

                <ul className="list m-0 p-0">
                  <li className="list-none text-[14px] w-full mb-3">
                    <Link to="/" className="link">
                      Prices Drop
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-3">
                    <Link to="/" className="link">
                      New Products
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-3">
                    <Link to="/" className="link">
                      Best Sales
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-3">
                    <Link to="/" className="link">
                      Contact Us
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-3">
                    <Link to="/" className="link">
                      Sitemap
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-3">
                    <Link to="/" className="link">
                      Stores
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="w-[50%] part2_col2">
                <h4 className="text-[20px] mb-4 font-[600]">Our Company</h4>

                <ul className="list m-0 p-0">
                  <li className="list-none text-[14px] w-full mb-3">
                    <Link to="/" className="link">
                      Delivery
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-3">
                    <Link to="/" className="link">
                      Legal Notice
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-3">
                    <Link to="/" className="link">
                      Terms And Conditions Of Use
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-3">
                    <Link to="/" className="link">
                      About Us
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-3">
                    <Link to="/" className="link">
                      Secure Payment
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-3">
                    <Link to="/" className="link">
                      Login
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full lg:w-[35%] flex flex-col pl-0 lg:pl-8 part3 mt-5 lg:mt-0">
              <h3 className="text-[18px] font-[600] mb-2 lg:mb-4">
                Subscribe to NewsLetter
              </h3>
              <p className="font-[400] text-[13px]">
                Subscribe to our latest newsletter to get news about special
                discounts.
              </p>
              <form className="mt-3" action="">
                <input
                  type="text"
                  className="w-full focus:border-[rgba(0,0,0,0.3)] mb-4 pl-4 pr-4 rounded-md h-[45px] border outline-none"
                  placeholder="Your Email Address"
                  name=""
                  id=""
                />
                <Button className="btn-org  p-2.5">Subscribe</Button>

                <FormControlLabel
                  className="mt-3 block w-full lg:mt-0"
                  control={
                    <Checkbox
                      checked={gilad}
                      onChange={handleChange}
                      name="gilad"
                    />
                  }
                  label="I agree to the terms and conditions and the privacy policy"
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: "14px", // 👈 change to your desired size
                    },
                  }}
                />
              </form>
            </div>
          </div>
        </div>
      </footer>

      <div className="bottomStrip bg-white border-t pt-3  pb-[100px] lg:pb-3 border-[rgba(0,0,0,0.7)]">
        <div className="container-fluid flex items-center flex-col lg:flex-row gap-4 lg:gap-0 justify-between">
          <ul className="flex items-center  justify-center  mr-4 ml-4 gap-3">
            <li className="list-none flex mt-2 items-center justify-center">
              <Link
                to="/"
                target="_blank"
                className="transition-all link w-[35px] h-[35px] rounded-full border
                 border-[rgba(0,0,0,0.1)] flex items-center group hover:!bg-primary justify-center"
              >
                <FaFacebookF className="group-hover:!text-white  text-[20px]" />{" "}
              </Link>
            </li>{" "}
            <li className="list-none mt-2">
              <Link
                to="/"
                target="_blank"
                className="transition-all link w-[35px] h-[35px] rounded-full border
                 border-[rgba(0,0,0,0.1)] flex items-center group hover:!bg-primary justify-center"
              >
                <AiOutlineYoutube className="group-hover:!text-white items-center  text-[25px]" />{" "}
              </Link>
            </li>{" "}
            <li className="list-none mt-2">
              <Link
                to="/"
                target="_blank"
                className="transition-all link w-[35px] h-[35px] rounded-full border
                 border-[rgba(0,0,0,0.1)] flex items-center group hover:!bg-primary justify-center"
              >
                <FaPinterest
                  agram
                  className="group-hover:!text-white  text-[20px]"
                />{" "}
              </Link>
            </li>
            <li className="list-none mt-2">
              <Link
                to="/"
                target="_blank"
                className="transition-all link w-[35px] h-[35px] rounded-full border
                 border-[rgba(0,0,0,0.1)] flex items-center group hover:!bg-primary justify-center"
              >
                <FaInstagram className="group-hover:!text-white  text-[20px]" />{" "}
              </Link>
            </li>
          </ul>

          <p className="text-[16px] text-center mb-0">
            @2025 - Ecommerce software by Jasmeen
          </p>

          <div className="flex items-center gap-1  mr-4 ml-4 ">
            <img
              src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_blockpaymentlogo/views/img/carte_bleue.png"
              alt=""
            />
            <img
              src="https://ecommerce-frontend-view.netlify.app/visa.png"
              alt=""
            />
            <img
              src="https://ecommerce-frontend-view.netlify.app/master_card.png"
              alt=""
            />
            <img
              src="https://ecommerce-frontend-view.netlify.app/american_express.png"
              alt=""
            />
            <img
              src="https://ecommerce-frontend-view.netlify.app/paypal.png"
              alt=""
            />
          </div>
        </div>
      </div>
      {/* cart panel */}
      <Drawer
        open={context.openCartPanel}
        anchor="right"
        className="cartPanel "
        onClose={context.toggleCartPanel(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 400, // ← increase or decrease width here
          },
        }}
      >
        <div className="flex overflow-hidden items-center justify-between gap-3 border-[rgba(0,0,0,0.2)] !border-b-2 py-3 px-4">
          <h3>Shopping Cart ({context?.cartData?.length}) </h3>
          <IoCloseSharp
            className="text-[32px] cursor-pointer"
            onClick={context.toggleCartPanel(false)}
          />
        </div>
        {context?.cartData?.length !== 0 ? (
          <CartPanel data={context?.cartData} />
        ) : (
          <>
            <div className="flex items-center gap-4 flex-col pt-[100px] justify-center">
              <img src="/shopping.png" className="w-[150px] " alt="" />
              <h4 className="">Your Cart is currently Empty</h4>
              <Button
                className="btn-org "
                onClick={context.toggleCartPanel(false)}
              >
                Continue Shopping{" "}
              </Button>
            </div>
          </>
        )}
      </Drawer>

      {/* address panel */}
      <Drawer
        open={context.openAddressPanel}
        anchor="right"
        className="addressPanel"
        onClose={context.toggleAddressPanel(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 550, // ← increase or decrease width here
          },
        }}
      >
        <div className="flex overflow-hidden items-center justify-between gap-3 border-[rgba(0,0,0,0.2)] !border-b-2 py-3 px-4">
          <h3>
            {context?.addressMode === "add" ? "Add" : "Edit"} Delivery Address{" "}
          </h3>
          <IoCloseSharp
            className="text-[32px] cursor-pointer"
            onClick={context.toggleAddressPanel(false)}
          />
        </div>
        <div className="w-full max-h-[100vh] overflow-auto">
          {" "}
          <AddAddress />
        </div>
      </Drawer>

      {/* <Dialog
        open={context?.openProductDetailModal.open}
        // TransitionComponent={Transition}
        keepMounted
        fullWidth={context?.fullWidth}
        maxWidth={context?.maxWidth}
        className="productDetailsModal"
        onClose={context?.handleCloseProductDetailModal}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <div className="flex !pl-0 items-start justify-start gap-4 productDetailsModalContainer relative w-full">
            <Button
              onClick={context?.handleCloseProductDetailModal}
              className="!border-3 !border-[#ff5252] !bg-[#fad9d9] !h-[40px] !min-w-[40px] !text-[#ff5252] !absolute !top-[15px] !right-[15px] !rounded-full !w-[40px]"
            >
              <IoCloseSharp className="text-[40px]" />
            </Button>
            {context?.openProductDetailModal?.item?.element !== 0 && (
              <>
                <div className="col1 !pl-0 flex items-start w-[40%]">
                  <ProductZoom
                    images={context?.openProductDetailModal?.item?.images}
                  />
                </div>
                <div className="col2 w-[60%]">
                  <ProductDetailsComponent
                    item={context?.openProductDetailModal?.item}
                  />
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog> */}
      <Dialog
        open={context?.openProductDetailModal.open}
        onClose={context?.handleCloseProductDetailModal}
        TransitionComponent={Zoom}
        fullWidth
        maxWidth="lg"
        // THIS IS THE MAGIC PART
        slotProps={{
          backdrop: { sx: { backgroundColor: "rgba(0,0,0,0.7)" } },
        }}
        PaperProps={{
          sx: {
            m: { xs: 2, sm: 3, lg: 4 },
            borderRadius: { xs: 3, lg: 4 },
            overflow: "visible", // Allows button to escape
            position: "relative",
            maxHeight: "95vh",
            width: { xs: "95%", sm: "90%", lg: "85%" },
          },
        }}
        sx={{
          "& .MuiDialog-container": {
            alignItems: "center",
            justifyContent: "center",
          },
          // THIS IS THE KEY: Disable clipping on all parent layers
          "& .MuiModal-root": {
            overflow: "visible",
          },
          "& .MuiBackdrop-root": {
            overflow: "visible",
          },
        }}
      >
        <DialogContent sx={{ p: 0, overflow: "hidden" }}>
          <div className="relative flex flex-col lg:flex-row min-h-[500px]">
            {/* CLOSE BUTTON – NOW FULLY VISIBLE & OUTSIDE */}
            <Button
              onClick={context?.handleCloseProductDetailModal}
              className="!top-[0px]  !font-bold text-[25px] btn-org"
            >
              CLOSE
            </Button>

            {/* Your content */}
            <div className="w-full lg:w-[90%] p-6 lg:p-10 overflow-y-auto">
              <ProductDetailsComponent
                item={context.openProductDetailModal.item}
                isModal={true}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Footer;
