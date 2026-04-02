// import React, { useState } from "react";
// import { FaRegImages } from "react-icons/fa6";
// import { uploadImage, uploadImages } from "../../utils/api.js";

// const UploadBox = (props) => {

//     const [previews, setPreviews] = useState([]);
//     const formdata = new FormData();
//       const [uploading, setUploading] = useState(false);
//       let selectedImages = [];
//       const onChangeFile = async (e, apiEndPoint) => {
//         try {
//           setPreviews([]);

//           const files = e.target.files;
//           props.setIsUploading(true);
//           setUploading(true);
//           console.log(files);

//           for (var i = 0; i < files.length; i++) {
//             if (
//               files[i] &&
//               (files[i].type === "image/jpeg" ||
//                 files[i].type === "image/jpg" ||
//                 files[i].type === "image/png" ||
//                 files[i].type === "image/webp")
//             ) {
//               const file = files[i];

//               selectedImages.push(file);
//               formdata.append(props?.name, file);
//             } else {
//               context.openAlertBox(
//                 "error",
//                 "please select valid jpg or jpeg or webp or png image file "
//               );
//               setUploading(false);
//                    props.setIsUploading(false);
//               return false;
//             }
//           }
//           console.log(formdata);
//           uploadImages(apiEndPoint, formdata).then((res) => {
//             setUploading(false);
//                 props.setIsUploading(false);
//             // props.setPreviews(res?.data?.images)
//             props.setPreviewsFun(res?.data?.images)

//             // let avatar = [];
//             // avatar.push(res?.data?.avtar);

//             // setPreviews(avatar);
//             // console.log(res);
//           });
//         } catch (error) {
//           console.log("error in uploadbox", error);
//               props.setIsUploading(false);
//         }
//       };

//   return (
//     <>
//       <div
//         className="uploadBox p-3 bg-gray-200
//       cursor-pointer hover:bg-gray-300 rounded-md
//       overflow-hidden border-2 border-dashed border-[rgba(0,0,0,0.4)]
//       flex items-center justify-center flex-col relative w-[100%] h-[150px]"
//       >
//         <FaRegImages className="text-[50px] opacity-35 pointer-events-none" />
//         <h4 className="text-[14px]">Image Upload</h4>

//         <input
//           type="file"
//            accept="image/*"

//               onChange={(e) => onChangeFile(e, props?.url)}
//          name="images"
//           multiple={props.multiple !== undefined ? props.multiple : false}
//           className="absolute top-0 left-0 w-full opacity-0 z-50 h-full"
//         />
//       </div>
//     </>
//   );
// };

// export default UploadBox;
import React, { useState } from "react";
import { FaRegImages } from "react-icons/fa6";
import { uploadImages } from "../../utils/api.js";
import CircularProgress from "@mui/material/CircularProgress";

const UploadBox = (props) => {
  const [uploading, setUploading] = useState(false);
  const formdata = new FormData();
  let selectedImages = [];

  const onChangeFile = async (e, apiEndPoint) => {
    try {
      const files = e.target.files;
      if (!files || files.length === 0) return;

      // ✅ Start upload state
      props.setIsUploading(true);
      setUploading(true);

      // ✅ Validate and append files
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (
          file &&
          ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
            file.type
          )
        ) {
          selectedImages.push(file);
          formdata.append(props?.name, file);
        } else {
          alert("Please select a valid image (jpg, jpeg, png, webp)");
          setUploading(false);
          props.setIsUploading(false);
          return;
        }
      }

      // ✅ Perform upload
      uploadImages(apiEndPoint, formdata)
        .then((res) => {
          setUploading(false);
          props.setIsUploading(false);
          props.setPreviewsFun(res?.data?.images || []);
         
        })
        .catch((err) => {
          console.error("Upload failed:", err);
          setUploading(false);
          props.setIsUploading(false);
        });
    } catch (error) {
      console.error("Error in uploadBox:", error);
      setUploading(false);
      props.setIsUploading(false);
    }
  };

  return (
    <div
      className="uploadBox p-0 bg-gray-200 
      cursor-pointer hover:bg-gray-300 rounded-md 
      overflow-hidden border-2 border-dashed border-[rgba(0,0,0,0.4)]
      flex items-center justify-center flex-col relative w-[100%] h-[150px]"
    >
      {uploading === true ? (
        <>
        <CircularProgress />
        <h4 className="text-center">Uploading</h4></>
      ) : (
        <>
          <FaRegImages className="text-[50px] opacity-35 pointer-events-none" />
          <h4 className="text-[14px]">
            {uploading ? "Uploading..." : "Image Upload"}
          </h4>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => onChangeFile(e, props?.url)}
            name={props.name}
            multiple={props.multiple || false}
            className="absolute top-0 left-0 w-full opacity-0 z-50 h-full"
          />
        </>
      )}
    </div>
  );
};

export default UploadBox;
