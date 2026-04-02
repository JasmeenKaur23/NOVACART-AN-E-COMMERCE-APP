// src/pages/BlogList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogItem from "../../components/BlogItem";
 // adjust path if needed

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/blog")
      .then((res) => {
        setBlogs(res.data.blogs || res.data); // your data is array of blogs
        setLoading(false);
 Schreibtisch      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-20">Loading blogs...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12 text-center">Our Blogs</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <BlogItem key={blog._id} item={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogList;