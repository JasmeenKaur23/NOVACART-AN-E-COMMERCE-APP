import React, { useEffect } from "react";
import UploadBox from "../../Components/UploadBox";
import {useNavigate} from "react-router-dom"
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IoMdClose } from "react-icons/io";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import { FaCloudUploadAlt } from "react-icons/fa";
import { useState } from "react";
import { useContext } from "react";
import { MyContext } from "../../App";
import { deleteImages, fetchDataFromApi, postData } from "../../utils/api";
const AddHomeSlide = () => {
  const [formFields, setFormFields] = useState({
    images: [],
  });
  const history=useNavigate();
  const [deletingIndex, setDeletingIndex] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previews, setPreviews] = useState([]);
  // const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(MyContext);

  const setPreviewsFun = (previewsArr) => {
    setPreviews(previewsArr);
    formFields.images = previewsArr;
  };

  const removeImg = (image, index) => {
    setDeletingIndex(index); // mark which image is deleting
    const imageArr = [...previews];

    deleteImages(`/api/homeSlides/deleteImage?img=${image}`)
      .then((res) => {
        imageArr.splice(index, 1);
        setPreviews([]);
        setTimeout(() => {
          setPreviews(imageArr);
          formFields.images = imageArr;
          setDeletingIndex(null); // reset after done
        }, 100);
      })
      .catch(() => {
        setDeletingIndex(null);
      });
  };
 const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
   

    if (previews?.length === 0) {
      context.openAlertBox("error", "please select Category Images");
      setIsLoading(false);
      return false;
    }

    postData("/api/homeSlides/add", formFields).then((res) => {
      console.log(res);

      setTimeout(() => {
        setIsLoading(false);
        context.setIsOpenFullScreenPanel({
          open: false,
          // model:'Add New Category'
        });
       
        context?.openAlertBox("success","Created Successfully")
       history("/homeSlider/list")
      }, 2500);
    });
  };
  return (
    <>
      <section className="bg-gray-100 p-5 ">
        {/* <h1>Create product</h1> */}
        <form className="form p-1 md:p-8 py-1 md:py-1" onSubmit={handleSubmit} action="">
          <div className="scroll  max-h-[525px] overflow-scroll pt-4 pr-4">
            <div className="grid grid-cols-2 md:grid-cols-7 gap-4 ">
              {previews?.length !== 0 &&
                previews?.map((image, index) => {
                  return (
                    <div key={index} className="uploadBoxWrapper mr-3 relative">
                      <span
                        onClick={() => {
                          removeImg(image, index);
                        }}
                        className="absolute z-50 w-[20px] h-[20px] rounded-full overflow-hidden -top-[8px] cursor-pointer -right-[8px] flex items-center justify-center bg-red-700 "
                      >
                        {" "}
                        <IoMdClose className="text-white text-[18px] " />{" "}
                      </span>
                      {deletingIndex === index && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-40">
                          <CircularProgress size={35} color="inherit" />
                        </div>
                      )}
                      <div
                        className="uploadBox p-3 bg-gray-200 
      cursor-pointer hover:bg-gray-300 rounded-md 
      overflow-hidden border-2 border-dashed border-[rgba(0,0,0,0.4)]
      flex items-center justify-center flex-col relative w-[100%] h-[150px]"
                      >
                        {isUploading ? (
                          <LazyLoadImage
                            alt="sample text"
                            className="!w-[100%] h-full object-cover"
                            effect="blur"
                            wrapperProps={{
                              // If you need to, you can tweak the effect transition using the wrapper style.
                              style: { transitionDelay: "1s" },
                            }}
                            src={image} // use normal <img> attributes as props
                          />
                        ) : (
                          <img
                            alt="sample text"
                            className="!w-[100%] h-full object-cover"
                            src={image}
                          />
                        )}
                        {deletingIndex === index && (
                          <div className="absolute w-full  inset-0 flex items-center justify-center bg-white/60 z-40">
                            <CircularProgress size={35} color="inherit" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

              <UploadBox
                setPreviewsFun={setPreviewsFun}
                name="images"
                setIsUploading={setIsUploading}
                url="/api/homeSlides/uploadImages"
                multiple={false}
              />
            </div>
          </div>
          <br />
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

export default AddHomeSlide;
