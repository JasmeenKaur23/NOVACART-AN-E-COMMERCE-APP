import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const postData = async (url, formData) => {
  try {
    const response = await fetch(apiUrl + url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      const errorData = await response.json();
      return errorData;
    }
  } catch (error) {
    console.log("error:", error);
  }
};

export const fetchDataFromApi = async (url) => {
  try {
    const params = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(apiUrl + url, params); //adjust content type as needed
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

export const uploadImage = async (url, updatedData) => {
  const params = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-Type": "multipart/form-data",
    },
  };

  var response;
  await axios.put(apiUrl + url, updatedData, params).then((res) => {
    console.log(res);

    response = res;
  });

  return response;
};
// export const uploadImages = async (url, formData) => {
//   const params = {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//       "Content-Type": "multipart/form-data",
//     },
//   };

//   var response;
//   await axios.post(apiUrl + url, formData, params).then((res) => {
//     console.log(res);

//     response = res;
//   });

//   return response;
 
// };
// import axios from "axios";

export const uploadImages = async (url, formData) => {
  try {
    const response = await axios.post(
      apiUrl + url,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "multipart/form-data",
        }
      }
    );

    return {
      success: true,
      data: response.data
    };

  } catch (error) {
    console.log("UPLOAD ERROR:", error);

    // ---- HANDLE TOKEN EXPIRED ----
    if (error?.response?.status === 401) {
      return {
        success: false,
        error: true,
        message: "Invalid or expired token, please login again."
      };
    }

    // ---- NO INTERNET / SERVER DOWN ----
    if (error?.message === "Network Error") {
      return {
        success: false,
        error: true,
        message: "No internet connection. Please check your network."
      };
    }

    // ---- SERVER RETURNED AN ERROR ----
    if (error?.response) {
      return {
        success: false,
        error: true,
        message: error.response.data?.message || "Something went wrong on server."
      };
    }

    // ---- UNKNOWN ERROR SAFETY ----
    return {
      success: false,
      error: true,
      message: "Unexpected error occurred. Please try again."
    };
  }
};

export const editData = async (url, updatedData) => {
  const params = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-Type": "application/json",
    },
  };

  var response;
  await axios.put(apiUrl + url, updatedData, params).then((res) => {
    console.log(res);

    response = res;
  });

  return response;
};

export const deleteImages = async (url, image) => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.delete(apiUrl + url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: image, // pass image data here if needed
  });
  return res.data;
};

export const deleteData = async (url, image) => {
  const token = localStorage.getItem("accessToken");

  const res = await axios.delete(apiUrl + url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: image, // important: this sends the image info in request body
  });

  return res.data;
};
export const deleteMultipleData = async (url, ids) => {
  const token = localStorage.getItem("accessToken");

  const res = await axios.delete(apiUrl + url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: { ids }, // send array of IDs in body
  });

  return res.data;
};