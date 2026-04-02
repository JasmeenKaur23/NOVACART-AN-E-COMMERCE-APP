import React, { useEffect, useRef, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link, useSearchParams, useParams } from "react-router-dom";
import ProductZoom from "../../components/ProductZoom";
import ProductDetailsComponent from "../../components/ProductDetails";
import ProductSlider from "../../components/ProductSlider";
import { fetchDataFromApi } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";
import Reviews from "./reviews";

const ProductDetails = () => {
  const [activeTab, setActiveTab] = useState(0);

  // If later you want dynamic category name & product name:
  const { id } = useParams();
  // const [searchParams] = useSearchParams();
  // const catId = searchParams.get("catId");
  const reviewSec = useRef();
  const [productData, setProductData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [relatedProductData, setRelatedProductData] = useState([]);
  useEffect(() => {
    // alert(id)
    setIsLoading(true);
    fetchDataFromApi(`/api/product/${id}`).then((res) => {
      console.log(res);
      if (res?.error === false) {
        setProductData(res?.product);
        fetchDataFromApi(
          `/api/product/getAllProductsBySubCatId/${res?.product?.subCatId}`
        ).then((res) => {
          console.log("res?.products", res?.products);

          if (res?.error === false) {
            const filteredData = res?.products?.filter(
              (item) => item._id !== id
            );
            setRelatedProductData(filteredData);
          }
        });
        console.log("res?.product", res?.product);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    });

    window.scrollTo(0, 0);
  }, [id]);
  useEffect(() => {
    fetchDataFromApi(`/api/user/getReviews?productId=${id}`).then((res) => {
      if (res?.error === false) {
        //  setReviewsData(res?.reviews);
        setReviewsCount(res?.reviews?.length);
      }
    });
  }, [reviewsCount]);
  const goToReviews = () => {
    window.scrollTo({
      top: reviewSec?.current?.offsetTop - 180,
      behavior: "smooth",
    });
    setActiveTab(1);
  };
  return (
    <>
      <div className="py-4">
        <div className="container-fluid px-2 lg:!pl-8">
          {/* ✅ Fixed Breadcrumbs */}
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              className="link text-[16px] transition"
              color="inherit"
              to="/"
            >
              Home
            </Link>

            {/* Category breadcrumb → fixed to product-listing with catId */}
            <Link
              to={`/product-listing?catId=${productData?.catId}`}
              underline="hover"
              color="inherit"
              className="link transition text-[16px]"
            >
              {productData?.catName}
            </Link>

            {/* Product breadcrumb */}
            <Link
              underline="hover"
              color="inherit"
              to={`/product-details/${id}`}
              className="link transition text-[16px]"
            >
              Product Details
            </Link>
          </Breadcrumbs>
        </div>
      </div>

      <section className="bg-white py-2">
        {isLoading === true ? (
          <div className="flex items-center min-h-[300px] justify-center">
            <CircularProgress />
          </div>
        ) : (
          <>
            <div className="container-fluid flex flex-col lg:flex-row items-start   gap-1">
              {/* <div className="productZoomContainer w-full lg:w-[40%]"> */}
            <div className="col1 !pl-0 w-[40%] h-full relative overflow-visible">
  <div className="relative w-full h-full">
    <ProductZoom images={productData?.images} />
  </div>
</div>    {/* <ProductZoom images={productData?.images} /> */}
            

              <div className="productContent !mt-[30px] py-5 px-2  w-full lg:w-[60%]">
                <ProductDetailsComponent
                  goToReviews={goToReviews}
                  reviewsCount={reviewsCount}
                  item={productData}
                />
              </div>
            </div>

            <div className="container pt-10">
              {/* Tabs */}
              <div className="flex items-center mb-5 gap-8">
                <span
                  onClick={() => setActiveTab(0)}
                  className={`link text-[18px] cursor-pointer font-[500] ${
                    activeTab === 0 && "!text-primary"
                  }`}
                >
                  Description
                </span>

                <span
                  ref={reviewSec}
                  onClick={() => setActiveTab(1)}
                  className={`link text-[18px] cursor-pointer font-[500] ${
                    activeTab === 1 && "!text-primary"
                  }`}
                >
                  Reviews ({reviewsCount})
                </span>
              </div>

              {/* TAB CONTENT */}
              {activeTab === 0 && (
                <div className="shadow-md w-full py-5 px-8 rounded-md ">
                  {productData?.description}
                </div>
              )}

              {activeTab === 1 && (
                <div className="shadow-none lg:shadow-md w-full sm:w-[80%] py-0 lg:py-5 px-0 lg:px-8 rounded-md ">
                  {productData?.length !== 0 && (
                    <Reviews
                      setReviewsCount={setReviewsCount}
                      productId={productData?._id}
                    />
                  )}
                </div>
              )}
            </div>
            {relatedProductData?.length !== 0 && (
              <div className="container mt-5">
                <h4 className="text-[20px] mb-1 font-[600]">
                  Related products
                </h4>
                <ProductSlider data={relatedProductData} items={6} />
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default ProductDetails;
