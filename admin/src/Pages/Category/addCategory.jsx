import React, { useContext, useState } from "react";
import UploadBox from "../../Components/UploadBox";
import { MyContext } from "../../App.jsx";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IoMdClose } from "react-icons/io";
import Button from "@mui/material/Button";
import { FaCloudUploadAlt } from "react-icons/fa";
import { deleteImages, postData } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
const AddCategory = () => {
  const [previews, setPreviews] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState({
    name: "",
    images: [],
  });
const history=useNavigate()
 const context = useContext(MyContext);
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };
  const [deletingIndex, setDeletingIndex] = useState(null);

  // const removeImg = (image, index) => {
  //   var imageArr = [];
  //   imageArr = previews;
  //   deleteImages(`/api/category/deleteImage?img=${image}`).then((res) => {
  //     imageArr.splice(index, 1);
  //     // imageArr.push(previews);
  //     setPreviews([]);
  //     setTimeout(() => {
  //       setPreviews(imageArr);
  //       formFields.images=previewsArr
  //     }, 100);
  //     // setPreviews([])
  //   });
  // };
  const setPreviewsFun = (previewsArr) => {
    setPreviews(previewsArr);
    formFields.images = previewsArr;
  };
//    const setPreviewsFun = (previewsArr) => {
//     const imgArr=previews;
//     for(let i=0;i<previewsArr.length;i++)
//     {
// imgArr.push(previewsArr[i])
// setPreviews([])
// setTimeout(() => {
//           setPreviews(imageArr);
//           formFields.images = imageArr;
//           // reset after done
//         }, 100);
//     }
//   };
  const removeImg = (image, index) => {
    setDeletingIndex(index); // mark which image is deleting
    const imageArr = [...previews];

    deleteImages(`/api/category/deleteImage?img=${image}`)
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
    if (formFields.name === "") {
      context.openAlertBox("error", "please enter Category Name ");
      setIsLoading(false);
      return false;
    }

    if (previews?.length === 0) {
      context.openAlertBox("error", "please select Category Images");
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
        context?.openAlertBox("success","Created Successfully")
        history("/category/List")
      }, 2500);
    });
  };
  return (
    <>
      <section className="bg-gray-100 p-5 ">
        {/* <h1>Create product</h1> */}
        <form className="form  py-1 p-1 md:p-8 md:py-1" onSubmit={handleSubmit} action="">
          <div className="scroll  max-h-[525px] overflow-scroll pt-4 pr-1 md:pr-4">
            <div className="grid mb-3 grid-cols-1">
              <div className="col w-full md:w-[25%]">
                <h3 className="text-[16px] text-black font-[500] mb-1">
                  Category Name
                </h3>
                <input
                  onChange={onChangeInput}
                  type="text"
                  name="name"
                  value={formFields.name}
                  className="w-full h-[40px] border-2  p-3 text-sm border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none focus:border-[rgba(0,0,0,0.5)]"
                />
              </div>
            </div>
            <br />
            <h3 className="text-[16px] text-black font-[500] mb-2">
              Category Image
            </h3>
            <div className="grid mb-3 grid-cols-2 md:grid-cols-7 gap-4">
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
                url="/api/category/uploadImages"
                multiple={true}
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

export default AddCategory;
