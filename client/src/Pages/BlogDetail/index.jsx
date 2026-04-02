// src/pages/BlogDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {fetchDataFromApi} from "../../utils/api.js"; // Change path if needed

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDataFromApi
      (`/api/blog/${id}`)
      .then((res) => {
        console.log("Full API Response:", res); // Check this in browser console

        // CORRECT WAY – Check all possible structures
        const blogData = res.data?.blog || res.data || res.blog;
        
        if (!blogData) {
          setError("Blog data not found in response");
        } else {
          setBlog(blogData);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log("API Error:", err.response || err);
        setError("Failed to load blog. Please try again.");
        setLoading(false);
      });
  }, [id]);

  // Safe Date Function (Never fails)
  const formatDate = (dateStr) => {
    if (!dateStr) return "No date";
    const [y, m, d] = dateStr.split("T")[0].split("-");
    return `${d}/${m}/${y}`; // 25/04/2025
  };

  // Loading / Error States
  if (loading) return <div className="text-center py-32 text-2xl">Loading blog...</div>;
  if (error) return <div className="text-center py-32 text-red-600 text-xl">{error}</div>;
  if (!blog) return <div className="text-center py-32 text-red-600 text-xl">Blog not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 bg-white min-h-screen">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
        {blog.title}
      </h1>

      <p className="text-lg text-gray-600 mb-8 font-medium">
        {formatDate(blog.createdAt)}
      </p>

      {blog.images && blog.images[0] && (
        <img
          src={blog.images[0]}
          alt={blog.title}
          className="w-full h-96 object-cover rounded-xl shadow-2xl mb-10"
        />
      )}

      <div
        className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: blog.description || "No content available" }}
      />
    </div>
  );
};

export default BlogDetail;