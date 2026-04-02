import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";

import TextField from "@mui/material/TextField";
import { myContext } from "../../App";
import { fetchDataFromApi, postData } from "../../utils/api";

const Reviews = (props) => {
  const [reviews, setReviews] = useState({
    image: "",
    userName: "",
    review: "",
    rating: 1,
    userId: "",
    productId: "",
  });
  const context = useContext(myContext);
  const [reviewsData, setReviewsData] = useState([]);
  useEffect(() => {
    console.log("context data", context?.userData);
    console.log(props?.productId);

    setReviews(() => ({
      ...reviews,
      image: context?.userData?.avatar || "/profile.jpg",
      userName: context?.userData?.name,
      userId: context?.userData?._id,
      productId: props?.productId,
      email:context?.userData?.email
    }));

    getReview();
  }, [context?.userData, props]);

  const onChangeInput = (e) => {
    setReviews(() => ({
      ...reviews,
      review: e.target.value,
    }));
  };

  const addReview = (e) => {
    e.preventDefault();
    console.log(reviews);

    if (reviews?.review !== "") {
      postData("/api/user/addReview", reviews).then((res) => {
        if (res?.error === false) {
          context?.openAlertBox("success", res?.message);
          setReviews(() => ({
            ...reviews,
            review: "",
            rating: 1,
          }));

          getReview();
        } else {
          context?.openAlertBox("error", "You have not Login ");
        }
      });
    } else {
      context?.openAlertBox("error", "Please add review");
    }
  };
  const getReview = () => {
    fetchDataFromApi(`/api/user/getReviews?productId=${props?.productId}`).then(
      (res) => {
        if (res?.error === false) {
          setReviewsData(res?.reviews);
          props?.setReviewsCount(res?.reviews?.length)
        }
      }
    );
  };
  return (
    <>
      <div className=" productReviewsContainer w-full">
        <h2 className="text-[14px] lg:text-[22px]">Customer Questions & Answers</h2>
        {reviewsData?.length !== 0 && (
          <div className="w-full max-h-[300px] overflow-y-scroll overflow-x-hidden mt-5 pr-5 reviewscroll">
            {reviewsData?.map((review, index) => {
              return (
                <div className="review pt-5 pb-5 border-b border-[rgba(0,0,0,0.2)] w-full flex items-center justify-between">
                  <div className="info w-[60%] flex items-center gap-3">
                    <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                      <img
                        src={review?.image ? review?.image : "/profile.jpg"}
                        className="w-full"
                        alt=""
                      />
                    </div>
                    <div className="w-[80%]">
                      <h4 className="text-[16px]">{review?.userName}</h4>
                      <h5 className="text-[14px]">
                        {review?.createdAt?.split("T")[0]}
                      </h5>
                      <p className="mt-0 mb-0">{review?.review}</p>
                    </div>
                  </div>

                  <Rating
                    name="size-small"
                    defaultValue={1}
                    className=""
                    readOnly
                    value={review.rating}
                  />
                </div>
              );
            })}
          </div>
        )}

        <br />

        <div className="bg-[#f1f1f1] p-4 rounded-md reviewForm">
          <h2 className="text-[18px]">Add a Review</h2>
          <form onSubmit={addReview} className="w-full mt-5" action="">
            {" "}
            <TextField
              id="outlined-multiline-flexible"
              label="Write A Review"
              multiline
              onChange={onChangeInput}
              className="mb-3 w-full"
              rows={3}
              name="review"
              maxRows={4}
              value={reviews?.review}
            />
            <Rating
              name="size-small"
              defaultValue={1}
              value={reviews.rating}
              onChange={(event, newValue) => {
                console.log(newValue);

                setReviews(() => ({
                  ...reviews,
                  rating: newValue,
                }));
              }}
            />
            <div className="flex items-center mt-3">
              <Button type="submit" className="btn-org">
                Submit Review
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Reviews;
