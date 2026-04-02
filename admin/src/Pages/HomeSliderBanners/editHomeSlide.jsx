import React, { useEffect } from "react";
import UploadBox from "../../Components/UploadBox";
import { useNavigate } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IoMdClose } from "react-icons/io";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import { FaCloudUploadAlt } from "react-icons/fa";
import { useState } from "react";
import { useContext } from "react";
import { MyContext } from "../../App";
import {
  deleteImages,
  editData,
  fetchDataFromApi,
  postData,
} from "../../utils/api";

const EditHomeSlide = () => {
  const [formFields, setFormFields] = useState({
    images: [],
  });

  const history = useNavigate();
  const [deletingIndex, setDeletingIndex] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(MyContext);

  // ✅ FIXED — no direct state mutation
  const setPreviewsFun = (newImages) => {
    const arr = Array.isArray(newImages) ? newImages : [newImages];

    setPreviews(arr);
    setFormFields((f) => ({ ...f, images: arr }));
  };

  useEffect(() => {
    const id = context?.isOpenFullScreenPanel?.id;

    if (!id) {
      console.error("❌ No ID found in context");
      return;
    }

    fetchDataFromApi(`/api/homeSlides/${id}`).then((res) => {
  const images = res?.images || [];

  setFormFields((prev) => ({
    ...prev,
    images: images,
  }));

  setPreviews(images);
});

  }, []);

  const removeImg = (image, index) => {
    setDeletingIndex(index);

    const imageArr = [...previews];

    deleteImages(`/api/homeSlides/deleteImage?img=${image}`)
      .then(() => {
        imageArr.splice(index, 1);
        setPreviews([]);
        setTimeout(() => {
          setPreviews(imageArr);

          setFormFields((prev) => ({
            ...prev,
            images: imageArr,
          }));

          setDeletingIndex(null);
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

    editData(
      `/api/homeSlides/${context?.isOpenFullScreenPanel?.id}`,
      formFields
    ).then((res) => {
      setTimeout(() => {
        setIsLoading(false);

        // ✅ FIXED — DO NOT open again, do not set ID again
        context.setIsOpenFullScreenPanel((prev) => ({
          ...prev,
          open: false,
        }));

        context?.openAlertBox("success", "Updated Successfully");
        history("/homeSlide/list");
      }, 2500);
    });
  };

  return (
    <>
      <section className="bg-gray-100 p-5 ">
        <form
          className="form p-1 md:p-8 py-1 md:py-1"
          onSubmit={handleSubmit}
          action=""
        >
          <div className="scroll max-h-[525px] overflow-scroll pt-4 pr-4">
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
                        <IoMdClose className="text-white text-[18px]" />
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
                              style: { transitionDelay: "1s" },
                            }}
                            src={image}
                          />
                        ) : (
                          <img
                            alt="sample text"
                            className="!w-[100%] h-full object-cover"
                            src={image}
                          />
                        )}

                        {deletingIndex === index && (
                          <div className="absolute w-full inset-0 flex items-center justify-center bg-white/60 z-40">
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
              className="btn-purple !min-w-[300px] !w-[300px] flex gap-4 btn-lg"
            >
              {isLoading ? (
                <CircularProgress color="inherit" className="w-full" />
              ) : (
                <>
                  <FaCloudUploadAlt className="text-[25px] text-purple" />
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

export default EditHomeSlide;
